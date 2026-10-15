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
