# Native Workspace — Windows frontend demo

Aplicación Rust local que reúne navegación, chats, proyectos, biblioteca, ajustes y superficies de contenido. Las respuestas, conexiones y medios usan fixtures. No necesita una cuenta, API key ni servicios de ChatGPT.

## Arrancar y compilar

Requisitos de desarrollo: Rust MSVC, Visual Studio C++ Build Tools, Windows SDK. La ventana de contenido web usa el runtime Microsoft Edge WebView2.

```powershell
.\scripts\Build.ps1
.\target\debug\native-workspace.exe
# Pruebas de todos los crates, incluido el binario de aplicación:
.\scripts\Build.ps1 -Test
```

Mantén `native-web-host.exe` junto a `native-workspace.exe`: Browser lo abre como una ventana de contenido HTML. El shell, formularios, editores y demás superficies se renderizan con GPUI. No hay Electron ni WebView en la interfaz principal. GPUI dibuja controles propios; no significa que cada control sea un widget Win32.

## Contratos y responsabilidades

| Crate | Entrada | Responsabilidad | Salida |
|---|---|---|---|
| native-core | Comandos de chats, proyectos y documentos | Identidad, ramas, validación y persistencia versionada | Workspace serializable o error explícito |
| native-settings | Cambios de preferencias | Validar, aplicar tema/tamaño y guardar; proteger archivos corruptos | SettingsChanged y preferencias |
| native-rich | Tipo de contenido y fixture local | Edición, selección, navegación, cálculo acotado y simulación de medios | Vista nativa retenida y modelos locales |
| native-tools | Acción sobre tarea, conector, diff o terminal | Flujo demo con estado local | Estado visible y resultados deterministas |
| native-web-host | Apertura de contenido web demo | Alojar HTML interactivo en WebView2 | Ventana separada con navegación local |
| native-app | Ratón, teclado y eventos | Coordinar rutas, entidades retenidas, composer y cancelación | Aplicación integrada |
| native-frontend | Dependencia desde otra app Rust | Fachada pública del dominio, controles y superficies | Componentes reutilizables |

`native-frontend::controls` expone los controles de GPUI Component 0.7.3 y `behavior` expone GPUI Base. Esto permite reutilización; no implica que todos los controles se hayan adaptado al comportamiento original de ChatGPT.

## Flujos disponibles

- Conversaciones con borrador por chat, mensajes demo progresivos, detener, copiar, editar, crear ramas y regenerar; búsqueda, pin, archivo y eliminación.
- Proyectos locales con instrucciones y conversaciones; biblioteca de documentos editables con vista previa Markdown.
- Ajustes de apariencia, personalización, notificaciones, voz demo, conexiones, accesibilidad y atajos.
- Documento, hoja de cálculo, diapositivas, imagen, voz/medios, diagrama, mapa, PDF, matemática, escena 3D y gráficos: superficies nativas con fixtures interactivos. Los límites de gramática y de formatos están en [native-rich](crates/native-rich/README.md).
- Automatizaciones demo, conexiones simuladas, revisión de diferencias/comentarios, terminal con comandos locales simulados y navegador de páginas demo.

## Persistencia y límites

Chats, proyectos, documentos y ajustes se guardan en `%LOCALAPPDATA%\NativeWorkspaceDemo`. Las superficies rich usan `%LOCALAPPDATA%\NativeFrontendDemo`. No se leen datos de la instalación de ChatGPT. Los errores de archivos corruptos se presentan y no autorizan sobrescribirlos silenciosamente.

La extracción del frontend es completa respecto al ASAR inspeccionado. La implementación Rust es una reconstrucción de comportamiento con fixtures, no una conversión automática de cada módulo JS. No se ha demostrado equivalencia visual o funcional exhaustiva con cada pantalla del original. El estado concreto de verificación se registra en `VERIFICATION.md` después de las pruebas.

## Evidencia y reutilización

- [Primitivas: evidencia y contratos](catalog/primitives.md)
- [Contenido enriquecido: evidencia y contratos](catalog/rich-content.md)
- `catalog/source-inventory.csv`: clasificación de las 20.988 entradas con hashes y referencias. Se genera desde el inventario local extraído; no se versiona el corpus propietario.
- [Resumen de inventario](catalog/source-summary.json)

Las clasificaciones de archivos, las capacidades del toolkit y las interacciones implementadas son medidas distintas. No deben sumarse para afirmar cobertura completa.