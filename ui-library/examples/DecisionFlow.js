// A connected choice -> review -> confirm flow using the same reusable controls.
// This composition is new example code, not a recovered original ChatGPT screen.
export function createDecisionFlow(React, {ChoiceButton,ChoiceGroup,SegmentedControl}) {
  const h=React.createElement;
  return function DecisionFlow({onConfirm}) {
    const [mode,setMode]=React.useState('guided'), [step,setStep]=React.useState('choose');
    return h('section',{'aria-label':'Decision flow'},
      h(SegmentedControl,{ariaLabel:'Working mode',options:[{id:'guided',label:'Guided'},{id:'direct',label:'Direct'}],selectedId:mode,onSelect:setMode}),
      h('p',{'aria-live':'polite'},step==='choose' ? 'Choose a mode, then review.' : `Review: ${mode}`),
      h(ChoiceGroup,{columns:2},step==='review' ? h(ChoiceButton,{onClick:()=>setStep('choose')},'Back') : null,
        h(ChoiceButton,{onClick:()=>step==='choose' ? setStep('review') : onConfirm({mode})},step==='choose' ? 'Review' : 'Confirm')));
  };
}
