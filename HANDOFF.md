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
