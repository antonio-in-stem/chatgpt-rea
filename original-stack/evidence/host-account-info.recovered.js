async function O_(e) {
  let t = w_().epoch,
    n = !1;
  try {
    let r = await e.getConnection(l.h).getAuthToken({ refreshToken: !1 });
    if (!r)
      return {
        accountId: null,
        userId: null,
        authenticatedUserId: null,
        plan: null,
        email: null,
        computeResidency: null,
        hasChatGptToken: n,
      };
    n = !0;
    let [, i] = r.split(`.`);
    if (!i) throw Error(`Missing token payload`);
    let a = JSON.parse(Buffer.from(i, `base64url`).toString(`utf8`)),
      o = a[`https://api.openai.com/auth`],
      s = a[`https://api.openai.com/profile`],
      c = o && typeof o == `object` && o ? o.chatgpt_account_id : null,
      u = o && typeof o == `object` && o ? o.chatgpt_user_id : null,
      d = o && typeof o == `object` && `user_id` in o ? (o.user_id ?? u) : u,
      f = o && typeof o == `object` && o ? o.chatgpt_plan_type : null,
      p = o && typeof o == `object` && o ? o.chatgpt_compute_residency : null,
      m = s && typeof s == `object` && s ? s.email : null;
    if (typeof c == `string` && typeof u == `string`) {
      let e = w_();
      return {
        windowsJumpListEpoch:
          process.platform === `win32` &&
          e.epoch === t &&
          e.principal?.accountId === c &&
          e.principal.userId === d
            ? t
            : void 0,
        accountId: c,
        userId: u,
        authenticatedUserId: typeof d == `string` && d.length > 0 ? d : null,
        plan: typeof f == `string` ? f : null,
        email: typeof m == `string` ? m : null,
        computeResidency: typeof p == `string` ? p : null,
        hasChatGptToken: n,
      };
    }
  } catch (e) {
    lde().error(`Unable to extract account id and plan from auth token`, {
      safe: {},
      sensitive: { error: e },
    });
  }
  return {
    accountId: null,
    userId: null,
    authenticatedUserId: null,
    plan: null,
    email: null,
    computeResidency: null,
    hasChatGptToken: n,
  };
}
var ude = e.a(r.Ft()),
  k_ = class extends Error {
    status;
    cause;
    errorCode;
    constructor(e, t, n, r) {
      (super(e), (this.status = t), (this.cause = n), (this.errorCode = r));
    }
  };
function dde(e, { inferAuth: t = !1 } = {}) {
  let n = r.Gn(e),
    i = r.Yn(e),
    a = (n || t) && !r.Qn(e, `authorization`);
  return {
    attachAuth: a,
    expectedAccountId: i,
