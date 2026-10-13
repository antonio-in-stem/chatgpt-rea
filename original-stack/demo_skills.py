"""Synthetic skill metadata and persistent toggle; never reads or executes skill files."""
import json
from pathlib import Path
NAME = 'rea-ui-demo'
SKILL_PATH = 'C:/REA-Demo/skills/rea-ui-demo/SKILL.md'
METHODS = {'skills/list', 'skills/config/write'}

class SkillError(ValueError):
    pass

class SkillStore:
    def __init__(self, config):
        self.path = config.path.parent / 'demo-skills.json'
        self.enabled = json.loads(self.path.read_text()).get('enabled', True) if self.path.exists() else True

    def metadata(self):
        return {'name': NAME, 'description': 'Synthetic skill for inspecting the original frontend. No executable actions.',
                'shortDescription': 'Inspect original skill controls', 'path': SKILL_PATH,
                'scope': 'user', 'enabled': self.enabled, 'pluginId': None}

    def handle(self, method, params, default_cwd):
        params = {} if params is None else params
        if not isinstance(params, dict): raise SkillError('Expected skill parameters')
        if method == 'skills/list':
            cwds = params.get('cwds', [])
            if not isinstance(cwds, list) or any(not isinstance(p, str) or not p for p in cwds):
                raise SkillError('Expected working-directory strings')
            return {'data': [{'cwd': p, 'skills': [self.metadata()], 'errors': []} for p in (cwds or [default_cwd])]}
        if method != 'skills/config/write': raise SkillError('Unknown skill method')
        selectors = [(params.get('name'), NAME), (params.get('path'), SKILL_PATH)]
        present = [(v, expected) for v, expected in selectors if v is not None]
        if not present or any(not isinstance(v, str) or v.replace('\\', '/') != expected for v, expected in present):
            raise SkillError('Only the synthetic skill can be updated')
        enabled = params.get('enabled')
        if not isinstance(enabled, bool): raise SkillError('Expected enabled boolean')
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.path.with_suffix('.pending')
        owned = False
        try:
            with temporary.open('x', encoding='utf8') as f:
                owned = True
                json.dump({'enabled': enabled}, f)
            temporary.replace(self.path)
        finally:
            if owned: temporary.unlink(missing_ok=True)
        self.enabled = enabled
        return {'effectiveEnabled': enabled}
