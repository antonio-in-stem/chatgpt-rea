"""Read-only synthetic Security workbench provider. No scanner, files or subprocesses."""
from copy import deepcopy

METHODS = {'mcpServerStatus/list', 'mcpServer/tool/call'}
TOOLS = ('list_codex_security_scans', 'list_codex_security_repositories',
         'list_codex_security_global_findings', 'get_codex_security_scan', 'list_codex_security_findings')
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


def handle(method, params):
    params = {} if params is None else params
    if not isinstance(params, dict): raise SecurityError('Expected provider parameters')
    if method == 'mcpServerStatus/list':
        if params.get('cursor'): raise SecurityError('Unknown demo provider cursor')
        return {'data': [{'name': 'codex-security', 'authStatus': 'unsupported',
                'runtimeStatus': 'connected', 'resources': [], 'resourceTemplates': [],
                'serverInfo': {'name': 'rea-security-demo', 'version': '1.0.0', 'title': 'Synthetic Security demo'},
                'tools': {name: {'name': name, 'description': 'Read synthetic local UI fixture only',
                           'inputSchema': {'type': 'object'}, 'annotations': {'readOnlyHint': True}}
                          for name in TOOLS}}], 'nextCursor': None}
    if method != 'mcpServer/tool/call' or params.get('server') != 'codex-security':
        raise SecurityError('Unknown demo provider')
    name, args = params.get('tool'), params.get('arguments') or {}
    if name not in TOOLS: raise SecurityError('Only synthetic read tools are available')
    if not isinstance(args, dict): raise SecurityError('Expected tool arguments')
    if name in ('get_codex_security_scan', 'list_codex_security_findings') and args.get('scanId') != SCAN_ID:
        raise SecurityError('Unknown synthetic scan')
    if args.get('occurrenceId') not in (None, FINDING['occurrenceId']): raise SecurityError('Unknown synthetic finding')
    if name == 'list_codex_security_scans':
        data = {'scans': [SUMMARY] if args.get('targetId') in (None, TARGET_ID) else []}
    elif name == 'list_codex_security_repositories':
        data = {'repositories': [{'targetId': TARGET_ID, 'targetPath': SUMMARY['targetPath'],
                'checkoutAvailable': False, 'displayName': 'REA synthetic repository',
                'latestScan': SUMMARY, 'openFindingsCount': 1, 'scanCount': 1}]}
    elif name == 'get_codex_security_scan':
        data = {'scan': {**SUMMARY, 'findings': [FINDING], 'findingsTruncated': False,
                'severityCounts': {'low': 1}, 'remediationAvailable': False,
                'remediationUnavailableReason': 'Synthetic read-only report'}}
    else:
        offset, limit = args.get('offset', 0), args.get('limit', 20)
        if type(offset) is not int or offset < 0 or type(limit) is not int or not 1 <= limit <= 100:
            raise SecurityError('Invalid findings page')
        if name == 'list_codex_security_findings':
            data = {'findingsPage': {'scanId': SCAN_ID, 'offset': offset,
                    'findings': [FINDING][offset:offset+limit], 'nextOffset': None}}
        else:
            query = args.get('query', '')
            if not isinstance(query, str): raise SecurityError('Invalid finding query')
            row = {key: FINDING[key] for key in ('findingId','occurrenceId','severity','summary','title')}
            row.update(createdAt=STAMP, updatedAt=STAMP, locationPath='demo.txt', occurrenceCount=1,
                       scanId=SCAN_ID, scope='Demo only', status='open', targetId=TARGET_ID, targetPath=SUMMARY['targetPath'])
            matches = (args.get('targetId') in (None, TARGET_ID) and args.get('status') in (None, 'all', 'open')
                       and args.get('severity') in (None, 'low') and query.casefold() in (row['title']+' '+row['summary']).casefold())
            data = {'findings': ([row] if matches else [])[offset:offset+limit], 'nextOffset': None}
    return {'content': [], 'isError': False, 'structuredContent': deepcopy(data)}
