# Frontend de ChatGPT: mapa de la instalación
Fecha de inspección: 2026-10-12. Análisis estático; no se ejecutó el código extraído.

## Identidad y alcance
El acceso de Windows llamado **ChatGPT** resuelve a `OpenAI.Codex_2p2nqsd0c76g0!App`.
El manifiesto MSIX declara DisplayName ChatGPT, ejecutable `app/ChatGPT.exe` y versión `26.1007.2314.0`.
El package.json interno conserva el nombre `openai-codex-electron`, productName Codex y versión `26.1007.21434`; el HTML principal se titula ChatGPT.
Esta instalación reúne módulos ChatGPT, Work y Codex. No se ha confundido el acceso: las identidades difieren dentro del mismo paquete.

Se extrajeron todas las entradas regulares del ASAR y sus archivos unpacked: **20.988 archivos, 579.195.300 bytes**, incluidos **20.119 archivos bajo webview**.
Además se copiaron 47 recursos externos seleccionados: imágenes del paquete, iconos, sonidos, configuración del shell y avisos de terceros.
No se copiaron perfiles, conversaciones, cookies, credenciales ni bases de datos del usuario.
El alcance es el frontend distribuido de esta instalación, no el código del servidor, los plugins externos completos ni una reconstrucción ejecutable.

## Stack: observaciones
| Capa | Evidencia |
|---|---|
| Shell y herramientas | [package.json](../extracted/package.json) declara Electron 42.3.0, Vite 8.2.0, TypeScript ^7.0.2 y Electron Forge ^7.11.2. Son versiones declaradas, no medidas en ejecución. |
| React / React DOM | [app-shared JS](../extracted/webview/assets/app-shared-737655e1fb23.js) incluye version 19.2.7 y rendererPackageName react-dom. |
| Routing | El mismo bundle contiene el error boundary de React Router. |
| Componentes | El mismo bundle registra Symbol.for('radix-ui') y primitivas Radix. |
| CSS | [index.html](../extracted/webview/index.html) identifica explícitamente Tailwind y sus capas theme/base/components/utilities. No se determinó su versión. Hay además selectores compatibles con CSS Modules (inferencia). |
| Edición de texto | ProseMirror: referencias de documentación y despacho de transacciones en [app-initial JS](../extracted/webview/assets/app-initial-b8e1c8014bb4.js). No se confirmó Tiptap. |
| Edición de código | [chatgpt-code-block-editor](../extracted/webview/assets/chatgpt-code-block-editor-ea44a9d2124a.js) contiene .cm-editor y compartimentos de lenguaje, wrapping y accesibilidad: evidencia fuerte de CodeMirror; versión desconocida. |
| Highlighting | app-initial contiene shiki:decorations. |
| Animación | app-shared contiene diagnóstico de framer-motion; también se distribuye [Lottie](../extracted/webview/assets/lottie_light-edbe5b17af6e.js). |
| Datos | package.json declara @tanstack/query-core ^5.101.2; app-shared contiene QueryClient y Missing queryFn. |
| Colaboración | package.json declara yjs 13.6.31; artefactos tienen callbacks CRDT. No se verificó sincronización en ejecución. |
| Matemática y diagramas | Se incluyen KaTeX, sus fuentes/CSS y [Mermaid](../extracted/webview/assets/mermaid.core-cf33bb7e5cda.js). |

## Diseño, estilos y recursos
Punto de partida: [app-shared CSS](../extracted/webview/assets/app-shared-9a94b907ed47.css) y [app-initial CSS](../extracted/webview/assets/app-initial-99e8b4b455fa.css).
El CSS usa tokens semánticos como --color-token-text-primary, --color-token-foreground, --color-token-bg-primary y --color-token-side-bar-background.
Las familias UI, código y contenido son configurables mediante variables CSS. Un token observado es --text-heading-lg:24px.

Se distribuyen OpenAI Sans Regular/Medium/Semibold (400/500/600), OpenAI Serif Light, Carlito y fuentes KaTeX.
OpenAI Sans es seleccionable/condicional; no se afirma que todas las vistas lo usen siempre.
El directorio assets contiene 3.274 chunks lucide-*.js, 2.362 SVG, 937 WebP, 96 PNG, 316 CSS, 14.770 JS y 31 WASM.
Son cantidades de archivos de este build, no cantidades de componentes únicos.

- [Declaraciones CSS extraídas](css-declarations.json): 8.293 coincidencias con archivo y offset; incluyen repeticiones y contextos distintos, no una hoja de tokens normalizada.
- [Reglas @font-face](font-faces.json): 46 reglas con su procedencia.
- [Inventario navegable por módulos](MODULE-INDEX.md): agrupaciones por nombre, útiles para buscar; no equivalen a funcionalidad confirmada.
- [Lista completa de archivos](files.csv).

## Funcionalidades observadas en el código
Los siguientes hallazgos se apoyan en handlers, propiedades, imports o mutaciones presentes. No se comprobó su activación para una cuenta concreta.

| Área | Comportamiento y punto de entrada |
|---|---|
| Conversaciones | [chatgpt-conversation-page](../extracted/webview/assets/chatgpt-conversation-page-d6ceb517cb3b.js): conversationId, chat temporal, conversación compartida, preview de solo lectura; handlers editar, regenerar, compartir, imprimir y convertir a Work. La impresión desactiva edición y regeneración. |
| Composer | [use-chatgpt-composer-controller](../extracted/webview/assets/use-chatgpt-composer-controller-88edaa2290da.js): menciones de archivos, texto enriquecido, comandos /, restoreDraft por conversación y destrucción del editor al desmontar. En esa configuración las menciones de skills están desactivadas. |
| Estado y streaming | [chatgpt-conversation-runtime](../extracted/webview/assets/chatgpt-conversation-runtime-cb51db2ec885.js): estado streaming, árbol current_node/mapping, metadata de widgets e integración de recuperación de completions. |
| Respuestas ricas | [turn-content](../extracted/webview/assets/chatgpt-conversation-turn-content-dc8fb988ef91.js): ramas, fuentes, memoria y continuar en Chat/Work/Codex. [code-block](../extracted/webview/assets/chatgpt-code-block-58f65be6053f.js): código, preview, descarga y documento LaTeX con revisiones before/after. |
| Proyectos | [project-settings](../extracted/webview/assets/chatgpt-project-settings-dialog-99331eebb4cd.js): nombre, instrucciones, fuentes, borrado, memoria aislada/abierta y acceso Space/Library. [projects-index](../extracted/webview/assets/projects-index-page-39541e9a312e.js): locales/ChatGPT, búsqueda, paginación, pins, chats, edición y archivo. |
| Artefactos | [artifact-tab-content](../extracted/webview/assets/artifact-tab-content.electron-51e2ae3f766e.js): importa XLSX, comprueba spreadsheet, Workbook.load, onCrdtUpdateV2, comentarios/anotaciones, preview/source, refresh, descargas y sugerencias para diapositivas. |
| Voz | [voice-session](../extracted/webview/assets/voice-session-82332de4a122.js): desconexión de micrófono mediante room.localParticipant.setMicrophoneEnabled(false), limpieza de suscripción y timeout. UI para cámara/pantalla/transcripción, voz/idioma, errores de conexión y permisos. |
| Navegador | [browser-route](../extracted/webview/assets/browser-route-61c6fb06cbbb.js): resuelve URL/workspace/thread/account, reutiliza o crea tab con browserTabId/initialUrl/initiator/source, observa estado y redirige a /space. |
| Sidebar y Spaces | [space-sidebar](../extracted/webview/assets/space-sidebar-9599ed684809.js): páginas, espacios, recientes, pins, búsqueda, papelera y paginación. Los archivos sidebar genéricos pueden pertenecer a otras superficies. |
| Ajustes | [settings-page](../extracted/webview/assets/settings-page-6c4c55bd9144.js): búsqueda y grupos personal/coding/integrations. [personalization-settings](../extracted/webview/assets/personalization-settings-8de25ab6f393.js): preferencias de memoria, reset, instrucciones AGENTS.md, perfil y presentación. |
| Código y entornos | [composer-utility-bar](../extracted/webview/assets/composer-utility-bar-beaa03ca39ad.js): local/cloud/remote. [worktree dropdown](../extracted/webview/assets/worktree-environment-dropdown-58e0a276a470.js): rama inicial, archivos locales y ramas remotas. [worktree settings](../extracted/webview/assets/worktrees-settings-page-73265a04158c.js): raíz, listado periódico y limpieza automática. |
| Integración desktop | [.vite/build/preload.js](../extracted/.vite/build/preload.js): contextBridge/IPC, mensajes de la vista y workers, drag de archivos/enlaces, menú contextual, bootstrap de sidebar, tema del sistema y snapshots de estado compartido. |

## Cómo estudiar el paquete
1. Abrir webview/index.html para arranque, CSP, CSS inicial y scripts.
2. Seguir app-initial y app-shared en webview/assets; después los chunks específicos de la tabla.
3. Consultar los CSS compartidos, tokens y fuentes para el lenguaje visual.
4. Consultar .vite/build/preload.js y main-*.js para el límite renderer/desktop.
5. Usar el inventario y MODULE-INDEX para el resto de recursos.

Abrir index.html como file:// no equivale a ejecutar la app: depende del host Electron, sus protocolos, IPC, servicios y sesión.
No hay un proyecto fuente autónomo listo para npm install. Los scripts del package.json remiten a archivos y workspaces de desarrollo no distribuidos.
No se intentó recuperar nombres originales mediante una desminificación especulativa.

## Integridad, evidencia y cobertura
La identidad del ASAR quedó fijada por REA: SHA-256 c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038.
REA rechazó extracción/análisis directo por una discrepancia de integridad en un .node externo. El diagnóstico original está en [rea-asar-diagnostics.json](rea-asar-diagnostics.json).
Se realizó extracción alternativa con validación de rutas, tamaños de entradas packed y SHA-256 individual. Los bytes extraídos se conservaron sin modificación.

20.980 archivos coinciden con sus hashes declarados. Ocho binarios unpacked difieren; sus hashes y tamaños declarados/reales están en [extraction.json](extraction.json).
No se atribuye causa a esas diferencias. Los 20.119 archivos de webview sí coinciden.
[verification.json](verification.json) registra una segunda verificación de los archivos guardados.

No se encontraron .map en toda la extracción, aunque existen comentarios sourceMappingURL. Por ello no se recuperaron los TSX originales, nombres previos a minificación ni estructura de repositorio original.

| Pregunta | Estado |
|---|---|
| Localizar el EXE instalado | Respondida mediante acceso de Inicio y manifiesto MSIX. |
| Extraer el frontend distribuido | Respondida para todas las entradas ASAR/unpacked de esta versión. |
| Identificar el stack | Respondida para las tecnologías con evidencia anterior; algunas versiones siguen desconocidas. |
| Disponer de la implementación frontend empaquetada | Respondida: bundles y recursos conservados. |
| Catalogar todas las funcionalidades semánticas | Parcial: mapa de áreas principales y todos los archivos indexados; no se afirma comprensión exhaustiva de cada chunk. |
| Recuperar proyecto fuente original/TSX | No recuperable desde los source maps de esta copia: no están presentes. |
| Comprobar ejecución/flags de cada función | No realizada; fuera del análisis estático. |
