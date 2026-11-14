import { CardProjects } from "@/components/CardProjects";
import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";

// `featured` es una marca de prueba; la selección definitiva de destacados está pendiente.
const projectsData = [
  {
    name: "Carrito IoT Control System",
    kind: "IoT Dashboard",
    description:
      "Panel web interactivo para el control y monitoreo remoto de un vehículo robótico IoT. Integra joysticks virtuales, ejecución de rutinas automatizadas, parada de emergencia y telemetría en tiempo real mediante una API REST y WebSockets.",
    tags: ["JavaScript", "HTML5", "CSS3", "ES Modules", "REST API", "WebSocket", "GitHub Pages"],
    liveHref: "https://80chucho08.github.io/vehiculo-iot-front/",
    repoHref: "https://github.com/80chucho08/vehiculo-iot-front",
    group: "Vehículo IoT",
    images: [
      { src: "/project_images/control-iot-front/control-dashboard.png", caption: "Panel de control con joysticks virtuales, parada de emergencia y estado de los servicios." },
      { src: "/project_images/control-iot-front/demo-ejecucion.png", caption: "Rutina demo en ejecución con temporizador y botón para cancelarla." },
      { src: "/project_images/control-iot-front/monitoring-dashboard.png", caption: "Monitoreo: último movimiento y los últimos 10 comandos persistidos en la base de datos." },
    ],
    featured: null,
  },
  {
    name: "IoT Vehicle Management API",
    kind: "Backend API",
    description:
      "API backend desarrollada con FastAPI para la gestión y control de vehículos IoT. Integra servicios REST, comunicación WebSocket en tiempo real y persistencia con MySQL. Desplegada en una instancia AWS EC2 con acceso mediante dominio dinámico DuckDNS.",
    tags: ["Python", "AWS EC2 (Windows Server)", "MySQL", "DuckDNS", "REST API y WebSockets", "Stored Procedures", "FastAPI + Uvicorn"],
    liveHref: "https://vehiculo-iot-itp.duckdns.org/docs",
    repoHref: "https://github.com/80chucho08/vehiculo-iot-api.git",
    group: "Vehículo IoT",
    images: [
      { src: "/project_images/control-iot-api/swagger-image-1.png", caption: "Documentación Swagger: endpoints para crear, actualizar y eliminar vehículos, comandos, estado e historial." },
      { src: "/project_images/control-iot-api/swagger-image-2.png", caption: "Documentación Swagger: consultas, ejecución de demos y comprobación de la base de datos." },
    ],
    featured: true,
  },
  {
    name: "UniTrack",
    kind: "Gestor académico",
    description:
      "Aplicación web full stack para la gestión de materias, horarios, tareas y notas. Incluye autenticación con JWT, control de sesiones (login/logout), rutas protegidas y arquitectura MVC en el backend.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Tailwind"],
    liveHref: null,
    repoHref: "https://github.com/80chucho08/UniTrack",
    images: [{ src: "/project_images/unitrack/unitrack.jpg", caption: "Captura de UniTrack." }],
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
    images: [{ src: "/project_images/schtrack/schtrack.jpg", caption: "Captura de SchTrack." }],
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
    images: [{ src: "/project_images/rappipachuca/rappipachuca.jpg", caption: "Captura de RappiPachuca." }],
  },
  {
    name: "Life Counter",
    kind: "Tiempo de vida",
    description:
      "Aplicación web que calcula y muestra en tiempo real el tiempo vivido a partir de la fecha de nacimiento, con persistencia de datos en LocalStorage.",
    tags: ["React", "JavaScript", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/Life-Counter",
    repoHref: "https://github.com/80chucho08/Life-Counter",
    images: [{ src: "/project_images/life-counter/lifecounter.png", caption: "Captura de Life Counter." }],
  },
];

const withCode = projectsData.map((project, index) => ({
  ...project,
  code: `EXP-${String(index + 1).padStart(2, "0")}`,
}));

// Los proyectos con la misma clave `group` se agrupan en un solo marco, en la posición del primero.
const blocks = [];
withCode.forEach((project) => {
  if (!project.group) {
    blocks.push({ type: "single", project });
    return;
  }
  const existing = blocks.find((block) => block.group === project.group);
  if (existing) existing.projects.push(project);
  else blocks.push({ type: "group", group: project.group, projects: [project] });
});

const groupSpan = {
  1: "",
  2: "md:col-span-2",
  3: "md:col-span-2 lg:col-span-3",
};
const groupColumns = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
};

/* Marco que encierra proyectos que funcionan en conjunto. */
const ProjectGroup = ({ group, projects }) => {
  const size = Math.min(projects.length, 3);
  return (
    <Reveal
      as="li"
      className={`relative h-full border-2 border-dashed border-primary/60 bg-hover/50 px-3 pb-3 pt-7 shadow-[6px_6px_0_0_var(--color-border)] sm:px-4 sm:pb-4 ${groupSpan[size]}`}
    >
      <p className="absolute -top-4 left-4 flex max-w-[calc(100%-2rem)] items-baseline gap-2 bg-background px-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Relacionados</span>
        <span className="font-hand text-2xl leading-none text-primary">{group}</span>
      </p>
      <ul className={`grid gap-6 ${groupColumns[size]}`}>
        {projects.map((project) => (
          <li key={project.name}>
            <CardProjects {...project} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
};

export const Projects = () => {
  return (
    <Entry id="projects" number="02" label="Proyectos" title="Proyectos">
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) =>
          block.type === "group" ? (
            <ProjectGroup key={block.group} group={block.group} projects={block.projects} />
          ) : (
            <Reveal as="li" key={block.project.name} className="h-full">
              <CardProjects {...block.project} />
            </Reveal>
          ),
        )}
      </ul>
    </Entry>
  );
};
