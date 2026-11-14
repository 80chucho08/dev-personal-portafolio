/*
 * Línea de tiempo en "segundos" de animación; el scroll la recorre (no el reloj):
 *   0.5 → 1.5  cae la gota
 *   1.5        impacto y salpicaduras
 *   1.5 → 7.5  la mancha se expande, absorbida por el papel
 *   3.2 → 7.2  aparecen los bocetos dentro de la mancha
 *   6.5 → 10   un hilo de tinta baja hacia la siguiente entrada (Proyectos)
 * Debe coincidir con las constantes de InkScene.jsx.
 */
export const TIMELINE = {
  dropStart: 0.5,
  impact: 1.5,
  growEnd: 7.5,
  trailStart: 6.5,
  trailEnd: 10,
  notes: 6.2,
  done: 10,
  scrollEnd: 10.5, // el scroll recorre 0 → scrollEnd
};

const common = /* glsl */ `
uniform float uTime;
uniform vec2 uCenter;
uniform float uMaxR;
uniform float uAspect;
uniform float uTop;
uniform vec2 uMouse;
uniform float uMouseK;
uniform vec4 uRip[8];
uniform vec4 uDrops[12];
uniform vec2 uTrailEnd;
uniform float uTrailG;

const float DROP_START = ${TIMELINE.dropStart.toFixed(2)};
const float IMPACT = ${TIMELINE.impact.toFixed(2)};
const float GROW_END = ${TIMELINE.growEnd.toFixed(2)};

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}
float growT() { return clamp((uTime - IMPACT) / (GROW_END - IMPACT), 0.0, 1.0); }
float growE() { return 1.0 - pow(1.0 - growT(), 2.4); }

vec2 rippleDisp(vec2 p) {
  vec2 dsp = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (r.w > 0.0 && age > 0.0 && age < 3.0) {
      vec2 v = p - r.xy;
      float d = length(v);
      float w = sin(d * 0.05 - age * 8.0) * exp(-d * 0.012) * exp(-age * 1.6) * r.w;
      dsp += v / (d + 1e-3) * w * 9.0;
    }
  }
  return dsp;
}

float rippleShade(vec2 p) {
  float s = 0.0;
  for (int i = 0; i < 8; i++) {
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (r.w > 0.0 && age > 0.0 && age < 3.0) {
      float d = length(p - r.xy);
      s += sin(d * 0.05 - age * 8.0) * exp(-d * 0.012) * exp(-age * 1.6) * r.w;
    }
  }
  return s;
}

// Distancia con signo (px) al borde de la mancha: negativo = dentro.
float stainD(vec2 p0) {
  vec2 p = p0 + rippleDisp(p0);
  float t = growT();
  float g = growE();
  float impacted = step(IMPACT, uTime);

  vec2 q = p - uCenter;
  q.x /= uAspect;
  float r = length(q);
  vec2 dir = q / (r + 1e-3);
  float n = fbm(dir * 1.7 + vec2(4.1, 2.7) + uTime * 0.03);
  float rough = fbm(q * 0.02 + 11.0) * 0.14;
  float R = uMaxR * g + 8.0 * impacted * (1.0 - t);
  float b = R * (0.86 + 0.34 * n + rough);
  float d = r - b;

  if (uMouseK > 0.01) {
    float dm = length(p0 - uMouse) - 34.0 * uMouseK;
    d = smin(d, dm, 52.0);
  }

  for (int i = 0; i < 12; i++) {
    vec4 dr = uDrops[i];
    if (dr.z > 0.0) d = smin(d, length(p0 - dr.xy) - dr.z, 10.0);
  }

  if (uTrailG > 0.001) {
    vec2 a = uCenter;
    vec2 e = mix(uCenter, uTrailEnd, uTrailG);
    vec2 ba = e - a;
    float h = clamp(dot(p0 - a, ba) / max(dot(ba, ba), 1.0), 0.0, 1.0);
    float w = mix(10.0, 3.5, h) + 1.6 * sin(p0.y * 0.05 + uTime);
    float dt = length(p0 - a - ba * h) - w;
    float bulb = length(p0 - e) - w * 1.6;
    d = smin(d, min(dt, bulb), 26.0);
  }
  return d;
}

float dropMask(vec2 p) {
  float u = (uTime - DROP_START) / (IMPACT - DROP_START);
  if (u <= 0.0 || u >= 1.0) return 0.0;
  float y = mix(uTop, uCenter.y, u * u * 0.85 + u * u * u * 0.15);
  vec2 c = vec2(uCenter.x, y);
  float stretch = 1.0 + 0.9 * u;
  vec2 v = p - c;
  float body = length(vec2(v.x, v.y / stretch)) - 7.5;
  float ty = clamp(v.y, 3.0, 3.0 + 24.0 * u);
  float tail = length(vec2(v.x * 1.8, v.y - ty)) - 1.6;
  float d = smin(body, tail, 8.0);
  return 1.0 - smoothstep(-1.0, 1.0, d);
}
`;

export const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec2 vWorld;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const stainFragment = /* glsl */ `
varying vec2 vWorld;
uniform vec3 uInk;
uniform float uWash;
${common}
void main() {
  vec2 p = vWorld;
  float d = stainD(p);
  float m = (1.0 - smoothstep(-1.3, 1.3, d)) * step(IMPACT, uTime);
  float t = growT();

  float ring = smoothstep(-18.0, -0.5, d);
  float grain = fbm(p * 0.045);
  vec2 cq = vec2((p.x - uCenter.x) / uAspect, p.y - uCenter.y);
  float rr = length(cq) / max(uMaxR, 1.0);
  float core = exp(-rr * rr * 4.0) * (1.0 - smoothstep(0.0, 1.0, t)) * 0.55;
  float wash = mix(0.42, 0.16, smoothstep(0.0, 1.0, t)) * uWash;

  float a = m * (wash * (0.7 + 0.6 * grain) + ring * 0.26 * uWash * (0.6 + 0.8 * grain) + core);
  a += m * rippleShade(p) * 0.05;
  a = max(a, dropMask(p) * 0.92);
  gl_FragColor = vec4(uInk, clamp(a, 0.0, 0.95));
}
`;

export const sketchFragment = /* glsl */ `
varying vec2 vUv;
varying vec2 vWorld;
uniform sampler2D uMap;
uniform vec3 uLine;
uniform float uReveal;
uniform float uSeed;
${common}
void main() {
  float a = texture2D(uMap, vUv).a;
  if (a < 0.01) discard;
  float d = stainD(vWorld);
  float inside = 1.0 - smoothstep(-34.0, -14.0, d);
  float n = fbm(vUv * 7.0 + uSeed);
  float reveal = smoothstep(n - 0.15, n + 0.05, uReveal * 1.25 - 0.1);
  gl_FragColor = vec4(uLine, a * inside * reveal * 0.96);
}
`;
