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
