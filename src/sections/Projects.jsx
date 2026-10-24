import { useState } from "react";
import { CardProjects } from "@/components/CardProjects";

const projectsData = [
  {
    title: "Unitrack - Gestor Académico",
    description:
      "Aplicación web full stack para la gestión de materias, horarios, tareas y notas. Incluye autenticación con JWT, control de sesiones (login/logout), rutas protegidas y arquitectura MVC en el backend.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Tailwind"],
    liveHref: "#",
    repoHref: "https://github.com/80chucho08/UniTrack",
    imageSrc: "/public/unitrack.jpg",
  },
  {
    title: "SchTrack - Organizador de Horarios",
    description:
      "Aplicación web interactiva para crear horarios académicos mediante drag & drop. Permite organizar materias visualmente, exportar el horario como imagen y mantener persistencia con LocalStorage.",
    tags: ["React", "TypeScript", "Vite", "Drag & Drop", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/SchTrack/",
    repoHref: "https://github.com/80chucho08/SchTrack",
    imageSrc: "/public/schtrack.jpg",
  },
  {
    title: "RappiPachuca - Plataforma de Pedidos",
    description:
      "Aplicación web con sistema de roles (usuario, vendedor y administrador). Permite gestión de productos, pedidos y usuarios mediante operaciones CRUD, integración con WhatsApp y base de datos en MySQL.",
    tags: ["PHP", "MySQL", "Bootstrap", "CRUD", "Autenticación"],
    liveHref: "#",
    repoHref: "https://github.com/80chucho08/RappiPachuca",
    imageSrc: "/public/rappipachuca.jpg",
  },
  {
    title: "Life Counter - Tiempo de Vida",
    description:
      "Aplicación web que calcula y muestra en tiempo real el tiempo vivido a partir de la fecha de nacimiento, con persistencia de datos en LocalStorage.",
    tags: ["React", "JavaScript", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/Life-Counter",
    repoHref: "https://github.com/80chucho08/Life-Counter",
    imageSrc: "/public/lifecounter.png",
  },
  {
    title: "Videojuego 2D - Ralph Demoledor",
    description:
      "Videojuego interactivo creado con JavaScript, ThreeJS y Firebase para almacenar puntuaciones y avanzar niveles.",
    tags: ["Firebase", "JavaScript", "HTML/CSS", "ThreeJS"],
    liveHref: "#",
    repoHref: "#",
  },
  {
    title: "Inventario con Escolar",
    description:
      "Dashboard interactivo desarrollado en Laravel con Bootstrap, conexión a base de datos MySQL y análisis visual de datos.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript", "HTML/CSS"],
    liveHref: "#",
    repoHref: "#",
  },
  {
    title: "Videojuego 2D - Shooter",
    description:
      "Videojuego interactivo creado con JavaScript, ThreeJS y Firebase para almacenar puntuaciones y avanzar niveles.",
    tags: ["Firebase", "JavaScript", "HTML/CSS", "ThreeJS"],
    liveHref: "#",
    repoHref: "#",
  },
];

export const Projects = () => {
  const [layout, setLayout] = useState("grid");

  return (
    <section id="projects" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-6 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">02 / Selección</p>
            <h2 className="font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-7xl">/* Proyectos */</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Estos son mis proyectos recientes que he estado desarrollando. Todos fueron hechos con una gran atención al detalle.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2" aria-label="Diseño de proyectos">
            <button type="button" aria-pressed={layout === "grid"} onClick={() => setLayout("grid")} className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${layout === "grid" ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              Cuadrícula
            </button>
            <button type="button" aria-pressed={layout === "list"} onClick={() => setLayout("list")} className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200 ${layout === "list" ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              Lista
            </button>
          </div>
        </div>

        <div className={layout === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
          {projectsData.map((project, index) => (
            <CardProjects
              key={project.title}
              number={String(index + 1).padStart(2, "0")}
              layout={layout}
              imageSrc={project.imageSrc}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveHref={project.liveHref}
              repoHref={project.repoHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
