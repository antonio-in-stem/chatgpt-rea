import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createProfileControl} from '../src/ProfileControl.js';
import {createLegacyButton} from '../src/LegacyButton.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),initial=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/ProfileControl.js'),manifest=JSON.parse(read('../profile-control-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const h=React.createElement,{LegacyButton}=createLegacyButton({React});
function setup(){let avatar,menu,image;const ui=createProfileControl({React,LegacyButton,Avatar:p=>{avatar=p;return h('span',{'data-avatar':true},p.fallback??p.name);},AssetIcon:p=>h('svg',{'data-settings':true,viewBox:p.asset.viewBox}),ProfileMenu:p=>{menu=p;return p.triggerButton;},useImageSource:url=>{image=url;return {src:url,isError:false};}});return {ui,render:(snapshot,props={})=>renderToStaticMarkup(h(ui.ProfileControl,{snapshot,...props})),get:()=>({avatar,menu,image})};}
const personal=()=>({auth:{authMethod:'chatgpt',accountId:'a',userId:'u',nameAtLogin:'Login',profilePictureUrlAtLogin:'login.png'},accountQuery:{data:{structure:'personal',name:'Account',profile_picture_url:'account.png'}},queries:{user:{data:{name:'User',picture:'user.png'}},usage:{data:{profile_subtext:'Local quota'}}},profileQuery:{data:{profile_details:{display_name:'Profile',profile_picture_url:' profile.png ',username:'demo'}}},profileVisibility:{isProfileVisible:true,isProfileVisibilityLoading:false},sidebarWidth:308});
test('profile, label, shimmer and settings artwork bodies match shipped source',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(initial,n));for(const n of manifest.sharedSymbols)assert.equal(def(out,n),def(shared,n));});
test('personal profile preserves original photo priority and menu identity',()=>{
 const a=setup(),s=personal();a.render(s,{compact:true});assert.equal(a.get().image,'profile.png');assert.equal(a.get().avatar.name,'Profile');assert.equal(a.get().avatar.size,'sm');assert.equal(a.get().menu.sidebarFooter.width,null);
 s.profileQuery={data:{profile_details:{}}};a.render(s);assert.equal(a.get().image,'user.png');assert.equal(a.get().avatar.name,'User');assert.equal(a.get().avatar.size,'xs');assert.equal(a.get().menu.sidebarFooter.width,308);
 s.queries.user={data:{}};a.render(s);assert.equal(a.get().image,'account.png');s.accountQuery={data:{structure:'personal'}};a.render(s);assert.equal(a.get().image,null);s.queries.user={data:undefined};a.render(s);assert.equal(a.get().image,'login.png');
});
test('workspace avatar and loading placeholders preserve original branches',()=>{
 const a=setup(),s=personal();s.accountQuery={data:{structure:'workspace',name:'Team',profile_picture_url:'team.png'}};a.render(s);assert.equal(a.get().image,'team.png');assert.equal(a.get().avatar.name,'Team');assert.equal(a.get().avatar.colorKey,'a');
 s.auth.accountStructureAtLogin='workspace';s.accountQuery={data:undefined,isError:false};const html=a.render(s);assert.match(html,/aria-busy="true"/);assert.match(html,/Loading profile/);assert.match(html,/_LoadingResultsShimmer_1a4hf_2/);assert.equal(a.get().avatar.src,null);
});
test('settings fallback is restricted to identity/provider branches',()=>{
 const a=setup();assert.match(a.render({auth:{}},{compact:true}),/data-settings/);const s=personal();assert.doesNotMatch(a.render(s),/data-settings/);s.auth.authMethod='apikey';s.queries.modelProvider={data:{model_provider:'custom',model_providers:{custom:{name:'Local provider'}}}};assert.match(a.render(s),/data-settings/);assert.equal(a.get().menu.sidebarFooter.modelProviderName,'Local provider');
});
test('profile trigger and label preserve original size and subtext geometry',()=>{
 const {ui}=setup();assert.match(renderToStaticMarkup(h(ui.ProfileTrigger,{compact:true},'Profile')),/data-size="xl"/);assert.match(renderToStaticMarkup(h(ui.ProfileTrigger,{compact:false},'Profile')),/data-size="lg"/);assert.match(renderToStaticMarkup(h(ui.ProfileLabel,{text:'Quota'},'Name')),/data-ambient-usage-label/);assert.equal(renderToStaticMarkup(h(ui.ProfileLabel,{text:null},'Name')),'Name');assert.match(renderToStaticMarkup(h(ui.LoadingShimmer,{widthPercent:200})),/width:100%/);
});

test('expanded profile tolerates absent optional usage data',()=>{const a=setup();const html=a.render({auth:{authMethod:'chatgpt',nameAtLogin:'Local User'}});assert.match(html,/Local User/);assert.doesNotMatch(html,/data-ambient-usage-label="/);});
