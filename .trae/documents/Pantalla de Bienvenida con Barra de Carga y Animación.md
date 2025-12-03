## Objetivo
Crear una pantalla de bienvenida a pantalla completa que muestre “Bienvenido a mi Portafolio”, iconos con brillo, una barra de carga animada y, tras completar la carga, transicione con un fade/blur al portafolio.

## UX y Estilo
- Fondo oscuro con gradiente azul/índigo y sutiles brillos para transmitir seguridad.
- Tipografía consistente con la UI actual, resaltando la palabra “Portafolio”.
- Iconos superiores con halo y pulso suave.
- Barra de carga con progreso del 0–100% y brillo que recorre la barra.
- Opción “Saltar” para no bloquear al usuario.

## Componentes
- `Splash.jsx`: overlay de pantalla completa con el mensaje, iconos, barra y botón Saltar.
- `ProgressBar.jsx`: barra animada con props `value` y `label` y atributos accesibles.
- Integración en `App.jsx`: estado `showSplash` y lógica para ocultar el splash tras finalizar la carga y el tiempo mínimo.

## Lógica de Carga
- Preload de assets: `['/profile.svg']` y futuros (foto real de perfil).
- Llamadas a backend: `GET /api/health`, `GET /api/profile`, `GET /api/projects`.
- Progreso ponderado: 30% assets, 20% health, 25% profile, 25% projects.
- Tiempo mínimo visible: 1500–2200 ms; cierre con `fadeOut` + `scale`.

## CSS y Animaciones
- Clases nuevas en `index.css`: `splash`, `splash-content`, `icons-row`, `glow`, `progress`, `progress-bar`, `progress-shine`.
- Keyframes: `pulse`, `glow`, `shine`, `fadeIn`, `fadeOut`.
- Sombras: `box-shadow` y halos en iconos y contenedores.
- Respeto a `prefers-reduced-motion`: desactivar animaciones si está activo.

## Accesibilidad
- `role="status"` y `aria-live="polite"` para el texto de carga.
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` en la barra.
- Contraste alto y textos legibles.

## Cambios en Código
- Añadir `frontend/src/components/Splash.jsx` y `frontend/src/components/ProgressBar.jsx`.
- Actualizar `frontend/src/App.jsx` para orquestar el splash y render condicional.
- Añadir estilos en `frontend/src/index.css` (gradientes, keyframes, sombras, barra).
- Mantener paleta actual (negro/azul/blanco) con acentos indigo.

## Validación
- Ejecutar frontend y verificar la secuencia: mostrar splash, barra avanza, fade a portafolio.
- Simular latencia (dev) para ver progreso real; verificar que “Saltar” oculta inmediatamente.

## Futuras Mejoras (opcionales)
- Animación con Framer Motion o Lottie si deseas efectos más complejos.
- Persistencia “no volver a mostrar” usando `localStorage`.
- Precache con Service Worker para despliegue.

¿Procedo a implementar estos componentes y estilos en tu proyecto para que se vea como la imagen, manteniendo la paleta negro/azul/blanco y el efecto de carga animado?