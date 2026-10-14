export {createAvatar} from './Avatar.js';
export {createNavigationRail,navigationRailClasses} from './NavigationRail.js';
export {createFileIcon} from './FileIcon.js';
export {createProviderArtwork} from './ProviderArtwork.js';
export {resolveFileIcon,describeFileArtwork,resolveFileProvider} from './fileIconSelection.js';
export {createFileTypeGlyph,fileIconAssets,textFileIconAssets} from './FileTypeGlyph.js';
export {describeFile,fileExtension} from './fileDescriptor.js';
export {createAttachmentThumbnail} from './AttachmentThumbnail.js';
export {createResourceCards} from './ResourceCards.js';
export {createComposerContextAction} from './ComposerContextAction.js';
export {createTooltip} from './Tooltip.js';
export {createComposerActions} from './ComposerActions.js';
export {createComposerLayout} from './ComposerLayout.js';
import {createUserMessageBubble} from './UserMessageBubble.js';
import {createConversationLayout} from './ConversationLayout.js';
import {createViewerControls} from './ViewerControls.js';
import {createBadge} from './Badge.js';
export {badgeVariants} from './Badge.js';
import {createViewerSurfaces} from './ViewerSurfaces.js';
import {createSwitches} from './Switch.js';
import {createShortcutBadge} from './ShortcutBadge.js';
export {createLazyComponentFactory} from './lazyComponent.js';
import {createDarkThemeHook} from './theme.js';
export {createDarkThemeHook} from './theme.js';
import {createAssetIcon} from './AssetIcon.js';
export {createAssetIcon} from './AssetIcon.js';
import {createResponsiveIcons} from './ResponsiveIcon.js';
export {createResponsiveIcons} from './ResponsiveIcon.js';
import {createDisclosureIcon} from './DisclosureIcon.js';
export {createDisclosureIcon} from './DisclosureIcon.js';
export {createAnimatedArtwork} from './AnimatedArtwork.js';
export {createAnimationColorReader,recolorAnimation,observeAnimationColor} from './animationColor.js';
export {createNavigationFallbackIcons} from './NavigationFallbackIcons.js';
export {createAnimatedNavigationIcon} from './AnimatedNavigationIcon.js';
import {createNavigationItem} from './NavigationItem.js';
import {createUseSidebarOrder} from './useSidebarOrder.js';
export {resolveDisplayedOrder,resolveDropTarget,moveItemBefore,moveSelectionBefore,dropPlacement} from './sidebarOrder.js';
import {createSidebarSections} from './SidebarSection.js';
import {createSidebarItem} from './SidebarItem.js';
import {createMarqueeText} from './MarqueeText.js';
import {createSidebarRow,createSidebarIndent} from './SidebarRow.js';
import {createSidebarStatus} from './SidebarStatus.js';
import {createSearchField} from './SearchField.js';
import {createSearchIcons} from './SearchIcons.js';
import {createMenuInput} from './MenuInput.js';
import {createButton} from './Button.js';
import {createSpinner} from './Spinner.js';
export {buttonColors,buttonSizes,buttonRadii,sizeRadii} from './buttonVariants.js';
import {classNames} from './classNames.js';
export {classNames} from './classNames.js';
// Consumer supplies its React and motion runtime; no ChatGPT host or service is imported.
export function createReaUI({React, motion, AnimatePresence, MotionConfig, ContextMenu, Link, ResponsiveIcon, AssetIcon, useDarkTheme, AnimatedIcon, DisclosureIcon, mergeClasses=classNames, formatMessage, motionPreference, visualScale, requestFrame = callback => window.requestAnimationFrame(callback)}) {
  if (!React?.createElement || !React?.useId || !motion?.span || typeof mergeClasses !== 'function')
    throw new TypeError('React, motion.span and mergeClasses are required');
  const h = React.createElement;
  function ChoiceButton({className, onClick, ...props}) {
    const deferredClick = onClick ? () => requestFrame(() => requestFrame(onClick)) : undefined;
    return h('button', {...props, type:'button', className:mergeClasses(
      'interactive-button interactive-button-secondary interactive-outline-secondary flex min-h-9 w-full min-w-0 cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-center text-sm leading-5 font-medium whitespace-normal select-none transition-colors disabled:cursor-not-allowed', className), onClick:deferredClick});
  }
  function ChoiceGroup({children, className, columns=1, ...props}) {
    return h('div', {...props, className:mergeClasses('grid gap-2', columns===2 ? 'grid-cols-2 [&>*:last-child:nth-child(odd)]:col-span-2' : 'grid-cols-1', className)}, children);
  }
  function SegmentedControl({ariaLabel,className,options,selectedId,animateSelection=true,size='default',onSelect}) {
    const layoutId=React.useId(), compact=size==='compact';
    return h('div',{className:mergeClasses(compact ? 'inline-grid gap-0.5 rounded-[10px] bg-surface-secondary/92 p-0.5' : 'bg-text/10 inline-grid gap-1 rounded-2xl p-1',className),role:'group','aria-label':ariaLabel,style:{gridTemplateColumns:`repeat(${options.length}, minmax(0, 1fr))`}},
      ...options.map(option=>{
        const selected=option.id===selectedId;
        return h('button',{key:option.id,type:'button','aria-label':option.ariaLabel,'aria-pressed':selected,
          className:mergeClasses('cursor-interaction relative isolate min-w-0 transition-transform duration-basic active:scale-[0.98]',compact ? 'flex h-6 items-center justify-center rounded-lg px-2 py-0 text-xs leading-4 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0' : 'rounded-xl px-3 py-1.5 text-sm font-medium',selected ? (compact ? 'text-default' : 'text-black') : 'text-secondary'),onClick:()=>onSelect(option.id)},
          selected ? h(motion.span,{layoutId:animateSelection ? layoutId : undefined,className:compact ? 'absolute inset-0 -z-10 rounded-lg bg-surface shadow-sm' : 'absolute inset-0 -z-10 rounded-xl bg-white shadow-sm',transition:{type:'spring',duration:0.28,bounce:0}}) : null,option.label);
      }));
  }
  const resolvedUseDarkTheme=useDarkTheme ?? createDarkThemeHook(React);
  const ResolvedAssetIcon=AssetIcon ?? createAssetIcon(React);
  const responsive=createResponsiveIcons({React,AssetIcon:ResolvedAssetIcon,useDarkTheme:resolvedUseDarkTheme,mergeClasses});
  const Spinner=createSpinner(React,mergeClasses);
  const Button=createButton({React,mergeClasses,Spinner});
  const MarqueeText=createMarqueeText({React,mergeClasses,motionPreference,visualScale}),SidebarRowSurface=createSidebarRow(React,mergeClasses),SidebarIndent=createSidebarIndent(React);
  return {UserMessageBubble:createUserMessageBubble(React,mergeClasses),...createConversationLayout(React,mergeClasses),...createViewerControls({React,Button,mergeClasses}),Badge:createBadge(React,mergeClasses),...createViewerSurfaces(React,mergeClasses),...createSwitches(React,mergeClasses),ShortcutBadge:createShortcutBadge(React,mergeClasses),useDarkTheme:resolvedUseDarkTheme,AssetIcon:ResolvedAssetIcon,...responsive,NavigationItem:createNavigationItem({React,mergeClasses,Link,ResponsiveIcon:ResponsiveIcon ?? responsive.ResponsiveIcon,AnimatedIcon,DisclosureIcon:DisclosureIcon ?? createDisclosureIcon(React,mergeClasses),formatMessage}),useSidebarOrder:createUseSidebarOrder(React),...createSidebarSections({React,mergeClasses,motion,AnimatePresence,MotionConfig,ContextMenu,motionPreference,visualScale}),SidebarItem:createSidebarItem({React,mergeClasses,SidebarRowSurface,SidebarIndent,MarqueeText}),MarqueeText,SidebarRowSurface,SidebarIndent,...createSidebarStatus({React,Spinner,mergeClasses,formatMessage}),SearchField:createSearchField({React,mergeClasses,icons:createSearchIcons(React,mergeClasses),formatMessage}),Button,Spinner,MenuInput:createMenuInput(React,mergeClasses),ChoiceButton,ChoiceGroup,SegmentedControl};
}

export {createLegacyButton} from './LegacyButton.js';

export {createProfileControl} from './ProfileControl.js';

export {createDropdownController} from './DropdownController.js';

export {createMenuSurfaces} from './MenuSurfaces.js';

export {createMenuEngine} from './MenuEngine.js';

export {createMenu} from './Menu.js';
export {createMenuInfrastructure} from './MenuInfrastructure.js';

export {createProfileMenu} from './ProfileMenu.js';

export {createProfileMenuLayout} from './ProfileMenuLayout.js';

export {createProfilePetMenuItem} from './ProfilePetMenuItem.js';

export {createProfileHelpMenu} from './ProfileHelpMenu.js';

export {createLoadingSurfaces} from './LoadingSurfaces.js';

export {createAccountSurfaces} from './AccountSurfaces.js';

export {createDialogSurfaces} from './DialogSurfaces.js';

export {createDialog} from './Dialog.js';

export {createAccountReplacementDialog} from './AccountReplacementDialog.js';

export {createShortcutSearchInput} from './ShortcutSearchInput.js';

export {createSettingsSurfaces} from './SettingsSurfaces.js';
export {createKeyboardShortcuts} from './KeyboardShortcuts.js';
export {shortcutMatchScore} from './ShortcutMatching.js';

export {createSettingsDisclosure} from './SettingsDisclosure.js';

export {createLinkShortcutPreference} from './LinkShortcutPreference.js';

export {createSettingsDropdownButton} from './SettingsDropdownButton.js';
export {createNumberShortcutPreference} from './NumberShortcutPreference.js';

export {createSettingsContent} from './SettingsContent.js';

export {createUnsavedSettingsDialog} from './UnsavedSettingsDialog.js';
