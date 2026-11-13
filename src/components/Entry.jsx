import { Reveal } from "@/components/Reveal";

/*
 * Una "entrada" del cuaderno: columna de margen (número, etiqueta y nota
 * manuscrita) separada del contenido por la línea de margen.
 */
export const Entry = ({ id, number, label, title, note, children }) => (
  <section id={id} className="border-t border-border px-5 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-[1200px] lg:grid lg:grid-cols-[11rem_1fr]">
      <aside className="pt-20 lg:border-r lg:border-margin lg:pb-28 lg:pr-8 lg:pt-28">
        <Reveal className="lg:sticky lg:top-28">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Entrada {number}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-foreground">{label}</p>
          {note && (
            <p className="mt-4 hidden max-w-[10rem] -rotate-2 font-hand text-2xl leading-tight text-primary lg:block">
              {note}
            </p>
          )}
        </Reveal>
      </aside>

      <div className="pb-20 pt-6 sm:pb-28 lg:pl-12 lg:pt-28">
        <Reveal>
          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl">
            {title}
          </h2>
          {note && (
            <p className="mt-3 -rotate-1 font-hand text-2xl text-primary lg:hidden">{note}</p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </div>
  </section>
);
