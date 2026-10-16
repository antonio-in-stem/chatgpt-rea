"""Bounded static route lookup; never executes recovered JavaScript."""
import hashlib,json,re,bisect
from pathlib import Path
root=Path(__file__).resolve().parent
assets=root/'state/recovered-all/readable/assets'
files={k:assets/v for k,v in {'initial':'app-initial-b8e1c8014bb4.js','shared':'app-shared-737655e1fb23.js'}.items()}
sources={k:p.read_text(encoding='utf-8') for k,p in files.items()}
s=sources['initial']; t=sources['shared']
imports={b:a for a,b in re.findall(r'\b([\w$]+) as ([\w$]+)',s[s.index('import {',s.index('import {')+1):s.index('} from "./app-shared')])}
exports={b:a for a,b in re.findall(r'\b([\w$]+) as ([\w$]+)',t[t.rfind('export {'):])}
# Global textual candidates only. Short reused identifiers are not inferred.
pattern=re.compile(r'(?<![\w$])([\w$]+)\s*=(?!=)\s*(`[^`\n]*`|[A-Za-z_$][\w$]*)(?=\s*[,);\n])')
index={}
for module,text in sources.items():
 newlines=[m.start() for m in re.finditer('\n',text)]
 for m in pattern.finditer(text):
  index.setdefault((module,m.group(1)),[]).append((m.group(2),bisect.bisect_left(newlines,m.start())+1))
def resolve(expr,module='initial',seen=frozenset()):
 key=(module,expr)
 if key in seen or len(seen)>12:return None,[]
 seen=seen|{key}
 if expr.startswith('`') and expr.endswith('`'):
  refs=[]; failed=False
  def sub(m):
   nonlocal failed
   value,trail=resolve(m.group(1),module,seen); refs.extend(trail)
   if value is None:failed=True;return ''
   return value
  value=re.sub(r'\$\{([^}]+)\}',sub,expr[1:-1])
  return (None if failed else value),refs
 if module=='initial' and expr in imports and imports[expr] in exports:
  value,trail=resolve(exports[imports[expr]],'shared',seen)
  return value,[{'import':expr,'export':imports[expr],'binding':exports[imports[expr]]}]+trail
 if len(expr)<3:return None,[]
 candidates=index.get(key,[])
 if len(candidates)!=1:return None,[]
 rhs,line=candidates[0];value,trail=resolve(rhs,module,seen)
 return value,[{'module':module,'symbol':expr,'line':line}]+trail
inventory=json.loads((root/'evidence/frontend-route-inventory.json').read_text(encoding='utf-8-sig'))
entries=[]
for item in inventory['entries']:
 value,trail=resolve(item['expression'])
 entries.append({'routeLine':item['line'],'expression':item['expression'],'candidatePath':value,'evidence':trail,'runtimeVerified':False})
result={'scope':'Static textual candidates with import/export alias tracing. Not lexical-scope AST analysis, effective parent composition, gate eligibility or UI verification. Ambiguous and short local bindings stay unresolved.','sources':{k:{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for k,p in files.items()},'entries':entries,'counts':{'entries':len(entries),'candidatePaths':sum(x['candidatePath'] is not None for x in entries),'unresolved':sum(x['candidatePath'] is None for x in entries)}}
(root/'evidence/route-path-candidates.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result['counts']))
print('Unresolved:',[x['expression'] for x in entries if x['candidatePath'] is None])
