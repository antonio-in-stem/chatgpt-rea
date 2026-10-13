# Continuidad del proyecto

## Instrucción vigente del propietario

Completar primero el frontend original tal como se distribuye en el paquete Windows: rail, sidebar, conversación, composer, menús, pantallas, efectos y comportamiento. Usar datos demo para las funciones de backend. No rediseñar ni aproximar componentes. Rust queda pausado hasta nueva autorización explícita; el código previo se conserva.

Usar la skill `reverse-engineer-anything` y `architect-mode`. En este equipo: `C:/Users/PC/.agents/skills/reverse-engineer-anything/SKILL.md` y `C:/Users/PC/.codex/skills/architect-mode/SKILL.md`. Se autorizaron dos subagentes conservadores para tareas independientes; todos deben aplicar REA.

## Qué se conserva en Git

- `original-stack/`: scripts de recuperación/verificación, contratos exportados, adaptador demo, pruebas y evidencias seleccionadas.
- `native/`: implementación Rust previa, pendiente y pausada; no equivale al frontend original.
- `reports/`: análisis y procedencia. Algunas referencias apuntan a artefactos locales excluidos.
- Historial de trabajo; consultar `original-stack/ACTIVE-SCOPE.md` y `original-stack/FRONTEND-GAPS.md`. Este último es un registro cronológico: una afirmación antigua puede estar corregida más abajo.

No es una extracción completa de código fuente nativo ni el repositorio TSX original. El frontend recuperado es JavaScript/CSS empaquetado. La extracción no demuestra que todos sus flujos funcionen.

## Entorno local de esta sesión

- Repositorio principal: `C:/Users/PC/Repositories/chatgpt-rea`.
- Worktree activo: `C:/Users/PC/Repositories/chatgpt-rea/.worktrees/native-windows`.
- Extracción local: `C:/Users/PC/Repositories/chatgpt-rea/extracted`.
- Original instalado: `C:/Program Files/WindowsApps/OpenAI.Codex_26.1007.2314.0_x64__2p2nqsd0c76g0/app`.
- Copia original: `original-stack/pristine` dentro del worktree.
- Copia demo instrumentada: `S:/rea-profile-runtime-v1`.
- Paquete v6 construido: `S:/rea-profile-package-v6`.
- Perfil demo: `original-stack/state/demo-profile-host-v1`.
- Node: `C:/Program Files/nodejs/node.exe`; Python 3.12: `C:/Users/PC/AppData/Local/Programs/Python/Python312/python.exe`.

Estas rutas son locales, no dependencias descargables. En el mismo equipo se pueden reutilizar tras comprobar hashes. En otro equipo hay que aportar/recuperar el mismo paquete y adaptar las rutas: algunos scripts todavía contienen rutas absolutas y dependencias de caché. `Complete-Runtime.ps1` copia y verifica el paquete instalado identificado en `snapshot.json`; no instala la aplicación. No ejecutar una copia con otra versión sin revisar los seams y hashes fijados.

## Estado actual comprobado

El renderer original se conserva sin modificaciones. La copia demo modifica el host para responder con identidad, cuenta, gates y datos locales; su referencia de integridad ASAR en la copia del EXE está actualizada. No modificar la instalación ni `pristine`. La copia instrumentada no conserva la firma válida del distribuidor.

La v5 mostró el rail original estrecho, Space, Sites y avatar demo. El avatar es un recurso empaquetado explícito, no la foto privada del propietario. Projects y Pull requests se fijaron mediante controles originales; su persistencia no estaba implementada. Algunas capturas PrintWindow conservaron frames anteriores o mostraron una ventana auxiliar; no usarlas como prueba de paridad visual.

La v6 implementa GET `/settings/user` y PATCH `/settings/account_user_setting?feature=sidebar_customization&value=...`, con guardado local atómico en `demo-sidebar-settings.json`. Dos pruebas verifican persistencia en una nueva instancia y conservación del registro ante errores. Paquete SHA256: `f6af5de41c07f11758f6b052054a39cb14deedf0479f78e9c2e734e3630f7fe2`. Está instalado en la copia demo. Verificado desde los controles originales: fijar Pull requests y Projects guarda ambos; tras detener PID52980 y abrir PID71012, ambos reaparecen sin fijarlos otra vez. Evidencia: `original-stack/evidence/sidebar-persistence-runtime.json`. Leer `demo-session.json` y comprobar procesos reales; no confiar en PIDs antiguos.

## Próximos pasos

1. El fijado y recuperación tras reinicio ya están verificados; ampliar a desfijado y reordenación. Usar `Demo-Controls.cjs` sobre el perfil demo aislado; nunca la sesión personal.
2. Completar los escenarios de cuenta, orden y visibilidad del rail. La cuenta demo free promueve Images; no ocultarlo cambiando CSS. Ver `evidence/rail-demo-next-contracts.json`.
3. Security requiere gate1598376 y `plugin/installed` con plugin habilitado AVAILABLE cuyo ID empieza por codex-security@. Mostrar el icono no verifica su pantalla.
4. Cola: los seis contratos ya están conectados mediante `demo_thread_queue.py` al almacén de conversaciones y al streaming del adaptador. Un solo commit crea el turno, conserva el contenido/clientId y retira el elemento. Pasan 56 pruebas del adaptador más una prueba WebSocket real de cola -> streaming -> persistencia. La v7 habilita el gate2120612410 y el adaptador actualizado está en ejecución; thread/queue/list fue observado. Verificado queue/add desde el composer con Ctrl+Enter en modo enter, chip original y envío manual por turn/start + queue/delete. Falta avance automático, edición/reordenación y ruta queue/start en UI (evidence/queue-v7-runtime.json). Contratos `thread/queue/*` de `protocol/typescript/v2`, persistencia y `thread/queue/changed`. `queue/start` debe compartir el streaming de `turn/start`. Gate2120612410 y compatibilidad mínima0.148.0-alpha.14.
5. Adjuntos: selector original `pick-files` -> chip -> quitar/enviar -> historial/visor. El modelo demo solo anuncia texto; revisar capacidades antes de verificar imagen. `thread/attachment/add` es otro flujo (PR/worktree).
6. Seguir el inventario completo de funciones; no declarar terminado por arranque o pruebas unitarias. No reanudar Rust todavía.

## Comprobaciones útiles

Desde la raíz del repo, con Node y Python disponibles:

```powershell
node --test original-stack/test_demo_sidebar_settings.cjs
python -m unittest discover -s original-stack -p 'test_*.py'
```

Las pruebas que evalúan consumidores recuperados requieren los artefactos locales excluidos. El runtime demo necesita `websockets` y todos los archivos verificados. No se afirma portabilidad de instalación automática.

El adaptador usa datos sintéticos y no ejecuta herramientas de usuario. El bloqueo de HTTP del host no equivale a aislamiento de red de todo el proceso. No copiar credenciales o perfiles personales para habilitar pantallas.

Última prioridad confirmada: seguir recuperando todo el frontend original; también se difiere la reorganización en módulos reconstruidos. Paquete demo actual v7 en `S:/rea-profile-package-v7`, SHA256 `ab1d81b1555941f165bcd7d86ad17a93ee17f75ed918d44e097a63ecff6817b2`.

Actualización de cola: verificados Stop (conserva pendiente y muestra Resume), menú original, Turn on queueing (persiste desktop.followUpQueueMode=queue) y Edit message (retira a composer, permite modificar/enviar). Resume textual aún no emite queue/start en el escenario observado. No inferir estado de streaming del frontend a partir del status persistido: el manager usa streamRoles. Investigación de liberación de ownership pendiente.

Resume: breakpoint de solo lectura confirma streaming=true, resumeState=resumed. El manager original conserva ownership del hilo visible tras acabar el turno; no implica evento demo faltante. La ruta gated de Resume queda pendiente/incompatible en ese escenario. Evidencia: original-stack/evidence/queue-resume-guard.json. No borrar ownership artificialmente. No prueba que el producto instalado habilite esta misma combinacion de gates.

Adjuntos: model/list ahora anuncia text+image, requisito demostrado del composer original. La instancia en ejecucion aun cargo la fixture anterior; reiniciar adaptador/runtime antes de verificar selector -> chip -> envio -> historial/visor. Ver evidence/attachment-contract-audit.json. No se afirma verificacion end-to-end.

Runtime94724/adapter76020 (launcher session4961): nueva modalidad cargada. Pegado sintetico PNG -> thumbnail -> quitar -> reenviar -> localImage persistido -> preview/zoom/cerrar verificados. Tras recargar, imagen no aparece; archivo temporal existe. Investigar restauracion de historial. evidence/attachment-paste-runtime.json. Picker nativo y fileId aun pendientes.

Restauracion: se identifico y corrigio thread/resume initialTurnsPage: ignoraba sortDirection/itemsView. Ahora comparte handler thread/turns/list; prueba7turnos comprueba ultimos5, cursor2restantes y no mutacion. 58 pruebas pasan. Nuevo arranque session48862 en validacion para comprobacion visual. No cambiar localImage: contrato original correcto.

VERIFICADO tras correccion: runtime46520/adapter5932, launcher48862 activo. Historial cronologico, thumbnail localImage78x78 y preview100x100 completo reaparecen tras reinicio de ambos procesos. evidence/attachment-paste-runtime.json conserva antes/despues. Se supera la brecha de restauracion observada; selector nativo/fileId/archivos generales siguen pendientes.

Archivos texto: drop-demo-file en Demo-Controls usa arrastre Chromium de rea-demo-note.txt sintetico en state demo; chip/quitar/enviar/persistir/recargar verificados. Apertura del chip aun pendiente. evidence/text-attachment-runtime.json. Disco C llego a0; retirado exclusivamente antiguo state/instrumented-profile-host/app.asar v1 SHA c97af2013404d31bffb98c33c9b4eeb4cc4f4e34b621c8443bdceafeaecdb33e (571239159bytes), tras verificar activo v7 en S. No se borro pristine ni extraccion.

Apertura archivos: txt comun usa servicio externo Pd.openIn.open, no panel. CSV demo enviado; Probe-FileOpen confirma entrada JG openInSidePanel=false/isAttachmentPreview=false, hostlocal, scopepresente. Gate isUploadedFileViewerEnabled pendiente. Runtime98252/adapter95588, launcher87709 activo; anterior termino por ENOSPC ya resuelto. Evidence file-open-entry.json.

Latest human: no Rust; preserve >=50% credits, stop if an obstacle cannot be overcome. Usage baseline2026-10-13: primary used13% (87%remaining), creditbalance61654.637173. Conservative floor balance30827.318587 and primary remaining50%; check usage between substantial batches and stop with margin. Cleanup authorized only three specified repos; removed1,030,699,778bytes of verified old Cargo deps/build/incremental/.fingerprint; retained executables and all doubtful files.

Viewer: original sites-end-resource:16807 layer2813816346.enabled routes supported docs to preview prop at17006; without it17040 omits prop. Fixture now enables layer and thumbnails; package/runtime rebuild pending. No renderer changes.

Demo v8 construido e instalado desde state/demo-package-v8; SHA792e74064d2d1131d62d1ed83ad86960542efa2d6c80d6dffd6e045aeec559f3. Layer visor2813816346 activado, validado SDK original. Arranque session29477 en curso.

V8 verificado runtime99552/adapter25060: CSV abre panel original, JG openInSidePanel=true,isAttachmentPreview=true. Barra Rea Demo Note/Request edits/100%/A1/CSV import observada; celdas/edicion aun no verificadas. Launcher29477 vivo. Cupo ultima consulta86%remaining, balance61654.637173 sin cambios.

Plugin demo: demo_plugins.py implementa plugin/list,installed,read,install,uninstall con identificador rea-demo@rea-local y marketplace C:/REA-Demo/marketplace.json (rutas sinteticas, no software). Estado demo-plugins.json atomico, enabled refleja config plugins.<id>.enabled. demo_transport conecta cuando ConfigStore presente.60tests pasan incluyendo persistencia/toggle/desinstalar/fallo escritura/rechazo otrosIDs. Runtime aun no reiniciado: UI catalogo/ficha/sync skills pendientes. Tipos originales validados por auditoria previa; nueva implementacion pendiente validacion JSONschema propia.

Plugins: Validate-Plugins.cjs valida8respuestas/5schemas originales via Ajv C:/Users/PC/AppData/Local/npm-cache/_npx/515228b7c8d004a2/node_modules/ajv. Agregado skills/list vacio por cwd para refresh;3tests plugin pasan. Runtime48648/adapter100316 launcher99854: Plugins abre, tabsPublic/Personal; Personal falta HTTP /ps/plugins/list (plugins-query59-76, scopeUSER, limit50, pageToken; responseplugins/pagination.next_page_token). Catalogo local aun no visible/flujo instalado sin verificar. skills/list pudo añadirse despues de cargar adaptador; verificar en reinicio.

V9 plugin UI verified: package state/demo-package-v9/app.asar SHA6ace5238a1722cd2b3bd8c09769bffe0fcbe253104cee061291b183fb3dd1e22; runtime87724/adapter99400 launcher2370. GET /ps/plugins/list USER returns empty remote pagination, allowing original local Personal catalog. Original card anchor -> detail -> Install plugin -> Rea Demo sidebar/Try now -> More actions(data-size xl) -> Uninstall -> reinstall -> Page.reload -> Installed Rea Demo all observed. No software installed.61 Python tests and1 HTTP test pass. Toggle UI/Try now/nonempty skills not verified. Current primary85%remaining, creditbalance61654.637173. Obsolete v8 ASAR only removed after v9 hash verification; v8 manifest retained. Rust still deferred.

Skills: demo_skills.py provides one synthetic user skill rea-ui-demo, path C:/REA-Demo/skills/rea-ui-demo/SKILL.md (not a real file). skills/list with config returns metadata; skills/config/write exact selector and boolean persists atomically to demo-skills.json.63 Python tests pass; Validate-Plugins now11samples/7schemas incl SkillsListResponse/SkillsConfigWriteResponse. Runtime68872/adapter80980 launcher54513 active. Original Installed and Personal cards render; open-demo-skill opens original modal, which currently fails content read. Next inspect skill-contents-modal-3befba658a8f.js and Oe hook imported by skill-card to implement exact synthetic host content dependency. Toggle UI/remove/add/Try now NOT verified. Prior runtime closed to tray then exact verified demo process killed; no other app affected. Budget remains85%remaining, balance61654.637173.

V10 skills content verified: demo_skill_file.cjs responds only exact synthetic SKILL.md path on local host, {contents}; consumer Iil app-initial544281, host read-file66129. Original markdown modal now renders heading/list/code. Disable skill -> enabledfalse + Disabled -> Page.reload/reopen still Disabled -> Enable skill -> true -> Try now opens conversation with Rea UI Demo composer chip. No skill execution. Runtime94404/adapter70048 launcher92548 active; package state/demo-package-v10 SHA5a4e3deb0021fdf1d2303027bdd9ccafd4b642cd62a4f7657457fd106d16cda1, copiedexe8dafa55eabb72df5e9ec4b3891d3328765b1507283844d945ba576f1652315ad.1 host-content boundary test passed. Pending skill remove/add and send-reference history. Original renderer unchanged; Rust deferred. Usage85%remaining, balance61654.637173.

Skill conversation verified in runtime94404: Try now chip plus text sent successfully, actual persisted input is text markdown [$rea-ui-demo](C:/REA-Demo/skills/rea-ui-demo/SKILL.md), text_elements[]. No need normalize_input UserInput.skill for this flow. Page.reload -> reopen thread restores Rea UI Demo. Lifecycle host contracts mapped in evidence/skills-contract-progress.json. Next implement synthetic recommended-skills/install-recommended-skill/remove-skill sharing demo-skills.json installed state with Python SkillStore; do NOT call real original remove on synthetic path. Original recommended item fields recovered src-BJv5Mk7n:68830, envelope68767-68792. Host seams main66071,66082,66116. Runtime unchanged launcher92548.

Skills lifecycle v13: demo_skill_lifecycle.cjs handles original host recommended-skills/install-recommended-skill/remove-skill with synthetic JSON state only, no skill-file deletion/copy. Python SkillStore reads installed (defaulttrue) and preserves it on toggle writes. Same exclusive demo-skills.pending lock prevents simultaneous writers;64 Python tests+1host lifecycle test pass. Runtime69436/adapter90648 launcher86598 active, ASAR19b7f595ef154268ae693292d20f84f0fc71529c2c5e4c4b6593eeba503de1a2. Original Uninstall now installedfalse -> No skills found. Original Add opens composer Skill Creator help me create a skill. Reinstall via Recommended not verified; current new page hides catalog when no installed skills. Next inspect skills-page-612292bde761.js branches around201/768/1101 and skills-tab-content. v11/v12 RPC-forward attempt did not reach adapter; unused custom RPC removed. v11 uninstalled ASAR removed571321613bytes after hash/range check;manifest retained. v12 ASAR remains obsolete. Usage84%remaining, balance61654.637173.

Skills reinstall VERIFIED without new package: original selector I plugins-page-selectors:107 only allows predefined names on empty query; skills-page228-234 uses full catalog when searching. Search skills rea -> Install skill -> installedtrue, original success toast and Refresh to use new skill(s) -> refresh -> Clear search -> installed card. Page.reload -> Plugins -> Skills restores installed card. Runtime69436/adapter90648 launcher86598 unchanged. Core synthetic lifecycle now observed; other catalog/error states and custom authoring remain. No renderer change needed. Next substantial gap should move to Library/Pages/settings/automations rather than more repeated Skills checks.

Scheduled audit: original page error GET/automations; New task opens original dialog Repeat/Daily/Time/Advanced/Cancel/Create. demo_automation_http.cjs implements empty GET items[] cursornull for scheduled/finished/paused, limits<=100;1test passes. Build-DemoHost integrates it but NO REBUILD/INSTALL yet; runtime remainsv13 session86598. Source contracts recorded evidence/automations-contract-progress.json. Next build/restart to verify empty state then recover full automation response and implement stateful save/status/remove fixtures. No scheduling execution. Usage84%remaining.

Automations stateful HTTP implemented and2tests pass: demo_automation_http.cjs GET pagination/filter, POST save/status/remove writes isolated demo-automations.json, atomic temp lock. Full response based on original shared-task-dialog Ve162-254. Next-run fixed2099 preview sentinel, no scheduler; raw schedule preserved but components scalar subset. Build-DemoHost passes t.body + settingsPath/fs/path. NOT built/installed yet; runtime stillv13 PID69436/adapter90648 launcher86598. Next buildv14 after disk check, install and validate original New task form through save/list/edit/pause/delete. All current changes frontend-host only, no Rust.

IMPORTANT Scheduled v14: installed SHA97fcfa4446675f8658f7ea018e7237b97972e48fdb2ef06d2eb8e12314ef96c1; GET now No scheduled tasks verified. New task form original uses Instructions contenteditable. Create routed LOCAL automation-create, not HTTP; created heartbeat in isolated codex-home/automations/display-a-synthetic-task-preview-do-not-run-tools/automation.toml. Stopped exact runtime73896, launcher43932 terminal, adapter cleanup. Changed exact task status to PAUSED after id/prompt verification. Do not relaunch v14 unchanged. Build-DemoHost now has pending guards blocking local create/update/delete and run-now (not built). Next implement local synthetic automation service + list and buildv15 before launch. Original seams main66367+, read method contracts. Demo UI instruction Inspection supported via inspect-dialog-fields/focus-dialog-field in controls. Removed obsolete v12 ASAR after exact hash check. Usage83%remaining.

Local automation adaptation implemented: demo_local_automations.cjs list/create/update/delete returns original shapes from main z_e52070 and src rI48434. Stores only demo-local-automations.json, no automation.toml or scheduler registration. Run-now still blocked at host.1unit test verifies lifecycle/paused/reload/missing IDs/write-lock preservation;14host seams unique and patched syntax valid against original main. Build-DemoHost now injects local helper/list seam. NOT BUILT yet. Runtime73896 confirmed absent; do not launch installedv14. Next build/installv15 then verify local form end-to-end; old synthetic real task remains PAUSED.

V15 local Scheduled runtime verified: ASAR5b75096d0df47937ef6be10ac51eded030e149210d6c8370535e34d50b177ee4, exe c485de64b2d124d398205d360e6afb690bbcf3a3b84774b448426061250b1df8. Runtime90616/adapter88672 launcher97618 active. Original New task -> Instructions -> Create stores only demo-local-automations.json. Old sole automation.toml stays PAUSED; no new scheduler config. Original Scheduled task actions requires pointer click (activate alone ineffective); Pause/Resume update state and labels; Delete -> Delete scheduled task returns empty listing. Final synthetic store items[] sequence1. Edit/reload/cloud task lifecycle and run-now demo remain pending. v14 obsolete ASAR removed by hash afterv15 installed; manifest retained.

V15 edit/reload verified: second inert local task rea-local-task-2, original menu Edit -> Name Edited inert task -> Repeat Weekdays -> Save keeps ID and BYDAY MO,TU,WE,TH,FR. Page.reload Scheduled restores name; Edit restores Weekdays. Demo task remains ACTIVE only in inert JSON. Added activate-popup-item scoped role=menu selection to controls (avoids titlebar Edit ambiguity). Runtime90616/adapter88672 launcher97618 still active. Next surface Space opened: original All/Pages/Sites/Images/Recents/Spaces/Trash and Suggested/Your items shell appears; missing HTTP /spaces/v2 and /pages/mentions/inbox logged. Focus next on Spaces contracts. Usage83%remaining.
