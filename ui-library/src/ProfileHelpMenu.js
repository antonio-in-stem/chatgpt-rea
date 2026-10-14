// Original Help and What's New components with explicit local data/action boundaries.
export function createProfileHelpMenu({React,menu,AssetIcon,ResponsiveIcon:Ct,DemoBuildItem:yi,ExternalLinkIndicator:dr,Skeleton:Sn,Row:fr,motion:Oe,AnimatePresence:xt,useStateSnapshot,isFeedEnabled:yn,parseVersion:qn,isNewVersion:Sr,onSelectPost,navigate,dispatchCommand,openDebug,allowDebugMenu=false,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuFlyoutSubmenuItem||!AssetIcon?.fromPreset||!Ct||!yi||!dr||!Sn||!fr||!Oe?.div||!xt||!useStateSnapshot||!yn||!qn||!Sr||!onSelectPost||!navigate||!dispatchCommand||!openDebug||!compilerRuntime?.c)throw new TypeError('ProfileHelpMenu requires original renderers, resolved state and action callbacks');
 const h=React.createElement,Z={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},zi=Z,X=Z,ji=compilerRuntime,Ri=compilerRuntime,Ei=compilerRuntime,J=message=>formatMessage(message);
 const e=fn=>fn,read=useStateSnapshot,C='local',y=()=>read(),be=()=>navigate,ce=id=>read().features?.[id]===true,hr='shortcuts',pe=()=>read().debugShortcut,Mi=allowDebugMenu,Wn=snapshot=>openDebug(snapshot),Zt=dispatchCommand;
 const q={Item:menu.MenuItem,Separator:menu.MenuSeparator,FlyoutSubmenuItem:menu.MenuFlyoutSubmenuItem,SectionLabel:menu.MenuSectionLabel,ItemIcon:menu.MenuItemIcon},ct=()=>read().auth??{},Vr=()=>read().mobileSetupAvailable===true,T={CODEX_MOBILE_SETUP_COMPLETED:'mobileSetupCompleted'},Qe=()=>read().mobileSetupQuery??{data:undefined,isLoading:true};
 const Qt='localeQuery',pn='postsQuery',Hn='lastSeenVersion',s=key=>read()[key],Je=()=>read().intl,n=()=>read().reducedMotion===true,Di=[80,50,65],ke=[0.23,1,0.32,1],_n='open-post',tt=(snapshot,action,{post})=>onSelectPost(post,snapshot),ot=AssetIcon;
 function gn({name,children}){return read().capabilities?.[name]===true?children:null;}
 const LinksContext=React.createContext(null);
 function Fi(props){const links=React.useContext(LinksContext);if(!links)throw Error('HelpMenu requires link callbacks');return h(ki,{...links,...props});}
 const artwork=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let Ana,Mna,Kar,A3i,Ina,F3n,Pna,der,z4n,KBi;
function jna() {
  return (jna = t(() => {
    (Q(),
      (Ana = Z({
        name: `help-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          visualBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          center: { x: 8, y: 8 },
          insets: { top: 1.474609, right: 1.47461, bottom: 1.47461, left: 1.474609 },
          anchors: { frame: { x: 8, y: 8 }, ink: { x: 8, y: 8 }, foreground: { x: 8, y: 8 } },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.47461C9.61263 1.47461 11.0878 2.06081 12.2266 3.03027L12.4619 2.7959C12.6669 2.59093 12.9991 2.59104 13.2041 2.7959C13.4089 3.00094 13.4091 3.33312 13.2041 3.53809L12.9688 3.77246C13.9388 4.9114 14.5254 6.38687 14.5254 8C14.5254 9.61286 13.9385 11.0877 12.9688 12.2266L13.2041 12.4619C13.4091 12.6669 13.4089 12.9991 13.2041 13.2041C12.9991 13.409 12.6669 13.4091 12.4619 13.2041L12.2266 12.9688C11.0877 13.9385 9.61286 14.5254 8 14.5254C6.38687 14.5254 4.9114 13.9388 3.77246 12.9688L3.53809 13.2041C3.33306 13.4091 3.00092 13.4091 2.7959 13.2041C2.59087 12.9991 2.59087 12.6669 2.7959 12.4619L3.03027 12.2266C2.06081 11.0878 1.47461 9.61263 1.47461 8C1.47461 6.3871 2.06052 4.91133 3.03027 3.77246L2.7959 3.53809C2.59087 3.33306 2.59087 3.00092 2.7959 2.7959C3.00092 2.59087 3.33306 2.59087 3.53809 2.7959L3.77246 3.03027C4.91133 2.06052 6.3871 1.47461 8 1.47461ZM9.85254 10.5947C9.32989 10.9685 8.69153 11.1913 8 11.1914C7.30814 11.1913 6.66939 10.9689 6.14648 10.5947L4.51758 12.2246C5.46389 13.0055 6.67713 13.4746 8 13.4746C9.32287 13.4746 10.5361 13.0055 11.4824 12.2246L9.85254 10.5947ZM10.5947 6.14648C10.9689 6.66941 11.1914 7.30811 11.1914 8C11.1913 8.69159 10.9686 9.32986 10.5947 9.85254L12.2246 11.4824C13.0055 10.5361 13.4746 9.32287 13.4746 8C13.4746 6.67713 13.0055 5.46389 12.2246 4.51758L10.5947 6.14648ZM3.77539 4.51758C2.99446 5.46389 2.52539 6.67713 2.52539 8C2.52539 9.32287 2.99446 10.5361 3.77539 11.4824L5.4043 9.85254C5.0305 9.32995 4.80769 8.69139 4.80762 8C4.80767 7.30831 5.03023 6.66933 5.4043 6.14648L3.77539 4.51758ZM8 5.8584C6.81744 5.8586 5.85853 6.81742 5.8584 8C5.85857 9.18254 6.81747 10.1414 8 10.1416C9.18255 10.1414 10.1414 9.18255 10.1416 8C10.1415 6.81741 9.18258 5.85857 8 5.8584ZM8 2.52539C6.67713 2.52539 5.46389 2.99446 4.51758 3.77539L6.14648 5.4043C6.66933 5.03019 7.30829 4.80769 8 4.80762C8.69138 4.80769 9.32995 5.03051 9.85254 5.4043L11.4824 3.77539C10.5361 2.99446 9.32287 2.52539 8 2.52539Z" fill="currentColor"/>`,
      })));
  }))();
}
function Nna() {
  return (Nna = t(() => {
    (Q(),
      (Mna = Z({
        name: `help-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 1.834961, y: 1.834961, width: 16.330078, height: 16.330078 },
          visualBounds: { x: 1.834961, y: 1.834961, width: 16.330078, height: 16.330078 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.834961, y: 1.834961, width: 16.330078, height: 16.330078 },
          center: { x: 10, y: 10 },
          insets: { top: 1.834961, right: 1.834961, bottom: 1.834961, left: 1.834961 },
          anchors: { frame: { x: 10, y: 10 }, ink: { x: 10, y: 10 }, foreground: { x: 10, y: 10 } },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.83496C12.0148 1.83496 13.8582 2.56578 15.2822 3.77539L15.5713 3.4873C15.8308 3.22819 16.2521 3.22826 16.5117 3.4873C16.7713 3.74692 16.7712 4.16899 16.5117 4.42871L16.2227 4.7168C17.433 6.14101 18.165 7.9845 18.165 10C18.165 12.0152 17.4328 13.8581 16.2227 15.2822L16.5117 15.5713C16.7712 15.831 16.7713 16.2531 16.5117 16.5127C16.2521 16.7717 15.8308 16.7718 15.5713 16.5127L15.2822 16.2236C13.8582 17.4335 12.015 18.165 10 18.165C7.98473 18.165 6.14095 17.4338 4.7168 16.2236L4.42871 16.5127C4.169 16.772 3.74688 16.7722 3.4873 16.5127C3.22773 16.2531 3.22798 15.831 3.4873 15.5713L3.77539 15.2822C2.56578 13.8582 1.83496 12.0148 1.83496 10C1.83496 7.98495 2.56549 6.14088 3.77539 4.7168L3.4873 4.42871C3.22798 4.16898 3.22773 3.74688 3.4873 3.4873C3.74688 3.22779 4.169 3.228 4.42871 3.4873L4.7168 3.77539C6.14088 2.56549 7.98495 1.83496 10 1.83496ZM5.66016 15.2803C6.84052 16.2515 8.35206 16.835 10 16.835C11.6477 16.835 13.1586 16.2513 14.3389 15.2803L12.3164 13.2578C11.6627 13.7236 10.8637 13.9989 10 13.999C9.1359 13.999 8.33644 13.723 7.68262 13.2568L5.66016 15.2803ZM13.2568 7.68262C13.7231 8.33645 13.999 9.13589 13.999 10C13.999 10.8638 13.7228 11.6626 13.2568 12.3164L15.2803 14.3398C16.2515 13.1595 16.835 11.6479 16.835 10C16.835 8.35179 16.2518 6.83963 15.2803 5.65918L13.2568 7.68262ZM4.71875 5.66016C3.74772 6.84045 3.16504 8.35228 3.16504 10C3.16504 11.6474 3.74801 13.1587 4.71875 14.3389L6.74219 12.3164C6.27658 11.6626 6.002 10.8636 6.00195 10C6.00202 9.1361 6.2763 8.33636 6.74219 7.68262L4.71875 5.66016ZM10 7.33203C8.52658 7.33221 7.33221 8.52658 7.33203 10C7.33216 11.4735 8.52655 12.6688 10 12.6689C11.4734 12.6687 12.6688 11.4734 12.6689 10C12.6688 8.52659 11.4734 7.33223 10 7.33203ZM10 3.16504C8.35228 3.16504 6.84045 3.74772 5.66016 4.71875L7.68262 6.74219C8.33633 6.27636 9.13616 6.00202 10 6.00195C10.8633 6.00203 11.6618 6.27687 12.3154 6.74219L14.3389 4.71875C13.1587 3.74801 11.6474 3.16504 10 3.16504Z" fill="currentColor"/>`,
      })));
  }))();
}
function qar() {
  return (qar = t(() => {
    (Q(),
      (Kar = Z({
        name: `smartphone-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 3.674561, y: 1.474609, width: 8.650391, height: 13.050781 },
          visualBounds: { x: 3.674561, y: 1.474609, width: 8.650391, height: 13.050781 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.674561, y: 1.474609, width: 8.650391, height: 13.050781 },
          center: { x: 7.999757, y: 8 },
          insets: { top: 1.474609, right: 3.675048, bottom: 1.47461, left: 3.674561 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.999757, y: 8 },
            foreground: { x: 7.999757, y: 8 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M8.72534 3.79395C9.01499 3.79425 9.24969 4.02963 9.24976 4.31934C9.24976 4.6091 9.01503 4.84442 8.72534 4.84473H7.34253C7.05258 4.84473 6.81714 4.60929 6.81714 4.31934C6.8172 4.02944 7.05262 3.79395 7.34253 3.79395H8.72534Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.93335 1.47461C11.254 1.47464 12.3247 2.54556 12.325 3.86621V12.1338C12.3247 13.4544 11.254 14.5254 9.93335 14.5254H6.06616C4.74564 14.5251 3.67481 13.4543 3.67456 12.1338V3.86621C3.67481 2.54569 4.74564 1.47486 6.06616 1.47461H9.93335ZM6.06616 2.52539C5.32554 2.52564 4.72559 3.12559 4.72534 3.86621V12.1338C4.72559 12.8744 5.32554 13.4744 6.06616 13.4746H9.93335C10.6741 13.4746 11.2749 12.8745 11.2751 12.1338V3.86621C11.2749 3.12546 10.6741 2.52543 9.93335 2.52539H6.06616Z" fill="currentColor"/>`,
      })));
  }))();
}
function j3i() {
  return (j3i = t(() => {
    (Q(),
      (A3i = Z({
        name: `chrome-logo-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          visualBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `circular`,
          bounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          center: { x: 8, y: 8 },
          insets: { top: 1.474609, right: 1.47461, bottom: 1.47461, left: 1.474609 },
          anchors: { frame: { x: 8, y: 8 }, ink: { x: 8, y: 8 }, foreground: { x: 8, y: 8 } },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.47461C11.6037 1.47461 14.5254 4.39625 14.5254 8C14.5254 11.6037 11.6037 14.5254 8 14.5254C4.39625 14.5254 1.47461 11.6037 1.47461 8C1.47461 4.39625 4.39625 1.47461 8 1.47461ZM10.2441 6.12598C10.6686 6.63383 10.9248 7.28747 10.9248 8.00098C10.9247 8.45973 10.8153 8.8919 10.627 9.27832C10.616 9.31122 10.602 9.3438 10.584 9.375L8.21973 13.4688C11.1417 13.3534 13.4746 10.9502 13.4746 8C13.4746 7.3417 13.3584 6.71058 13.1455 6.12598H10.2441ZM3.15234 5.45605C2.75264 6.21624 2.52539 7.08139 2.52539 8C2.52539 10.7003 4.48015 12.9415 7.05176 13.3906L8.50195 10.8789C8.3388 10.9072 8.17122 10.9258 8 10.9258C6.95976 10.9257 6.04801 10.3807 5.5293 9.5625C5.52044 9.54988 5.50981 9.53801 5.50195 9.52441L3.15234 5.45605ZM8 6.12598C6.96463 6.12617 6.125 6.96556 6.125 8.00098C6.12547 9.03598 6.96493 9.87578 8 9.87598C9.03506 9.87577 9.87453 9.03598 9.875 8.00098C9.875 6.96557 9.03535 6.12619 8 6.12598ZM8 2.52539C6.31501 2.52539 4.80792 3.28632 3.80371 4.4834L5.25488 6.99609C5.66472 5.87668 6.7363 5.07659 7.99707 5.0752H12.627C11.6566 3.54319 9.94787 2.52539 8 2.52539Z" fill="currentColor"/>`,
      })));
  }))();
}
function Lna() {
  return (Lna = t(() => {
    (Q(),
      (Ina = Z({
        name: `square-bolt-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.807983, y: 1.807861, width: 12.383789, height: 12.383789 },
          visualBounds: { x: 1.807983, y: 1.807861, width: 12.383789, height: 12.383789 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.807983, y: 1.807861, width: 12.383789, height: 12.383789 },
          center: { x: 7.999878, y: 7.999756 },
          insets: { top: 1.807861, right: 1.808228, bottom: 1.80835, left: 1.807983 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.999878, y: 7.999756 },
            foreground: { x: 7.999878, y: 7.999756 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M8.3783 4.45532C8.76263 3.99972 9.49973 4.37297 9.35974 4.95239L8.96423 6.58521H10.5834C11.0632 6.58567 11.3238 7.1466 11.015 7.51392L7.62146 11.5432C7.23711 11.9996 6.49943 11.626 6.64001 11.0461L7.0365 9.41431H5.41736C4.93699 9.41428 4.67531 8.85207 4.98474 8.48462L8.3783 4.45532Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.683 1.80786C13.0683 1.80786 14.1918 2.93134 14.1918 4.31665V11.6829C14.1918 13.0682 13.0683 14.1917 11.683 14.1917H4.31677C2.93146 14.1917 1.80798 13.0682 1.80798 11.6829V4.31665C1.80798 2.93134 2.93146 1.80786 4.31677 1.80786H11.683ZM4.31677 2.85864C3.51136 2.85864 2.85876 3.51124 2.85876 4.31665V11.6829C2.85876 12.4883 3.51136 13.1418 4.31677 13.1418H11.683C12.4884 13.1418 13.142 12.4883 13.142 11.6829V4.31665C13.142 3.51124 12.4884 2.85864 11.683 2.85864H4.31677Z" fill="currentColor"/>`,
      })));
  }))();
}
function I3n() {
  return (I3n = t(() => {
    (Q(),
      (F3n = Z({
        name: `book-open-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.801758, y: 0.806641, width: 12.373047, height: 13.717773 },
          visualBounds: { x: 1.801758, y: 0.806641, width: 12.373047, height: 13.717773 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.801758, y: 0.806641, width: 12.373047, height: 13.717773 },
          center: { x: 7.988281, y: 7.665528 },
          insets: { top: 0.806641, right: 1.825195, bottom: 1.475586, left: 1.801758 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.988281, y: 7.665528 },
            foreground: { x: 7.988281, y: 7.665528 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.1416 2.00887C4.14167 1.16457 5.03515 0.525156 5.84668 0.9327C7.02781 1.52463 8.05079 2.67372 8.42383 3.94247C9.88561 3.19991 11.0935 2.87944 12.9541 2.81942C13.6328 2.79759 14.1748 3.35207 14.1748 4.01083V11.9024C14.1745 12.5435 13.6619 13.0831 13.0078 13.0929C12.0094 13.1077 11.2434 13.2073 10.5264 13.4171C9.80783 13.6273 9.11365 13.9557 8.26562 14.4542C8.26339 14.4555 8.26006 14.4549 8.25781 14.4561C8.24956 14.4608 8.24192 14.4665 8.2334 14.4708C8.21558 14.4795 8.19733 14.4866 8.17871 14.4932C8.1719 14.4957 8.16507 14.4979 8.1582 14.5001C8.15359 14.5015 8.1492 14.5036 8.14453 14.505C8.12558 14.5103 8.10635 14.5135 8.08691 14.5167C8.07774 14.5182 8.06877 14.5205 8.05957 14.5216C8.05597 14.522 8.05245 14.5232 8.04883 14.5235C8.04531 14.5238 8.0416 14.5233 8.03809 14.5235C8.02539 14.5244 8.01276 14.5236 8 14.5235C7.98594 14.5235 7.97198 14.5247 7.95801 14.5235C7.95012 14.5229 7.94237 14.5216 7.93457 14.5206C7.92438 14.5193 7.91445 14.5167 7.9043 14.5147C7.90032 14.514 7.89653 14.5126 7.89258 14.5118C7.88217 14.5096 7.87158 14.5088 7.86133 14.5059C7.85205 14.5034 7.84307 14.5002 7.83398 14.4972C7.82598 14.4944 7.81846 14.4905 7.81055 14.4874C7.80862 14.4866 7.8066 14.4862 7.80469 14.4854C7.79206 14.4803 7.77882 14.4769 7.7666 14.4708C7.75558 14.4653 7.74594 14.4575 7.73535 14.4513C7.73362 14.4502 7.73121 14.4503 7.72949 14.4493C6.13454 13.4768 4.96188 13.1222 2.99512 13.0929C2.67371 13.0911 2.36955 12.9785 2.14355 12.754C1.91596 12.5278 1.80186 12.2224 1.80176 11.9024V4.01766C1.80176 3.69795 1.90447 3.38561 2.1377 3.15243C2.37068 2.91966 2.68135 2.81845 2.99609 2.81844C3.37407 2.81845 3.75593 2.84495 4.1416 2.89364V2.00887ZM12.9883 3.86922C11.1412 3.92877 10.0465 4.25484 8.52539 5.07821V13.1104C9.10497 12.8101 9.65465 12.578 10.2314 12.4093C11.0645 12.1655 11.9297 12.0589 12.9922 12.0431C13.0589 12.042 13.1237 11.9833 13.124 11.9024V4.01083C13.124 3.92435 13.0535 3.86719 12.9883 3.86922ZM2.99609 3.86922C2.94873 3.86922 2.91845 3.87592 2.90234 3.88192C2.88729 3.88756 2.88186 3.89362 2.87988 3.89559C2.87782 3.89768 2.87203 3.90345 2.86621 3.91903C2.8599 3.93596 2.85254 3.9675 2.85254 4.01766V11.9024C2.85263 11.9727 2.87473 11.9999 2.88379 12.0089C2.89279 12.0178 2.9234 12.0431 3.00293 12.0431H3.01074C4.59891 12.0667 5.75296 12.2948 6.95215 12.8409C6.49122 12.1607 5.78425 11.5906 4.93164 11.2774L4.93262 11.2765C4.7656 11.2192 4.54914 11.1233 4.38281 10.92C4.20481 10.7023 4.1416 10.4362 4.1416 10.1593V3.95028C3.75377 3.89546 3.3717 3.86923 2.99609 3.86922ZM5.37598 1.8702C5.34318 1.85373 5.30498 1.85359 5.2627 1.88094C5.21806 1.90998 5.19144 1.95702 5.19141 2.00887V10.1593C5.19141 10.2093 5.19866 10.2388 5.20215 10.254C5.21511 10.2608 5.23897 10.2733 5.28027 10.2872L5.29395 10.2921C6.15067 10.6068 6.90453 11.1387 7.47461 11.8009V4.46297C7.26253 3.43286 6.40775 2.38729 5.37598 1.8702Z" fill="currentColor"/>`,
      })));
  }))();
}
function Fna() {
  return (Fna = t(() => {
    (Q(),
      (Pna = Z({
        name: `lock-and-shield-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.014404, y: 1.250977, width: 13.970703, height: 14.116211 },
          visualBounds: { x: 1.014404, y: 1.250977, width: 13.970703, height: 14.116211 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.014404, y: 1.250977, width: 13.970703, height: 14.116211 },
          center: { x: 7.999756, y: 8.309083 },
          insets: { top: 1.250977, right: 1.014893, bottom: 0.632812, left: 1.014404 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.999756, y: 8.309083 },
            foreground: { x: 7.999756, y: 8.309083 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M10.3064 10.5771C10.9407 10.5773 11.4556 11.0921 11.4558 11.7265C11.4558 12.361 10.9409 12.8756 10.3064 12.8759C9.67179 12.8758 9.15698 12.3611 9.15698 11.7265C9.1572 11.092 9.67193 10.5771 10.3064 10.5771Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.97144 1.37979C5.36421 1.2081 5.81113 1.20798 6.20386 1.37979L9.23706 2.70694C9.79667 2.9518 10.158 3.50528 10.158 4.11612V4.97354C10.2071 4.97124 10.2566 4.97061 10.3064 4.97061C12.0301 4.97081 13.4275 6.36894 13.4275 8.09268V8.22354C14.3346 8.54658 14.985 9.41063 14.9851 10.4286V13.0253C14.9849 14.3186 13.9366 15.3667 12.6433 15.3671H7.96948C6.67592 15.3671 5.62688 14.3188 5.62671 13.0253V12.164C5.49578 12.1676 5.36451 12.1497 5.23999 12.1034C4.14352 11.7234 3.09119 11.1681 2.30835 10.3427C1.51099 9.50191 1.01451 8.4025 1.0144 6.99991V4.11612C1.0144 3.50517 1.37651 2.95174 1.93628 2.70694L4.97144 1.37979ZM7.96948 9.13663C7.25577 9.13665 6.67758 9.71492 6.67749 10.4286V13.0253C6.67766 13.7389 7.25582 14.3173 7.96948 14.3173H12.6433C13.3567 14.3169 13.9351 13.7387 13.9353 13.0253V10.4286C13.9352 9.71513 13.3567 9.13698 12.6433 9.13663H7.96948ZM5.78296 2.34171C5.65855 2.28728 5.51679 2.28742 5.39233 2.34171L2.35718 3.66886C2.17969 3.74648 2.06519 3.9224 2.06519 4.11612V6.99991C2.06529 8.12821 2.45485 8.97031 3.07104 9.62003C3.62059 10.1993 4.36674 10.6421 5.22144 10.9774L5.59448 11.1151L5.60034 11.1171C5.60894 11.1143 5.61807 11.1136 5.62671 11.1112V10.4286C5.62678 9.41065 6.27708 8.5466 7.18433 8.22354V8.09268C7.18433 6.79333 7.97872 5.67892 9.10815 5.20889V4.11612C9.10815 3.92243 8.99361 3.7465 8.81616 3.66886L5.78296 2.34171ZM10.3064 6.02139C9.16467 6.02139 8.23873 6.94497 8.23511 8.08585H12.3777C12.3741 6.94509 11.448 6.02159 10.3064 6.02139Z" fill="currentColor"/>`,
      })));
  }))();
}
function fer() {
  return (fer = t(() => {
    (Q(),
      (der = Z({
        name: `ladybug-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.691406, y: 0.817383, width: 12.617188, height: 14.314453 },
          visualBounds: { x: 1.691406, y: 0.817383, width: 12.617188, height: 14.314453 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.691406, y: 0.817383, width: 12.617188, height: 14.314453 },
          center: { x: 8, y: 7.97461 },
          insets: { top: 0.817383, right: 1.691406, bottom: 0.868164, left: 1.691406 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8, y: 7.97461 },
            foreground: { x: 8, y: 7.97461 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M6.33362 8.5C6.33362 9.05229 5.8859 9.5 5.33362 9.5C4.78133 9.5 4.33362 9.05229 4.33362 8.5C4.33362 7.94772 4.78133 7.5 5.33362 7.5C5.8859 7.5 6.33362 7.94772 6.33362 8.5Z" fill="currentColor"/> <path d="M11.6669 8.5C11.6669 9.05229 11.2192 9.5 10.6669 9.5C10.1146 9.5 9.66687 9.05229 9.66687 8.5C9.66687 7.94772 10.1146 7.5 10.6669 7.5C11.2192 7.5 11.6669 7.94772 11.6669 8.5Z" fill="currentColor"/> <path d="M9.91626 4.44043C9.91617 3.38255 9.05814 2.52539 8.00024 2.52539C6.94242 2.52548 6.08529 3.38261 6.08521 4.44043C6.08521 4.59746 6.10371 4.74953 6.13892 4.89453L5.11841 5.14258C5.06362 4.91701 5.03442 4.68165 5.03442 4.44043C5.03451 2.80271 6.36252 1.4747 8.00024 1.47461C9.63804 1.47461 10.966 2.80265 10.9661 4.44043C10.9661 4.68168 10.9369 4.91699 10.8821 5.14258L9.86157 4.89453C9.89679 4.74951 9.91626 4.59749 9.91626 4.44043Z" fill="currentColor"/> <path d="M13.2588 10C13.2586 7.54142 11.2157 5.45698 8.52539 5.21484V8.55176L11.0352 13.9248C12.3914 13.0464 13.2588 11.608 13.2588 10ZM2.74219 10C2.74219 11.6078 3.60886 13.0463 4.96484 13.9248L7.47559 8.5498V5.21484C4.78514 5.45688 2.74237 7.54135 2.74219 10ZM14.3086 10C14.3086 12.1636 13.0494 14.0347 11.208 15.0459C10.8504 15.2422 10.4179 15.0836 10.2539 14.7324L8 9.90625L5.74707 14.7324C5.58305 15.0836 5.15053 15.2422 4.79297 15.0459C2.95151 14.0347 1.69141 12.1637 1.69141 10C1.6916 6.72555 4.55702 4.14178 8 4.1416C11.4431 4.1416 14.3084 6.72544 14.3086 10Z" fill="currentColor"/> <path d="M10.2465 14.1289C9.5738 14.4786 8.80918 14.6758 8.00037 14.6758C7.19148 14.6758 6.42698 14.4786 5.75427 14.1289L6.23865 13.1973C6.7653 13.4711 7.36405 13.626 8.00037 13.626C8.63662 13.6259 9.23548 13.471 9.76208 13.1973L10.2465 14.1289Z" fill="currentColor"/> <path d="M6.13473 1.00115C5.94637 0.780707 5.61493 0.754199 5.39449 0.942553C5.1741 1.1309 5.14857 1.46236 5.33688 1.68279L6.01363 2.47576C6.20199 2.6962 6.53343 2.72173 6.75387 2.53337C6.97429 2.34502 7.00081 2.01357 6.81246 1.79314L6.13473 1.00115Z" fill="currentColor"/> <path d="M9.86613 1.00115C10.0545 0.780707 10.3859 0.754199 10.6064 0.942553C10.8268 1.1309 10.8523 1.46236 10.664 1.68279L9.98722 2.47576C9.79887 2.6962 9.46743 2.72173 9.24699 2.53337C9.02657 2.34502 9.00005 2.01357 9.18839 1.79314L9.86613 1.00115Z" fill="currentColor"/>`,
      })));
  }))();
}
function B4n() {
  return (B4n = t(() => {
    (Q(),
      (z4n = Z({
        name: `arrow-up-right-lg-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 3.475098, y: 3.474609, width: 9.050049, height: 9.055176 },
          visualBounds: { x: 3.475098, y: 3.474609, width: 9.050049, height: 9.055176 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.475098, y: 3.474609, width: 9.050049, height: 9.055176 },
          center: { x: 8.000123, y: 8.002197 },
          insets: { top: 3.474609, right: 3.474853, bottom: 3.470215, left: 3.475098 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.000123, y: 8.002197 },
            foreground: { x: 8.000123, y: 8.002197 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M11.9489 3.47949C12.0996 3.46465 12.2552 3.51279 12.3707 3.62793C12.4862 3.74328 12.5337 3.89898 12.5192 4.0498C12.5205 4.06633 12.525 4.08275 12.525 4.09961V10.667C12.5249 10.9565 12.2901 11.191 12.0006 11.1914C11.7108 11.1914 11.4754 10.9568 11.4752 10.667V5.2666L4.37172 12.376C4.16672 12.5807 3.83352 12.5808 3.62855 12.376C3.42373 12.1711 3.42384 11.8388 3.62855 11.6338L10.733 4.52539H5.33363C5.04368 4.52539 4.80824 4.28995 4.80824 4C4.80824 3.71005 5.04368 3.47461 5.33363 3.47461H11.9C11.9165 3.47462 11.9327 3.47822 11.9489 3.47949Z" fill="currentColor"/>`,
      })));
  }))();
}
function qBi() {
  return (qBi = t(() => {
    (Q(),
      (KBi = Z({
        name: `gift-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          visualBounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.474609, y: 1.474609, width: 13.050781, height: 13.050781 },
          center: { x: 8, y: 8 },
          insets: { top: 1.474609, right: 1.47461, bottom: 1.47461, left: 1.474609 },
          anchors: { frame: { x: 8, y: 8 }, ink: { x: 8, y: 8 }, foreground: { x: 8, y: 8 } },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M9.66699 1.47461C10.8773 1.47479 11.8584 2.45668 11.8584 3.66699C11.8583 4.08572 11.7389 4.47586 11.5352 4.80859H12.667C13.6931 4.80877 14.5252 5.64092 14.5254 6.66699V7.50098C14.525 7.94046 14.2474 8.31369 13.8584 8.45898V12C13.8584 13.3943 12.7282 14.5251 11.334 14.5254H4.66699C3.27247 14.5254 2.1416 13.3945 2.1416 12V8.45898C1.75264 8.31369 1.47495 7.94046 1.47461 7.50098V6.66699C1.47479 5.64092 2.30694 4.80877 3.33301 4.80859H4.46484C4.2609 4.47583 4.14166 4.08578 4.1416 3.66699C4.1416 2.45657 5.12356 1.47461 6.33398 1.47461C7.00132 1.47485 7.59816 1.77423 8 2.24512C8.40218 1.7741 8.99938 1.47461 9.66699 1.47461ZM3.19238 12C3.19238 12.8146 3.85237 13.4746 4.66699 13.4746H11.334C12.1483 13.4743 12.8086 12.8144 12.8086 12V8.52539H8.52539V13.333H7.47461V8.52539H3.19238V12ZM8.52539 7.47461H13.4746V6.66699C13.4744 6.22082 13.1132 5.85955 12.667 5.85938H8.52539V7.47461ZM3.33301 5.85938C2.88684 5.85955 2.52557 6.22082 2.52539 6.66699V7.47461H7.47461V5.85938H3.33301ZM6.33398 2.52539C5.70346 2.52539 5.19238 3.03647 5.19238 3.66699C5.19256 4.29737 5.70357 4.80859 6.33398 4.80859H7.47461V3.65723C7.46936 3.03147 6.96088 2.52583 6.33398 2.52539ZM9.66699 2.52539C9.03647 2.52539 8.52539 3.03647 8.52539 3.66699V4.80859H9.66699C10.2973 4.80842 10.8084 4.29726 10.8086 3.66699C10.8086 3.03658 10.2974 2.52557 9.66699 2.52539Z" fill="currentColor"/>`,
      })));
  }))();
}
jna();
Nna();
qar();
j3i();
Lna();
I3n();
Fna();
fer();
B4n();
qBi();
return {st:Ana,At:Mna,ut:Kar,lt:A3i,et:Ina,U:F3n,St:Pna,t:der,G:AssetIcon.fromPreset(z4n),u:KBi,E:z4n};})();
 const {st,At,ut,lt,et,U,St,t,G,u,E}=artwork;let ai,oi;
function ki(e) {
  let n = (0, ji.c)(34),
    {
      onOpenDocs: r,
      onOpenPrivacyCenter: i,
      onOpenWhatsNew: a,
      privacyCenterHref: o,
      showChromeExtensionSetup: s,
      showMobileSetup: c,
      showRemoteSetup: l,
    } = e,
    u = y(C),
    d = be(),
    f = ce(`3959961672`),
    p = pe(hr, `toggleDebugModal`),
    m;
  n[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, Z.jsx)(J, {
        id: `sidebarHelp.submenu`,
        defaultMessage: `Help`,
        description: `Profile submenu containing help, release notes, setup, and keyboard shortcuts`,
      })),
      (n[0] = m))
    : (m = n[0]);
  let h = m,
    g;
  n[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, Z.jsx)(Ct, { className: oi.icon, icon: { assets: { 16: st, 20: At } } })),
      (n[1] = g))
    : (g = n[1]);
  let _;
  n[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((_ = (0, Z.jsx)(Z.Fragment, {
        children: (0, Z.jsx)(gn, {
          name: `demo-tools`,
          children: (0, Z.jsxs)(Z.Fragment, {
            children: [(0, Z.jsx)(yi, {}), (0, Z.jsx)(q.Separator, {})],
          }),
        }),
      })),
      (n[2] = _))
    : (_ = n[2]);
  let v;
  n[3] === a ? (v = n[4]) : ((v = (0, Z.jsx)(wi, { onOpenWhatsNew: a })), (n[3] = a), (n[4] = v));
  let b;
  n[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (0, Z.jsx)(q.Separator, {})), (n[5] = b))
    : (b = n[5]);
  let x;
  n[6] !== d || n[7] !== c
    ? ((x = c
        ? (0, Z.jsx)(q.Item, {
            leftIconAsset: ut,
            onSelect: () => {
              d(`/codex-mobile`);
            },
            children: (0, Z.jsx)(J, {
              id: `sidebarHelp.setUpMobile`,
              defaultMessage: `Set up mobile`,
              description: `Menu item that opens Codex mobile setup`,
            }),
          })
        : null),
      (n[6] = d),
      (n[7] = c),
      (n[8] = x))
    : (x = n[8]);
  let S;
  n[9] !== d || n[10] !== s
    ? ((S = s
        ? (0, Z.jsx)(q.Item, {
            leftIconAsset: lt,
            onSelect: () => {
              d(`/settings/computer-use`);
            },
            children: (0, Z.jsx)(J, {
              id: `sidebarHelp.setUpChromeExtension`,
              defaultMessage: `Set up Chrome extension`,
              description: `Menu item that opens Chrome extension setup`,
            }),
          })
        : null),
      (n[9] = d),
      (n[10] = s),
      (n[11] = S))
    : (S = n[11]);
  let w;
  n[12] !== d || n[13] !== l
    ? ((w = l
        ? (0, Z.jsx)(q.Item, {
            leftIconAsset: ut,
            onSelect: () => {
              d(`/codex-mobile`);
            },
            children: (0, Z.jsx)(J, {
              id: `sidebarHelp.setUpRemote`,
              defaultMessage: `Set up remote`,
              description: `Menu item that opens remote setup`,
            }),
          })
        : null),
      (n[12] = d),
      (n[13] = l),
      (n[14] = w))
    : (w = n[14]);
  let T;
  n[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, Z.jsx)(q.Item, {
        leftIconAsset: et,
        onSelect: Ai,
        children: (0, Z.jsx)(J, {
          id: `sidebarHelp.keyboardShortcuts`,
          defaultMessage: `Keyboard shortcuts`,
          description: `Menu item that opens the active keyboard shortcuts dialog`,
        }),
      })),
      (n[15] = T))
    : (T = n[15]);
  let E;
  n[16] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = (0, Z.jsx)(J, {
        id: `sidebarHelp.help`,
        defaultMessage: `User guide`,
        description: `Menu item that opens the ChatGPT Learn quickstart and user documentation`,
      })),
      (n[16] = E))
    : (E = n[16]);
  let D;
  n[17] === r
    ? (D = n[18])
    : ((D = (0, Z.jsx)(q.Item, { leftIconAsset: U, onClick: r, children: E })),
      (n[17] = r),
      (n[18] = D));
  let O;
  n[19] !== i || n[20] !== o || n[21] !== f
    ? ((O = f
        ? (0, Z.jsx)(q.Item, {
            leftIconAsset: St,
            rightIcon: (0, Z.jsx)(dr, {
              className: `text-secondary opacity-50`,
              ExternalIcon: G,
              href: o,
              openTarget: `external-browser`,
            }),
            onClick: i,
            children: (0, Z.jsx)(J, {
              id: `sidebarHelp.privacyCenter`,
              defaultMessage: `Privacy center`,
              description: `Menu item that opens ChatGPT's Privacy center`,
            }),
          })
        : null),
      (n[19] = i),
      (n[20] = o),
      (n[21] = f),
      (n[22] = O))
    : (O = n[22]);
  let k;
  n[23] !== p || n[24] !== u
    ? ((k = Mi
        ? (0, Z.jsx)(q.Item, {
            keyboardShortcut: p,
            leftIconAsset: t,
            onSelect: () => {
              Wn(u);
            },
            children: (0, Z.jsx)(J, {
              id: `sidebarHelp.internalDebug`,
              defaultMessage: `Internal debug`,
              description: `Menu item that opens the internal debug menu`,
            }),
          })
        : null),
      (n[23] = p),
      (n[24] = u),
      (n[25] = k))
    : (k = n[25]);
  let A;
  return (
    n[26] !== D ||
    n[27] !== O ||
    n[28] !== k ||
    n[29] !== v ||
    n[30] !== x ||
    n[31] !== S ||
    n[32] !== w
      ? ((A = (0, Z.jsxs)(q.FlyoutSubmenuItem, {
          alignToParentBottom: !0,
          contentSurface: `opaque`,
          contentWidth: `menu`,
          label: h,
          leftIcon: g,
          children: [_, v, b, x, S, w, T, D, O, k],
        })),
        (n[26] = D),
        (n[27] = O),
        (n[28] = k),
        (n[29] = v),
        (n[30] = x),
        (n[31] = S),
        (n[32] = w),
        (n[33] = A))
      : (A = n[33]),
    A
  );
}
function Ai() {
  Zt(`showKeyboardShortcuts`, `sidebar_help_menu`);
}
function Pi() {
  let e = (0, Ri.c)(4),
    { authMethod: t } = ct(),
    n = Vr(),
    r = ce(`410065390`),
    { data: i, isLoading: a } = Qe(T.CODEX_MOBILE_SETUP_COMPLETED),
    o = t === `chatgpt` && n && !a,
    s = o && i === !1,
    c = o && i === !0,
    l;
  return (
    e[0] !== r || e[1] !== s || e[2] !== c
      ? ((l = (0, zi.jsx)(Fi, {
          showChromeExtensionSetup: r,
          showMobileSetup: s,
          showRemoteSetup: c,
        })),
        (e[0] = r),
        (e[1] = s),
        (e[2] = c),
        (e[3] = l))
      : (l = e[3]),
    l
  );
}
function si() {
  return (si = e(() => {
    ((ai = `_icon_1taxa_1`), (oi = { icon: ai }));
  }))();
}
function wi(e) {
  let t = (0, Ei.c)(53),
    { onOpenWhatsNew: r } = e,
    i = y(C),
    a = Je(),
    o = n(),
    { data: c } = s(Qt),
    l = c != null,
    d;
  t[0] !== a.locale || t[1] !== l
    ? ((d = yn({ isLocaleInfoLoaded: l, locale: a.locale })),
      (t[0] = a.locale),
      (t[1] = l),
      (t[2] = d))
    : (d = t[2]);
  let f = d,
    p;
  t[3] === f ? (p = t[4]) : ((p = { enabled: f }), (t[3] = f), (t[4] = p));
  let { data: m, isPending: h } = s(pn, p),
    g = s(Hn);
  if (!f) {
    let e;
    t[5] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((e = (0, X.jsx)(J, {
          id: `sidebarHelp.whatsNew`,
          defaultMessage: `What's new`,
          description: `Menu item that opens the Codex changelog`,
        })),
        (t[5] = e))
      : (e = t[5]);
    let n;
    return (
      t[6] === r
        ? (n = t[7])
        : ((n = (0, X.jsx)(q.Item, { leftIconAsset: u, onClick: r, children: e })),
          (t[6] = r),
          (t[7] = n)),
      n
    );
  }
  let _, v, b, x, S, w, T, D, O, k, A;
  if (t[8] !== m?.items || t[9] !== a || t[10] !== h || t[11] !== g || t[12] !== i || t[13] !== o) {
    let e = h ? Di.map(Ti) : m?.items.slice(0, 3);
    (t[25] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((S = (0, X.jsx)(q.SectionLabel, {
          children: (0, X.jsx)(J, {
            id: `sidebarHelp.whatsNew`,
            defaultMessage: `What's new`,
            description: `Menu item that opens the Codex changelog`,
          }),
        })),
        (t[25] = S))
      : (S = t[25]),
      (v = xt),
      (b = !1),
      (x = `popLayout`),
      (_ = Oe.div),
      (w = h ? `loading` : `loaded`),
      t[26] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((T = { opacity: 1 }),
          (D = { opacity: 0 }),
          (O = { opacity: 0 }),
          (t[26] = T),
          (t[27] = D),
          (t[28] = O))
        : ((T = t[26]), (D = t[27]), (O = t[28])));
    let n = o ? 0 : 150 / 1e3;
    (t[29] === n ? (k = t[30]) : ((k = { duration: n, ease: ke }), (t[29] = n), (t[30] = k)),
      (A = e?.map((e, t) => {
        let n = e == null ? null : qn(e.version),
          r = n != null && g != null && Sr(n, g),
          o =
            e == null
              ? null
              : `${Number(e.date.slice(-2))} ${a.formatDate(new Date(`${e.date}T00:00:00Z`), { month: `short`, timeZone: `UTC` })}`;
        return (0, X.jsxs)(
          fr,
          {
            className: `relative`,
            padding: `offset`,
            children: [
              (0, X.jsx)(`span`, {
                "aria-hidden": !0,
                className: `pointer-events-none absolute start-4 top-1/2 -bottom-1/2 my-2 -translate-x-1/2 border-s border-default rtl:translate-x-1/2`,
              }),
              (0, X.jsxs)(q.Item, {
                disabled: e == null,
                onSelect:
                  e == null
                    ? void 0
                    : () => {
                        tt(i, _n, { post: e });
                      },
                rightIcon:
                  e == null
                    ? (0, X.jsx)(`span`, {
                        className: `w-6 shrink-0`,
                        children: (0, X.jsx)(Sn, {
                          lines: 1,
                          maxWidth: 100,
                          minWidth: 100,
                          size: `sm`,
                        }),
                      })
                    : (0, X.jsx)(`time`, {
                        className: `shrink-0 text-xs text-codex-description tabular-nums`,
                        dateTime: e.date,
                        children: o,
                      }),
                tooltipOpenWhen: `trigger-overflows`,
                tooltipText: e?.title,
                children: [
                  (0, X.jsx)(q.ItemIcon, {
                    className: r ? `text-info` : `text-tertiary`,
                    size: `xs`,
                    children: (0, X.jsx)(`span`, {
                      className: r
                        ? `size-[7px] rounded-full bg-current`
                        : `size-[7px] rounded-full border-[1.33px] border-current`,
                    }),
                  }),
                  e == null
                    ? (0, X.jsx)(Sn, {
                        className: `h-lh justify-center`,
                        lines: 1,
                        maxWidth: Di[t],
                        minWidth: Di[t],
                        size: `sm`,
                      })
                    : e.title,
                ],
              }),
            ],
          },
          e?.id ?? `loading-${t}`,
        );
      })),
      (t[8] = m?.items),
      (t[9] = a),
      (t[10] = h),
      (t[11] = g),
      (t[12] = i),
      (t[13] = o),
      (t[14] = _),
      (t[15] = v),
      (t[16] = b),
      (t[17] = x),
      (t[18] = S),
      (t[19] = w),
      (t[20] = T),
      (t[21] = D),
      (t[22] = O),
      (t[23] = k),
      (t[24] = A));
  } else
    ((_ = t[14]),
      (v = t[15]),
      (b = t[16]),
      (x = t[17]),
      (S = t[18]),
      (w = t[19]),
      (T = t[20]),
      (D = t[21]),
      (O = t[22]),
      (k = t[23]),
      (A = t[24]));
  let j;
  t[31] !== _ ||
  t[32] !== w ||
  t[33] !== T ||
  t[34] !== D ||
  t[35] !== O ||
  t[36] !== k ||
  t[37] !== A
    ? ((j = (0, X.jsx)(_, { animate: T, exit: D, initial: O, transition: k, children: A }, w)),
      (t[31] = _),
      (t[32] = w),
      (t[33] = T),
      (t[34] = D),
      (t[35] = O),
      (t[36] = k),
      (t[37] = A),
      (t[38] = j))
    : (j = t[38]);
  let M;
  t[39] !== v || t[40] !== b || t[41] !== x || t[42] !== j
    ? ((M = (0, X.jsx)(v, { initial: b, mode: x, children: j })),
      (t[39] = v),
      (t[40] = b),
      (t[41] = x),
      (t[42] = j),
      (t[43] = M))
    : (M = t[43]);
  let N;
  t[44] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, X.jsx)(ot, { className: `text-secondary opacity-50`, asset: E })), (t[44] = N))
    : (N = t[44]);
  let ee, te;
  t[45] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ee = (0, X.jsx)(q.ItemIcon, {
        className: `text-tertiary`,
        size: `xs`,
        children: (0, X.jsx)(`span`, {
          className: `size-[7px] rounded-full border-[1.33px] border-current`,
        }),
      })),
      (te = (0, X.jsx)(J, {
        id: `sidebarHelp.fullChangelog`,
        defaultMessage: `Full changelog`,
        description: `Menu item that opens the complete Codex changelog`,
      })),
      (t[45] = ee),
      (t[46] = te))
    : ((ee = t[45]), (te = t[46]));
  let P;
  t[47] === r
    ? (P = t[48])
    : ((P = (0, X.jsx)(fr, {
        padding: `offset`,
        children: (0, X.jsxs)(q.Item, { onClick: r, rightIcon: N, children: [ee, te] }),
      })),
      (t[47] = r),
      (t[48] = P));
  let F;
  return (
    t[49] !== S || t[50] !== M || t[51] !== P
      ? ((F = (0, X.jsxs)(X.Fragment, { children: [S, M, P] })),
        (t[49] = S),
        (t[50] = M),
        (t[51] = P),
        (t[52] = F))
      : (F = t[52]),
    F
  );
}
function Ti() {
  return null;
}
 si();
 function ProfileHelpMenu({onOpenDocs,onOpenPrivacyCenter,onOpenWhatsNew,privacyCenterHref}){return h(LinksContext.Provider,{value:{onOpenDocs,onOpenPrivacyCenter,onOpenWhatsNew,privacyCenterHref}},h(Pi));}
 return {ProfileHelpMenu,HelpSubmenu:ki,WhatsNewItems:wi};
}
