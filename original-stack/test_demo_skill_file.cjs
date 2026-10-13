const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoSkillFile}=require('./demo_skill_file.cjs');
test('only exact synthetic local skill resolves to markdown contract',()=>{
 const expected=demoSkillFile('C:/REA-Demo/skills/rea-ui-demo/SKILL.md','local');
 assert.match(expected.contents,/^---\nname: rea-ui-demo/);
 assert.deepEqual(demoSkillFile('C:\\REA-Demo\\skills\\rea-ui-demo\\SKILL.md'),expected);
 assert.equal(demoSkillFile('C:/Users/PC/.agents/skills/private/SKILL.md','local'),null);
 assert.equal(demoSkillFile('C:/REA-Demo/skills/rea-ui-demo/../SKILL.md','local'),null);
 assert.throws(()=>demoSkillFile('C:/REA-Demo/skills/rea-ui-demo/SKILL.md','remote'));
});
