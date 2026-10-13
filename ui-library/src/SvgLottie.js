import {createOriginalLottieRuntime} from '../animations/runtime.js';
// SvgLottie n from animated-icon-svg-e85414c6ffc6.js. Create in a browser.
export function createSvgLottie(React){
 const runtime=createOriginalLottieRuntime(React);
 return function SvgLottie(props){return runtime.useLottie(props).View;};
}
