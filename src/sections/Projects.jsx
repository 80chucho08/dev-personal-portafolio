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
  return (
    <section id="projects" className="relative py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold tracking-tight text-white">
            Mis <span className="text-primary">Proyectos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Estos son mis proyectos recientes que he estado desarrollando. Todos fueron hechos con una gran atención al detalle.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {projectsData.map((project) => (
            <CardProjects
              imageSrc={project.imageSrc}
              key={project.title}
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