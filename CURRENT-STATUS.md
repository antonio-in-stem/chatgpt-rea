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

## Próxima tarea única

Pasar del ejemplo aislado de biblioteca a una pantalla reutilizable integrada de conversación, usando la ventana original verificada como referencia. Primero inspeccionar la composición existente y sus dependencias completas; fijar una pantalla destino y aceptación visible antes de cambiar código. No ampliar mocks ni extraer más iconos/funciones por cercanía.

Aceptación del siguiente lote: consumidor reutilizable con composición de pantalla conectada, navegación/sidebar/composer coherentes y datos/acciones demo explícitos, verificado en el mismo tema/tamaño y estados de la referencia. Si sólo puede lograrse una aproximación, reportar el bloqueo antes de implementarla. El runtime original debe seguir disponible como referencia, no sustituirse por una galería. La matriz anterior verifica la base central, no toda la app ni todas las acciones del menú.

## Cuota y pendientes

Baseline 64%; última consulta 66%; máximo 74%. A 72% no empezar implementación nueva. La cuota es compartida; comprobar antes de lotes sustantivos. No usar reset credits. El hito temprano quedó verificado antes de 66%.

Pendientes globales: comparar visualmente estados equivalentes con la referencia del usuario, matriz completa de pantallas/estados y biblioteca integrada de flujos reutilizables. Avatar/cuenta/datos son sintéticos y la variante de navegación no representa necesariamente el perfil del usuario. No hay porcentaje global de finalización defendible.

## Evidencia de adjuntos de esta fase

Captura local inspeccionada: `original-stack/state/demo-profile-host-v1/method-attachment-conversation.png`. No publicada. Se utilizó únicamente el PNG empaquetado sintético de 100x100. Los controles originales realizaron pegado/quitar/envío/visor/zoom/cierre. Demo-Controls añade una operación limitada a esa conversación de verificación, una sola imagen cargada, dimensiones esperadas y hit-test del elemento imagen. No se modificó el renderer. Node --check pasó. Persistencia tras recarga verificada en la fase siguiente: imagen cargada, natural 100x100 y miniatura 78x78 tras volver al chat.
