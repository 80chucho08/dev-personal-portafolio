import { useEffect, useState } from "react";
import { SHOW_EXPERIENCE } from "@/sections/Experience";
import { Reveal } from "@/components/Reveal";

const contactDetails = [
  { label: "Email", value: "hola@tudominio.com" },
  { label: "Ubicación", value: "Ciudad, País" },
  { label: "Teléfono", value: "+57 300 000 0000" },
];

export const Contact = () => {
  const [localTime, setLocalTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => setLocalTime(new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date()));
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="contact" className="border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{SHOW_EXPERIENCE ? "05" : "04"} / Hablemos</p>
            <h2 className="font-display text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-7xl">Contacto<span className="text-muted-foreground">.</span></h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground" aria-live="off">LOCAL TIME&nbsp; {localTime}</p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h3 className="mb-4 flex items-center gap-3 font-display text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
              <span className="relative flex size-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping bg-primary opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 bg-primary" />
              </span>
              Estoy disponible
            </h3>
            <p className="mb-8 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Si quieres trabajar conmigo o tienes alguna duda, escríbeme. Estoy atento a nuevas oportunidades y proyectos desafiantes.
            </p>

            <div className="divide-y divide-border border-y border-border">
              {contactDetails.map(({ label, value }) => (
                <div key={label} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
                  <p className="text-base text-foreground sm:text-lg">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-9">
              <h3 className="mb-2 font-display text-2xl font-medium tracking-[-0.04em] text-foreground">Redes profesionales</h3>
              <p className="mb-4 text-sm leading-7 text-muted-foreground">
                Conecta conmigo en GitHub y LinkedIn para ver mis proyectos, mi trabajo y mi actividad profesional.
              </p>
              <div className="border-t border-border">
                <a href="https://github.com/tu-usuario" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-border py-4 font-display text-2xl text-foreground transition-colors duration-200 hover:text-muted-foreground sm:text-3xl">
                  GitHub <span aria-hidden="true" className="text-lg transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
                <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-border py-4 font-display text-2xl text-foreground transition-colors duration-200 hover:text-muted-foreground sm:text-3xl">
                  LinkedIn <span aria-hidden="true" className="text-lg transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
              </div>
            </div>

            <div className="border border-border p-5 sm:p-6">
              <h3 className="font-display text-xl font-medium tracking-[-0.03em] text-foreground">¿Quieres un mensaje rápido?</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Envía un correo con una descripción breve de tu proyecto y te responderé lo antes posible.
              </p>
              <a href="mailto:hola@tudominio.com" className="group mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-foreground">
                <span className="font-display text-lg font-medium tracking-[-0.03em] sm:text-2xl">hola@tudominio.com</span>
                <span aria-hidden="true" className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
