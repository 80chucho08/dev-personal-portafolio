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
    imageSrc: "project_images/control-iot-front/control-dashboard.png",
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
    imageSrc: "project_images/control-iot-api/swagger-image-1.png",
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
    imageSrc: "project_images/unitrack/unitrack.jpg",
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
    imageSrc: "project_images/schtrack/schtrack.jpg",
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
    imageSrc: "project_images/rappipachuca/rappipachuca.jpg",
  },
  {
    name: "Life Counter",
    kind: "Tiempo de vida",
    description:
      "Aplicación web que calcula y muestra en tiempo real el tiempo vivido a partir de la fecha de nacimiento, con persistencia de datos en LocalStorage.",
    tags: ["React", "JavaScript", "LocalStorage"],
    liveHref: "https://80chucho08.github.io/Life-Counter",
    repoHref: "https://github.com/80chucho08/Life-Counter",
    imageSrc: "project_images/life-counter/lifecounter.png",
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
