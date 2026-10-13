> Current priority: extract a reusable component library and connected UI flows from the shipped frontend. See [ui-library](ui-library/README.md). Original styles and behavior remain the reference; Rust is deferred.

# chatgpt-rea

Proyecto de investigación y reconstrucción del frontend de escritorio de ChatGPT/Codex para Windows. Incluye análisis del paquete distribuido, contratos recuperados, adaptadores locales con datos demo y el trabajo previo de interfaz nativa.

**Para continuar en otra sesión: [HANDOFF.md](HANDOFF.md).** La prioridad actual es completar y verificar el frontend original con su runtime. **El port a Rust está pausado por indicación del propietario.** El proyecto no está terminado y no es el repositorio TypeScript original de OpenAI.

Este repositorio conserva código, herramientas, informes y evidencias seleccionadas. Los directorios locales `extracted/`, `original-stack/pristine/`, `original-stack/state/`, los perfiles y los builds no se publican. Por ello, clonar el repo no proporciona por sí solo un ejecutable listo para arrancar. Consulte la guía de continuidad para recuperar el entorno.

---

# ChatGPT frontend extraído
Extracción local de la aplicación instalada en Windows, realizada el 12 de octubre de 2026.

**Empieza por [el informe del frontend](reports/FRONTEND.md)**: stack, diseño, funciones observadas, rutas de código y límites de la recuperación.

## Qué hay
- `extracted/webview/`: frontend distribuido completo dentro del ASAR: 20.119 archivos de HTML, JS, CSS, iconos, fuentes, imágenes y otros recursos.
- `extracted/.vite/build/`: bootstrap, proceso principal, preloads y workers de Electron.
- `extracted/package.json`: manifiesto y dependencias declaradas.
- `extracted/node_modules/`: dependencias distribuidas, incluidos los binarios unpacked.
- `extracted/native-menu-locales/`: traducciones del menú nativo.
- `supplemental/`: 47 archivos externos seleccionados: iconos, sonidos, imágenes y avisos.
- `reports/`: inventarios, integridad y mapa de funcionalidades.

**Total ASAR/unpacked: 20.988 archivos, 579.195.300 bytes.** Los archivos se conservaron tal como están instalados.
20.980 hashes coinciden; las ocho discrepancias corresponden a binarios nativos unpacked y están documentadas. Todo webview coincide.

## Enlaces útiles
- [Stack y funcionalidades](reports/FRONTEND.md)
- [Índice de módulos por área](reports/MODULE-INDEX.md)
- [Todos los archivos CSV](reports/files.csv)
- [Inventario con SHA-256](reports/inventory.json)
- [Declaraciones CSS con procedencia](reports/css-declarations.json)
- [Fuentes @font-face](reports/font-faces.json)
- [Verificación final](reports/verification.json)
- [Diagnóstico original de REA](reports/rea-asar-diagnostics.json)

## Dónde estaba el EXE
`C:\Program Files\WindowsApps\OpenAI.Codex_26.1007.2314.0_x64__2p2nqsd0c76g0\app\ChatGPT.exe`

Windows lo presenta como **ChatGPT**, aunque el paquete y su package.json conservan el nombre **Codex**.
Se identificó mediante Get-StartApps y AppxManifest.xml, no por una suposición sobre el nombre.

## Alcance
Esto contiene el **frontend de producción empaquetado**, con código minificado y recursos. No es el repositorio TSX original: no hay source maps en esta copia.
El informe cubre las áreas principales; la extracción e inventario cubren todos los archivos del ASAR, pero eso no prueba todas las funciones habilitadas ni su funcionamiento en vivo.
No se ejecutó la aplicación extraída ni se accedió a los datos de la cuenta.

## App nativa Windows
[Workspace Rust y guía de ejecución](native/README.md). La extracción completa se conserva en la raíz original C:\Users\PC\Repositories\chatgpt-rea; no se duplica dentro de este worktree.
