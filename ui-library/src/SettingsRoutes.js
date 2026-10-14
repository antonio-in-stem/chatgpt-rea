// Original URL construction, permission aliases and browser breadcrumb descriptors.
const e=fn=>fn,r=value=>value,n=()=>{},i=()=>{},t=`/settings/browser-use/site-settings`;
var s,FNs;
function a(e) {
  let t = e;
  return (
    e === `geolocation`
      ? (t = `location`)
      : e === `embeddedContent` && (t = `federatedIdentityApi`),
    Object.entries(s).find(([e]) => e === t)?.[1] ?? null
  );
}
function o(e) {
  let n = Object.entries(s).find(([, t]) => t.id === e)?.[0];
  return n == null ? void 0 : `${t}/${n}`;
}
function c() {
  return (c = e(() => {
    (i(),
      n(),
      (s = r({
        ads: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.ads`,
          defaultMessage: `Intrusive ads`,
          description: `Intrusive ads breadcrumb label for embedded browser site permission settings`,
        },
        automaticDownloads: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.automaticDownloads`,
          defaultMessage: `Automatic downloads`,
          description: `Automatic downloads breadcrumb label for embedded browser site permission settings`,
        },
        backgroundSync: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.backgroundSync`,
          defaultMessage: `Background sync`,
          description: `Background sync breadcrumb label for embedded browser site permission settings`,
        },
        camera: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.camera`,
          defaultMessage: `Camera`,
          description: `Camera breadcrumb label for embedded browser site permission settings`,
        },
        clipboard: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.clipboard`,
          defaultMessage: `Clipboard`,
          description: `Clipboard breadcrumb label for embedded browser site permission settings`,
        },
        cookies: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.cookies`,
          defaultMessage: `Third-party cookies`,
          description: `Third-party cookies breadcrumb label for embedded browser site permission settings`,
        },
        federatedIdentityApi: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.embeddedContent`,
          defaultMessage: `Embedded content`,
          description: `Embedded content breadcrumb label for embedded browser site permission settings`,
        },
        location: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.location`,
          defaultMessage: `Location`,
          description: `Location breadcrumb label for embedded browser site permission settings`,
        },
        images: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.images`,
          defaultMessage: `Images`,
          description: `Images breadcrumb label for embedded browser site permission settings`,
        },
        javascript: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.javascript`,
          defaultMessage: `JavaScript`,
          description: `JavaScript breadcrumb label for embedded browser site permission settings`,
        },
        microphone: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.microphone`,
          defaultMessage: `Microphone`,
          description: `Microphone breadcrumb label for embedded browser site permission settings`,
        },
        notifications: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.notifications`,
          defaultMessage: `Notifications`,
          description: `Notifications breadcrumb label for embedded browser site permission settings`,
        },
        popups: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.popups`,
          defaultMessage: `Pop-ups and redirects`,
          description: `Pop-ups and redirects breadcrumb label for embedded browser site permission settings`,
        },
        handlers: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.handlers`,
          defaultMessage: `Protocol handlers`,
          description: `Protocol handlers breadcrumb label for embedded browser site permission settings`,
        },
        protectedContent: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.protectedContent`,
          defaultMessage: `Protected content IDs`,
          description: `Protected content IDs breadcrumb label for embedded browser site permission settings`,
        },
        sound: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.sound`,
          defaultMessage: `Sound`,
          description: `Sound breadcrumb label for embedded browser site permission settings`,
        },
        usbDevices: {
          id: `settings.browserUse.browserSettings.breadcrumb.siteSettings.usbDevices`,
          defaultMessage: `USB devices`,
          description: `USB devices breadcrumb label for embedded browser site permission settings`,
        },
      })));
  }))();
}
function PNs(e, t = ``) {
  let n = FNs.find((t) => t.section === e);
  if (n == null) return `/settings/${e}${t}`;
  let r = new URLSearchParams(t);
  return (r.set(`tab`, n.value), `/settings/usage?${r}`);
}
function INs() {
  return (INs = e(() => {
    FNs = [
      { section: `usage`, value: `overview` },
      { section: `analytics`, value: `analytics` },
      { section: `consumer-view`, value: `consumer-view` },
      { section: `usage-code-review`, value: `code-review` },
    ];
  }))();
}
c();INs();
export {a as getBrowserPermissionMessage,o as getBrowserSubpage,PNs as buildSettingsPath,s as browserPermissionMessages};
