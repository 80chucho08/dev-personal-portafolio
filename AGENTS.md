# Contexto del proyecto para agentes

## Propósito

Portafolio personal de una sola página para presentar perfil, proyectos, habilidades y contacto. La interfaz usa React, Tailwind CSS y una estética con temas claro/oscuro y tarjetas translúcidas. El fondo de naves/asteroides fue retirado; el contenedor conserva el color de fondo del tema.

## Stack y comandos

- React 19 con JavaScript y JSX; no hay TypeScript configurado en este repositorio.
- Vite 8 como servidor y empaquetador.
- Tailwind CSS 4 mediante `@tailwindcss/vite` e importado desde `src/index.css`.
- `react-icons` para iconografía.
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
  components/                   Componentes reutilizables
  assets/                       Recursos importados desde el código
public/                         Recursos servidos desde la raíz del sitio
```

La página se compone en `src/App.jsx` en este orden: `Navbar`, `Hero`, `About`, `Projects`, `Skills`, `Experience`, `Contact`. Las secciones se renderizan en una SPA sin router.

## Convenciones y arquitectura

- Las secciones viven en `src/sections/`; reutilización de UI en `src/components/`; navegación/layout en `src/layout/`.
- La mayoría de secciones exportan componentes nombrados. `App.jsx` y `SpaceCanvas.jsx` usan exportación por defecto.
- Los estilos se expresan principalmente con clases utilitarias de Tailwind. Los colores semánticos se definen como variables CSS en `src/index.css`; conserva ese sistema al ajustar colores.
- El tema se inicializa desde `localStorage` o la preferencia del sistema, y se aplica como clase `dark` sobre `<html>` desde `App.jsx`.
- Los datos de proyectos y habilidades están definidos en arreglos locales dentro de `Projects.jsx` y `Skills.jsx`; no hay backend ni capa de datos externa configurada.
- Para navegación dentro de la página, usa enlaces a IDs existentes. Actualmente `about`, `projects`, `skills` y `contact` tienen ID; `Experience.jsx` no tiene contenido ni ID.
- Mantén los cambios acotados al patrón actual, salvo que la tarea pida explícitamente una reorganización.

## Estado observado y puntos a tener presentes

- `src/sections/Experience.jsx` actualmente devuelve una sección vacía.
- `src/sections/Contact.jsx` todavía muestra datos de ejemplo (`hola@tudominio.com`, `Ciudad, País`, teléfono ficticio y enlaces `tu-usuario`). No inventes datos personales para reemplazarlos.
- `src/sections/About.jsx` muestra enlaces de ambos botones hacia `#projects`; el botón “Descargar CV” no tiene actualmente un archivo asociado.
- `src/sections/Projects.jsx` referencia imágenes como `/public/unitrack.jpg`. En Vite, los archivos bajo `public/` normalmente se referencian desde la raíz, por ejemplo `/unitrack.jpg`; confirma el comportamiento antes de cambiar código fuera del alcance solicitado.
- Varios proyectos tienen `liveHref` o `repoHref` con `#`, que son marcadores y no destinos reales.
- El HTML base (`index.html`) conserva `lang="en"` y el título genérico `dev-personal-portafolio`.
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
