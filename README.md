# Portafolio Web Personal (dev-personal-portafolio)

Este es un portafolio web personal e interactivo construido utilizando **React 19**, **Vite** y **Tailwind CSS v4**.

---

## 📋 Estado Actual del Proyecto

El proyecto se encuentra en una fase avanzada de desarrollo estructural y de maquetación, con un diseño moderno, oscuro y con efectos visuales premium (como glassmorphism y partículas de fondo).

### Estructura del Código (`src/`)

La aplicación está organizada de la siguiente manera:

*   **`src/main.jsx`**: Punto de entrada de la aplicación React.
*   **`src/App.jsx`**: Componente raíz. Inicializa el motor de partículas (`@tsparticles`) y renderiza la estructura general con las secciones del portafolio.
*   **`src/index.css`**: Archivo de estilos global. Contiene la importación de Tailwind CSS v4, la configuración del tema y clases/animaciones personalizadas.
*   **`src/components/`**: Componentes UI reutilizables:
    *   `ParticlesBackground.jsx`: Fondo interactivo de nodos y enlaces animados con `@tsparticles`.
    *   `PrimaryButton.jsx`: Botón dinámico que soporta diferentes tamaños (`sm`, `md`, `lg`), variantes visuales (`primary`, `secondary`, `outline`, `glass`) y puede renderizarse como un enlace `<a>` o etiqueta `<button>`.
    *   `CardMe.jsx`: Tarjeta con icono y diseño tipo *glassmorphism* para la sección "Sobre Mí".
    *   `CardProjects.jsx`: Tarjeta de proyecto con soporte para imágenes, etiquetas (tags), enlaces a demo en vivo y repositorios de GitHub.
    *   `cardSkill.jsx` (o `CardSkill`): Tarjeta para mostrar habilidades con barra de progreso dinámica.
*   **`src/layout/`**:
    *   `Navbar.jsx`: Barra de navegación superior flotante con estilo *glassmorphism*.
*   **`src/sections/`**: Secciones principales del portafolio:
    *   `Hero.jsx`: Sección de presentación con título animado, descripción breve y botón de llamado a la acción (CTA).
    *   `About.jsx`: Sección "Sobre Mí" con tarjetas de especialidades.
    *   `Projects.jsx`: Catálogo con rejilla (grid) de proyectos.
    *   `Skills.jsx`: Sección con filtrado dinámico de habilidades tecnológicas por categorías (Frontend, Backend, Database, Tools).
    *   `Experience.jsx`: **[Pendiente / Vacío]** Actualmente contiene un componente vacío (`<section></section>`) listo para ser desarrollado.
    *   `Contact.jsx`: Sección de contacto con detalles y enlaces a redes profesionales.

---

## 🎨 Configuración de Estilos (Tailwind CSS v4)

Este proyecto utiliza la nueva versión **Tailwind CSS v4**, la cual introduce cambios significativos en la forma en que se configura y procesa el diseño en comparación con versiones anteriores (v3).

### 1. Integración con Vite
En lugar de depender de un plugin PostCSS separado, Tailwind v4 utiliza un plugin oficial optimizado para Vite:
*   En `package.json`, se incluyen `@tailwindcss/vite` y `tailwindcss`.
*   En `vite.config.js`, se importa y se añade directamente al arreglo de plugins de Vite:
    ```javascript
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [react(), tailwindcss()],
      // ...
    })
    ```

### 2. Configuración en CSS (`src/index.css`)
En Tailwind v4, **ya no existe el archivo `tailwind.config.js`**. Toda la configuración del tema, variables y extensiones se realiza directamente dentro del archivo CSS utilizando la directiva `@theme`.

#### Configuración del Tema (`@theme`):
El tema del portafolio está personalizado con variables de CSS modernas dentro del bloque `@theme`:
```css
@theme {
  --color-background: #0d1117;
  --color-foreground: #f0f2f5;
  --color-card: #161b22;
  --color-primary: #8b5cf6; /* Púrpura */
  --color-primary-foreground: #ffffff;
  --color-secondary: #3b82f6; /* Azul */
  --color-secondary-foreground: #ffffff;
  --color-muted: #21262d;
  --color-muted-foreground: #8b949e;
  --color-border: #30363d;
  --radius: 0.75rem;
  --color-highlight: #bb86fc;
  --color-surface: #0d1117;
}
```
*   **Generación Automática de Utilidades**: Al definir `--color-primary: #8b5cf6`, Tailwind genera automáticamente clases como `text-primary`, `bg-primary`, `border-primary`, `shadow-primary`, etc.

#### Capas de Tailwind (`@layer`):
*   **`@layer base`**: Define estilos globales para etiquetas HTML, aplicando la tipografía `Inter` en el `body`, configurando el fondo general con `var(--color-background)` y color del texto con `var(--color-foreground)`.
*   **`@layer components`**: Define clases compuestas reutilizables:
    *   `.glass`: Crea un efecto de vidrio esmerilado usando `backdrop-filter: blur(16px)` y mezcla de color dinámico (`color-mix`).
    *   `.particle`: Estilo base para elementos flotantes animados.

#### Animaciones y Keyframes:
Se definen animaciones nativas integradas directamente en el archivo CSS:
*   `float`: Animación de movimiento flotante oscilante en X e Y.
*   `fadeInUp` / `.animate-fadeInUp`: Efecto de desvanecimiento y desplazamiento ascendente utilizado al cargar la página.
*   `gradientShift` / `.bg-animated-gradient`: Gradiente animado que fluye continuamente entre tonos púrpuras y azules.

---

## 🚀 Cómo Iniciar en Modo de Desarrollo

1.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

2.  Inicia el servidor de desarrollo local:
    ```bash
    npm run dev
    ```

3.  Construye el proyecto para producción:
    ```bash
    npm run build
    ```
