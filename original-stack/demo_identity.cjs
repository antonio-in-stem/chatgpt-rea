// Demo-only data for the original host contracts; not a login or credential.
// Integration must route these values in an isolated host adapter, never pristine.
'use strict';
const fs = require('node:fs');
const PNG_SIGNATURE = Buffer.from([137,80,78,71,13,10,26,10]);
function createDemoIdentity({ avatarPngPath, sessionState = 'signedOut' }) {
  if (!['signedOut','signedIn'].includes(sessionState)) throw new Error('Unknown demo session scenario');
  if (typeof avatarPngPath !== 'string' || !avatarPngPath) throw new TypeError('A local demo PNG is required');
  const stat = fs.statSync(avatarPngPath);
  if (!stat.isFile() || stat.size > 1024 * 1024) throw new Error('Demo PNG must be a file of at most 1 MiB');
  const image = fs.readFileSync(avatarPngPath);
  if (image.length < 24 || !image.subarray(0,8).equals(PNG_SIGNATURE) || image.toString('ascii',12,16) !== 'IHDR') throw new Error('Expected a PNG with IHDR');
  const width = image.readUInt32BE(16), height = image.readUInt32BE(20);
  if (!width || !height || width > 4096 || height > 4096) throw new Error('Invalid demo avatar dimensions');
  const accountId = 'rea-demo-account', userId = 'rea-demo-user';
  const email = 'demo@example.invalid', name = 'Demo';
  const picture = 'data:image/png;base64,' + image.toString('base64');
  // hasChatGptToken models a UI scenario only; no bearer token exists or is supplied.
  // Sources: exported v2/Account.ts, host O_, and renderer _Mo (see evidence).
  // Account maps and host arrays are distinct recovered contracts.
  const account = () => ({ account_id:accountId, account_user_id:userId, account_owner_id:userId, account_user_role:'account-owner', structure:'personal', plan_type:'free', is_zdr:false, is_openai_internal:false, is_deactivated:false, name:'REA Demo', profile_picture_url:picture });
  const accountsCheck = () => ({ accounts:{[accountId]:{account:account(),entitlement:{subscription_id:null,subscription_plan:null,has_active_subscription:false,expires_at:null,renews_at:null,trial:null},last_active_subscription:{subscription_id:null,purchase_origin_platform:null,will_renew:false},can_access_with_session:true,sso_connection_name:null}}, account_ordering:[accountId] });
  const hostAccounts = () => { const {account_id,...rest}=account();return {accounts:[{id:account_id,...rest,can_access_with_session:true}],default_account_id:accountId,account_ordering:[accountId]}; };
  const workspaceSettings = () => ({ beta_settings:{},permissions:['chatgpt.workspace.feature.desktop-app-chat.access'],admin_work_mode_enabled:true,admin_work_local_enabled:true,desktop_app_beta_policy:'optional_default_on' });
  return Object.freeze({
    accountsCheck, hostAccounts, workspaceSettings,
    accountRead: () => ({ account: { type: 'chatgpt', email, planType: 'free' }, requiresOpenaiAuth: false, workspaceRouting: null }),
    accountInfo: () => ({ accountId, userId, authenticatedUserId: userId, plan: 'free', email, computeResidency: null, hasChatGptToken: sessionState === 'signedIn' }),
    currentUser: () => ({ id: userId, name, email, picture }),
  });
}
module.exports = { createDemoIdentity };
