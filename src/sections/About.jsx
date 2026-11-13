import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";

const focusLines = [
  {
    code: "L-01",
    title: "Backend y APIs",
    body: "Diseño servidores con Node.js y Express, APIs REST y arquitectura MVC, con autenticación y contraseñas protegidas con hashing.",
  },
  {
    code: "L-02",
    title: "Bases de datos",
    body: "Trabajo con SQL Server, MySQL y MongoDB. En el Centro de Cómputo del ITP optimicé procedimientos almacenados que procesan grandes volúmenes de registros.",
  },
  {
    code: "L-03",
    title: "Interfaces web y móviles",
    body: "Construyo formularios, dashboards y apps con React, React Native, TypeScript y Tailwind, cuidando que se usen bien en cualquier pantalla.",
  },
  {
    code: "L-04",
    title: "En exploración: nube e IA",
    body: "Certificado en AWS Cloud Foundations y Python Essentials; ahora experimento con servicios en la nube e inteligencia artificial.",
    open: true,
  },
];

const facts = [
  ["Formación", "Ing. en Sistemas Computacionales"],
  ["Institución", "Instituto Tecnológico de Pachuca"],
  ["Egreso", "Diciembre 2026"],
  ["Idiomas", "Español nativo · Inglés B2"],
  ["Base", "Pachuca, Hidalgo, México"],
];

export const About = () => {
  return (
    <Entry id="about" number="01" label="Perfil" title="Perfil" note="lo que me mueve →">
      <Reveal>
        <p className="max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl">
          Soy desarrollador fullstack en formación: construyo aplicaciones completas, del backend y la base de datos
          hasta la interfaz web y móvil. Me interesa la arquitectura de software y llevar la inteligencia artificial a
          productos reales. Mi meta es <Highlight>crear software sólido, escalable y con IA que resuelva problemas reales.</Highlight>
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 xl:grid-cols-[1.4fr_0.6fr] xl:gap-14">
        <div>
          <Reveal>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Líneas de trabajo</h3>
          </Reveal>
          <ol className="border-t border-border">
            {focusLines.map(({ code, title, body, open }) => (
              <Reveal
                as="li"
                key={code}
                className="grid gap-2 border-b border-border py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-xs text-muted-foreground">{code}</span>
                <div>
                  <h4 className="font-display text-2xl font-medium text-foreground">
                    {title}
                    {open && <span className="ml-3 font-hand text-xl text-primary">(en curso)</span>}
                  </h4>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <aside className="border border-border bg-card p-6">
            <h3 className="font-hand text-2xl text-primary">datos rápidos</h3>
            <dl className="mt-4 divide-y divide-border">
              {facts.map(([label, value]) => (
                <div key={label} className="py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-base text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
            <a href="#contact" className="ink-link mt-5 inline-block text-base">
              Escríbeme →
            </a>
          </aside>
        </Reveal>
      </div>
    </Entry>
  );
};
