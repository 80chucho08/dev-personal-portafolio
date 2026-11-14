import { CanvasTexture, LinearFilter } from "three";
import { BACK_TEETH, FRONT_TEETH } from "./layout";

/*
 * Bocetos "a pluma": se dibujan en canvas 2D con trazos imperfectos (doble pasada,
 * vértices desplazados, remates que se pasan) y se suben como texturas de solo alfa.
 * Cada boceto tiene 2 variantes con trazo distinto; alternarlas da el efecto "boil"
 * de los dibujos animados a mano.
 */
const TAU = Math.PI * 2;

const mulberry = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const newCanvas = (w, h) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(2, Math.round(w));
  canvas.height = Math.max(2, Math.round(h));
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  return { canvas, ctx };
};

const toTexture = (canvas) => {
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
};

const trace = (ctx, pts, closed, smooth) => {
  const n = pts.length;
  ctx.beginPath();
  if (!smooth || n < 3) {
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    if (closed) ctx.closePath();
  } else if (closed) {
    ctx.moveTo((pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2);
    for (let i = 0; i < n; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % n];
      ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    }
    ctx.closePath();
  } else {
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    }
    ctx.lineTo(pts[n - 1][0], pts[n - 1][1]);
  }
  ctx.stroke();
};

// Trazo de pluma: dos pasadas con vértices distintos (la segunda más fina).
const pen = (ctx, rnd, pts, lw, { closed = false, smooth = true, jitter = 1, passes = 2 } = {}) => {
  for (let k = 0; k < passes; k++) {
    ctx.lineWidth = lw * (k === 0 ? 1 : 0.55) * (0.9 + rnd() * 0.2);
    const j = jitter * (k === 0 ? 1 : 0.9);
    trace(
      ctx,
      pts.map(([x, y]) => [x + (rnd() - 0.5) * 2 * j, y + (rnd() - 0.5) * 2 * j]),
      closed,
      smooth,
    );
  }
};

const arcPts = (cx, cy, rx, ry, a0, a1, rnd, wob = 0.012) => {
  const steps = Math.max(10, Math.round(Math.abs(a1 - a0) * 7));
  const p1 = rnd() * TAU;
  const p2 = rnd() * TAU;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const k = 1 + wob * (Math.sin(a * 3 + p1) + Math.sin(a * 5 + p2));
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return pts;
};

// Círculo que "se pasa" un poco al cerrar, como al dibujarlo a mano alzada.
const circle = (ctx, rnd, cx, cy, r, lw, jitter, wob) => {
  const start = rnd() * TAU;
  pen(ctx, rnd, arcPts(cx, cy, r, r, start, start + TAU * 1.05, rnd, wob), lw, { jitter });
};

const arrowHead = (ctx, rnd, x, y, angle, size, lw) => {
  for (const side of [-1, 1]) {
    const a = angle + Math.PI + side * 0.45;
    pen(ctx, rnd, [[x, y], [x + Math.cos(a) * size, y + Math.sin(a) * size]], lw, { passes: 1, jitter: 0.4 });
  }
};

export const drawGear = (size, teeth, seed, variant) => {
  const { canvas, ctx } = newCanvas(size, size);
  const rnd = mulberry(seed * 131 + variant * 7919 + 17);
  const cx = size / 2;
  const cy = size / 2;
  const Ro = size * 0.47;
  const Ri = Ro * 0.8;
  const lw = Math.max(1.6, size * 0.012);
  const j = size * 0.004;
  const polar = (r, a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];

  const pitch = TAU / teeth;
  const outline = [];
  for (let t = 0; t < teeth; t++) {
    const a0 = t * pitch;
    outline.push(polar(Ri, a0 - 0.34 * pitch), polar(Ro, a0 - 0.2 * pitch), polar(Ro, a0 + 0.2 * pitch), polar(Ri, a0 + 0.34 * pitch), polar(Ri * 0.99, a0 + 0.5 * pitch));
  }
  pen(ctx, rnd, outline, lw * 1.15, { closed: true, smooth: false, jitter: j * 1.4 });

  const ringR = Ri * 0.64;
  const hubR = Ro * 0.2;
  circle(ctx, rnd, cx, cy, ringR, lw, j, 0.01);
  circle(ctx, rnd, cx, cy, hubR, lw, j, 0.02);
  circle(ctx, rnd, cx, cy, Ro * 0.07, lw * 0.8, j * 0.6, 0.02);

  const spokes = 5;
  for (let s = 0; s < spokes; s++) {
    const a = s * (TAU / spokes) + 0.3;
    for (const off of [-0.11, 0.11]) {
      const bend = (rnd() - 0.5) * 0.06;
      pen(ctx, rnd, [polar(hubR, a + off), polar((hubR + ringR) / 2, a + off + bend), polar(ringR, a + off)], lw * 0.85, { jitter: j * 0.6, passes: 1 });
    }
  }

  // Sombreado a rayitas en un sector, como en un boceto técnico.
  const sectorStart = 0.3 + 0.2;
  for (let k = 0; k < 6; k++) {
    const a = sectorStart + k * 0.075;
    pen(ctx, rnd, [polar(Ri * 0.7, a), polar(Ri * 0.93, a + 0.015)], lw * 0.55, { jitter: j * 0.5, passes: 1 });
  }

  // Tachadura sobre un diente.
  const toothA = 3 * pitch;
  const scribble = [];
  for (let k = 0; k < 5; k++) scribble.push(polar(Ro * (k % 2 ? 0.86 : 1.02), toothA - 0.3 * pitch + k * 0.14 * pitch));
  pen(ctx, rnd, scribble, lw * 0.8, { smooth: false, jitter: j * 0.6, passes: 1 });

  // Flecha de giro.
  const arrowR = Ri * 0.8;
  const a0 = 3.5;
  const a1 = 4.7;
  pen(ctx, rnd, arcPts(cx, cy, arrowR, arrowR, a0, a1, rnd, 0.01), lw * 0.9, { jitter: j * 0.5, passes: 1 });
  const tip = polar(arrowR, a1);
  arrowHead(ctx, rnd, tip[0], tip[1], a1 + Math.PI / 2, size * 0.04, lw * 0.9);

  return canvas;
};

// Un anillo del núcleo de IA (se dibuja uno por textura para poder hacerlos latir por separado).
export const drawRing = (size, index, seed, variant) => {
  const { canvas, ctx } = newCanvas(size, size);
  const rnd = mulberry(seed * 977 + index * 31 + variant * 6151 + 5);
  const cx = size / 2;
  const cy = size / 2;
  const radii = [0.1, 0.21, 0.32, 0.44];
  const r = radii[index] * size;
  const lw = Math.max(1.4, size * (0.016 - index * 0.002));
  const j = size * 0.004;

  circle(ctx, rnd, cx, cy, r, lw, j, 0.02);

  if (index === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, lw * 2.4, 0, TAU);
    ctx.fill();
  }

  // Nodos sobre el anillo.
  const nodes = 2 + index;
  const phase = rnd() * TAU;
  for (let k = 0; k < nodes; k++) {
    const a = phase + (k * TAU) / nodes + (rnd() - 0.5) * 0.4;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, lw * 1.5, 0, TAU);
    ctx.fill();
  }

  if (index === 3) {
    for (let k = 0; k < 10; k++) {
      const a = (k * TAU) / 10 + rnd() * 0.15;
      pen(ctx, rnd, [[cx + Math.cos(a) * r * 1.02, cy + Math.sin(a) * r * 1.02], [cx + Math.cos(a) * r * 1.1, cy + Math.sin(a) * r * 1.1]], lw * 0.8, { passes: 1, jitter: 0.4 });
    }
  }
  return canvas;
};

// Capa estática de márgenes: emblemas, cotas, flechas, notas tachadas.
export const drawMargin = (w, h, L, scale, seed, variant) => {
  const { canvas, ctx } = newCanvas(w * scale, h * scale);
  ctx.scale(scale, scale);
  const rnd = mulberry(seed * 4099 + variant * 104729 + 3);
  const X = (x) => w / 2 + x;
  const Y = (y) => h / 2 - y;
  const { front, back, core } = L.gears;
  const lw = 1.7;
  const handFont = (px) => `${px}px Caveat, "Segoe Print", cursive`;

  const text = (str, x, y, px, rot = 0, align = "center") => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.font = handFont(px);
    ctx.textAlign = align;
    ctx.fillText(str, 0, 0);
    ctx.restore();
  };

  // Emblema del engrane frontend: </>
  const fe = front.d * 0.15;
  const fx = X(front.x);
  const fy = Y(front.y);
  pen(ctx, rnd, [[fx - 0.55 * fe, fy - 0.45 * fe], [fx - 1.1 * fe, fy], [fx - 0.55 * fe, fy + 0.45 * fe]], lw * 1.2, { jitter: 0.6 });
  pen(ctx, rnd, [[fx - 0.12 * fe, fy + 0.6 * fe], [fx + 0.18 * fe, fy - 0.6 * fe]], lw * 1.2, { jitter: 0.6 });
  pen(ctx, rnd, [[fx + 0.55 * fe, fy - 0.45 * fe], [fx + 1.1 * fe, fy], [fx + 0.55 * fe, fy + 0.45 * fe]], lw * 1.2, { jitter: 0.6 });

  // Emblema del engrane backend: cilindro de base de datos.
  const be = back.d * 0.13;
  const bx = X(back.x);
  const by = Y(back.y);
  pen(ctx, rnd, arcPts(bx, by - 0.65 * be, 0.95 * be, 0.34 * be, 0, TAU * 1.04, rnd, 0.01), lw * 1.1, { jitter: 0.5 });
  pen(ctx, rnd, [[bx - 0.95 * be, by - 0.65 * be], [bx - 0.95 * be, by + 0.7 * be]], lw * 1.1, { jitter: 0.5 });
  pen(ctx, rnd, [[bx + 0.95 * be, by - 0.65 * be], [bx + 0.95 * be, by + 0.7 * be]], lw * 1.1, { jitter: 0.5 });
  pen(ctx, rnd, arcPts(bx, by + 0.7 * be, 0.95 * be, 0.34 * be, 0, Math.PI, rnd, 0.01), lw * 1.1, { jitter: 0.5 });
  pen(ctx, rnd, arcPts(bx, by + 0.03 * be, 0.95 * be, 0.34 * be, 0.1, Math.PI - 0.1, rnd, 0.01), lw * 0.8, { jitter: 0.5, passes: 1 });

  // Cota del engrane frontend.
  const dimY = Y(front.y + front.d / 2) - 22;
  const dx1 = X(front.x - front.d / 2);
  const dx2 = X(front.x + front.d / 2);
  pen(ctx, rnd, [[dx1, dimY], [dx2, dimY]], lw * 0.8, { jitter: 0.5, passes: 1 });
  for (const x of [dx1, dx2]) pen(ctx, rnd, [[x, dimY - 6], [x, dimY + 6]], lw * 0.8, { jitter: 0.4, passes: 1 });
  arrowHead(ctx, rnd, dx1, dimY, Math.PI, 7, lw * 0.8);
  arrowHead(ctx, rnd, dx2, dimY, 0, 7, lw * 0.8);
  text("Ø 42", (dx1 + dx2) / 2, dimY - 5, 19, -0.02);

  // Números de figura.
  text("fig. 1", X(front.x - front.d * 0.62), Y(front.y - front.d * 0.02), 19, -0.08);
  text("fig. 2", X(back.x + back.d * 0.42), Y(back.y - back.d * 0.58), 19, 0.05);
  text("fig. 3", X(core.x), Y(core.y + core.d * 0.62), 19, -0.04);

  // Flecha curva: de los datos del backend al núcleo de IA.
  const ax = X(back.x + back.d * 0.4);
  const ay = Y(back.y + back.d * 0.3);
  const bx2 = X(core.x - core.d * 0.58);
  const by2 = Y(core.y - core.d * 0.12);
  const midx = (ax + bx2) / 2 + 12;
  const midy = (ay + by2) / 2 + 22;
  pen(ctx, rnd, [[ax, ay], [midx, midy], [bx2, by2]], lw, { jitter: 0.8 });
  arrowHead(ctx, rnd, bx2, by2, Math.atan2(by2 - midy, bx2 - midx), 9, lw);
  text("datos", midx + 30, midy - 4, 20, 0.2);

  // Versión anterior tachada y versión nueva con palomita.
  const nx = X(L.center.x - L.s * L.aspect * 0.62);
  const ny = Y(L.center.y - L.s * 0.6);
  text("motor v1", nx, ny, 22, -0.06, "left");
  ctx.font = handFont(22);
  const tw = ctx.measureText("motor v1").width;
  pen(ctx, rnd, [[nx - 4, ny - 6], [nx + tw * 0.5, ny - 9], [nx + tw + 4, ny - 5]], lw * 1.2, { jitter: 1.2 });
  text("motor v2", nx + 4, ny + 22, 22, -0.04, "left");
  const cxm = nx + 4 + ctx.measureText("motor v2").width + 12;
  pen(ctx, rnd, [[cxm, ny + 14], [cxm + 6, ny + 21], [cxm + 17, ny + 6]], lw * 1.2, { jitter: 0.6 });

  if (w >= 560) text("tinta fresca", X(L.center.x + L.s * L.aspect * 0.3), Y(L.center.y - L.s * 0.72), 20, -0.04);

  return canvas;
};

export const buildSketches = (L, w, h, scale) => {
  const g = L.gears;
  const sizeFront = Math.round(Math.min(640, Math.max(256, (g.front.d / 0.94) * scale)));
  const sizeBack = Math.round(Math.min(640, Math.max(256, (g.back.d / 0.94) * scale)));
  const sizeCore = Math.round(Math.min(512, Math.max(192, (g.core.d / 0.94) * scale)));

  const variants = [0, 1];
  const textures = {
    gearFront: variants.map((v) => toTexture(drawGear(sizeFront, FRONT_TEETH, 1, v))),
    gearBack: variants.map((v) => toTexture(drawGear(sizeBack, BACK_TEETH, 2, v))),
    rings: [0, 1, 2, 3].map((i) => variants.map((v) => toTexture(drawRing(sizeCore, i, 3, v)))),
    margin: variants.map((v) => toTexture(drawMargin(w, h, L, scale, 4, v))),
  };

  const all = [...textures.gearFront, ...textures.gearBack, ...textures.rings.flat(), ...textures.margin];
  textures.dispose = () => all.forEach((t) => t.dispose());
  return textures;
};
