import { Reveal } from "@/components/Reveal";

// Set to true after adding real entries to experienceItems.
export const SHOW_EXPERIENCE = false;

const experienceItems = [];

export const Experience = () => {
  if (!SHOW_EXPERIENCE || experienceItems.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-12 border-b border-border pb-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">04 / Trayectoria</p>
          <h2 className="font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-7xl">Experiencia<span className="text-muted-foreground">.</span></h2>
        </Reveal>
        <Reveal>
          <ol className="border-y border-border">
            {experienceItems.map(({ date, role, company }) => (
              <li key={`${date}-${company}`} className="grid gap-3 border-b border-border py-7 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:py-8">
                <time className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{date}</time>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-[-0.04em] text-foreground">{role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{company}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};
