"""Bounded static route lookup; never executes recovered JavaScript."""
import hashlib,json,re,bisect
from pathlib import Path
root=Path(__file__).resolve().parent
assets=root/'state/recovered-all/readable/assets'
files={k:assets/v for k,v in {'initial':'app-initial-b8e1c8014bb4.js','shared':'app-shared-737655e1fb23.js'}.items()}
sources={k:p.read_text(encoding='utf-8') for k,p in files.items()}
s=sources['initial']; t=sources['shared']
imports={b:a for a,b in re.findall(r'(?<![\w$])([\w$]+) as ([\w$]+)',s[s.index('import {',s.index('import {')+1):s.index('} from "./app-shared')])}
exports={b:a for a,b in re.findall(r'(?<![\w$])([\w$]+) as ([\w$]+)',t[t.rfind('export {'):])}
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
# Reviewed bounded source blocks disambiguate reused names; fail if evidence moves.
reviewed = {
 'SXe':('shared',213720,213735,'h1 = `/dots`','/dots'),
 'og':('shared',213720,213735,'YTr = `${h1}/home`','/dots/home'),
 'wr':('shared',213720,213735,'XTr = `${h1}/new`','/dots/new'),
 'ove':('shared',213720,213735,'ZTr = `${h1}/:conversationId`','/dots/:conversationId'),
 'exe':('shared',98180,98200,'vgt = Qj','/hotkey-window'),
 'YA.scheduled.path':('initial',119138,119150,'path: `/scheduled`','/scheduled'),
 'ER.home.path':('initial',162088,162102,'home: { path: `/space` }','/space'),
 'ER.directory.path':('initial',162088,162102,'directory: { path: `/space/d/:directoryId` }','/space/d/:directoryId'),
 'ER.files.path':('initial',162088,162102,'files: { path: `/space/files` }','/space/files'),
 'ER.filesDirectory.path':('initial',162088,162102,'filesDirectory: { path: `/space/files/d/:directoryId` }','/space/files/d/:directoryId'),
 'ER.personal.path':('initial',162088,162102,'personal: { path: `/space/personal` }','/space/personal'),
 'Lzt()':('initial',69335,69338,'return `/automations`','/automations'),
}
lines={k:v.splitlines() for k,v in sources.items()}
for expr,(module,start,end,snippet,value) in reviewed.items():
 if snippet not in '\n'.join(lines[module][start-1:end]):raise ValueError('Reviewed source changed: '+expr)
inventory=json.loads((root/'evidence/frontend-route-inventory.json').read_text(encoding='utf-8-sig'))
entries=[]
for item in inventory['entries']:
 value,trail=resolve(item['expression'])
 if item['expression'] in reviewed:
  module,start,end,snippet,value=reviewed[item['expression']]
  trail=[{'module':module,'reviewedStartLine':start,'reviewedEndLine':end,'method':'bounded manually reviewed initializer/object/function'}]
 row={'routeLine':item['line'],'expression':item['expression'],'candidatePath':value,'evidence':trail,'runtimeVerified':False}
 if item['expression']=='e' and item['line']==444448:
  if '[z_e, D0e].map((e) =>' not in '\n'.join(lines['initial'][444443:444450]):raise ValueError('Mapped routes changed')
  variants=[resolve(name) for name in ['z_e','D0e']]
  if any(v is None for v,_ in variants):raise ValueError('Mapped route unresolved')
  row['candidateVariants']=[v for v,_ in variants]
  row['evidence']=[{'module':'initial','reviewedStartLine':444444,'reviewedEndLine':444451,'method':'two-element map expansion'}]+[part for _,trail in variants for part in trail]
 entries.append(row)
result={'scope':'Static textual candidates with import/export alias tracing. Not lexical-scope AST analysis, effective parent composition, gate eligibility or UI verification. Ambiguous and short local bindings stay unresolved.','sources':{k:{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for k,p in files.items()},'entries':entries,'counts':{'entries':len(entries),'candidatePaths':sum(x['candidatePath'] is not None for x in entries),'unresolved':sum(x['candidatePath'] is None and not x.get('candidateVariants') for x in entries)}}
(root/'evidence/route-path-candidates.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result['counts']))
print('Unresolved:',[x['expression'] for x in entries if x['candidatePath'] is None and not x.get('candidateVariants')])
