import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

export const SHOW_EXPERIENCE = true;

const experienceItems = [
  {
    date: "Jun — Ago 2025",
    role: "Pasante de Desarrollo Móvil",
    org: "Rica Coca-Cola",
    points: [
      "Desarrollé el frontend de una app móvil de gestión vehicular en React Native para registrar entradas y salidas de vehículos en las sucursales.",
      "Construí interfaces y componentes pensados para el uso diario en dispositivos móviles.",
      "Probé la app en dispositivos Android con Expo Go y Android Studio junto al equipo de desarrollo y el área de TI.",
    ],
    result: "App de registro vehicular para varias sucursales",
    tech: ["JavaScript", "React Native", "Android Studio", "Expo Go"],
  },
  {
    date: "Dic 2024 — Dic 2025",
    role: "Pasante, Centro de Cómputo",
    org: "Instituto Tecnológico de Pachuca",
    points: [
      "Participé en el Sistema Integral de Información (SII) de la institución, en los módulos de estudiantes, aspirantes y docentes.",
      "Etapa 1 · backend y datos: maqueté y programé los módulos y optimicé procedimientos almacenados en SQL Server.",
      "Etapa 2 · frontend: desarrollé formularios y dashboards en React con mejoras visuales respecto a la versión anterior.",
    ],
    result: "Menor tiempo de procesamiento con grandes volúmenes de registros",
    tech: ["PHP", "SQL Server", "TypeScript", "React", "HTML/CSS"],
  },
  {
    date: "2022 — Dic 2026",
    role: "Ingeniería en Sistemas Computacionales",
    org: "Instituto Tecnológico de Pachuca",
    points: ["Cursando 9.º semestre; próximo a realizar prácticas profesionales."],
    tech: [],
  },
];

export const Experience = () => {
  if (!SHOW_EXPERIENCE || experienceItems.length === 0) return null;

  return (
    <Entry id="experience" number="04" label="Trayectoria" title="Registro de campo" note="lo más reciente arriba">
      <ol className="relative border-l border-border pl-6 sm:pl-10">
        {experienceItems.map(({ date, role, org, points, result, tech }) => (
          <Reveal as="li" key={`${date}-${org}`} className="relative pb-14 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(1.5rem+5px)] top-2 size-2.5 rounded-full border-2 border-primary bg-background sm:-left-[calc(2.5rem+5px)]"
            />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{date}</p>
            <h3 className="mt-2 font-display text-3xl font-medium leading-tight text-foreground">{role}</h3>
            <p className="mt-1 text-lg italic text-muted-foreground">{org}</p>

            <ul className="mt-5 max-w-3xl space-y-2">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-base leading-relaxed text-foreground sm:text-lg">
                  <span aria-hidden="true" className="text-muted-foreground">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {result && (
              <p className="mt-5 text-base sm:text-lg">
                <span className="mr-2 font-hand text-2xl text-primary">resultado:</span>
                <Highlight>{result}</Highlight>
              </p>
            )}

            {tech.length > 0 && (
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {tech.join(" · ")}
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </Entry>
  );
};
