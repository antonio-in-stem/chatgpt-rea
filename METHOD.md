# Método vigente — 2026-10-13

## Resultado que cuenta

Una app demo navegable que usa el frontend distribuido original, y una biblioteca reutilizable de pantallas/componentes que conserva presentación e interacción. Rust se difiere. No se exige generación real, voz real, cuentas ni sincronización de producción.

La extracción de archivos, un test de identidad de código y un ejemplo aislado son evidencias parciales: ninguno prueba una pantalla completa ni fidelidad visual.

## Corrección del método anterior

El trabajo derivó hacia funciones pequeñas verificadas por separado; la demo de biblioteca sigue siendo una colección dentro de `max-w-xl`, no la ventana de referencia. Ya existen implementaciones y evidencias del runtime original en `original-stack`; se reutilizan antes de reconstruir la ventana. Los informes cronológicos contienen estados superados. `CURRENT-STATUS.md` es la única entrada de estado vigente; el historial conserva procedencia, no instrucciones activas.

## Cola de trabajo (una sola tarea activa)

1. **Restablecer la referencia ejecutable.** Verificar la copia/demo y sus hashes; comprobar procesos reales antes de lanzar. Abrir con perfil demo aislado. Entregable: comando de arranque reproducible, versión/hash, captura actual de ventana completa y evidencia de que rail, avatar, sidebar, conversación y composer son los originales. Una captura antigua o un PID guardado no basta. No crear nuevas extracciones mientras este hito esté abierto.
2. **Cerrar el flujo central en esa ventana.** Nuevo chat, selección/historial, envío demo, adjuntar/quitar, menús y perfil/Ajustes. Usar una matriz de escenarios y datos sintéticos estables. Registrar acciones, resultado visible, errores y persistencia cuando corresponda. Cada fallo se clasifica como fixture, host, variante/configuración, recurso o renderer antes de tocar código.
3. **Convertir el flujo central en una unidad reutilizable.** API explícita de datos/acciones, pantalla integrada y ejemplo consumidor conectado. Reutilizar `ui-library`; extraer únicamente dependencias necesarias. Verificar contra la referencia con mismo tamaño, DPI, tema, idioma, datos y estado. Conservar captura y diferencias explicadas; no aceptar rediseños ni placeholders como fidelidad.
4. **Ampliar por pantallas completas.** Ajustes/paneles, proyectos/biblioteca, documentos/canvas, búsqueda, notificaciones, extensiones y demás superficies del inventario recuperado. Antes de expandir, consolidar un inventario de pantallas/estados basado en rutas reales. El listado anterior prioriza; no reduce el alcance completo a esas categorías.

## Puerta de entrada a cada cambio

Anotar brevemente en CURRENT-STATUS: pantalla destino; fallo observable; archivo/contrato original que lo explica; cambio mínimo; prueba de aceptación; tope de investigación. Prohibido abrir otra cadena de extracción por mera cercanía entre símbolos.

## Puerta de salida de cada hito

- Resultado accesible desde la app, con pasos de reproducción.
- Evidencia visual actual y comportamiento observado; indicar lo no verificado.
- Pruebas pertinentes al fallo; no repetir suites amplias sin causa.
- Integración y documentación actualizadas. Fuente original distinguida de adapters demo.
- Cuota antes/después. Si el resultado no existe, informar fallo, no convertir una subtarea en finalización.

## Presupuesto y parada

Autorización vigente: baseline observado 64% usado; máximo 74%. Los porcentajes son de la ventana compartida de la cuenta, no dólares ni consumo atribuible exclusivamente a este chat; otros chats pueden adelantar el tope.

- La reorganización no requiere agotar los diez puntos.
- Primer hito: si se llega a 66% sin referencia ejecutable capturada, detener y entregar diagnóstico. No gastar el resto en hipótesis indefinidas.
- Tras superar ese hito, cada lote debe acabar en una mejora visible y verificable antes de iniciar otro.
- A 72%, no empezar implementación nueva. Sólo cerrar verificación/guardado de lo ya hecho.
- A 74%, detener todo trabajo sustantivo. No usar créditos de reset.
- Dos intentos fallidos de la misma hipótesis obligan a abandonarla y revisar el bloqueo; una espera de proceso vivo se comprueba sobre ese mismo proceso.

## Qué se conserva

No borrar el trabajo anterior. La biblioteca y sus pruebas sirven como piezas; el renderer recuperado sirve de referencia funcional; los registros históricos sirven como evidencia fechada. No confundir ninguno con una entrega completa.
