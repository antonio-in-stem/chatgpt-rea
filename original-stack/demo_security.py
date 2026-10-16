"""Synthetic Security workbench state. No scanner or repository access."""
import json
from copy import deepcopy

METHODS = {'mcpServerStatus/list', 'mcpServer/tool/call'}
TOOLS = ('list_codex_security_scans', 'list_codex_security_repositories',
         'list_codex_security_global_findings', 'get_codex_security_scan', 'list_codex_security_findings')
MUTATIONS = ('rename_codex_security_scan', 'set_codex_security_finding_triage')
SCAN_ID = '11111111-1111-4111-8111-111111111111'
TARGET_ID = 'rea-security-demo'
STAMP = '2026-10-13T00:00:00Z'
SUMMARY = {'scanId': SCAN_ID, 'targetId': TARGET_ID, 'targetPath': 'C:/REA-Demo/security',
           'name': 'Synthetic UI report', 'findingCount': 1, 'mode': 'standard', 'scope': 'Demo only',
           'updatedAt': STAMP, 'startedAt': STAMP,
           'progress': {'coverage': {'closedRows': 1, 'worklistRows': 1}, 'phase': 'reporting', 'status': 'complete'}}
FINDING = {'occurrenceId': 'rea-occurrence-1', 'findingId': 'rea-finding-1',
           'locations': [{'path': 'demo.txt', 'startLine': 1}], 'severity': {'level': 'low'},
           'title': 'Synthetic finding for frontend inspection',
           'summary': 'Demonstration data only. No repository was scanned.',
           'triage': {'status': 'open'}, 'sourceExcerpt': 'synthetic demo content'}

class SecurityError(ValueError):
    pass


def save_state(path, state):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary=path.with_suffix('.pending')
    try:
        temporary.write_text(json.dumps(state, ensure_ascii=False), encoding='utf-8')
        temporary.replace(path)
    finally:
        if temporary.exists():temporary.unlink()


def handle(method, params, config=None):
    path=config.path.parent/'demo-security.json' if config is not None else None
    state=json.loads(path.read_text(encoding='utf-8')) if path is not None and path.exists() else {}
    summary, finding=deepcopy(SUMMARY),deepcopy(FINDING)
    summary['name']=state.get('name',summary['name'])
    finding['triage']=state.get('triage',finding['triage'])
    tools=TOOLS+MUTATIONS if config is not None else TOOLS
    params = {} if params is None else params
    if not isinstance(params, dict): raise SecurityError('Expected provider parameters')
    if method == 'mcpServerStatus/list':
        if params.get('cursor'): raise SecurityError('Unknown demo provider cursor')
        return {'data': [{'name': 'codex-security', 'authStatus': 'unsupported',
                'runtimeStatus': 'connected', 'resources': [], 'resourceTemplates': [],
                'serverInfo': {'name': 'rea-security-demo', 'version': '1.0.0', 'title': 'Synthetic Security demo'},
                'tools': {name: {'name': name, 'description': 'Synthetic demo UI state only',
                           'inputSchema': {'type': 'object'}, 'annotations': {'readOnlyHint': name not in MUTATIONS}}
                          for name in tools}}], 'nextCursor': None}
    if method != 'mcpServer/tool/call' or params.get('server') != 'codex-security':
        raise SecurityError('Unknown demo provider')
    name, args = params.get('tool'), params.get('arguments') or {}
    if name not in tools: raise SecurityError('Only synthetic read tools are available')
    if not isinstance(args, dict): raise SecurityError('Expected tool arguments')
    if name in ('get_codex_security_scan', 'list_codex_security_findings') and args.get('scanId') != SCAN_ID:
        raise SecurityError('Unknown synthetic scan')
    if args.get('occurrenceId') not in (None, finding['occurrenceId']): raise SecurityError('Unknown synthetic finding')
    if name in MUTATIONS:
        if name == 'rename_codex_security_scan':
            if set(args) != {'scanId','name'} or args['scanId'] != SCAN_ID:raise SecurityError('Unknown synthetic scan')
            value=args['name']
            if not isinstance(value,str) or not value.strip() or len(value)>200:raise SecurityError('Invalid demo scan name')
            state['name']=value.strip()
            save_state(path,state)
            return {'content':[],'isError':False,'structuredContent':{'scanId':SCAN_ID,'name':state['name']}}
        if set(args)-{'occurrenceId','status','closeReason','note'} or args.get('occurrenceId')!=finding['occurrenceId']:raise SecurityError('Unknown synthetic finding')
        status=args.get('status')
        if status not in ('open','closed'):raise SecurityError('Invalid triage status')
        reason=args.get('closeReason')
        if status=='closed' and reason not in ('already_fixed','false_positive','wont_fix'):raise SecurityError('Close reason required')
        if status=='open' and reason is not None:raise SecurityError('Open finding cannot have a close reason')
        note=args.get('note')
        if note is not None and (not isinstance(note,str) or len(note)>2400):raise SecurityError('Invalid demo note')
        if status=='closed' and reason=='wont_fix' and (not isinstance(note,str) or not note.strip()):raise SecurityError('Context required for wont fix')
        state['triage']={'status':status,'closeReason':reason,'note':note,'updatedAt':STAMP}
        save_state(path,state)
        return handle('mcpServer/tool/call',{'server':'codex-security','tool':'get_codex_security_scan','arguments':{'scanId':SCAN_ID}},config)
    if name == 'list_codex_security_scans':
        data = {'scans': [summary] if args.get('targetId') in (None, TARGET_ID) else []}
    elif name == 'list_codex_security_repositories':
        data = {'repositories': [{'targetId': TARGET_ID, 'targetPath': summary['targetPath'],
                'checkoutAvailable': False, 'displayName': 'REA synthetic repository',
                'latestScan': summary, 'openFindingsCount': int(finding['triage']['status']=='open'), 'scanCount': 1}]}
    elif name == 'get_codex_security_scan':
        data = {'scan': {**summary, 'findings': [finding], 'findingsTruncated': False,
                'severityCounts': {'low': 1}, 'remediationAvailable': False,
                'remediationUnavailableReason': 'Synthetic read-only report'}}
    else:
        offset, limit = args.get('offset', 0), args.get('limit', 20)
        if type(offset) is not int or offset < 0 or type(limit) is not int or not 1 <= limit <= 100:
            raise SecurityError('Invalid findings page')
        if name == 'list_codex_security_findings':
            data = {'findingsPage': {'scanId': SCAN_ID, 'offset': offset,
                    'findings': [finding][offset:offset+limit], 'nextOffset': None}}
        else:
            query = args.get('query', '')
            if not isinstance(query, str): raise SecurityError('Invalid finding query')
            row = {key: finding[key] for key in ('findingId','occurrenceId','severity','summary','title')}
            row.update(createdAt=STAMP, updatedAt=STAMP, locationPath='demo.txt', occurrenceCount=1,
                       scanId=SCAN_ID, scope='Demo only', status=finding['triage']['status'], targetId=TARGET_ID, targetPath=summary['targetPath'])
            matches = (args.get('targetId') in (None, TARGET_ID) and args.get('status') in (None, 'all', finding['triage']['status'])
                       and args.get('severity') in (None, 'low') and query.casefold() in (row['title']+' '+row['summary']).casefold())
            data = {'findings': ([row] if matches else [])[offset:offset+limit], 'nextOffset': None}
    return {'content': [], 'isError': False, 'structuredContent': deepcopy(data)}
