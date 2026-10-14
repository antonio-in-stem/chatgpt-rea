// Original profile menu composition with explicit provider/help/pet boundaries.
import {classNames as It} from './classNames.js';
export function createProfileMenuLayout({React,menu,AssetIcon,ResponsiveIcon:Ct,HelpMenu:Pi,PetMenuItem:Gi,useProviderQuery,providerDisplayName:Y,parseProviderInfo,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuItem||!AssetIcon?.fromPreset||!Ct||!Pi||!Gi||!useProviderQuery||!Y||!parseProviderInfo||!compilerRuntime?.c)throw new TypeError('ProfileMenuLayout requires original menu/icons and provider/help/pet adapters');
 const h=React.createElement,Q={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},ui=Q,Ki=compilerRuntime,li=compilerRuntime;
 const H=menu.MenuItem,q={ItemIcon:menu.MenuItemIcon,Separator:menu.MenuSeparator},J=message=>formatMessage(message),oe='local',Jn='model-provider',pe=()=>useProviderQuery(),qi={safeParse:parseProviderInfo};
 const e=fn=>fn,t=fn=>fn,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 // Artwork initializer Q is the original no-op dependency; rename only the local binding via a nested scope.
 const artwork=(()=>{const Q=()=>{};let s6n,l6n,lrr,drr,l9n,d9n,xnr,Ona,p3n,h3n;
function c6n() {
  return (c6n = t(() => {
    (Q(),
      (s6n = Z({
        name: `building-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 0.807861, y: 2.141602, width: 14.383789, height: 11.716797 },
          visualBounds: { x: 0.807861, y: 2.141602, width: 14.383789, height: 11.716797 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 0.807861, y: 2.141602, width: 14.383789, height: 11.716797 },
          center: { x: 7.999756, y: 8 },
          insets: { top: 2.141602, right: 0.80835, bottom: 2.141601, left: 0.807861 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.999756, y: 8 },
            foreground: { x: 7.999756, y: 8 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M12.8079 6.66699C12.8079 6.22067 12.4465 5.85857 12.0002 5.8584H9.85864V12.8086H12.8079V6.66699ZM8.80786 4C8.80769 3.55383 8.44642 3.19256 8.00024 3.19238H4.00024C3.55392 3.19238 3.19183 3.55372 3.19165 4V12.8086H5.47485V11.334C5.47485 11.044 5.71029 10.8086 6.00024 10.8086C6.29004 10.8088 6.52466 11.0441 6.52466 11.334V12.8086H8.80786V4ZM9.85864 4.80859H12.0002C13.0264 4.80877 13.8586 5.64077 13.8586 6.66699V12.8086H14.6663C14.9562 12.8086 15.1917 13.044 15.1917 13.334C15.1915 13.6238 14.9561 13.8584 14.6663 13.8584H1.33325C1.04341 13.8584 0.808037 13.6238 0.807861 13.334C0.807861 13.044 1.0433 12.8086 1.33325 12.8086H2.14185V4C2.14202 2.97382 2.97402 2.1416 4.00024 2.1416H8.00024C9.02631 2.14178 9.85847 2.97393 9.85864 4V4.80859Z" fill="currentColor"/>`,
      })));
  }))();
}
function u6n() {
  return (u6n = t(() => {
    (Q(),
      (l6n = Z({
        name: `building-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 1.001709, y: 2.667969, width: 17.99707, height: 14.663086 },
          visualBounds: { x: 1.001709, y: 2.667969, width: 17.99707, height: 14.663086 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.001709, y: 2.667969, width: 17.99707, height: 14.663086 },
          center: { x: 10.000244, y: 9.999512 },
          insets: { top: 2.667969, right: 1.001221, bottom: 2.668945, left: 1.001709 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 10.000244, y: 9.999512 },
            foreground: { x: 10.000244, y: 9.999512 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M16.0017 8.33301C16.0017 7.7798 15.553 7.33105 14.9998 7.33105H12.3318V16.001H16.0017V8.33301ZM11.0017 5C11.0017 4.44679 10.553 3.99805 9.99976 3.99805H4.99976C4.4467 3.99822 3.99878 4.4469 3.99878 5V16.001H6.83472V14.166C6.83489 13.799 7.13274 13.5012 7.49976 13.501C7.86692 13.501 8.16462 13.7989 8.16479 14.166V16.001H11.0017V5ZM12.3318 6.00098H14.9998C16.2875 6.00098 17.3318 7.04526 17.3318 8.33301V16.001H18.3337C18.7008 16.0012 18.9986 16.299 18.9988 16.666C18.9988 17.0332 18.7009 17.3309 18.3337 17.3311H1.66675C1.29948 17.3311 1.00171 17.0333 1.00171 16.666C1.00188 16.2989 1.29959 16.001 1.66675 16.001H2.6687V5C2.6687 3.71236 3.71216 2.66814 4.99976 2.66797H9.99976C11.2875 2.66797 12.3318 3.71226 12.3318 5V6.00098Z" fill="currentColor"/>`,
      })));
  }))();
}
function urr() {
  return (urr = t(() => {
    (Q(),
      (lrr = Z({
        name: `person-circle-light-16`,
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
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4.1416C9.39452 4.1416 10.5254 5.27247 10.5254 6.66699C10.5251 8.06129 9.39436 9.19238 8 9.19238C6.60564 9.19238 5.47487 8.06129 5.47461 6.66699C5.47461 5.27247 6.60548 4.1416 8 4.1416ZM8 5.19238C7.18538 5.19238 6.52539 5.85237 6.52539 6.66699C6.52565 7.48139 7.18554 8.1416 8 8.1416C8.81446 8.1416 9.47435 7.48139 9.47461 6.66699C9.47461 5.85237 8.81462 5.19238 8 5.19238Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.47461C11.6037 1.47461 14.5254 4.39634 14.5254 8C14.5254 11.6037 11.6037 14.5254 8 14.5254C4.39634 14.5254 1.47461 11.6037 1.47461 8C1.47461 4.39634 4.39634 1.47461 8 1.47461ZM8 11.1924C6.82222 11.1925 5.78204 11.7791 5.15332 12.6768C5.98281 13.1827 6.95721 13.4746 8 13.4746C9.04297 13.4746 10.0171 13.1819 10.8467 12.6758C10.2178 11.7786 9.17734 11.1925 8 11.1924ZM8 2.52539C4.97624 2.52539 2.52539 4.97624 2.52539 8C2.52539 9.60307 3.21462 11.0447 4.3125 12.0459C5.13249 10.8944 6.47756 10.1417 8 10.1416C9.52227 10.1417 10.8667 10.8946 11.6865 12.0459C12.7847 11.0447 13.4746 9.60333 13.4746 8C13.4746 4.97624 11.0238 2.52539 8 2.52539Z" fill="currentColor"/>`,
      })));
  }))();
}
function frr() {
  return (frr = t(() => {
    (Q(),
      (drr = Z({
        name: `person-circle-light-20`,
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
          shape: `circular`,
          bounds: { x: 1.834961, y: 1.834961, width: 16.330078, height: 16.330078 },
          center: { x: 10, y: 10 },
          insets: { top: 1.834961, right: 1.834961, bottom: 1.834961, left: 1.834961 },
          anchors: { frame: { x: 10, y: 10 }, ink: { x: 10, y: 10 }, foreground: { x: 10, y: 10 } },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.16895C11.748 5.16895 13.165 6.586 13.165 8.33398C13.1648 10.0817 11.7478 11.499 10 11.499C8.25218 11.499 6.83522 10.0817 6.83496 8.33398C6.83496 6.586 8.25202 5.16895 10 5.16895ZM10 6.49902C8.98656 6.49902 8.16504 7.32054 8.16504 8.33398C8.1653 9.3472 8.98672 10.1689 10 10.1689C11.0133 10.1689 11.8347 9.3472 11.835 8.33398C11.835 7.32054 11.0134 6.49902 10 6.49902Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.83496C14.5094 1.83496 18.165 5.49059 18.165 10C18.165 14.5094 14.5094 18.165 10 18.165C5.49059 18.165 1.83496 14.5094 1.83496 10C1.83496 5.4906 5.4906 1.83496 10 1.83496ZM10 13.999C8.53381 13.9991 7.23801 14.7278 6.45312 15.8438C7.48714 16.4727 8.70125 16.835 10 16.835C11.2984 16.835 12.512 16.4724 13.5459 15.8438C12.7609 14.7282 11.4659 13.9991 10 13.999ZM10 3.16504C6.22513 3.16504 3.16504 6.22513 3.16504 10C3.16504 11.998 4.02285 13.7952 5.38965 15.0449C6.41662 13.6079 8.09755 12.669 10 12.6689C11.9026 12.669 13.5826 13.6087 14.6094 15.0459C15.9768 13.7961 16.835 11.9985 16.835 10C16.835 6.22513 13.7749 3.16504 10 3.16504Z" fill="currentColor"/>`,
      })));
  }))();
}
function u9n() {
  return (u9n = t(() => {
    (Q(),
      (l9n = Z({
        name: `gear-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
          visualBounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
          center: { x: 8.000397, y: 7.999512 },
          insets: { top: 1.240234, right: 1.691101, bottom: 1.241211, left: 1.691895 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.000397, y: 7.999512 },
            foreground: { x: 8.000397, y: 7.999512 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00062 5.27979C9.50689 5.27979 10.7289 6.50112 10.7291 8.00733C10.7289 9.51359 9.50693 10.7358 8.00062 10.7358C6.49463 10.7355 5.27328 9.51337 5.27308 8.00733C5.27335 6.50135 6.49467 5.28016 8.00062 5.27979ZM8.00062 6.33057C7.07457 6.33094 6.32413 7.08125 6.32386 8.00733C6.32406 8.93347 7.07453 9.6847 8.00062 9.68506C8.92703 9.68506 9.67816 8.9337 9.67836 8.00733C9.67809 7.08102 8.92699 6.33057 8.00062 6.33057Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59633 1.24073C9.07592 1.2409 9.51987 1.49692 9.75941 1.91358C9.97218 2.28401 10.2906 2.83827 10.5465 3.28272C10.5982 3.37225 10.694 3.42724 10.7985 3.42725L12.3795 3.42823C12.8587 3.42842 13.3021 3.68417 13.5416 4.09913L14.1295 5.11768C14.3672 5.52975 14.3684 6.03702 14.1334 6.45069L13.2536 8.00147L14.1334 9.54835C14.3685 9.96221 14.3675 10.4711 14.1295 10.8833L13.5416 11.9019C13.302 12.3167 12.8586 12.5726 12.3795 12.5728L10.7975 12.5718C10.6934 12.572 10.5981 12.6281 10.5465 12.7173C10.2906 13.1618 9.97118 13.716 9.75844 14.0864C9.51881 14.5032 9.07511 14.7593 8.59535 14.7593C8.17471 14.7593 7.8383 14.7583 7.40492 14.7583C6.92515 14.7583 6.48146 14.5032 6.24183 14.0864C6.02905 13.716 5.70972 13.1619 5.45375 12.7173C5.40213 12.6278 5.3062 12.5718 5.20179 12.5718H3.62172C3.14243 12.5718 2.69927 12.3159 2.45961 11.9009L1.87172 10.8823C1.63401 10.4703 1.63199 9.963 1.86683 9.54932L2.74769 7.99952L1.86683 6.45069C1.63181 6.03685 1.63375 5.52887 1.87172 5.1167L2.45961 4.09913C2.69922 3.68437 3.14176 3.42844 3.62074 3.42823H5.20179C5.30622 3.42823 5.4021 3.37221 5.45375 3.28272C5.70967 2.83823 6.0281 2.28399 6.24086 1.91358C6.48037 1.49684 6.92432 1.24093 7.40394 1.24073C7.83772 1.24072 8.1753 1.24072 8.59633 1.24073ZM7.40492 2.29053C7.2999 2.29053 7.20281 2.34685 7.15101 2.43702C6.93819 2.80754 6.62008 3.36219 6.3639 3.80713C6.12441 4.2228 5.6814 4.47781 5.20277 4.47803H3.62172C3.51764 4.47803 3.42093 4.53349 3.36879 4.62354L2.7809 5.6421C2.72924 5.7316 2.72899 5.84223 2.77992 5.93213L3.80629 7.73975C3.84008 7.79927 3.86295 7.86466 3.87172 7.93213L3.87562 7.99952C3.87565 8.06812 3.86231 8.13662 3.83656 8.19971L3.80629 8.26026L2.77894 10.0679C2.72805 10.1578 2.72924 10.2684 2.7809 10.3579L3.36879 11.3765C3.42092 11.4666 3.51761 11.522 3.62172 11.522H5.20179C5.68071 11.522 6.12432 11.777 6.3639 12.1929C6.62013 12.6379 6.93914 13.1924 7.15199 13.563C7.20372 13.6529 7.29923 13.7093 7.40394 13.7095C7.83771 13.7095 8.17531 13.7085 8.59633 13.7085C8.70115 13.7083 8.79754 13.653 8.84926 13.563C9.06202 13.1926 9.38023 12.6387 9.63636 12.1939C9.87592 11.7778 10.3195 11.522 10.7985 11.522H12.3795C12.4834 11.5218 12.5794 11.4663 12.6315 11.3765L13.2194 10.3579C13.271 10.2684 13.2714 10.1578 13.2203 10.0679L12.193 8.26026C12.1481 8.18098 12.1256 8.0906 12.1256 7.99952C12.1257 7.90839 12.149 7.818 12.194 7.73878L13.2203 5.93213C13.2712 5.84235 13.2708 5.73252 13.2194 5.64307L12.6315 4.62452C12.5794 4.53428 12.4828 4.47803 12.3786 4.47803L10.7985 4.47901C10.3197 4.47901 9.87697 4.22287 9.63734 3.80713C9.38106 3.36201 9.0621 2.80661 8.84926 2.43604C8.79741 2.34609 8.70021 2.29053 8.59535 2.29053C8.17471 2.29053 7.8383 2.29053 7.40492 2.29053Z" fill="currentColor"/>`,
      })));
  }))();
}
function f9n() {
  return (f9n = t(() => {
    (Q(),
      (d9n = Z({
        name: `gear-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
          visualBounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
          center: { x: 9.999916, y: 9.999512 },
          insets: { top: 1.489258, right: 2.057785, bottom: 1.490234, left: 2.057617 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 9.999916, y: 9.999512 },
            foreground: { x: 9.999916, y: 9.999512 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.58741C11.8866 6.58741 13.4167 8.11684 13.4169 10.0034C13.4169 11.8902 11.8867 13.4204 9.99994 13.4204C8.11346 13.4201 6.58392 11.89 6.58392 10.0034C6.58415 8.11706 8.1136 6.58776 9.99994 6.58741ZM9.99994 7.91749C8.84814 7.91784 7.91423 8.8516 7.914 10.0034C7.914 11.1554 8.84799 12.09 9.99994 12.0903C11.1522 12.0903 12.0869 11.1557 12.0869 10.0034C12.0866 8.85138 11.152 7.91749 9.99994 7.91749Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.746 1.48975C11.3535 1.48978 11.9164 1.81358 12.2197 2.34132C12.487 2.80674 12.8848 3.50127 13.206 4.05909C13.2711 4.17222 13.3924 4.24261 13.5244 4.24268H15.5068C16.1135 4.24268 16.6751 4.56591 16.9785 5.09132L17.7148 6.36768C18.0159 6.88943 18.0182 7.53236 17.7206 8.05616L16.6161 10.0005L17.7206 11.9448C18.018 12.4685 18.0158 13.1107 17.7148 13.6323L16.9785 14.9087C16.6751 15.4341 16.1135 15.7583 15.5068 15.7583H13.5244C13.3924 15.7584 13.2712 15.8278 13.206 15.9409C12.8848 16.4988 12.486 17.1932 12.2187 17.6587C11.9154 18.1864 11.3534 18.5103 10.746 18.5103C10.2189 18.5103 9.79593 18.5103 9.25287 18.5103C8.64561 18.51 8.0843 18.1854 7.78119 17.6577C7.51383 17.1922 7.11402 16.4987 6.79291 15.9409C6.72766 15.828 6.60731 15.7583 6.47552 15.7583H4.4931C3.88642 15.7583 3.32478 15.4341 3.02142 14.9087L2.28509 13.6333C1.9839 13.1116 1.98183 12.4687 2.27923 11.9448L3.3847 10.0005L2.27923 8.05616C1.98165 7.53232 1.98392 6.88946 2.28509 6.36768L3.0224 5.09132C3.32583 4.5661 3.88651 4.24171 4.4931 4.24171L6.47552 4.24268C6.60747 4.24265 6.72872 4.17225 6.79388 4.05909C7.11509 3.5012 7.51385 2.80675 7.78119 2.34132C8.08449 1.81366 8.64649 1.48976 9.25384 1.48975C9.79678 1.48974 10.219 1.48974 10.746 1.48975ZM9.25384 2.81983C9.12132 2.81992 8.9989 2.89059 8.93353 3.0044C8.66615 3.46991 8.2677 4.1648 7.94623 4.72315C7.64294 5.24954 7.08168 5.57273 6.47552 5.57276H4.4931C4.3616 5.57276 4.23959 5.64253 4.17376 5.75635L3.43744 7.03272C3.3722 7.1458 3.37108 7.28539 3.43548 7.39893L4.7265 9.66944C4.76927 9.74474 4.7964 9.82825 4.80755 9.91358L4.81341 10.0005C4.81335 10.116 4.78355 10.2301 4.7265 10.3306L3.43548 12.6021C3.3712 12.7156 3.37219 12.8553 3.43744 12.9683L4.17376 14.2437C4.23959 14.3575 4.3616 14.4282 4.4931 14.4282H6.47552C7.0818 14.4283 7.643 14.7512 7.94623 15.2778C8.26778 15.8363 8.66715 16.5311 8.93451 16.9966C8.99997 17.1101 9.12148 17.1811 9.25384 17.1812C9.79674 17.1812 10.219 17.1812 10.746 17.1812C10.8785 17.1812 11.0009 17.1104 11.0663 16.9966C11.3337 16.5311 11.7321 15.8363 12.0536 15.2778C12.3569 14.7512 12.918 14.4283 13.5244 14.4282H15.5068C15.6381 14.4282 15.7603 14.3573 15.8261 14.2437L16.5624 12.9683C16.6278 12.8551 16.6289 12.7147 16.5644 12.6011L15.2734 10.3306C15.2163 10.2301 15.1865 10.116 15.1865 10.0005C15.1865 9.88497 15.2164 9.77089 15.2734 9.67042L16.5644 7.39893C16.6288 7.28546 16.6285 7.14576 16.5634 7.03272L15.8261 5.75635C15.7603 5.64258 15.6382 5.57279 15.5068 5.57276H13.5244C12.9182 5.57274 12.3569 5.2496 12.0536 4.72315C11.7322 4.16477 11.3337 3.46992 11.0663 3.0044C11.001 2.89069 10.8794 2.82006 10.747 2.81983C10.2199 2.81982 9.7968 2.81982 9.25384 2.81983Z" fill="currentColor"/>`,
      })));
  }))();
}
function Snr() {
  return (Snr = t(() => {
    (Q(),
      (xnr = Z({
        name: `open-base-arrow-forward-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 2.141602, y: 2.142578, width: 11.578125, height: 11.716797 },
          visualBounds: { x: 2.141602, y: 2.142578, width: 11.578125, height: 11.716797 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.141602, y: 2.142578, width: 11.578125, height: 11.716797 },
          center: { x: 7.930665, y: 8.000977 },
          insets: { top: 2.142578, right: 2.280273, bottom: 2.140625, left: 2.141602 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.930665, y: 8.000977 },
            foreground: { x: 7.930665, y: 8.000977 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M7.33301 2.14258C7.62296 2.14258 7.8584 2.37802 7.8584 2.66797C7.8584 2.95792 7.62296 3.19336 7.33301 3.19336H4.7998C3.91155 3.19336 3.19141 3.9135 3.19141 4.80176V11.2012C3.19141 12.0894 3.91155 12.8096 4.7998 12.8096H7.33301C7.62296 12.8096 7.8584 13.045 7.8584 13.335C7.85822 13.6248 7.62285 13.8594 7.33301 13.8594H4.7998C3.33165 13.8594 2.1416 12.6693 2.1416 11.2012V4.80176C2.1416 3.3336 3.33165 2.14258 4.7998 2.14258H7.33301Z" fill="currentColor"/> <path d="M10.1289 4.7959C10.3339 4.59129 10.6662 4.59116 10.8711 4.7959L13.4688 7.39355L13.5273 7.45898C13.7838 7.77356 13.7837 8.22741 13.5273 8.54199L13.4688 8.60742L10.8711 11.2051C10.6662 11.41 10.334 11.4098 10.1289 11.2051C9.92405 11 9.92394 10.6679 10.1289 10.4629L12.0664 8.52539H6.5C6.21005 8.52539 5.97461 8.28995 5.97461 8C5.97461 7.71005 6.21005 7.47461 6.5 7.47461H12.0664L10.1289 5.53809C9.92405 5.33305 9.92394 5.00087 10.1289 4.7959Z" fill="currentColor"/>`,
      })));
  }))();
}
function kna() {
  return (kna = t(() => {
    (Q(),
      (Ona = Z({
        name: `open-base-arrow-forward-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 2.668945, y: 2.668945, width: 14.490479, height: 14.663086 },
          visualBounds: { x: 2.668945, y: 2.668945, width: 14.490479, height: 14.663086 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.668945, y: 2.668945, width: 14.490479, height: 14.663086 },
          center: { x: 9.914185, y: 10.000488 },
          insets: { top: 2.668945, right: 2.840576, bottom: 2.667969, left: 2.668945 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 9.914185, y: 10.000488 },
            foreground: { x: 9.914185, y: 10.000488 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M9.16699 2.66895C9.53426 2.66895 9.83203 2.96672 9.83203 3.33398C9.83203 3.70125 9.53426 3.99902 9.16699 3.99902H5.80078C4.80575 3.99902 3.99902 4.80575 3.99902 5.80078V14.2002C3.99902 15.1952 4.80575 16.002 5.80078 16.002H9.16699C9.53415 16.002 9.83186 16.2999 9.83203 16.667C9.83203 17.0343 9.53426 17.332 9.16699 17.332H5.80078C4.07121 17.332 2.66895 15.9298 2.66895 14.2002V5.80078C2.66895 4.07121 4.07121 2.66895 5.80078 2.66895H9.16699Z" fill="currentColor"/> <path d="M12.6553 5.98828C12.915 5.72919 13.3362 5.72893 13.5957 5.98828L16.8428 9.23535L16.917 9.31836C17.2401 9.71481 17.2402 10.2872 16.917 10.6836L16.8428 10.7656L13.5957 14.0127C13.3361 14.2723 12.915 14.2722 12.6553 14.0127C12.3956 13.753 12.3956 13.332 12.6553 13.0723L15.0605 10.667H8.125C7.75773 10.667 7.45996 10.3692 7.45996 10.002C7.45996 9.63468 7.75773 9.33691 8.125 9.33691H15.0645L12.6553 6.92969C12.3956 6.66999 12.3956 6.24798 12.6553 5.98828Z" fill="currentColor"/>`,
      })));
  }))();
}
function m3n() {
  return (m3n = t(() => {
    (Q(),
      (p3n = Z({
        name: `bar-chart-light-16`,
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
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8.99707 1.47461C9.8393 1.47461 10.5225 2.15777 10.5225 3V4.45703H13C13.8422 4.45703 14.5254 5.14019 14.5254 5.98242V12.6494C14.5252 13.6755 13.6931 14.5076 12.667 14.5078H10.125C10.0839 14.5181 10.0413 14.5254 9.99707 14.5254C9.95279 14.5254 9.91023 14.5181 9.86914 14.5078H6.125C6.08391 14.5181 6.04135 14.5254 5.99707 14.5254C5.95279 14.5254 5.91023 14.5181 5.86914 14.5078H3.33301C2.30694 14.5076 1.47479 13.6755 1.47461 12.6494V8.98242C1.47461 8.14019 2.15777 7.45703 3 7.45703H5.47168V3C5.47168 2.15777 6.15484 1.47461 6.99707 1.47461H8.99707ZM10.5225 13.457H12.667C13.1132 13.4569 13.4744 13.0956 13.4746 12.6494V5.98242C13.4746 5.72009 13.2623 5.50781 13 5.50781H10.5225V13.457ZM6.99707 2.52539C6.73474 2.52539 6.52246 2.73766 6.52246 3V13.457H9.47168V3C9.47168 2.73766 9.25941 2.52539 8.99707 2.52539H6.99707ZM3 8.50781C2.73766 8.50781 2.52539 8.72009 2.52539 8.98242V12.6494C2.52557 13.0956 2.88684 13.4569 3.33301 13.457H5.47168V8.50781H3Z" fill="currentColor"/>`,
      })));
  }))();
}
function g3n() {
  return (g3n = t(() => {
    (Q(),
      (h3n = Z({
        name: `bar-chart-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 1.834961, y: 1.835938, width: 16.330078, height: 16.330078 },
          visualBounds: { x: 1.834961, y: 1.835938, width: 16.330078, height: 16.330078 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.834961, y: 1.835938, width: 16.330078, height: 16.330078 },
          center: { x: 10, y: 10.000977 },
          insets: { top: 1.835938, right: 1.834961, bottom: 1.833984, left: 1.834961 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 10, y: 10.000977 },
            foreground: { x: 10, y: 10.000977 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2471 1.83594C12.3047 1.83594 13.1621 2.69335 13.1621 3.75098V5.56445H16.25C17.3076 5.56445 18.165 6.42187 18.165 7.47949V15.8125C18.165 17.1002 17.1208 18.1445 15.833 18.1445H12.6562C12.6051 18.1571 12.5521 18.166 12.4971 18.166C12.442 18.166 12.3891 18.1571 12.3379 18.1445H7.65625C7.60509 18.1571 7.55213 18.166 7.49707 18.166C7.44201 18.166 7.38905 18.1571 7.33789 18.1445H4.16699C2.87925 18.1445 1.83496 17.1002 1.83496 15.8125V11.2295C1.83496 10.1719 2.69238 9.31445 3.75 9.31445H6.83203V3.75098C6.83203 2.69335 7.68945 1.83594 8.74707 1.83594H11.2471ZM13.1621 16.8145H15.833C16.3862 16.8145 16.835 16.3657 16.835 15.8125V7.47949C16.835 7.15641 16.5731 6.89453 16.25 6.89453H13.1621V16.8145ZM8.74707 3.16602C8.42398 3.16602 8.16211 3.42789 8.16211 3.75098V16.8145H11.832V3.75098C11.832 3.42789 11.5702 3.16602 11.2471 3.16602H8.74707ZM3.75 10.6445C3.42691 10.6445 3.16504 10.9064 3.16504 11.2295V15.8125C3.16504 16.3657 3.61379 16.8145 4.16699 16.8145H6.83203V10.6445H3.75Z" fill="currentColor"/>`,
      })));
  }))();
}
c6n();
u6n();
urr();
frr();
u9n();
f9n();
Snr();
kna();
m3n();
g3n();
return {mt:AssetIcon.fromPreset(s6n),Ze:AssetIcon.fromPreset(l6n),Bt:AssetIcon.fromPreset(lrr),xe:AssetIcon.fromPreset(drr),le:l9n,te:d9n,Mt:xnr,We:Ona,x:AssetIcon.fromPreset(p3n),k:AssetIcon.fromPreset(h3n)};})();
 const {mt,Ze,Bt,xe,le,te,Mt,We,x,k}=artwork;
 let ai,oi;
function Wi(e) {
  let t = (0, Ki.c)(71),
    {
      accountIcon: n,
      accountSwitcher: r,
      additionalItems: i,
      displayName: a,
      hasWorkspaceAccount: o,
      identityItems: s,
      isOverlayOpen: c,
      onCopyUserId: l,
      onLogOut: u,
      onOpenChatGptAnalytics: d,
      onOpenProfile: f,
      onOpenSettings: p,
      onOpenWorkspaceSettings: m,
      onTogglePet: h,
      personalPlanLabel: g,
      petShortcut: _,
      settingsShortcut: v,
      usageItems: y,
    } = e,
    b;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = { hostId: oe }), (t[0] = b))
    : (b = t[0]);
  let { data: x } = pe(Jn, b),
    S;
  t[1] === x
    ? (S = t[2])
    : ((S = x?.model_provider === `openai` ? null : Y(x)), (t[1] = x), (t[2] = S));
  let C = S,
    w = a ?? C,
    T;
  t[3] === x ? (T = t[4]) : ((T = qi.safeParse(x)), (t[3] = x), (t[4] = T));
  let E = T,
    D = E.success ? E.data.model_providers[E.data.model_provider]?.aws?.region : null,
    O = r != null || w != null || s != null || o,
    k = null;
  if (a != null && C != null) {
    let e;
    t[5] === C
      ? (e = t[6])
      : ((e = (0, Q.jsx)(`span`, { className: `block`, children: C })), (t[5] = C), (t[6] = e));
    let n;
    (t[7] !== g || t[8] !== e
      ? ((n = (0, Q.jsxs)(Q.Fragment, { children: [g, e] })), (t[7] = g), (t[8] = e), (t[9] = n))
      : (n = t[9]),
      (k = n));
  } else if (g != null) {
    let e;
    (t[10] === g
      ? (e = t[11])
      : ((e = (0, Q.jsx)(Q.Fragment, { children: g })), (t[10] = g), (t[11] = e)),
      (k = e));
  }
  if (D != null) {
    let e;
    t[12] === D
      ? (e = t[13])
      : ((e = (0, Q.jsx)(`span`, { className: `block`, children: D })), (t[12] = D), (t[13] = e));
    let n;
    (t[14] !== k || t[15] !== e
      ? ((n = (0, Q.jsxs)(Q.Fragment, { children: [k, e] })), (t[14] = k), (t[15] = e), (t[16] = n))
      : (n = t[16]),
      (k = n));
  }
  let A;
  t[17] !== o || t[18] !== m
    ? ((A = o
        ? (0, Q.jsx)(H, {
            className: m == null ? `opacity-100` : void 0,
            disabled: m == null,
            leftIcon: (0, Q.jsx)(Ct, { className: oi.icon, icon: { 16: mt, 20: Ze } }),
            onClick: m,
            children: (0, Q.jsx)(J, {
              id: `codex.profileDropdown.workspaceSettings`,
              defaultMessage: `Workspace settings`,
              description: `Menu item to open ChatGPT workspace settings`,
            }),
          })
        : null),
      (t[17] = o),
      (t[18] = m),
      (t[19] = A))
    : (A = t[19]);
  let j = A,
    M;
  t[20] !== r || t[21] !== C
    ? ((M = r != null && C != null ? (0, Q.jsx)(H, { variant: `label`, children: C }) : null),
      (t[20] = r),
      (t[21] = C),
      (t[22] = M))
    : (M = t[22]);
  let N;
  t[23] !== n ||
  t[24] !== r ||
  t[25] !== C ||
  t[26] !== l ||
  t[27] !== f ||
  t[28] !== w ||
  t[29] !== k
    ? ((N =
        r != null || w == null
          ? null
          : (0, Q.jsxs)(H, {
              className: f == null ? `opacity-100` : void 0,
              disabled: f == null && l == null,
              subTextAllowWrap: C != null,
              onClick:
                l == null
                  ? void 0
                  : (e) => {
                      e.altKey && (e.preventDefault(), l());
                    },
              onSelect: (e) => {
                if (f != null) {
                  f();
                  return;
                }
                e.preventDefault();
              },
              SubText: k,
              children: [n == null ? null : (0, Q.jsx)(q.ItemIcon, { size: `sm`, children: n }), w],
            })),
      (t[23] = n),
      (t[24] = r),
      (t[25] = C),
      (t[26] = l),
      (t[27] = f),
      (t[28] = w),
      (t[29] = k),
      (t[30] = N))
    : (N = t[30]);
  let ee;
  t[31] === O
    ? (ee = t[32])
    : ((ee = O ? (0, Q.jsx)(q.Separator, {}) : null), (t[31] = O), (t[32] = ee));
  let P;
  t[33] === d
    ? (P = t[34])
    : ((P = d == null ? null : (0, Q.jsx)(ci, { onClick: d })), (t[33] = d), (t[34] = P));
  let F;
  t[35] !== P || t[36] !== j
    ? ((F = (0, Q.jsxs)(Q.Fragment, { children: [j, P] })), (t[35] = P), (t[36] = j), (t[37] = F))
    : (F = t[37]);
  let I;
  t[38] !== c || t[39] !== h || t[40] !== _
    ? ((I =
        h == null ? null : (0, Q.jsx)(Gi, { isOverlayOpen: c, onTogglePet: h, petShortcut: _ })),
      (t[38] = c),
      (t[39] = h),
      (t[40] = _),
      (t[41] = I))
    : (I = t[41]);
  let ne;
  t[42] === Symbol.for(`react.memo_cache_sentinel`) ? ((ne = !1), (t[42] = ne)) : (ne = t[42]);
  let L;
  t[43] === I
    ? (L = t[44])
    : ((L = (0, Q.jsxs)(Q.Fragment, { children: [I, ne] })), (t[43] = I), (t[44] = L));
  let R;
  t[45] !== r || t[46] !== l || t[47] !== f
    ? ((R =
        r == null || f == null
          ? null
          : (0, Q.jsx)(H, {
              leftIcon: (0, Q.jsx)(Ct, { className: oi.icon, icon: { 16: Bt, 20: xe } }),
              onClick: (e) => {
                if (e.altKey && l != null) {
                  (e.preventDefault(), l());
                  return;
                }
                f();
              },
              children: (0, Q.jsx)(J, {
                id: `codex.profileDropdown.profile`,
                defaultMessage: `Profile`,
                description: `Menu item to open the profile page`,
              }),
            })),
      (t[45] = r),
      (t[46] = l),
      (t[47] = f),
      (t[48] = R))
    : (R = t[48]);
  let re;
  t[49] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = (0, Q.jsx)(Ct, {
        className: It(`shrink-0`, oi.icon),
        icon: { assets: { 16: le, 20: te }, ariaHidden: !1 },
      })),
      (t[49] = re))
    : (re = t[49]);
  let ie;
  t[50] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ie = (0, Q.jsx)(J, {
        id: `codex.profileDropdown.settingsPage`,
        defaultMessage: `Settings`,
        description: `Menu item to open Codex settings page`,
      })),
      (t[50] = ie))
    : (ie = t[50]);
  let z;
  t[51] !== p || t[52] !== v
    ? ((z = (0, Q.jsx)(H, { leftIcon: re, keyboardShortcut: v, onClick: p, children: ie })),
      (t[51] = p),
      (t[52] = v),
      (t[53] = z))
    : (z = t[53]);
  let ae;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ae = (0, Q.jsx)(q.Separator, {})), (t[54] = ae))
    : (ae = t[54]);
  let B;
  t[55] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((B = (0, Q.jsxs)(Q.Fragment, {
        children: [ae, null, (0, Q.jsx)(Q.Fragment, { children: (0, Q.jsx)(Pi, {}) })],
      })),
      (t[55] = B))
    : (B = t[55]);
  let se;
  t[56] === u
    ? (se = t[57])
    : ((se =
        u == null
          ? null
          : (0, Q.jsx)(H, {
              leftIcon: (0, Q.jsx)(Ct, {
                className: It(`shrink-0`, oi.icon),
                icon: { assets: { 16: Mt, 20: We }, ariaHidden: !1 },
              }),
              onClick: u,
              children: (0, Q.jsx)(J, {
                id: `codex.profileDropdown.logOut`,
                defaultMessage: `Log out`,
                description: `Menu item to log out of ChatGPT`,
              }),
            })),
      (t[56] = u),
      (t[57] = se));
  let ce;
  return (
    t[58] !== r ||
    t[59] !== i ||
    t[60] !== s ||
    t[61] !== L ||
    t[62] !== R ||
    t[63] !== z ||
    t[64] !== se ||
    t[65] !== M ||
    t[66] !== N ||
    t[67] !== ee ||
    t[68] !== F ||
    t[69] !== y
      ? ((ce = (0, Q.jsxs)(`div`, {
          className: `flex w-full min-w-0 flex-col`,
          children: [r, M, N, s, ee, F, y, L, i, null, R, z, B, se],
        })),
        (t[58] = r),
        (t[59] = i),
        (t[60] = s),
        (t[61] = L),
        (t[62] = R),
        (t[63] = z),
        (t[64] = se),
        (t[65] = M),
        (t[66] = N),
        (t[67] = ee),
        (t[68] = F),
        (t[69] = y),
        (t[70] = ce))
      : (ce = t[70]),
    ce
  );
}
function ci(e) {
  let t = (0, li.c)(4),
    { onClick: n } = e,
    r;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((r = (0, ui.jsx)(Ct, { className: oi.icon, icon: { 16: x, 20: k } })), (t[0] = r))
    : (r = t[0]);
  let i;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((i = (0, ui.jsx)(J, {
        id: `codex.profileDropdown.chatgptAnalytics`,
        defaultMessage: `ChatGPT analytics`,
        description: `Short profile menu item below Workspace settings that opens ChatGPT usage analytics for the current workspace`,
      })),
      (t[1] = i))
    : (i = t[1]);
  let a;
  return (
    t[2] === n
      ? (a = t[3])
      : ((a = (0, ui.jsx)(H, { leftIcon: r, onClick: n, children: i })), (t[2] = n), (t[3] = a)),
    a
  );
}
function si() {
  return (si = e(() => {
    ((ai = `_icon_1taxa_1`), (oi = { icon: ai }));
  }))();
}
 si();return {ProfileMenuLayout:Wi,ProfileAnalyticsItem:ci};
}
