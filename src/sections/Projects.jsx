import { CardProjects } from "@/components/CardProjects";

const projectsData = [
  {
    title: "Landing CRUD - Página Inmobiliaria",
    description:
      "Aplicación web con WordPress, PHP y MySQL que presenta inmuebles, permite búsquedas y gestiona solicitudes de contacto.",
    tags: ["WordPress", "PHP", "MySQL"],
    liveHref: "#",
    repoHref: "#",
  },
  {
    title: "Inventario con Análisis de IA",
    description:
      "Dashboard interactivo desarrollado en Laravel con Bootstrap, conexión a base de datos MySQL y análisis visual de datos.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript", "HTML/CSS"],
    liveHref: "#",
    repoHref: "#",
  },
  {
    title: "PokeApi - Selectores de Pokémon",
    description:
      "Videojuego interactivo creado con JavaScript, ThreeJS y Firebase para almacenar puntuaciones y avanzar niveles.",
    tags: ["Firebase", "JavaScript", "HTML/CSS", "ThreeJS"],
    liveHref: "#",
    repoHref: "#",
  },
  {
    title: "Administrador de Horarios Por hora",
    description:
      "Dashboard interactivo desarrollado en Laravel con Bootstrap, conexión a base de datos MySQL y análisis visual de datos.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript", "HTML/CSS"],
    liveHref: "#",
    repoHref: "#",
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