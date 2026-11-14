/*
 * Composición de la hoja de tinta. Todo en píxeles CSS, con el origen en el
 * centro del lienzo y el eje Y hacia arriba (coordenadas de three.js).
 * La usan tanto la escena WebGL como las notas HTML para coincidir exactamente.
 */
export const getLayout = (w, h) => {
  const aspect = Math.min(Math.max((w / h) * 0.62, 1), 1.55);
  const s = Math.min(h * 0.38, (w * 0.4) / aspect);
  const center = { x: 0, y: h * 0.12 };
  const wide = Math.min(Math.max((aspect - 1) / 0.55, 0), 1);

  const front = { x: center.x - s * 0.45, y: center.y + s * 0.12, d: s * 0.64 };
  const back = { x: front.x + s * 0.54, y: front.y - s * 0.25, d: s * 0.58 };
  const core = {
    x: center.x + s * (0.4 + 0.34 * wide) * (aspect > 1.2 ? 1.1 : 1),
    y: center.y + s * (0.4 - 0.12 * wide),
    d: s * 0.42,
  };

  return {
    aspect,
    s,
    center,
    gears: { front, back, core },
    // En pantallas estrechas la leyenda ocupa el borde inferior: el hilo termina encima de ella.
    trailEnd: { x: center.x + s * 0.12, y: w < 560 ? -h / 2 + 100 : -h / 2 - 8 },
  };
};

export const FRONT_TEETH = 12;
export const BACK_TEETH = 10;
