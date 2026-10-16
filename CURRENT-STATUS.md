# Current handoff — 2026-10-15 resumed



Human authorized continuation with 45 additional quota points; baseline 6%, max 50%, inventory cap 9%. Rust remains deferred. FRONTEND-CLOSURE.md is the current consolidated closure ledger; older quota stops below are historical and superseded. Security read/filter/detail acceptance passed; rename/triage mutation acceptance also passed. Remaining Security scan form/remediation variants and other screen-family gaps remain in FRONTEND-CLOSURE.md. Identified 145 lexical router entries (85 literals, 60 unresolved expressions). Reconciled later plugin/skill/automation/Pages/Spaces evidence against obsolete pending notes. Full route mapping and acceptance-state inventory remain unfinished. Latest verified implementation includes the MCP ephemeral bootstrap fix (see latest section). Static inventory follow-up: route-path-candidates.json now contains 144 single candidates plus one mapped pair for all 145 entries; eligibility, parent composition and state coverage remain partial. Global lookup pass closed. QYa/jZ proves browser-only business-profile content is excluded in this Windows bundle. Last quota read 8%; inventory ceiling remains 9%.



---



# Estado vigente — 2026-10-14



## Hito actual



Hito 1 verificado en 65% de cuota usada: la copia original arranca, muestra una ventana completa y permite enviar un mensaje demo. New chat abre la pantalla inicial; antes de esa acción se comprobó la selección de la conversación desde la sidebar. Después de New chat se volvió a seleccionar la conversación: messageVisible=true, responseVisible=true y newChatLandingVisible=false. La prueba de ida y vuelta quedó cerrada. No equivale a completar todos los flujos ni la biblioteca. Rust sigue diferido.



## Evidencia local (no publicada)



- `original-stack/state/demo-profile-host-v1/method-reset-conversation.png`: captura principal inspeccionada, 1280x820 y DPI 96. Se observan rail, avatar demo, sidebar, conversación y composer originales.

- Preflight completó exit 0 sobre 3.594 archivos y 2.322.524.331 bytes. ASAR demo: 512570f02e59d215dc69e74a5ce82e0a8f924efe879a094808c5fff5c2e728a7.

- Mensaje sintético enviado desde el composer y respuesta fija del adaptador observados en la ventana original. No se invocó un modelo ni herramientas reales.

- Captura CDP surface produjo artefactos; WindowIndex 0 capturó una ventana auxiliar negra. No son prueba visual válida. WindowIndex 1 capturó la ventana principal inspeccionada.

- Selector genérico de New chat fue ambiguo. La operación existente activate-navigation-button seleccionó correctamente el botón original y se observó la pantalla inicial.

- La revisión automática impidió publicar capturas/texto completos al repositorio público por posibles rutas/metadatos locales. Se conservan localmente; este documento publica sólo resultados resumidos.



## Continuar sobre la instancia existente



Launcher exec 19279; proceso launcher 43460; demo 128216; adaptador 138888. Revalidar antes de usar: estos identificadores no prueban vida futura. La app se observó en app://-/index.html. No lanzar otra instancia por defecto.



Arranque reproducido desde el worktree:



```powershell

./original-stack/Start-Demo.ps1 -StateName demo-profile-host-v1 -DemoHost -InspectRuntime -DemoPagesTls

```



El launcher verifica el inventario dos veces y resultó lento en el disco actual. No repetir un preflight adicional en el siguiente arranque. No omitir las verificaciones existentes ni modificar instalación personal/pristine.



## Flujo central: verificación actual



| Escenario | Estado | Evidencia / límite |

| --- | --- | --- |

| Mensaje demo y respuesta | Verificado | Ventana original y texto sintético observados. |

| New chat y regreso desde sidebar | Verificado | Ida y vuelta comprobadas. |

| Perfil → Settings → Appearance | Verificado | Controles originales operados en la instancia actual. |

| Cambio de tema y persistencia tras recarga | Verificado | System/dark → Light; tras recarga, root light y radio Light seleccionado. Restaurado System y observado root dark/radio System seleccionado. |

| Imagen demo: adjuntar/quitar/enviar/visor | Verificado | Pegado sintético manejado; quitar elimina el control; reenviar produce miniatura 78x78 cargada; visor 100x100, zoom 110x110 y cierre comprobados. No cubre picker nativo ni todos los formatos. |

| Acciones del chat: renombrar | Verificado | Chat actions → Rename → Chat title → Save; fila con nombre nuevo, restauración del título y diálogo cerrado comprobados. Otras acciones siguen pendientes. |

| Persistencia de imagen tras recarga | Verificado | Tras recarga y selección del chat reaparece imagen completa 100x100 natural, miniatura 78x78. La primera consulta durante carga devolvió vacío; no se trató como pérdida de datos. |



Captura de Apariencia conservada localmente en `original-stack/state/demo-profile-host-v1/method-settings-light.png`, inspeccionada. No publicada. La primera captura con ese nombre se tomó antes del cambio por fallo del selector; fue reemplazada por la captura Light realmente verificada.



Automatización: Demo-Controls añade choose-theme e inspect-theme para el input radio original. choose-theme solicita el cambio; su resultado no prueba que haya terminado. inspect-theme confirma el estado después. Durante recarga, ready=false no es fallo del frontend. La prueba no cambió renderer ni adapters de backend. Sintaxis Node comprobada.



## Trabajo retomado por el usuario



El usuario confirmó que acepta conservar las dependencias originales y después ordenó continuar todos los flujos del frontend. Ya no hay una decisión de empaquetado pendiente ni autorización para detener por ese motivo. Prioridad: flujos y pantallas originales con datos demo; no separar providers ni portar Rust.



Siguiente lote: Code Review → conexiones GitHub y preferencias personales, seguido de Controles parentales. Preferencias cloud ya tiene el flujo verificado indicado abajo. La antigua demo y adaptador terminaron (PIDs ausentes, puerto CDP no responde); Start-Demo fue relanzado sobre el mismo perfil, sesión exec 11311. No lanzar otra instancia mientras esa sesión esté viva.



Inventario disponible: 145 entradas léxicas del router en original-stack/evidence/frontend-route-inventory.json; incluye expresiones sin resolver, rutas condicionales y rutas anidadas. No equivale a 145 flujos operativos ni sirve todavía para dar porcentaje global. El primer recorrido se centrará en destinos visibles, conservando las rutas restantes como pendientes.



## Cuota y pendientes



Baseline 64%; última consulta 67%; máximo 74%. A 72% no empezar implementación nueva. La cuota es compartida; comprobar antes de lotes sustantivos. No usar reset credits. El hito temprano quedó verificado antes de 66%.



Pendientes globales: comparar visualmente estados equivalentes con la referencia del usuario, matriz completa de pantallas/estados y biblioteca integrada de flujos reutilizables. Avatar/cuenta/datos son sintéticos y la variante de navegación no representa necesariamente el perfil del usuario. No hay porcentaje global de finalización defendible.



## Evidencia de adjuntos de esta fase



Captura local inspeccionada: `original-stack/state/demo-profile-host-v1/method-attachment-conversation.png`. No publicada. Se utilizó únicamente el PNG empaquetado sintético de 100x100. Los controles originales realizaron pegado/quitar/envío/visor/zoom/cierre. Demo-Controls añade una operación limitada a esa conversación de verificación, una sola imagen cargada, dimensiones esperadas y hit-test del elemento imagen. No se modificó el renderer. Node --check pasó. Persistencia tras recarga verificada en la fase siguiente: imagen cargada, natural 100x100 y miniatura 78x78 tras volver al chat.



## Lote verificado: regresión del flujo central



Pantalla: conversación original. Problema corregido: los escenarios integrados requerían comandos manuales dispersos, sin una ejecución única que fallara ante una regresión. Cambio acotado: runner que opera el renderer mediante Demo-Controls, crea sólo datos sintéticos y comprueba nuevo chat, envío, adjunto, navegación, renombrado y persistencia. Aceptación: ejecución real completa, resultados booleanos resumidos sin publicar texto/capturas. No inicia procesos ni repite inventarios.



La búsqueda de montaje independiente se cierra por ahora sin una frontera viable demostrada: GPc monta hidratación persistente Gkc, $Nc y la cadena de providers; ZPc consume rutas y notifica servicios globales. El arranque OFc/UFc tiene efectos globales. No se probará ejecutarlo dos veces sobre la instancia de referencia. Esto no demuestra que la separación sea imposible.



Resultado: Verify-ConversationFlow.cjs final ejecutado en la instancia existente, exit 0, 13 observaciones aprobadas. Comprueba el mensaje dentro de thread-scroll-container para no confundir el título de sidebar con el turno. Se observó un fallo transitorio de lectura durante reload; ahora sólo las consultas reintentan dentro de 20 segundos, sin repetir acciones. Node --check pasó para runner y controles. Reporte local: state/demo-profile-host-v1/conversation-flow-check.json. No se publican capturas ni texto de renderer. La prueba deja conversaciones sintéticas con prefijo REA flow. Cuota de este lote: 66% → 67% compartida de cuenta.



## Reanudación 2026-10-15



Prosigue autorizado. Skills REA y architect-mode continúan aplicándose. Fallo observado: Preferencias cloud muestra Unable to load porque faltan GET /wham/settings/user y GET /wham/settings/configs/user-preferences. Se añadió demo_cloud_preferences.cjs a la frontera HTTP del host, con PATCH local/persistente, sin tocar renderer. Cuatro pruebas de contrato pasan; ocho comprobaciones de interfaz pasaron, incluidas recarga y restauración de valores. Configuración y valores son sintéticos explícitos.



La ventana de cuota ahora informa 0% usado; esto no amplía el presupuesto humano. Se conserva un tope adicional conservador de 7 puntos desde esta lectura (resto nominal de 67 a 74), con cierre de implementación a los 5 puntos. No se consumieron créditos de reset.



El recorrido anterior de Ajustes no equivale a flujos completos: errores de carga en Parental controls, Cloud preferences y Code Review; fallos de automatización en General/Notifications y observación de Profile insuficiente. Corrección del auditor: filtrar elementos de navegación visibles y rechazar alertas; no interpretar headings de otra superficie oculta como evidencia de éxito.



## Resultado verificado: Preferencias cloud



2026-10-15: paquete demo 39a30d970689473f6ff807d0a364e6008ba8aecc6175ddd6bdc8d76ba57afccd instalado y arrancado. Runtime 92572, adaptador 154176, launcher exec 11311 (revalidar antes de usar). Se preservaron renderer y avatar demo. Verify-CloudPreferences.cjs terminó exit 0 con ocho comprobaciones: patrón inválido bloqueado, borrador válido habilitado, guardado terminado, cambio de diff, persistencia de patrón y diff tras reload, restauración de patrón y diff previos. Reporte local cloud-preferences-ui-check.json; no publicado. El primer selector de menú tras reload corrió antes de que apareciera el menú: el runner final espera estados y no reintenta escrituras.



Code Review sigue mostrando Unable to load GitHub connections; corresponde a sus conexiones/repositorios, no a las gráficas de uso. Consultas fuente en app-initial: gBt obtiene GET /aip/connectors/{connector_id} y /ps/connectors/by-template; uKt obtiene /aip/connectors/{connector_id}/link. Falta resolver el contrato completo de la conexión sintética y preferencias personales. No implementar una respuesta vacía como prueba de todos los flujos. Controles parentales sigue pendiente.



Última cuota consultada: 1% en la nueva ventana. El resto conservador continúa limitado a 7 puntos desde el reinicio observado. No tocar Rust.



## Resultado verificado: Code Review (2026-10-15)



Conexión GitHub sintética y listado de dos repositorios cargan en el renderer original sin Unable to load. El adaptador implementa búsqueda/detalle y ajustes básicos de revisión; las preferencias personales comparten el almacenamiento cloud existente con migración compatible. Nueve pruebas de contrato pasan.



Verify-CodeReview.cjs pasó diez observaciones de interfaz: listado, detalle, cambio de revisión automática personal y del repositorio, persistencia de ambos tras recarga y restauración de ambos valores previos. Incluye dos observaciones repetidas de navegación; no son diez features independientes. El primer runner no volvía del detalle al listado; se corrigió usando el botón original Code review. Reporte local code-review-ui-check.json, no publicado.



Paquete instalado ec6cc5c5d0ae40ac78d056a4843d0ca217d4478f8fb1b80b919aeaeb11da53d0. Renderer intacto. Launcher exec 76235, runtime 124952, adaptador 66244: revalidar antes de operar. La inspección de procesos sin elevación omitía procesos existentes; se verificó la ruta con elevación y se detuvo sólo la copia demo antes de instalar.



Límites: trigger y exhaustive tienen contratos probados pero falta recorrer sus selectores en UI; GitLab, configuración security review, funding, instalaciones y enlace externo AGENTS.md no están cubiertos. Controles parentales sigue pendiente. No se afirma frontend completo. Rust no se ha retomado. Última consulta de cuota compartida: 1% en la ventana nueva; se conserva el límite conservador documentado.



## Selectores de revisión verificados (2026-10-15)



Verify-CodeReview.cjs ampliado terminó exit 0 con 17 observaciones (incluye navegación repetida): opciones On PR open, On every push y Smart detect; revisión exhaustiva; persistencia tras reload de trigger/exhaustive junto a los toggles ya verificados; restauración de valores previos. El popup original usa menuitemradio y requiere clic de puntero para abrirse: se adaptó la automatización, no el renderer. El perfil demo conservó On every push, valor presente al iniciar el runner tras la exploración manual. Los selectores por repositorio aún no tienen aceptación UI propia.



Siguiente contrato parental localizado: settings-bf811805d1dd.js consume current={id,role}; id nulo lleva a notifications={items,cursor}, familia existente lleva a members={items}. Miembros usan user_id, role, status, email/account_identifier; owner y child condicionan navegación. queries-14beb19c1d1a.js define GET /amphora, /amphora/notifications, /amphora/settings_layout, /amphora/{id}/members y /amphora/{id}/members/{user}/settings. member-settings-d0bcd40c2d00.js guarda permisos y settings mediante PATCH separados. Falta confirmar layout, identidad y contratos de invitación antes de implementar; no devolver familia vacía como supuesto flujo completo. Runtime actual queda en Parental controls.



## Controles parentales: invitaciones (2026-10-15)



Se recuperó el ciclo de invitaciones desde settings-bf811805d1dd.js, queries-14beb19c1d1a.js e invitations-1c36863b7cb3.js. demo_family_http.cjs sirve familia actual, creación, miembros pendientes, reenvío y cancelación exclusivamente local. Sólo acepta direcciones sintéticas example.invalid; no envía emails/SMS ni vincula cuentas. Cuatro pruebas de contrato pasan.



Paquete instalado dc1781cbcb7e289abc4b1471939785a917f957cf005ee20395f46547e87603b5, renderer intacto. Launcher exec 61708; runtime 171432; adaptador 17264. Revalidar antes de operar. La pantalla Parental controls ya carga sin la alerta anterior. Se creó manualmente una familia demo desde el formulario original y quedó una invitación child@example.invalid pendiente.



Límite de fidelidad encontrado: el layout de configuración de miembros (pages/sections/items, textos e identificadores) viene de GET /amphora/settings_layout. El ejecutable contiene los controles genéricos y su comportamiento, pero no prueba la estructura actual del servidor. No se ha inventado esa estructura. Pendientes: configuración de miembros aceptados, invitaciones entrantes, SMS, notificaciones de seguridad y estados condicionales. Ver FAMILY-CONTRACT.md. No equivale a completar Controles parentales ni todo el frontend.



Verify-FamilyInvitations.cjs terminó exit 0 con 13 observaciones de UI (incluye navegación repetida): formulario vacío deshabilitado, correo demo habilitado, alta/listado, persistencia tras reload, detalle, confirmación de reenvío, Sent!, cierre, cancelación y persistencia de la cancelación tras otra recarga. Reporte family-ui-check.json local, no publicado. El runner usa esperas sobre estados; el intento inicial manual de abrir Settings con una pausa fija fue demasiado temprano y no se considera regresión del componente. Cuota más reciente 2% de la nueva ventana; límite conservador sin cambios.



## General: preferencias verificadas (2026-10-15)



Verify-GeneralSettings.cjs pasó 12 observaciones reales: cambio, persistencia tras reload y restauración para Plain text composer, Show context window usage in the composer, Enable question notifications y Enable permission notifications. Fuente: general-settings-161845fad443.js (plainTextComposer/showContextWindowUsage) y notifications-settings-5f0e05f81547.js (permission/question). Se adaptó el selector de pruebas a aria-labelledby; no se cambió renderer ni adaptador. Reporte local general-settings-ui-check.json. Esto verifica preferencias persistidas, no todos los efectos derivados en composer o notificaciones del SO.



Notifications es una pantalla distinta del bloque Notifications dentro de General. Se observó Loading ChatGPT notification settings, sin controles: no contar el heading como flujo completo. Su contrato fuente es GET /notifications/settings => {settings:[{category,name,description,options:[{channel,name,enabled}]}]}; PATCH al mismo endpoint recibe {updates:{[category]:{[channel]:boolean}}} y retorna el mismo formato. El renderer implementa actualización optimista/rollback y menú checkbox. Los nombres, descripciones y categorías son datos servidos, no constantes completas del bundle. teen_safety además consulta métodos de contacto; tasks añade Manage tasks. Sigue pendiente implementar/validar esta pantalla sin atribuir exactitud a etiquetas inventadas.



Cuota consultada al empezar este lote: 3% en la ventana nueva. Se mantiene cierre de implementación a 5% y máximo conservador 7% desde el reinicio observado. El objetivo global sigue activo/incompleto; Rust sigue diferido.



## Perfil y avatar del rail corregidos (2026-10-15)



El perfil del rail esperaba GET /profiles/me, y la pantalla editable GET/PATCH /wham/profiles/me; ambos faltaban. demo_profile_http.cjs comparte un perfil sintético persistente entre profile_details y profile, conservando el PNG demo existente. Stats son datos demo vacíos, no actividad real. Soporta nombre/username y datos de perfil básicos; carga de foto nueva, showcase/stickers y variantes sociales no están implementadas.



Tres pruebas de contrato pasan. Verify-Profile.cjs pasó siete observaciones en la app original: desaparece el status Loading profile, imagen del botón Open profile menu cargada (complete/naturalWidth), nombre vacío bloqueado, nombre válido habilitado, guardado visible, persistencia tras reload, avatar aún cargado y nombre restaurado (la primera observación combina status e imagen). Reporte local profile-ui-check.json. No se cambia renderer, tipografía ni iconos.



La búsqueda inicial de /celsius/ws/user resultó ser el websocket, no la consulta de identidad; no se implementó un websocket ficticio para ocultar el fallo. El error real se rastreó a Q7i/J9i/vea y al selector del footer.



Paquete instalado 016c7548f27841ad7445e6ce8d71d99c508d7f9b7f72db2404c4c99294a4498b. Launcher exec 92360; runtime 18348; adaptador 39904; revalidar antes de operar. Última cuota 3%; límites conservadores siguen vigentes.



La revisión de ui-library no reabre el trazado recursivo de providers cerrado. El usuario acepta dependencias originales, pero un lanzador no se contará como biblioteca de componentes independiente. Los ejemplos aislados siguen siendo parciales y no reemplazan la ventana original.



## Recorrido consolidado de Ajustes (2026-10-15)



Audit-SettingsRoutes.cjs ahora espera estado estable hasta 10s, detecta texto Loading y comprueba el encabezado solicitado (Profile usa el nombre demo). Resultado real: 22 destinos abiertos y 3 con error, de 25 visibles. No es porcentaje de finalización; no prueba acciones, variantes ni pantallas fuera de Ajustes. Errores: Notifications, Account, Archived chats. La pantalla Voice abrió con cero controles; no contar funcionalidad de voz comprobada. Se publicó sólo resumen saneado en original-stack/evidence/current-flow-coverage.json, sin texto de usuario, rutas locales ni perfiles.



Siguiente fallo priorizado: Archived chats. data-controls-8b478162a0ba.js compone archivos locales vía thread/list archived=true y dos fuentes cloud (Vt/Tt). Se reproduce Retry en UI; el log del host señala /wham/tasks/list sin implementar. Trazar Vt (alias qB en app-initial) antes de implementar listado/restore; no sustituir todo por un array vacío ni contar el mock como flujo completo. El runtime actual queda en Archived chats.



## Archivados: listado y restauración cloud (2026-10-15)



Se añadió demo_archived_tasks_http.cjs con dos resúmenes sintéticos para GET /wham/tasks/list?task_filter=archived y POST /wham/tasks/{id}/recover|archive. El resto de tareas cloud no se intercepta. Dos pruebas de contrato pasan. Verify-ArchivedTasks.cjs pasó tres observaciones UI: listado original, restauración de sólo la fila elegida y persistencia tras reload manteniendo la otra. El primer intento falló por sintaxis de la expresión del selector (sin mutación); la versión corregida pasó. Reporte local archive-ui-check.json.



Queda una fila demo archivada; el runner consume una por ejecución y no recrea silenciosamente fixtures agotados. ARCHIVED-TASKS-CONTRACT.md distingue listado/restauración de visor cloud, búsqueda, eliminación ChatGPT y ciclo local aún pendientes. No se probó View now. La matriz saneada actualiza sólo la evidencia de Archived chats: 23 aperturas observadas, 2 errores (Notifications/Account); no es porcentaje global.



Paquete ec680680c75a71b7b81874f783d8b51c54faa7f33f7d5d71ef8c0dcda0e3bfa4. Launcher exec 75598, runtime 25480, adaptador 16428; revalidar. Renderer sin cambios. Cuota consultada: 4%, cierre de implementaciones nuevas a 5%, máximo conservador 7%. Rust sigue diferido.



## Cuenta: fallo de apertura corregido (2026-10-15)



El renderer reportó TypeError leyendo can_edit. gn en account-settings-f8f02db10301.js usa m?.viewer_access.can_edit del GET /profiles/me. Se completó el fixture con viewer_access:{can_edit:true}, coherente con el perfil demo propio; no se alteró el componente. Tres pruebas de perfil pasan y cubren el campo requerido.



Verificación UI real: Account -> General -> Account; ambas aperturas muestran Account, cuatro controles, cero alerts/failures y loadingText=false. Reporte local account-opening-check.json. No se probaron mutaciones de Cuenta. Su nombre usa PATCH /accounts/users/name (distinto de editar nombre de perfil); correo/reautenticación/eliminación siguen pendientes. La matriz actual tiene 24 aperturas observadas de 25 destinos de Ajustes, con Notifications todavía en error; esto no mide finalización global.



Paquete 52a4248b9c56ea9c7969f8476f5669b5b0ef96ce88ff4ee2d60eddbfcb3622dc. Launcher exec 72991, runtime 167648, adaptador 177564; revalidar. Renderer intacto. Última cuota observada 4%; cierre de implementación a 5%, máximo conservador 7%, sin reset credits. Rust continúa diferido.





## Notificaciones verificadas y cierre por cuota (2026-10-15)



Se añadió demo_notifications_http.cjs para GET/PATCH /notifications/settings, con una categoría tasks sintética y canales push/email persistentes. Los controles, menú checkbox y actualización optimista son del renderer original, sin modificaciones. Los nombres, descripciones e inventario de categorías llegan del servidor: el fixture no representa todo el inventario de producción. Entrega real, teen_safety y rollback visual siguen pendientes; ver NOTIFICATIONS-CONTRACT.md.



Tres pruebas de contrato pasaron. Verify-Notifications.cjs terminó exit 0 con siete comprobaciones reales: email habilitado, canal email independiente, todos desactivados, Off persistido tras reload, push habilitado, Push persistido tras reload y canales iniciales restaurados. Reporte local notifications-ui-check.json, no publicado. La matriz ahora registra apertura observada de los 25 destinos de Ajustes; no significa todos sus flujos terminados ni un porcentaje global de frontend.



Paquete instalado 5d4a106d254e34406b807d794a3b58a0172624665c194cfd8ce2ebba1ea3b36f. Launcher exec 34457, runtime 156880, adaptador 176452; revalidar antes de operar. La cuota compartida alcanzó 5% de la ventana nueva: cierre de implementaciones nuevas; el margen hasta 7% se reserva únicamente a verificar/guardar. No iniciar otra feature con esta autorización.



Pendientes principales: operaciones de Cuenta; visor de tareas cloud y ciclo completo de archivados; variantes y configuración parental definidas por servidor; variantes de perfil/carga de foto; integración de componentes reutilizables todavía parcial; pantallas y estados fuera de los escenarios verificados. La extracción distribuida y la ejecución del renderer original no equivalen a una biblioteca completa ni a todos los flujos funcionales. Rust sigue expresamente diferido.





## Security original read flow verified — 2026-10-15



Original Security opened but failed to load scans. Runtime log confirmed thread/start rejection: Ephemeral demo sessions are not implemented. Source app-initial:70544 requests exactly ephemeral:true, permissions:read-only (colon-prefixed), threadSource:mcp_extension_host before MCP calls. Added only this temporary response to ThreadStore; no persisted history, sidebar notification or executor. Other ephemeral shapes remain rejected. 34 targeted thread/security tests pass, including no disk/store mutation and invalid permission/source rejection.



Verify-Security.cjs passed eight UI observations: scan list, repository list, global findings, unmatched search, matching search, original finding detail, back to scans and list after renderer reload. Reports stay local. Initial automation missed role=button rows and assumed Security resets to Scans; corrected selectors and explicitly chose Scans because original navigation retains its last subsection. Renderer untouched. Read coverage is not mutation coverage: triage, rename, scan form lifecycle, remediation and additional states remain pending.



Runtime 19972, adapter 33460, launcher session 63214 (revalidate). Same existing host package, Python adapter changed. No private images or runtime dumps published. Limit is 50% total used, no new implementation at 40%, Rust deferred.





## Security rename and triage verified — 2026-10-15



Added source-shaped rename_codex_security_scan and set_codex_security_finding_triage, returning original response contracts. Explicit demo configuration enables persistent demo-security.json; read listings, counts, filters and detail use that state. Atomic replacement preserves saved data on write failure. No scan executor or repository access. Original renderer unchanged. Context required for wont_fix and max 2400 match recovered dialog; 200-character name bound is explicitly demo policy.



35 targeted tests pass. Verify-SecurityMutations.cjs passed 14 UI observations including repeated navigation: Escape cancels inline rename; Enter saves; reload retains name; name restored; finding detail, close cancel, missing context disables confirmation, submit closes, reopen works, reload keeps reopened finding. UI checks use original double-click/name input and close dialog. The previous eight read checks also passed against this adapter. Closed-state reload itself is not separately verified. Runner leaves original name/open state.



Runtime 47608, adapter 159828, launcher session 82108; revalidate. Remaining Security work: scan creation/form lifecycle, other report/remediation states and error UI; do not count this as all Security complete. Limit 50%, stop new changes at 40%, last quota observed 9%. Rust deferred.





## Security setup controls verified — 2026-10-15



Verify-SecurityScanForm.cjs passed eight observations: list baseline, new scan requires repository, deep mode disables scope selection, extra context fields appear/hide, standard mode re-enables scope, Single folder selected, leave setup returns to list. Original menu uses menuitem rather than option/radio; corrected the test selector after first timeout without changing renderer. No scan submitted. New code is verification only.



Remaining creation seam is concrete: no eligible demo project in selector; inspect_codex_security_target returns target.targetMetadata. Source _c prepares scan/handoff, creates original security_scan thread, attaches continuation, then navigates. Do not claim submission or introduce an executor. Existing read and rename/triage workflows remain verified. Runtime 47608/adapter159828, session82108 unchanged; revalidate. Limit50%, last read9%, Rust deferred.



## Security standard submission connected — 2026-10-15

Added demo_security_setup.py and integrated original inspect target/setup, workspace open/submit/start, handoff claim/attach/release and cancel contracts. Only synthetic C:/REA-Demo/security target accepted; no repository I/O or scanner. Distinct scan UUIDs and setup sessions persist in demo-security.json; repeat start reuses the same session result. Original repository detail Scan action opens setup with targetId, so no fake project selector entry was needed. Original creation controller creates its conversation through existing demo transport. Attaching that conversation completes an explicitly simulated empty report.

36 targeted tests pass. Verify-SecuritySubmission.cjs passed 10 combined UI/state checks: repository navigation and enabled setup, actual Start scan, new report/attached thread in state, setup departure, listing, reload persistence, report detail, View activity with the matching scan ID and fixed demo response in original conversation. Two demo reports were created during first and extended acceptance runs and retained. No screenshots or raw conversation dumps published. Fixed mixed-encoding bytes in this status file while preserving valid UTF-8 text.

Runtime56660, adapter34288, launcher8995; revalidate before reuse. Next remaining Security gaps: deep/diff submission variants, error/recovery states, remediation presentation/actions. Do not claim all Security or all frontend finished. Limit50% used, new implementation stops40%, Rust deferred.


## Security submission modes verified — 2026-10-15

Extended existing Verify-SecuritySubmission.cjs without changing renderer or demo provider. Deep passed 11 checks, working-tree diff 11, specific revisions range 14, specific commit 12. Range empty and base-only states disable Start scan; valid head enables it. Each case creates a distinct report/conversation, survives reload, opens report detail and View activity with original matching prompt/fixed reply. Saved mode and diff kind checked; saved base/head and commit values also inspected in completed local state and now enforced by runner. These are synthetic revisions, not Git resolution. Four further local demo reports retained.

Runtime56660/adapter34288 remains same; no restart. Last quota10%, cap50%, new implementation stop40%. Next Security gaps are arbitrary target picker, error/recovery and remediation flows. Mode-submission gap is closed for the described cases, not every possible combination. Rust deferred.


## Security recovery error and retry verified — 2026-10-15

Added original recover_codex_security_scan_results contract. Set-SecurityScenario.py selects a credential-free demo recovery case, preserving all unrelated state: original report becomes failed with retained results; first recovery fails with explicit synthetic error; retry returns recovered findings. The original renderer owns message/button/loading transitions. 37 targeted tests pass. Verify-SecurityRecovery.cjs passed six UI observations including repeated navigation: retained error/action, first recovery error visible, retry removes error and returns findings, recovery persists after reload. Normal scenario restored afterward; no screenshots or raw content published.

Runtime139928, adapter173492, launcher73965; revalidate. Original host package unchanged. Remaining Security gaps: remediation presentation/actions, arbitrary target picker and additional partial/truncated/failure variants. This is one recovered error/retry flow, not all error states. Last quota10%; cap50%, stop new implementation40%; Rust deferred.


## Active acceptance: Security remediation
Original finding detail currently disables Generate patch because the demo reports remediationAvailable=false. Recovered security-route-feb1afe59e86.js:825-930,1452-1620,1705-1744 defines claim/version checks, generate/apply/verify actions, diff presentation and delivered/cancel contracts. Add only synthetic state transitions; never apply repository patches. Acceptance: original buttons advance through all three stages, diff visible, reload retains state; unit checks reject wrong tokens/versions. Bound investigation to this controller and adapter. Rust deferred; quota10%, cap50%.


## Security remediation stages verified — 2026-10-15
Added demo_security_remediation.py with original request/action/claim/delivered/release/cancel contracts. Claim tokens and expected versions guard the synthetic occurrence. Delivery returns synthetic generated/applied/verified state; no scanner, patch application or verification commands run. Original renderer, diff component and stage buttons unchanged. Original controller creates a separate demo conversation for each stage.

39 targeted tests pass, including stale token/version rejection, release/reclaim, cancel/retry and persistence. Verify-SecurityRemediation.cjs passed nine UI observations (including navigation): Generate patch enabled in Patch tab, original diff shown with Apply patch, demo application exposes Verify fix, verification completes, reload retains patch/verification and removes action buttons. Two earlier verifier failures were selector assumptions: Patch tab was not selected, then a Summary-only text predicate was incorrectly required in Patch. Both resolved from observed DOM; no renderer guards bypassed. Error/busy/resend UI variants remain unverified even though adapter rejection paths are tested. Synthetic finding stays verified, so rerunning the initial-state test requires an explicit fixture reset.

Runtime115880, adapter159068, launcher42570; revalidate. Package unchanged. Remaining Security: arbitrary target picker, partial/truncated and additional failure/pending variants. Broader frontend and reusable package remain incomplete. Last quota10%, cap50%, new implementation stop40%; Rust deferred.


## Active acceptance: reusable package consumption
Destination is the existing @rea/ui consumer package, not a replacement app screen. Missing evidence: install/resolve package outside this repository with all CSS/font references intact. Add an explicit payload allowlist and isolated packed-consumer verifier; preserve component bodies. Verify tarball imports through public exports, render existing components and resolve all local stylesheet resources. This closes packaging evidence only; original conversation/provider integration remains pending. No recursive provider trace or runtime re-extraction.


## Component subset packaged and consumed — 2026-10-15
Added explicit npm payload allowlist and CONSUMING.md. verify-package.mjs builds a local tarball, installs it offline in a fresh temporary consumer, imports all public JS exports, server-renders the existing Button, and resolves CSS imports/font references. Passed:244 packaged files,5 CSS files,66 local resource references. No component bodies, renderer, examples or CSS changed. Tarball and isolated consumer retained at C:/Users/PC/AppData/Local/Temp/rea-package-consumer-9xmfM7 for local inspection; no profiles or runtime data included. This establishes consumability of the current component subset, not integrated original conversation or browser visual parity. Original-dependency full-screen package remains pending. Clarified the accepted dependency-retention decision in CONVERSATION-INTEGRATION.md; old67% budget is historical. Quota10%, cap50%, Rust deferred.


## Active acceptance: original rail customization
Missing acceptance: unpin and reorder via original controls, persistence and restoration of original order. Existing demoSidebarSettings already implements storage; add only guarded CDP gestures and a UI runner unless an observed contract fails. Preserve renderer/avatar/CSS. Verify current pinned destinations, unpin/reload/repin and drag/reload/restore. Source: recovered app-initial sidebar_customization write at119279.


## Rail customization partially verified — 2026-10-15
Added inspect-rail, guarded original pin/unpin controls and real pointer drag gesture, plus Verify-RailCustomization.cjs. Original renderer/adapter unchanged. Observed avatar image, Sites unpin, reload persistence, repin, changed drag order and reload persistence. Runner fails at automatic inverse-drag restoration in two runs; extra2s stability wait failed to resolve it, so timing approach stopped. Do not mark runner passed. Separate explicit Sites->Pull requests drag after runner termination restored visible baseline, then reload/DOM and persisted state confirmed Sites/Pull requests/Projects with avatar. Evidence:rail-customization-acceptance.json (sanitized). Next investigation should inspect actual pointer/drag lifecycle, not repeat waits or mutate stored order to fabricate success. Other rail destinations/conditional variants and visual parity remain pending. Runtime115880/adapter159068 unchanged; last quota10%, cap50%, Rust deferred.


## Rail inverse-drag diagnosis corrected and acceptance passed — 2026-10-15
Order traces established the cause of the earlier failure: repinning Sites appends it after Projects, so the post-repin order differs from the original baseline. Both forward and inverse drag gestures worked. The previous assertion conflated inverse-drag behavior with restoring the pre-unpin baseline; timing/hydration was an unsupported hypothesis and the extra wait was removed. Verify-RailCustomization.cjs now checks inverse insertion against the actual reordered list, then restores the initial visible order separately with original gestures. Ten checks pass, including restored order/avatar after reload. No renderer, CSS or adapter changes. Trace/report remains in ignored demo state; sanitized evidence corrected. Quota11%, cap50%, Rust deferred. Other rail variants and matched visual parity remain pending.


## Active acceptance: profile photo
Original profile editor has image picker and crop dialog (profile-4d7f26c9ae6d.js:6020,1962). Upload contract is multipart POST /wham/profiles/me/photo -> asset_pointer, then PATCH profile_asset_pointer (app-initial:255652-255687). Current demoProfileHttp rejects pointer/photo endpoint. First exercise local crop/cancel/preview and observe upload boundary, then implement only the required demo contract. No real photo or account service.


## Original profile crop flow verified — 2026-10-15
Verify-ProfilePhoto.cjs passed eight UI observations using deterministic libraryFixture PNG: original input loads96x64 image into Adjust your image, Zoom in/out changes slider, cancel keeps previous editor photo, reopening works, crop Save produces loaded square preview, outer editor Cancel closes without avatar change, reopen discards the draft. Demo-Controls adds scoped file input selection and original crop actions, never fabricated events/state or renderer modifications. The initial manual Edit profile click happened before section readiness; retry after load succeeded, and runner waits explicitly. No profile/host code changed. Upload/save persistence is NOT verified: original app-initial:255652-255687 posts multipart /wham/profiles/me/photo -> asset_pointer then patches profile_asset_pointer; current demoProfileHttp lacks both. Next step is inspect host multipart representation and implement only the synthetic upload/pointer contract, rebuild demo host once, then test photo save/reload/rail. Quota11%, cap50%; Rust deferred.


## Photo upload adapter implemented; runtime verification pending — 2026-10-15
Recovered app-shared:166183-166222 serializes FormData into Uint8Array multipart (boundary ----codex-upload-UUID), host main:32057 preserves bytes/headers. demoProfileHttp now handles one bounded PNG/JPEG file, stages content-addressed data URL, returns asset_pointer, validates profile_asset_pointer against local staged assets, and changes active photo only on PATCH. Build-DemoHost forwards original headers. Four focused tests pass including staged-vs-active identity, malformed input/unknown pointer rejection and failed-write preservation; no UI upload success claimed yet.

Built S:/rea-profile-photo-package-v1/app.asar SHA25628d2f01d6bd8851075757253502e0cadfd2f4a0609c0ec00453893755c65afa0 with preserved-demo-avatar.png. Stopped verified demo115880 and confirmed launcher42570 terminal before Install-DemoHost. Installed successfully in S:/rea-profile-runtime-v1 with integrity manifest updated. New launcher42185 is live performing preflight; do not launch another or trust old demo-session PIDs until it updates. Next: extend Verify-ProfilePhoto for actual editor Save, reload and rail photo check, retaining cancel tests. Source changes are uncommitted until UI acceptance. Quota11%, Rust deferred.


## Profile photo save and rail persistence verified — 2026-10-15
New host runtime119184/adapter20260, launcher42185, package28d2f01d6bd8851075757253502e0cadfd2f4a0609c0ec00453893755c65afa0. Verify-ProfilePhoto.cjs passed14 observations: previous crop/zoom/cancel checks plus original editor Save, staged asset associated with profile, rail loaded data URL hash exactly matches saved cropped photo, reload retains same rail hash, reopened editor shows saved square image. Demo now intentionally retains the synthetic colored photo; no personal image was used or restored. Renderer unchanged. Four focused profile HTTP tests pass. Upload/photo-pointer contract now verified in UI, not just unit tests; other format/error/shape/profile variants remain pending. Quota11%, cap50%, new changes stop40%; Rust deferred.


## Archive variant boundary and Settings search verified — 2026-10-15
Current Settings archive rows are noninteractive labels with Unarchive controls (observed DOM; data-controls-8b478162a0ba.js:402-449). Clicking the title as a button fails because that control does not exist. The separate original archive sidebar has cloud row onOpen navigation to /remote/:id (app-initial:383407-383522,383844-383854); archive sidebar state VWa is conditioned on gate3500066563 and /archive or matching archivedConversationPreview state (294286-294327). This gate is absent from current demo_feature_flags; do not invent Settings row navigation or claim the viewer verified. Its destination contracts and deliberate variant setup remain pending.

Verify-ArchiveSearch.cjs passed4 UI observations against existing synthetic archive2: baseline, no-match empty search, exact-match result, clearing search restores item. No renderer/adapter changes, no restore/deletion. Added bounded archive-row inspector to distinguish actual DOM from assumptions. Next viewer work should resolve original entry/gate eligibility and cloud task detail response; current result closes Settings search only. Runtime119184/adapter20260 unchanged. Quota11%, cap50%, Rust deferred.


## Active acceptance: Archive destination variant
Recovered app-initial:347778 reads IWa;348185-348202 adds original Archive destination when gate enabled and app capability e;444278 registers /archive. Enable3500066563 explicitly as demo scenario only. K4o:382547-382572 requests /wham/tasks/search with query/limit/cursor then filters archived client-side. Add that minimal read contract preserving archived metadata. Acceptance next: original Explore->Archive, list/search and preview navigation; task viewer contracts still require observation. No assertion about live-account rollout.


## Archive gate configured; Explore exclusion discovered — 2026-10-15
Five focused archive/Statsig tests pass. Built and installed S:/rea-archive-package-v1/app.asar SHA256fdbc2da6d129073eb87b86a1b6ea6baa954b988ac92bcf59e23a77ab07ca3922, renderer untouched. Stopped119184/launcher42185 confirmed terminal; current launcher51298, runtime141000/adapter165088. Probe-ArchiveViewer.cjs waits for original Explore->Archive but that assumption is contradicted by further source: fFn at119099-119109 explicitly excludes builtin:archive, and exploreDestinations applies it at348369. Gate3500066563 creates the destination but does NOT expose it in Explore. No filter was bypassed and no viewer success claimed. Need resolve intended host/navigation entry, not force renderer state or fabricate a menu. Search contract is implemented/tested but new sidebar search not runtime-verified. Probe session22106 may still be waiting; revalidate handle before any interaction. Quota12%, cap50%, Rust deferred.

Probe22106 was explicitly stopped after source proved Explore excludes Archive; terminal confirmed. App launcher51298 remains active. No probe restart needed for this disproven entry.


## Active acceptance: original Archive host navigation
Destination: original /archive sidebar and archived conversation preview. Missing: runtime evidence of this route; Explore explicitly excludes it. Source: app-shared Hf exported as Nvn, dispatchHostMessage at13399; app-initial navigate-to-route handler478430-478462. Add a fixed demo-only host-message operation, preserving router guards. Verify original sidebar appears, then observe preview boundary. This simulates host navigation, not a visible Explore entry. Runtime141000 and adapter165088 verified live; quota12%, Rust deferred.


## Archive route observed; viewer assumption corrected — 2026-10-15
Added fixed open-demo-archive-route operation using original Nvn.dispatchHostMessage; node --check passed and live runtime accepted it. Original Archived chats screen rendered synthetic archive2, search, type/project filters and Unarchive. Original Cloud filter was selected successfully; Explore popup closed. Source rFs at441822 delegates to bFs, which at442519 explicitly lazy-loads DataControlsSettings. Observed row ancestors are noninteractive. This route alone therefore does not establish the separate archive sidebar/preview variant. Existing gate configuration is not proof of effective sidebar selection; do not add task-detail fixtures until that variant actually requests them.
Screen also shows Could not load archived chats / Retry, including after Cloud filtering. Runtime logs identify missing /conversations HTTP contract; do not hide error or claim full acceptance. Next: resolve DataControlsSettings archived ChatGPT list request shape and minimum synthetic list response; separately verify effective sidebar gate/capability before preview work. No renderer/CSS/store overrides. Host-message test entry is not a discovered visible menu entry. Runtime141000/adapter165088 remain live. Quota12%, cap50%, Rust deferred.


## Active acceptance: Archive list loading
Observed /archive error comes from GET /conversations?is_archived=true. Original Ggn101181 and iPr170408-170422 consume items/offset/limit/total. Add only an explicit empty ChatGPT archived-list scenario in the existing archive HTTP adapter; keep synthetic Codex archive2 intact. Reject invalid pagination, leave unarchived and foreign-origin routes untouched. Verify unit boundaries, build unchanged renderer, then original Archive screen without error, search and filter behavior. Empty ChatGPT fixture does not verify ChatGPT archive row actions or preview. Quota13%, Rust deferred.


## ChatGPT archive list contract fixed; durable archive remains failing — 2026-10-15
Added explicit empty archived ChatGPT list with items/offset/limit/total, preserving unarchived/foreign routes and validating pagination. Four focused tests pass. Corrected inspect-archive-flow to recognize Could not load (previous regex missed it). Added Verify-ArchiveRoute.cjs with six intended load/search/filter assertions; runner FAILED at first no-error assertion, not accepted.
Built/installed package6744a2e284ed6a3839e526ca128ca2fc9462def7f778efe5af34d482c8b07ab2 at S:/rea-archive-list-package-v1; renderer unchanged. Previous launcher51298 terminal confirmed; current launcher60923, runtime33508/adapter33104. Current logs no longer show /conversations failure. Remaining original error is durable host thread/list requiring sign-in; data-controls:760-775 combines durable connection errors separately from ChatGPT HTTP errors. Synthetic cloud row renders, but full archive acceptance remains red. Next: bounded source inspection of durable host transport routing to existing isolated demo adapter, not real authentication or hiding errors. No further task-detail backend work until preview is reachable. Quota13%, cap50%, Rust deferred.


## Active acceptance: isolated durable archive transport
Original j5 at main138419-138500 selects authenticated durable WebSocket. Demo only routes local host through CODEX_APP_SERVER_WS_URL, leaving durable real-auth dependent. Add demo-host-only transport seam for host id durable, validated ws://127.0.0.1:port endpoint plus /demo-durable path. Dedicated read-only RPC catalog returns empty durable threads, never aliases local state or broadcasts. Verify endpoint boundaries, unsupported mutation rejection and original Archive six-check runner after rebuild. Renderer untouched; no production auth change. Quota13%.


## Original Archive list acceptance passed — 2026-10-15
Demo-only j5 transport seam routes durable to validated loopback /demo-durable with original WebSocket transport. Separate read-only server branch supplies empty durable catalog; it never joins local event clients or aliases local threads. Two JS endpoint tests, two Python durable RPC tests and five existing transport tests pass. No real token/production auth or renderer changes.
Installed package1544357ff5e4a2f93381420d7e1caa8aa59e0647e00a0b389a0fd099df077068 from S:/rea-durable-archive-package-v1. Previous launcher60923 terminal confirmed; current launcher90745/runtime94376/adapter142620. Verify-ArchiveRoute.cjs PASSED six checks: original route without load error, no-match search, matching search, Local excludes cloud task, Cloud includes it, All chats restored without error. Sanitized RPC observation confirms archived thread/list reached demoHost durable. This supersedes the failed list acceptance in the preceding entry.
Scope remains partial: empty ChatGPT/durable catalogs do not verify their row actions; separate original archive-preview sidebar remains unverified. Full frontend and reusable screen package remain incomplete. Next milestone should resolve effective Archive sidebar capability/gate or proceed with integrated original-screen package work, avoiding another speculative backend chain. Quota13%, cap50%, Rust deferred.


## Active acceptance: original frontend dependency package
Reusable delivery lacks the complete original dependency payload; @rea/ui only packages a partial component subset. User permits original internal dependencies. Package the existing extracted webview without transformations into a private local npm payload, verify every member against pinned pristine ASAR bytes, and consume the packed artifact from an isolated directory. Preserve paths, entry HTML and all assets; no new extraction/provider recursion. Success here proves complete static payload consumption, NOT a standalone mount or all UI flows. Full-screen host/provider integration remains pending. Output on S with sufficient free space, no profiles/raw logs in package.


## Complete original webview payload packaged and consumed — 2026-10-15
Package-Frontend.cjs validates pinned ASAR SHA256c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038, exact extracted member set and byte equality for every original webview member before packaging unchanged files. Output S:/rea-original-frontend-package-v1 contains20119 files/545939185 original bytes plus package metadata. No re-extraction, rewriting, profiles or user content.
Verify-FrontendPackage.cjs packed private @rea/original-frontend, installed offline with scripts disabled in S:/rea-original-frontend-consumer-v1 and verified every installed member hash through the public package import. PASSED20119 hashes. Tarball rea-original-frontend-0.1.0.tgz is217050853 bytes. npm install took several minutes; authoritative process/log checks established it was active, and verifier exited0. Local artifact retained; only scripts/docs/sanitized evidence are published.
FRONTEND-PACKAGE.md documents reproducible commands and file-URL exports. This completes static original-dependency payload consumption, not a standalone React screen, a functioning independent host or all frontend flows. Next acceptance remains mounting the original shell/conversation/composer from this consumer with original host/bootstrap contracts; do not substitute the partial @rea/ui gallery. Existing original demo runtime94376/adapter142620 was not modified by packaging. Rust deferred; full goal remains incomplete.


## Active acceptance: installed frontend consumer in original host
Original protocol root C(e), browser-background-switches:2910, supplies complete webview tree to app:// resolver E and handler O. Add explicit demo-only FrontendPackageRoot option; verify installed payload hashes before selecting its webview as root. Preserve original host, protocol traversal guards, CSP and renderer bytes. Verify original conversation runner against this installed payload and record source-root selection; this is original-host integration, not independent React component mounting. No provider recursion.


## Installed frontend runs in original demo host — 2026-10-15
Added FrontendPackageRoot to Start-Demo/Start-Original and demoFrontendRoot validation at original protocol root C(e). Installed host package0a2ee2d30ebc3d2df4661bd03b138842537b4d7e973996ecffb4c3c2f4fd17c0 from S:/rea-consumer-host-package-v1. Renderer assets unchanged. Runtime159248/adapter171924, launcher63522. Original host logs confirm20119 installed files verified (twice: original root called twice). Startup is slow due synchronous full-file verification; no process was restarted on timeout.
Verify-ConversationFlow.cjs PASSED13 scenarios using installed payload: landing, attachment add/remove/restore, message/fixed demo reply, loaded sent image, navigation/reopen, rename and reload persistence. Two focused validation tests pass. This establishes integrated original-host package consumption; it is not an independent React component API or fresh-machine portable runtime.
Added fixed capture-demo-window operation; local consumer-window.png at1280x820 inspected. Window structure/sidebar/conversation/composer visible, but CDP capture has black titlebar/rail and white Home glyph/background unlike reference. Bringing demo forward did not resolve it. forced-colors=false and prefers-contrast=false; initial visibility hidden. Do NOT claim visual parity from hash/flow tests. Next bounded task: compare actual desktop capture versus CDP/compositor and bundled-root baseline at matching conditions; identify host-window/capture vs resource cause before changing CSS. Separate optional optimization: validate installed payload once per process instead of twice; preserve integrity. Screenshot and profile not published. Full frontend still incomplete, Rust deferred.


## Active acceptance: consumer screenshot composition
Existing evidence/windows-capture-contract.json already diagnoses identical white Home/rail anomaly with surface capture and prescribes fromSurface:false, as used by Probe-Renderer. New capture-demo-window accidentally defaulted to surface mode. Reuse that evidence: preserve prior surface capture locally, set explicit view capture, compare same runtime/state. No CSS/renderer/root changes or new native capture dependency. Computer-use skill read, but required node_repl tool is absent; no unsupported sky calls attempted.


## Consumer rail anomaly resolved as surface capture artifact — 2026-10-15
Reused existing windows-capture-contract.json instead of native capture fallback or CSS changes. capture-demo-window now explicitly uses fromSurface:false and reports captureMode:view. Same runtime159248 and same synthetic thread/state recaptured at1280x820. Visual inspection confirms dark-blue rail/titlebar, translucent selected Home and normal icons; prior surface capture showed black background/opaque white Home. Original renderer/package untouched. This resolves that specific visual discrepancy, not full matched-state parity against every original screen. Prior surface image preserved locally as consumer-window-surface.png; view image consumer-window.png remains ignored. No screenshot uploaded. Next consumer improvement is avoiding duplicate full hash verification on startup, followed by broader screen consumption/remaining flows. Quota last14%, cap50%, Rust deferred.


## Active acceptance: installed consumer Appearance modes
Original Appearance loaded with System checked and effective data-theme dark. Existing General runner covers other preferences, not Appearance persistence. Add bounded UI-only runner: Light/Dark radios update effective theme, Light persists after reload, capture both modes using view capture, restore original radio and verify persistence. No renderer/adapter/style changes. Guard settings readiness before clicking (initial manual actions were attempted during Loading settings and were retried after observed navigation).


## Appearance mode and persistence verified in installed consumer — 2026-10-15
Verify-Appearance.cjs passed6 checks using original appearance-theme radios (general-settings:7940): Light/Dark effective theme, Light before reload, persisted Light, restore original System/effective dark, persisted restoration. Original screenshot view captures appearance-light.png and appearance-dark.png inspected locally at1280x820; original layout, rail, theme selection and color fields visible in both. No CSS/renderer/adapter changes, no screenshot publication. Existing installed consumer runtime159248/adapter171924 retained. Initial preference restored via original UI and verified after reload.
Aperture remains bounded: accent, custom colors/font, advanced appearance and reset/import/export not verified by this runner. Wider Settings destination opening is not interaction completion. Rust deferred; last quota14%, cap50%.


## Active acceptance: Appearance customization
Original general-settings:2535-2600 defines variant-specific accent/surface/ink/font controls. Runtime Dark accent menu exposes Default/Blue/etc as menuitemradio; initial Default and System font. Add read-only state inspector; verify accent selection, editable color commit and font picker with persistence/restoration using existing UI. No adapter changes unless a concrete request fails. Scope does not include import/export yet.


## Appearance accent failure isolated; adapter repair implemented
Original Blue menuitemradio selected with real click; UI rolled back and showed Could not update accent color. activate-popup-item only supports menuitem, so do not use it for radio items. Runtime error Unsupported demo setting comes from demoSidebarSettings. Recovered app-shared:188261 defines8 values;188611-188619 PATCH feature=chat_theme/value requires response.chat_theme matching selection and rollback on failure. Added typed accent preference persistence and returned saved preference object, preserving atomic writes and existing booleans/sidebar. Test verifies all8 colors, invalid value and failed-write preservation. Runtime is still on prior package: no UI success yet. Font picker was opened/closed without changing System; color fields untouched. Next rebuild host, rerun accent persistence/restoration, then colors/font; do not claim these complete.

Build-DemoHost for S:/rea-accent-package-v1 is active in exec session75996; re-poll this handle, do not duplicate the build. Runtime159248/adapter171924 and launcher63522 remain on installed consumer package0a2ee2d30ebc3d2df4661bd03b138842537b4d7e973996ecffb4c3c2f4fd17c0. Four sidebar/preference tests passed. No install/restart performed in this accent repair turn.


## Appearance account accent verified — 2026-10-15
Prior builder75996 completed successfully with package5235f4fddd10054dd6754bb745090a4d560dc85a1c45b17bacbf11ded542e0d7 in S:/rea-accent-package-v1. A contemplated stop was prevented by PID/command guard because builder had already exited; no kill or duplicate build occurred. Original zero-byte output/unchanged IO proved only a long wait, not permanent failure. Tiny write-probe.txt retained in build directory. Previous runtime159248 and launcher63522 stopped/terminal confirmed before install.
Current launcher95146/runtime169216/adapter138336 uses installed frontend consumer. Both20119-file validation markers observed; observation waiter25676 ended successfully. First Verify-AppearanceAccent run saved Blue then failed during reload because probe target temporarily absent; finally restoration also hit that gap. Fixed wait to tolerate only Original renderer missing and await initial navigation readiness. Second run PASSED4 checks from Blue baseline (select Green, reload, restore Blue, reload). Then original UI restored pre-investigation Default and read-only persisted setting confirmed default. No font/background/ink changes.
Four focused adapter tests pass. Runtime source/renderer unchanged except demo host contract; no UI error hidden. Accent accepted; custom color validation, font, advanced/reset/import/export remain pending. Next batching should avoid rebuild per isolated preference: collect compatible observed contracts before a rebuild; full consumer integration already verified. Last quota14%, cap50%, Rust deferred.
