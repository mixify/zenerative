export const block = {
  name: 'noise-fill',
  tags: ['fill', 'procedural'],
  description: 'Fill a rectangular area with perlin noise-based color variation.',
  example: `noiseFill(p, 0, 0, 32, 32, [200, 80, 60], [220, 90, 90], 0.08)`,
};

/**
 * Fill an area with perlin noise-based color variation.
 * Colors are interpolated between colorA and colorB based on noise values.
 * Expects p5 colorMode to already be set by the caller.
 * @param {object} p - p5 instance
 * @param {number} x - top-left x
 * @param {number} y - top-left y
 * @param {number} w - width
 * @param {number} h - height
 * @param {number[]} colorA - [c1, c2, c3] start color components
 * @param {number[]} colorB - [c1, c2, c3] end color components
 * @param {number} [scale=0.1] - noise scale (smaller = smoother)
 */
export function noiseFill(p, x, y, w, h, colorA, colorB, scale = 0.1) {
  p.loadPixels();
  const cA = p.color(colorA[0], colorA[1], colorA[2]);
  const cB = p.color(colorB[0], colorB[1], colorB[2]);
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      const n = p.noise(px * scale, py * scale);
      const c = p.lerpColor(cA, cB, n);
      p.set(px, py, c);
    }
  }
  p.updatePixels();
}
