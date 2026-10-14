// Browser verification fixture; state controls are test-only.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {createLegacyButton} from '../../src/LegacyButton.js';
const {LegacyButton}=createLegacyButton({React}),h=React.createElement;
export function mount(target){
 function Fixture(){const [loading,setLoading]=React.useState(false);window.setLegacyLoading=setLoading;return h(LegacyButton,{loading,'aria-label':'Legacy loading fixture'},'Continue');}
 const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();
}
