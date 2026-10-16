"""Select a synthetic Security state in an explicitly credential-free demo profile."""
import json,re,sys
from pathlib import Path
from demo_security import save_state
profile,scenario=sys.argv[1:]
if not re.fullmatch(r'demo-[a-zA-Z0-9_-]+',profile) or scenario not in ('recovery','normal'):raise ValueError('Explicit demo profile and known scenario required')
root=Path(__file__).resolve().parent/'state'/profile
if not root.is_dir() or (root/'codex-home/auth.json').exists():raise ValueError('Existing credential-free demo required')
path=root/'demo-security.json';state=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
for key in ('recoveryPending','recoveryFailOnce','recoveryCompleted'):state.pop(key,None)
if scenario=='recovery':state.update(recoveryPending=True,recoveryFailOnce=True)
save_state(path,state)
print(json.dumps({'scenario':scenario,'rendererModified':False}))
