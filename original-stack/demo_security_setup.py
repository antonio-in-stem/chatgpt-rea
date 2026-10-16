"""Local simulated scan setup. It never opens a repository or starts a scanner."""
from copy import deepcopy
from uuid import uuid4
from datetime import datetime, timezone
TOOLS=('inspect_codex_security_target','inspect_codex_security_setup','open_codex_security_workspace','submit_codex_security_setup','start_codex_security_scan','claim_codex_security_scan_handoff_delivery','attach_codex_security_scan_continuation_thread','release_codex_security_scan_handoff_delivery','cancel_codex_security_scan_from_app')
TARGET='C:/REA-Demo/security'
def handle(name,args,state):
    from demo_security import SecurityError
    def fail(message):raise SecurityError(message)
    if name not in TOOLS:fail('Unknown demo setup operation')
    if name in TOOLS[:4]:
        if args.get('targetPath','').replace('\\','/').rstrip('/')!=TARGET:fail('Only the synthetic target is available')
    if name=='inspect_codex_security_target':return {'target':{'targetMetadata':{'reviewChangesSupported':True,'revision':'rea-demo-revision','shortRevision':'rea-demo','branch':'demo','commitSubject':'Synthetic revision'}}},False
    if name in TOOLS[1:4]:
        if args.get('mode') not in ('standard','deep','diff'):fail('Invalid demo scan mode')
        scope=args.get('scope')
        if not isinstance(scope,str) or not scope.strip() or len(scope)>512 or '..' in scope.split('/') or ':' in scope or scope.startswith(('/', '\\')):fail('Relative demo scope required')
        if args['mode']=='diff':
            diff=args.get('diffTarget',{})
            if diff.get('kind') not in ('working_tree','commit','range'):fail('Invalid revision selection')
            for key in ('headRevision','baseRevision'):
                if (key=='headRevision' and diff['kind'] in ('commit','range')) or (key=='baseRevision' and diff['kind']=='range'):
                    if not isinstance(diff.get(key),str) or not diff[key].strip():fail('Revision required')
    if name=='inspect_codex_security_setup':return {'setup':{'scope':args['scope'],'diffTarget':args.get('diffTarget')}},False
    workspaces=state.setdefault('workspaces',{});runs=state.setdefault('runs',{})
    if name=='open_codex_security_workspace':
        identifier=str(uuid4());workspaces[identifier]={'id':identifier,'setup':deepcopy(args),'submitted':False}
        return {'workspace':{'id':identifier}},True
    if name in ('submit_codex_security_setup','start_codex_security_scan'):
        workspace=workspaces.get(args.get('sessionId'))
        if workspace is None:fail('Unknown demo setup session')
        if name=='submit_codex_security_setup':
            if any(args.get(k)!=workspace['setup'].get(k) for k in ('targetPath','mode','scope','diffTarget')):fail('Setup changed before submission')
            context=args.get('userContext','')
            if not isinstance(context,str) or len(context)>20000:fail('Invalid demo context')
            workspace.update(submitted=True,userContext=context)
        else:
            if not workspace['submitted']:fail('Submit setup before starting')
            if 'results' not in workspace:
                identifier=str(uuid4());now=datetime.now(timezone.utc).isoformat();setup=workspace['setup']
                runs[identifier]={'scanId':identifier,'targetId':'rea-security-demo','targetPath':TARGET,'name':'Demo scan '+str(len(runs)+1),'findingCount':0,'mode':setup['mode'],'scope':setup['scope'],'startedAt':now,'updatedAt':now,'userContext':workspace.get('userContext',''),'progress':{'coverage':{'closedRows':0,'worklistRows':0},'phase':'preflight','status':'running'}}
                workspace['results']={'scanId':identifier,'mode':setup['mode']}
        return {'workspace':{k:deepcopy(v) for k,v in workspace.items() if k in ('id','results')}},True
    run=runs.get(args.get('scanId'))
    if run is None:fail('Unknown demo scan')
    workspace=next(w for w in workspaces.values() if w.get('results',{}).get('scanId')==run['scanId'])
    if name=='claim_codex_security_scan_handoff_delivery':
        token=args.get('claimToken')
        if not isinstance(token,str) or not token:fail('Claim token required')
        if workspace.get('claimToken') not in (None,token):fail('Demo scan already claimed')
        workspace['claimToken']=token;workspace['results']['handoffClaimToken']=token
    elif name in ('attach_codex_security_scan_continuation_thread','release_codex_security_scan_handoff_delivery'):
        if not workspace.get('claimToken') or args.get('claimToken')!=workspace['claimToken']:fail('Invalid demo handoff claim')
        if name.startswith('attach'):
            if not isinstance(args.get('threadId'),str) or not args['threadId']:fail('Thread id required')
            run['continuationThreadId']=args['threadId'];run['progress'].update(phase='reporting',status='complete')
        else:workspace['claimToken']=None
    elif name=='cancel_codex_security_scan_from_app':run['progress']['status']='canceled'
    return {'workspace':{'id':workspace['id'],'results':deepcopy(workspace['results'])}},True
