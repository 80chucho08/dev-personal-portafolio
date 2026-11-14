import { FaAws, FaJava } from "react-icons/fa";
import { FiAward, FiCode, FiDatabase, FiGlobe, FiLayers, FiLock, FiServer, FiShield, FiZap } from "react-icons/fi";
import {
  SiAndroidstudio,
  SiCisco,
  SiCss,
  SiExpo,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
} from "react-icons/si";
import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";

// Agrupado por capa del sistema; sin niveles autoasignados.
// Los logos son monocromos (currentColor) para que encajen con la tinta del cuaderno;
// donde no hay logo de marca se usa un icono genérico.
const stack = [
  {
    layer: "Lenguajes",
    items: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "C#", icon: SiSharp },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "PHP", icon: SiPhp },
    ],
  },
  {
    layer: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "APIs REST", icon: FiServer },
      { name: "Arquitectura MVC", icon: FiLayers },
      { name: "Autenticación y hashing", icon: FiLock },
    ],
  },
  {
    layer: "Datos",
    items: [
      { name: "SQL Server", icon: FiDatabase },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Procedimientos almacenados", icon: FiCode },
      { name: "Optimización de consultas", icon: FiZap },
    ],
  },
  {
    layer: "Interfaz",
    items: [
      { name: "React", icon: SiReact },
      { name: "React Native", icon: SiReact },
      { name: "HTML/CSS", icon: SiHtml5 },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    layer: "Nube y seguridad",
    items: [
      { name: "AWS (fundamentos)", icon: FaAws },
      { name: "Ciberseguridad (fundamentos)", icon: FiShield },
    ],
  },
  {
    layer: "Herramientas",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Android Studio", icon: SiAndroidstudio },
      { name: "Expo Go", icon: SiExpo },
      { name: "Trello", icon: SiTrello },
    ],
  },
];

const certifications = [
  { name: "AWS Cloud Foundations", issuer: "Amazon Web Services", icon: FaAws },
  { name: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco", icon: SiCisco },
  { name: "Python Essentials 1", issuer: "Cisco", icon: SiPython },
  { name: "Inglés B2 (High Intermediate)", issuer: "Voxy Proficiency", icon: FiGlobe },
];

export const Skills = () => {
  return (
    <Entry id="skills" number="03" label="Stack" title="Stack" note="ordenado por capa, de la interfaz a los datos">
      <div className="group/stack grid gap-12 xl:grid-cols-[1.4fr_0.6fr] xl:gap-14">
        <dl className="border-t border-border transition-opacity duration-300 xl:group-has-[aside:hover]/stack:opacity-50">
          {stack.map(({ layer, items }) => (
            <Reveal key={layer} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:pt-1.5">{layer}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map(({ name, icon: Icon }) => (
                  <span
                    key={name}
                    className="group/chip inline-flex items-center gap-2 border border-border bg-card px-3 py-1 text-base text-foreground transition-colors duration-200 hover:border-primary"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover/chip:text-primary"
                    />
                    {name}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <aside className="group/cert relative border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-primary hover:bg-hover hover:shadow-[8px_8px_0_0_var(--color-primary)] xl:origin-left">
            <span
              aria-hidden="true"
              className="tape -top-3 left-8 -rotate-3 opacity-0 transition-opacity duration-300 group-hover/cert:opacity-100"
            />
            <h3 className="flex items-center gap-2 font-hand text-2xl text-primary">
              <FiAward aria-hidden="true" className="size-5 transition-transform duration-300 group-hover/cert:rotate-12" />
              <span className="transition-all duration-300 group-hover/cert:text-3xl">certificaciones</span>
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {certifications.map(({ name, issuer, icon: Icon }) => (
                <li key={name} className="flex items-start gap-3 py-3">
                  <Icon
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover/cert:text-primary"
                  />
                  <div>
                    <p className="text-base leading-snug text-foreground">{name}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 group-hover/cert:text-foreground">
                      {issuer}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Entry>
  );
};
