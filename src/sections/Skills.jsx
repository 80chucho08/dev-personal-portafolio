import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";

// Agrupado por capa del sistema; sin niveles autoasignados.
const stack = [
  { layer: "Lenguajes", items: ["Python", "Java", "C#", "JavaScript", "TypeScript", "PHP"] },
  { layer: "Backend", items: ["Node.js", "Express", "APIs REST", "Arquitectura MVC", "Autenticación y hashing"] },
  { layer: "Datos", items: ["SQL Server", "MySQL", "MongoDB", "Procedimientos almacenados", "Optimización de consultas"] },
  { layer: "Interfaz", items: ["React", "React Native", "HTML/CSS", "Tailwind CSS"] },
  { layer: "Nube y seguridad", items: ["AWS (fundamentos)", "Ciberseguridad (fundamentos)"] },
  { layer: "Herramientas", items: ["Git", "GitHub", "Android Studio", "Expo Go", "Trello"] },
];

const certifications = [
  { name: "AWS Cloud Foundations", issuer: "Amazon Web Services" },
  { name: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco" },
  { name: "Python Essentials 1", issuer: "Cisco" },
  { name: "Inglés B2 (High Intermediate)", issuer: "Voxy Proficiency" },
];

export const Skills = () => {
  return (
    <Entry id="skills" number="03" label="Stack" title="Stack" note="ordenado por capa, de la interfaz a los datos">
      <div className="grid gap-12 xl:grid-cols-[1.4fr_0.6fr] xl:gap-14">
        <dl className="border-t border-border">
          {stack.map(({ layer, items }) => (
            <Reveal key={layer} className="grid gap-3 border-b border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:pt-1.5">{layer}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="border border-border bg-card px-3 py-1 text-base text-foreground transition-colors duration-200 hover:border-primary"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <aside className="border border-border bg-card p-6">
            <h3 className="font-hand text-2xl text-primary">certificaciones</h3>
            <ul className="mt-4 divide-y divide-border">
              {certifications.map(({ name, issuer }) => (
                <li key={name} className="py-3">
                  <p className="text-base leading-snug text-foreground">{name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{issuer}</p>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Entry>
  );
};
