/* eslint-disable react-hooks/immutability -- three.js se anima mutando uniforms y objetos 3D en cada frame (patrón estándar de R3F). */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2, Vector3, Vector4 } from "three";
import { BACK_TEETH, FRONT_TEETH, getLayout } from "./layout";
import { TIMELINE, sketchFragment, stainFragment, vertexShader } from "./shaders";
import { buildSketches } from "./sketches";

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const smooth = (v) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const growE = (t) => 1 - Math.pow(1 - clamp01((t - TIMELINE.impact) / (TIMELINE.growEnd - TIMELINE.impact)), 2.4);

const makeShared = () => ({
  uTime: { value: 0 },
  uCenter: { value: new Vector2() },
  uMaxR: { value: 100 },
  uAspect: { value: 1 },
  uTop: { value: 300 },
  uMouse: { value: new Vector2(9999, 9999) },
  uMouseK: { value: 0 },
  uRip: { value: Array.from({ length: 8 }, () => new Vector4(0, 0, -100, 0)) },
  uDrops: { value: Array.from({ length: 12 }, () => new Vector4(0, 0, 0, 0)) },
  uTrailEnd: { value: new Vector2() },
  uTrailG: { value: 0 },
  uInk: { value: new Vector3(0.1, 0.1, 0.12) },
  uLine: { value: new Vector3(0.09, 0.09, 0.11) },
  uWash: { value: 1 },
});

const makeMaterial = (shared, fragmentShader, extra = {}) =>
  new ShaderMaterial({
    uniforms: { ...shared, ...extra },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

const Scene = ({ inputRef, isDark, reduced, onStage }) => {
  const { size, invalidate } = useThree();
  const L = useMemo(() => getLayout(size.width, size.height), [size.width, size.height]);
  const shared = useMemo(() => makeShared(), []);
  const [tex, setTex] = useState(null);

  const sim = useRef({
    t: 0,
    impacted: false,
    notes: false,
    done: false,
    drops: [],
    ripIdx: 0,
    lastRip: { x: 1e9, y: 1e9 },
    lastSpawn: 0,
    mx: 0,
    my: 0,
    mk: 0,
    boilT: 0,
    boil: 0,
    spin: 0,
  });

  const mats = useMemo(() => {
    const sketch = (seed) => makeMaterial(shared, sketchFragment, { uMap: { value: null }, uReveal: { value: 0 }, uSeed: { value: seed } });
    return {
      bg: makeMaterial(shared, stainFragment),
      gearFront: sketch(1.3),
      gearBack: sketch(5.7),
      rings: [0, 1, 2, 3].map((i) => sketch(9.1 + i)),
      margin: sketch(13.9),
    };
  }, [shared]);

  const refs = {
    front: useRef(null),
    back: useRef(null),
    rings: [useRef(null), useRef(null), useRef(null), useRef(null)],
  };

  useEffect(() => {
    shared.uInk.value.set(...(isDark ? [0.03, 0.04, 0.035] : [0.1, 0.1, 0.12]));
    shared.uLine.value.set(...(isDark ? [0.91, 0.89, 0.82] : [0.09, 0.09, 0.11]));
    shared.uWash.value = isDark ? 1.7 : 1;
    invalidate();
  }, [isDark, shared, invalidate]);

  // Los bocetos se regeneran (con un pequeño retardo) cuando cambia el tamaño.
  useEffect(() => {
    let cancelled = false;
    let built = null;
    const id = window.setTimeout(async () => {
      try {
        await document.fonts?.load?.("28px Caveat");
      } catch {
        /* sin la fuente se usa la de respaldo */
      }
      if (cancelled) return;
      built = buildSketches(L, size.width, size.height, Math.min(window.devicePixelRatio || 1, 2));
      setTex(built);
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      if (built) window.setTimeout(() => built.dispose(), 400);
    };
  }, [L, size.width, size.height]);

  useEffect(() => {
    if (!tex) return;
    mats.gearFront.uniforms.uMap.value = tex.gearFront[0];
    mats.gearBack.uniforms.uMap.value = tex.gearBack[0];
    mats.rings.forEach((m, i) => (m.uniforms.uMap.value = tex.rings[i][0]));
    mats.margin.uniforms.uMap.value = tex.margin[0];
    invalidate();
  }, [tex, mats, invalidate]);

  useFrame((_, delta) => {
    const s = sim.current;
    const u = shared;
    const dt = Math.min(delta, 0.05);
    // El tiempo de la animación lo marca el scroll (progress 0..1), suavizado para que avance y retroceda con fluidez.
    if (reduced) s.t = 30;
    else {
      const target = inputRef.current.progress * TIMELINE.scrollEnd;
      s.t += (target - s.t) * (1 - Math.exp(-Math.min(delta, 0.5) * 6));
    }
    // Solo en desarrollo: permite fijar el tiempo desde la consola (window.__inkTime) para revisar la animación.
    if (import.meta.env.DEV && typeof window.__inkTime === "number") s.t = window.__inkTime;
    const t = s.t;

    u.uTime.value = t;
    u.uCenter.value.set(L.center.x, L.center.y);
    u.uMaxR.value = L.s;
    u.uAspect.value = L.aspect;
    u.uTop.value = size.height / 2 + 30;
    u.uTrailEnd.value.set(L.trailEnd.x, L.trailEnd.y);
    u.uTrailG.value = smooth((t - TIMELINE.trailStart) / (TIMELINE.trailEnd - TIMELINE.trailStart));

    // Salpicaduras del impacto (si se retrocede con el scroll, la gota vuelve a caer).
    if (s.impacted && t < TIMELINE.impact - 0.2) {
      s.impacted = false;
      s.drops = [];
    }
    if (!s.impacted && t >= TIMELINE.impact) {
      s.impacted = true;
      for (let i = 0; i < 9; i++) {
        const a = Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const sp = 140 + Math.random() * 240;
        s.drops.push({ x: L.center.x, y: L.center.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: 2.2 + Math.random() * 3.3, life: 0.7 + Math.random() * 0.6, age: 0 });
      }
    }

    // Ratón: estirar la mancha, ondas y salpicaduras.
    const input = inputRef.current;
    const active = input.active && !reduced;
    if (active) {
      const k = Math.min(1, dt * 10);
      s.mx += (input.x - s.mx) * k;
      s.my += (input.y - s.my) * k;
    }
    const g = growE(t);
    const rel = Math.hypot((input.x - L.center.x) / L.aspect, input.y - L.center.y) / Math.max(L.s * g, 1);
    const live = active && t > TIMELINE.impact + 1.2;
    const speedF = clamp01(input.speed / 450);
    const targetK = live ? smooth((1.9 - rel) / 0.8) * (0.45 + 0.55 * speedF) : 0;
    s.mk += (targetK - s.mk) * Math.min(1, dt * (targetK > s.mk ? 8 : 3));
    u.uMouse.value.set(s.mx, s.my);
    u.uMouseK.value = s.mk < 0.01 ? 0 : s.mk;

    if (live && rel < 1.6) {
      if (Math.hypot(input.x - s.lastRip.x, input.y - s.lastRip.y) > 26) {
        u.uRip.value[s.ripIdx % 8].set(input.x, input.y, t, Math.min(1, 0.35 + input.speed / 700));
        s.ripIdx++;
        s.lastRip = { x: input.x, y: input.y };
      }
      if (rel > 0.75 && input.speed > 420 && t - s.lastSpawn > 0.08) {
        s.lastSpawn = t;
        for (let i = 0; i < 2; i++) {
          s.drops.push({
            x: input.x + (Math.random() - 0.5) * 20,
            y: input.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 260,
            vy: 90 + Math.random() * 210,
            r: 1.6 + Math.random() * 1.8,
            life: 0.5 + Math.random() * 0.4,
            age: 0,
          });
        }
      }
    }

    // Gotas en vuelo.
    s.drops = s.drops.filter((d) => d.age < d.life).slice(-12);
    s.drops.forEach((d) => {
      d.age += dt;
      d.vy -= 700 * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
    });
    for (let i = 0; i < 12; i++) {
      const d = s.drops[i];
      if (d && d.age < d.life) u.uDrops.value[i].set(d.x, d.y, d.r * Math.sqrt(1 - d.age / d.life), 0);
      else u.uDrops.value[i].set(0, 0, 0, 0);
    }

    // Revelado de bocetos, engranajes que giran y núcleo que late.
    const rev = (start, dur) => smooth((t - start) / dur);
    mats.gearFront.uniforms.uReveal.value = rev(3.2, 2.0);
    mats.gearBack.uniforms.uReveal.value = rev(3.8, 2.0);
    mats.rings.forEach((m, i) => (m.uniforms.uReveal.value = rev(4.4 + i * 0.25, 1.8)));
    mats.margin.uniforms.uReveal.value = rev(5.0, 2.2);

    if (!reduced) s.spin += dt * smooth((t - 4) / 2) * (0.11 + 0.1 * s.mk);
    const phi = Math.atan2(L.gears.back.y - L.gears.front.y, L.gears.back.x - L.gears.front.x);
    if (refs.front.current) refs.front.current.rotation.z = phi - s.spin;
    if (refs.back.current) refs.back.current.rotation.z = phi + Math.PI + Math.PI / BACK_TEETH + s.spin * (FRONT_TEETH / BACK_TEETH);
    refs.rings.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.scale.setScalar(reduced ? 1 : 1 + 0.06 * Math.sin(t * 1.7 - i * 0.8));
      ref.current.rotation.z = reduced ? 0 : (i % 2 ? -1 : 1) * t * 0.12 * (i + 1) * 0.5;
    });

    // "Boil": alternar la variante del trazo unas 5 veces por segundo.
    if (tex && !reduced) {
      s.boilT += dt;
      if (s.boilT > 0.2) {
        s.boilT = 0;
        s.boil ^= 1;
        mats.gearFront.uniforms.uMap.value = tex.gearFront[s.boil];
        mats.gearBack.uniforms.uMap.value = tex.gearBack[s.boil];
        mats.rings.forEach((m, i) => (m.uniforms.uMap.value = tex.rings[i][s.boil]));
        mats.margin.uniforms.uMap.value = tex.margin[s.boil];
      }
    }

    const notesOn = t >= TIMELINE.notes;
    if (notesOn !== s.notes) {
      s.notes = notesOn;
      onStage?.("notes", notesOn);
    }
    const doneOn = t >= TIMELINE.done;
    if (doneOn !== s.done) {
      s.done = doneOn;
      onStage?.("done", doneOn);
    }
  });

  const { front, back, core } = L.gears;
  return (
    <>
      <mesh material={mats.bg} renderOrder={0}>
        <planeGeometry args={[size.width, size.height]} />
      </mesh>
      {tex && (
        <>
          <mesh ref={refs.front} position={[front.x, front.y, 0]} material={mats.gearFront} renderOrder={1}>
            <planeGeometry args={[front.d / 0.94, front.d / 0.94]} />
          </mesh>
          <mesh ref={refs.back} position={[back.x, back.y, 0]} material={mats.gearBack} renderOrder={1}>
            <planeGeometry args={[back.d / 0.94, back.d / 0.94]} />
          </mesh>
          {mats.rings.map((m, i) => (
            <mesh key={i} ref={refs.rings[i]} position={[core.x, core.y, 0]} material={m} renderOrder={1}>
              <planeGeometry args={[core.d / 0.94, core.d / 0.94]} />
            </mesh>
          ))}
          <mesh position={[0, 0, 0]} material={mats.margin} renderOrder={2}>
            <planeGeometry args={[size.width, size.height]} />
          </mesh>
        </>
      )}
    </>
  );
};

export const InkScene = ({ inputRef, isDark, reduced, playing, onStage }) => (
  <Canvas
    aria-hidden="true"
    orthographic
    camera={{ zoom: 1, position: [0, 0, 100], near: 0.1, far: 1000 }}
    dpr={[1, 1.5]}
    frameloop={reduced ? "demand" : playing ? "always" : "never"}
    gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    style={{ position: "absolute", inset: 0 }}
  >
    <Scene inputRef={inputRef} isDark={isDark} reduced={reduced} onStage={onStage} />
  </Canvas>
);
