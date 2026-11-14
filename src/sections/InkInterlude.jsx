import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { getLayout } from "@/components/ink/layout";

// three.js (~medio MB) se descarga solo cuando la hoja está por aparecer.
const InkScene = lazy(() => import("@/components/ink/InkScene").then((m) => ({ default: m.InkScene })));

const parts = [
  { id: "front", tech: "React", label: "Frontend", list: ["React", "TypeScript", "Tailwind CSS", "React Native"] },
  { id: "back", tech: "Node.js", label: "Backend", list: ["Node.js", "Express", "APIs REST", "SQL Server · MySQL · MongoDB"] },
  { id: "core", tech: "IA", label: "Automatización", list: ["Python", "Automatización", "(en exploración)"] },
];

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const useIsDark = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// Posición de cada nota respecto a su boceto (en px dentro del lienzo).
const notePlacement = (id, L, w, h) => {
  const g = L.gears[id];
  if (id === "front") {
    return { left: clamp(w / 2 + g.x, 80, w - 80), top: h / 2 - (g.y - g.d / 2) + 30, transform: "translate(-50%, 0)" };
  }
  if (id === "back") {
    const right = w / 2 + g.x + g.d / 2 + 16;
    if (right + 150 < w) return { left: right, top: h / 2 - g.y, transform: "translate(0, -50%)" };
    return { left: w / 2 + g.x - g.d / 2 - 16, top: h / 2 - g.y, transform: "translate(-100%, -50%)" };
  }
  return { left: clamp(w / 2 + g.x, 80, w - 80), top: h / 2 - (g.y + g.d / 2) - 26, transform: "translate(-50%, -100%)" };
};

const Note = ({ part, style, showNote, showList }) => (
  <div
    aria-hidden="true"
    style={style}
    className={`pointer-events-none absolute z-10 border border-border bg-card/95 px-3 py-2 text-center shadow-sm transition-all duration-300 ${
      showNote ? "translate-y-0 opacity-100" : "opacity-0"
    }`}
  >
    <p className="font-hand text-2xl leading-none text-foreground sm:text-3xl">{part.tech}</p>
    <p className="font-hand text-2xl leading-none text-primary">↑</p>
    <p className="font-hand text-xl leading-none text-primary sm:text-2xl">{part.label}</p>
    <ul
      className={`mx-auto mt-2 w-max max-w-[11rem] space-y-0.5 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-muted-foreground ${
        showList ? "block" : "hidden"
      }`}
    >
      {part.list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const PIN_TOP = 64; // px: debajo de la barra de navegación fija

export const InkInterlude = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const inputRef = useRef({ x: 0, y: 0, active: false, speed: 0, t: 0, progress: 0 });
  const near = useInView(sectionRef, { margin: "600px 0px", once: true });
  const inView = useInView(sectionRef);
  const isDark = useIsDark();
  const webgl = useMemo(() => hasWebGL(), []);
  const touchOnly = useMemo(() => window.matchMedia("(hover: none)").matches, []);
  // Con scroll dirigido la hoja se ancla (sticky) mientras la tinta avanza; sin WebGL o con movimiento reducido es estática.
  const scrub = webgl && !reduceMotion;

  const [stage, setStage] = useState({ notes: false, done: false });
  const [hover, setHover] = useState(null);
  const [hinted, setHinted] = useState(false);
  const [scrollHint, setScrollHint] = useState(true);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Progreso 0..1 según lo que se ha recorrido de la sección anclada.
  useEffect(() => {
    if (!scrub) return undefined;
    const update = () => {
      const section = sectionRef.current;
      const wrap = wrapRef.current;
      if (!section || !wrap) return;
      const range = Math.max(section.offsetHeight - wrap.offsetHeight, 1);
      const p = Math.min(Math.max((PIN_TOP - section.getBoundingClientRect().top) / range, 0), 1);
      inputRef.current.progress = p;
      setScrollHint(p < 0.04);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrub]);

  const onStage = useCallback(
    (name, value) => setStage((prev) => (prev[name] === value ? prev : { ...prev, [name]: value })),
    [],
  );
  const L = useMemo(() => (size.w ? getLayout(size.w, size.h) : null), [size.w, size.h]);

  const handlePointer = (event) => {
    if (!L) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = event.clientX - rect.left - size.w / 2;
    const py = size.h / 2 - (event.clientY - rect.top);
    const now = performance.now();
    const input = inputRef.current;
    const dt = Math.max(now - input.t, 8);
    const instant = input.active ? (Math.hypot(px - input.x, py - input.y) / dt) * 1000 : 0;
    input.speed += (instant - input.speed) * 0.4;
    input.x = px;
    input.y = py;
    input.t = now;
    input.active = true;

    let nearest = null;
    let best = Infinity;
    parts.forEach(({ id }) => {
      const g = L.gears[id];
      const dist = Math.hypot(px - g.x, py - g.y);
      if (dist < g.d * 0.5 + 60 && dist < best) {
        best = dist;
        nearest = id;
      }
    });
    setHover(nearest);
    if (nearest) setHinted(true);
  };

  const handleLeave = () => {
    inputRef.current.active = false;
    inputRef.current.speed = 0;
    setHover(null);
  };

  const compact = size.w > 0 && size.w < 560;
  const alwaysNotes = touchOnly || Boolean(reduceMotion) || !webgl;
  const notesReady = stage.notes || !webgl || Boolean(reduceMotion);
  const doneReady = stage.done || Boolean(reduceMotion);

  return (
    <section
      ref={sectionRef}
      id="interlude"
      aria-label="Interludio: boceto a tinta de mi stack"
      className={`border-t border-border px-5 sm:px-8 lg:px-12 ${scrub ? "h-[300svh]" : ""}`}
    >
      <div className={`mx-auto max-w-[1200px] lg:grid lg:grid-cols-[11rem_1fr] ${scrub ? "h-full" : ""}`}>
        <div aria-hidden="true" className="hidden lg:block lg:border-r lg:border-margin" />

        <div className={scrub ? "h-full" : ""}>
          <div
            ref={wrapRef}
            onPointerMove={handlePointer}
            onPointerDown={handlePointer}
            onPointerLeave={handleLeave}
            onPointerCancel={handleLeave}
            style={scrub ? { top: PIN_TOP } : undefined}
            className={`relative h-[calc(100svh-5rem)] max-h-[760px] min-h-[520px] touch-pan-y select-none overflow-hidden lg:ml-12 ${
              scrub ? "sticky" : ""
            }`}
          >
            {webgl && near && (
              <Suspense fallback={null}>
                <InkScene
                  inputRef={inputRef}
                  isDark={isDark}
                  reduced={Boolean(reduceMotion)}
                  playing={inView}
                  onStage={onStage}
                />
              </Suspense>
            )}

            {L &&
              notesReady &&
              !compact &&
              parts.map((part) => (
                <Note
                  key={part.id}
                  part={part}
                  style={notePlacement(part.id, L, size.w, size.h)}
                  showNote={alwaysNotes || hover === part.id}
                  showList={hover === part.id}
                />
              ))}

            {L && stage.notes && !hinted && webgl && !compact && (
              <p aria-hidden="true" className="absolute bottom-3 left-2 -rotate-1 font-hand text-xl text-muted-foreground">
                {touchOnly ? "(toca los bocetos)" : "(acerca el cursor a los bocetos)"}
              </p>
            )}

            {scrub && scrollHint && (
              <p
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-hand text-2xl text-muted-foreground/70"
              >
                ↓ sigue bajando
              </p>
            )}

            {L && doneReady && (
              <a
                href="#projects"
                style={{ left: size.w / 2 + L.trailEnd.x + 22, bottom: compact ? 108 : 8 }}
                className="absolute z-10 font-hand text-2xl text-primary transition-colors duration-200 hover:text-foreground"
              >
                ↓ proyectos
              </a>
            )}

            {compact && notesReady && (
              <ul aria-hidden="true" className="absolute inset-x-0 bottom-2 grid grid-cols-3 gap-2 text-center">
                {parts.map((part) => (
                  <li key={part.id}>
                    <p className="font-hand text-2xl leading-none text-foreground">{part.tech}</p>
                    <p className="font-hand text-xl leading-none text-primary">↑</p>
                    <p className="font-hand text-lg leading-none text-primary">{part.label}</p>
                    <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.08em] text-muted-foreground">
                      {part.list.slice(0, 3).join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="sr-only">
              <h2>Stack en bocetos</h2>
              <ul>
                {parts.map((part) => (
                  <li key={part.id}>
                    {part.label}: {part.list.join(", ")}.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
