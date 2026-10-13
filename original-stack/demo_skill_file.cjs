// Host read-file contract, main-BklS_2Y2.js:66129; original renderer Iil consumes contents.
function demoSkillFile(path,hostId){
 if(typeof path!=='string'||path.replace(/\\/g,'/')!=='C:/REA-Demo/skills/rea-ui-demo/SKILL.md')return null;
 if(hostId!=null&&hostId!=='local')throw Error('Synthetic skill belongs to local demo host');
 return {contents:'---\nname: rea-ui-demo\ndescription: Inspect original skill controls\n---\n\n# Rea UI Demo\n\nThis synthetic skill demonstrates the original skill viewer. It does not execute actions.\n\n## Preview states\n\n- Inspect the original typography and spacing.\n- Toggle the skill in its original controls.\n- Return to the conversation with Try now.\n\n```text\nSynthetic frontend fixture\n```\n'};
}
module.exports={demoSkillFile};
