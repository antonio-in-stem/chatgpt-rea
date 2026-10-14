// Composition adapter: all menu behavior and surfaces come from recovered modules.
import {createMenuEngine} from './MenuEngine.js';
import {createMenuInfrastructure} from './MenuInfrastructure.js';
import {createMenuSurfaces} from './MenuSurfaces.js';
import {createDropdownController} from './DropdownController.js';
export function createMenu({React,ReactDOM,tooltip,AssetIcon,eventBridge,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!tooltip?.OverlayPortal||!tooltip?.TooltipOverlayContext)throw new TypeError('Pass the original createTooltip result');
 const engine=createMenuEngine({React,ReactDOM});
 const infrastructure=createMenuInfrastructure({React,Layer:engine.Portal,OverlayPortal:tooltip.OverlayPortal,compilerRuntime});
 const surfaces=createMenuSurfaces({React,primitives:engine,Tooltip:tooltip.Tooltip,AssetIcon,ScrollArea:infrastructure.ScrollArea,TooltipOverlayContext:tooltip.TooltipOverlayContext,compilerRuntime});
 const controller=createDropdownController({React,primitives:{Root:engine.Root,Trigger:surfaces.MenuTrigger,Content:surfaces.MenuContent,Portal:infrastructure.Portal,Layer:engine.Portal,ModalLayer:infrastructure.ModalLayer},eventBridge,TooltipOverlayContext:tooltip.TooltipOverlayContext,visualScale,compilerRuntime});
 return {...controller,...surfaces,ScrollArea:infrastructure.ScrollArea};
}
