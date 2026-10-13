}
function gMo({ accountId: e, userId: t }) {
  return [`chatgpt-current-user`, t, e];
}
var _Mo, vMo;
function yMo() {
  return (yMo = e(() => {
    (Y(),
      tl(),
      Z(),
      wn(),
      Sf(),
      (_Mo = X({
        created: ni().optional(),
        email: K().nullable().optional(),
        email_domain_type: K().nullable().optional(),
        first_name: K().nullable().optional(),
        id: K(),
        name: K().nullable().optional(),
        phone_number: K().nullable().optional(),
        picture: K().nullable().optional(),
      })),
      (vMo = kl(q, ({ accountId: e, userId: t }) => ({
        enabled: e != null && t != null,
        queryKey: gMo({ accountId: e, userId: t }),
        queryFn: async ({ signal: e }) => _Mo.parse(await Ae.safeGet(`/me`, { signal: e })),
        staleTime: Qg.ONE_MINUTE,
      }))));
  }))();
}
