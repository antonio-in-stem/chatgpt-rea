// Verify the shipped package from a fresh consumer, never source-relative imports.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const npm=process.env.npm_execpath||path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
const output=fs.mkdtempSync(path.join(os.tmpdir(),'rea-package-consumer-'));
const run=(args,cwd=root)=>execFileSync(process.execPath,[npm,...args],{cwd,encoding:'utf8',windowsHide:true,maxBuffer:4*1024*1024});
const [packed]=JSON.parse(run(['pack','--ignore-scripts','--json','--pack-destination',output]));
const files=packed.files.map(f=>f.path);
for(const file of files)assert(!/^(node_modules|dist|test|examples|scripts|state)\//.test(file),'Unexpected payload: '+file);
for(const required of ['src/index.js','styles/original.css','animations/index.js','provenance.json'])assert(files.includes(required),'Missing '+required);
fs.writeFileSync(path.join(output,'package.json'),JSON.stringify({name:'rea-isolated-consumer',private:true,type:'module'}));
run(['install','--offline','--ignore-scripts','--no-audit','--no-fund',path.join(output,packed.filename)],output);
fs.writeFileSync(path.join(output,'verify.mjs'),`
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {motion,AnimatePresence,MotionConfig} from 'framer-motion';
import {createReaUI} from '@rea/ui';
import * as animations from '@rea/ui/animations';
import * as svg from '@rea/ui/SvgLottie';
const ui=createReaUI({React,motion,AnimatePresence,MotionConfig});
const html=renderToStaticMarkup(React.createElement(ui.Button,{disabled:true},'Packaged button'));
assert(html.includes('Packaged button')&&html.includes('disabled'));
const sheet=fileURLToPath(import.meta.resolve('@rea/ui/styles.css'));
const packageRoot=path.dirname(path.dirname(sheet));
const visited=new Set();let resources=0;
function walk(file){
 if(visited.has(file))return;visited.add(file);
 const css=fs.readFileSync(file,'utf8');
 const refs=[...css.matchAll(/(?:url\\(\\s*|@import\\s+)["']?([^"'\\s)]+)["']?/g)].map(x=>x[1]);
 for(const ref of refs){
  if(/^(data:|https?:|#)/.test(ref))continue;
  const target=path.resolve(path.dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));
  assert(target.startsWith(packageRoot+path.sep),'Resource escapes package');
  assert(fs.statSync(target).isFile(),'Missing resource '+ref);resources++;
  if(target.endsWith('.css'))walk(target);
 }
}
walk(sheet);
assert(resources>0);assert(Object.keys(animations).length>0);assert(Object.keys(svg).length>0);
console.log(JSON.stringify({publicImports:true,buttonRendered:true,stylesheets:visited.size,resourceReferences:resources}));
`);
const result=JSON.parse(execFileSync(process.execPath,['verify.mjs'],{cwd:output,encoding:'utf8',windowsHide:true}));
console.log(JSON.stringify({passed:true,consumer:output,tarball:path.join(output,packed.filename),packageFiles:files.length,...result,fullConversationScreen:false},null,2));
