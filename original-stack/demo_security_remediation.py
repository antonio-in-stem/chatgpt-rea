"""Original remediation UI protocol with synthetic results; no file/patch execution."""
from datetime import datetime, timezone
from uuid import UUID
from copy import deepcopy

TOOLS = tuple(name + '_codex_security_finding_remediation' + suffix for name, suffix in (
    ('request', ''), ('request', '_action'), ('claim', '_resend'),
    ('mark', '_delivered'), ('release', '_claim'), ('cancel', '_request')))
PATCH = '--- a/demo.txt\n+++ b/demo.txt\n@@ -1 +1 @@\n-synthetic demo content\n+synthetic corrected demo content\n'

def handle(name, args, state, error):
    if args.get('occurrenceId') != 'rea-occurrence-1':
        raise error('Unknown synthetic finding')
    for key in ('requestId', 'actionToken'):
        try: UUID(args.get(key, ''))
        except (ValueError, TypeError, AttributeError): raise error('Invalid remediation identifier')
    current = deepcopy(state.get('remediation', {}))
    action = args.get('action', 'generate')
    stamp = datetime.now(timezone.utc).isoformat()
    if name == TOOLS[0]:
        if current.get('actionClaimToken'): raise error('Demo remediation already claimed')
        if state.get('triage', {}).get('status') == 'closed': raise error('Finding is closed')
        current = dict(state='requested', requestId=args['requestId'], version=current.get('version', 0)+1)
    elif name == TOOLS[1]:
        if current.get('actionClaimToken'): raise error('Demo remediation already claimed')
        if current.get('requestId') != args['requestId'] or type(args.get('expectedVersion')) is not int or args['expectedVersion'] != current.get('version'):
            raise error('Stale remediation request/version')
        if (current.get('state'), action) not in (('generated', 'apply'), ('applied', 'verify')):
            raise error('Invalid remediation stage')
        current['version'] += 1
    elif name == TOOLS[2]:
        if current.get('requestId') != args['requestId'] or current.get('actionClaimToken') or not current.get('pendingAction'):
            raise error('No released remediation action to resend')
        action = current['pendingAction']
    else:
        if current.get('requestId') != args['requestId'] or current.get('actionClaimToken') != args['actionToken']:
            raise error('Stale remediation claim')
        if name == TOOLS[3]:
            action = current.get('pendingAction')
            if action not in ('generate','apply','verify'): raise error('No pending demo action')
            current.update(state={'generate':'generated','apply':'applied','verify':'verified'}[action], pendingAction=None,
                           actionDeliveredAt=stamp, actionClaimToken=None, version=current['version']+1)
            if action == 'generate': current.update(patch=PATCH, summary='Synthetic patch preview. No repository was inspected.')
            elif action == 'apply': current['summary']='Demo application recorded. No files were modified.'
            else: current['verificationSummary']='Demo verification completed. No commands were executed.'
        elif name == TOOLS[4]:
            current.update(actionClaimToken=None, actionClaimedAt=None, actionDeliveredAt=None)
        elif name == TOOLS[5]:
            current.update(state='failed', pendingAction=None, actionClaimToken=None, summary='Demo remediation delivery canceled.')
        else: raise error('Unknown remediation operation')
        state['remediation'] = current
        return
    current.update(pendingAction=action, actionClaimToken=args['actionToken'], actionClaimedAt=stamp, actionDeliveredAt=None)
    state['remediation'] = current
