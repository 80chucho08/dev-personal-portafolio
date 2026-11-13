import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload } from "react-icons/fi";
import { Entry } from "@/components/Entry";
import { Reveal } from "@/components/Reveal";
import { Highlight } from "@/components/Highlight";
import { SHOW_EXPERIENCE } from "@/sections/Experience";
import { profile } from "@/data/profile";

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Mexico_City",
});

const links = [
  { label: "GitHub", href: profile.github, detail: "github.com/80chucho08" },
  { label: "LinkedIn", href: profile.linkedin, detail: "in/jesusalfonsonc" },
];

export const Contact = () => {
  const [localTime, setLocalTime] = useState(() => timeFormatter.format(new Date()));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => setLocalTime(timeFormatter.format(new Date())), 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timeoutId = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Entry
      id="contact"
      number={SHOW_EXPERIENCE ? "05" : "04"}
      label="Contacto"
      title="Dejemos una nota"
      note={`en Pachuca son las ${localTime}`}
    >
      <div className="grid items-start gap-12 xl:grid-cols-[1.2fr_0.8fr] xl:gap-14">
        <Reveal>
          <p className="max-w-2xl text-xl leading-relaxed text-foreground sm:text-2xl">
            Busco <Highlight>prácticas profesionales</Highlight> y proyectos donde pueda aportar en desarrollo de
            aplicaciones y gestión de datos. Si tienes una propuesta o una duda, escríbeme.
          </p>

          <div className="mt-10 border border-border bg-card p-5 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Correo</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="ink-link break-all font-display text-2xl sm:text-3xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-10 items-center gap-2 border border-border px-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
              <span role="status" className="font-hand text-xl text-primary">
                {copied ? "¡listo, ya está en tu portapapeles!" : ""}
              </span>
            </div>
            <p className="mt-6 border-t border-border pt-4 text-base text-muted-foreground">{profile.location}</p>
          </div>
        </Reveal>

        <Reveal>
          <ul className="border-t border-border">
            {links.map(({ label, href, detail }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-border py-5 text-foreground"
                >
                  <span>
                    <span className="block font-display text-3xl transition-colors duration-200 group-hover:text-primary">
                      {label}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">{detail}</span>
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="size-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cv}
                download
                className="group flex items-center justify-between gap-4 border-b border-border py-5 text-foreground"
              >
                <span>
                  <span className="block font-display text-3xl transition-colors duration-200 group-hover:text-primary">
                    Currículum
                  </span>
                  <span className="mt-1 block font-mono text-xs text-muted-foreground">PDF · 86 KB</span>
                </span>
                <FiDownload
                  aria-hidden="true"
                  className="size-6 shrink-0 transition-transform duration-200 group-hover:translate-y-1"
                />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </Entry>
  );
};
