import { CardProjects } from "@/components/CardProjects";
import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";

// `featured` es una marca de prueba; la selección definitiva de destacados está pendiente.
const projectsData = [
  {
    name: "UniTrack",
    kind: "Gestor académico",
    description:
      "Aplicación web full stack para la gestión de materias, horarios, tareas y notas. Incluye autenticación con JWT, control de sesiones (login/logout), rutas protegidas y arquitectura MVC en el backend.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Tailwind"],
    liveHref: null,
    repoHref: "https://github.com/80chucho08/UniTrack",
    imageSrc: "/unitrack.jpg",
    featured: true,
  },
  {
    name: "SchTrack",
    kind: "Organizador de horarios",
    description:
      "Aplicación web interactiva para crear horarios académicos mediante drag & drop. Permite organizar materias visualmente, exportar el horario como imagen y mantener persistencia con LocalStorage.",
    tags: ["React", "TypeScript", "Vite", "Drag & Drop", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/SchTrack/",
    repoHref: "https://github.com/80chucho08/SchTrack",
    imageSrc: "/schtrack.jpg",
    featured: true,
  },
  {
    name: "RappiPachuca",
    kind: "Plataforma de pedidos",
    description:
      "Aplicación web con sistema de roles (usuario, vendedor y administrador). Permite gestión de productos, pedidos y usuarios mediante operaciones CRUD, integración con WhatsApp y base de datos en MySQL.",
    tags: ["PHP", "MySQL", "Bootstrap", "CRUD", "Autenticación"],
    liveHref: null,
    repoHref: "https://github.com/80chucho08/RappiPachuca",
    imageSrc: "/rappipachuca.jpg",
  },
  {
    name: "Life Counter",
    kind: "Tiempo de vida",
    description:
      "Aplicación web que calcula y muestra en tiempo real el tiempo vivido a partir de la fecha de nacimiento, con persistencia de datos en LocalStorage.",
    tags: ["React", "JavaScript", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/Life-Counter",
    repoHref: "https://github.com/80chucho08/Life-Counter",
    imageSrc: "/lifecounter.png",
  },
];

export const Projects = () => {
  return (
    <Entry
      id="projects"
      number="02"
      label="Proyectos"
      title="Proyectos"
    >
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <Reveal as="li" key={project.name} className="h-full">
            <CardProjects code={`EXP-${String(index + 1).padStart(2, "0")}`} {...project} />
          </Reveal>
        ))}
      </ul>
    </Entry>
  );
};
