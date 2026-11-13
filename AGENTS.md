# Contexto del proyecto para agentes

## Propósito

Portafolio personal de una sola página para presentar perfil, proyectos, habilidades, trayectoria y contacto. Dirección visual: **cuaderno de laboratorio / bitácora de ingeniería**. Tema claro "papel" (fondo cuadriculado, tinta azul, marcatextos amarillo) y tema oscuro "pizarra". Tipografías: Newsreader (serif, texto y títulos), JetBrains Mono (metadatos) y Caveat (solo notas manuscritas breves).

## Stack y comandos

- React 19 con JavaScript y JSX; no hay TypeScript configurado en este repositorio.
- Vite 8 como servidor y empaquetador.
- Tailwind CSS 4 mediante `@tailwindcss/vite` e importado desde `src/index.css`.
- `react-icons` para iconografía.
- `framer-motion` para apariciones al hacer scroll (`Reveal`, `Highlight`).
- `three` + `@react-three/fiber` se conservan a propósito para futuros elementos 3D; `components/HeroWireframe.jsx` existe pero no se renderiza actualmente.
- Alias `@/` configurado en `vite.config.js` para apuntar a `src/`.
- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción.
- `npm run preview`: sirve el build localmente.
- `npm run lint`: ESLint.

## Mapa del código

```text
src/
  App.jsx                       Composición de la página y estado del tema
  main.jsx                      Entrada React y carga de CSS global
  index.css                     Tokens de color, temas y estilos globales
  layout/Navbar.jsx             Navegación y control del tema
  sections/                     Secciones principales de la página
  components/                   Componentes reutilizables (Entry, Reveal, Highlight, CardProjects…)
  data/profile.js               Nombre, correo, ubicación, redes, CV y foto
  assets/                       Recursos importados desde el código
public/                         Recursos servidos desde la raíz (foto, CV, capturas)
```

La página se compone en `src/App.jsx` en este orden: `Navbar`, `Hero`, `About`, `Projects`, `Skills`, `Experience`, `Contact`. Las secciones se renderizan en una SPA sin router.

`components/Entry.jsx` es el layout de cada sección: columna de margen (número de entrada, etiqueta, nota manuscrita) + línea de margen + contenido. Úsalo para secciones nuevas.

## Convenciones y arquitectura

- Las secciones viven en `src/sections/`; reutilización de UI en `src/components/`; navegación/layout en `src/layout/`.
- La mayoría de secciones exportan componentes nombrados. `App.jsx` usa exportación por defecto.
- Los estilos se expresan principalmente con clases utilitarias de Tailwind. Los colores semánticos se definen como variables CSS en `src/index.css`; conserva ese sistema al ajustar colores.
- El tema se inicializa desde `localStorage` o la preferencia del sistema, y se aplica como clase `dark` sobre `<html>` desde `App.jsx`.
- Los datos personales viven en `src/data/profile.js` (tomados del CV). Proyectos, stack y trayectoria están en arreglos locales dentro de `Projects.jsx`, `Skills.jsx` y `Experience.jsx`; no hay backend.
- Para navegación dentro de la página, usa enlaces a IDs existentes: `hero`, `about`, `projects`, `skills`, `experience` y `contact`. `Experience` se controla con `SHOW_EXPERIENCE` (activo).
- El acento (`primary`) es tinta azul con contraste AA en ambos temas; el amarillo (`highlight`) es solo fondo de marcatextos, nunca color de texto.
- Mantén los cambios acotados al patrón actual, salvo que la tarea pida explícitamente una reorganización.

## Estado observado y puntos a tener presentes

- El usuario decidió mostrar en el sitio solo correo y ciudad; el teléfono queda únicamente dentro del PDF del CV. No inventes datos personales.
- `src/sections/Projects.jsx` muestra los proyectos como fichas "EXP-0n" del mismo tamaño. `featured: true` (UniTrack, SchTrack) es una marca de prueba: el usuario decidirá después qué proyectos son destacados. Un proyecto sin demo usa `liveHref: null` (nunca `#`).
- `src/assets/` contiene recursos del starter de Vite/React además de `hero.png`; comprueba las referencias antes de eliminar recursos.
- El README existente contiene documentación anterior. Si se modifica, verifica cada afirmación contra el código actual.

## Recursos estáticos

Coloca recursos que deban servirse directamente en `public/` y consúmelos con una ruta desde la raíz (por ejemplo `/archivo.jpg`). Los recursos dentro de `src/assets/` se importan desde módulos. No uses `/public/...` como URL pública en Vite.

## Guía para cambios

- Conserva el idioma y tono de la interfaz existentes, salvo indicación contraria. El contenido actual mezcla español e inglés.
- Mantén componentes accesibles: botones con `type` cuando corresponda, nombres accesibles para controles solo-icono y enlaces con destinos válidos.
- Al añadir una sección enlazada desde la navegación, asegúrate de que el `href` y el `id` coincidan.
- No afirmes que una funcionalidad existe basándote solo en el README; inspecciona el componente correspondiente.
- No agregues dependencias para resolver necesidades que puedan cubrirse con el stack instalado sin una razón concreta.
- Ejecuta únicamente las comprobaciones solicitadas por el usuario o necesarias por las instrucciones vigentes. Comandos disponibles: `npm run lint` y `npm run build`.
