# Estado vigente — 2026-10-13

## Prioridad

Reorganización del método aplicada. Próximo hito único: restablecer y capturar la ventana completa del frontend original con datos demo. Consultar METHOD.md y AGENTS.md. Rust sigue diferido. Biblioteca reutilizable sigue incluida en el alcance.

## Evidencia revisada ahora

- Base de código antes de reorganización: `c564a26`; árbol limpio al iniciar la auditoría.
- `ui-library/examples/main.js` compone ejemplos dentro de `max-w-xl`: no es el clon de ventana completo.
- `original-stack/Start-Demo.ps1` y `Start-Original.ps1` contienen la ruta de arranque demo y comprobaciones de integridad; se deben validar contra el entorno actual antes de usarlos.
- `original-stack/evidence/sidebar-persistence-runtime.json` documenta una verificación histórica en el renderer original. No acredita una instancia actual.
- La búsqueda actual de procesos con Path `S:\rea-*` no devolvió procesos. Esto sólo cubre ese prefijo, no prueba ausencia de cualquier otra instancia.
- No se lanzó ni capturó una ventana en esta reorganización. No hay nueva prueba de paridad visual.
- Cuota observada: 64% usado. Nuevo máximo autorizado: 74%; puerta temprana 66%, reserva desde 72%.

## Siguiente trabajo y aceptación

Pantalla: ventana principal original (rail/avatar/sidebar/conversación/composer).
Fallo de entrega: no contamos con una referencia actual reproducida y capturada bajo este nuevo método.
Acción: validar manifiesto, ruta y perfil de copia demo; descubrir/probar procesos reales; reutilizar arranque y fixtures existentes. No tocar instalación personal ni pristine.
Aceptación: arranque reproducible, hash/versión registrados, captura actual completa y prueba breve de navegación/envío demo desde controles originales.
Límite: máximo 66% usado si falta esta evidencia; dos intentos de una misma hipótesis. En ese caso informar el bloqueo y detener.

## Pendiente global

Ventana integrada, validación visual comparable, matriz completa de pantallas/estados y biblioteca de flujos reutilizables integrada. Los módulos recuperados y sus tests no prueban ese conjunto. No hay porcentaje global de finalización defendible todavía.
