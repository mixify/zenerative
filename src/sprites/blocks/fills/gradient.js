export const block = {
  name: 'gradient',
  tags: ['fill', 'background'],
  description: 'Draw a linear gradient fill between two colors.',
  example: `gradient(p, 0, 0, 32, 32, [0, 60, 20], [0, 80, 80])`,
};

/**
 * Draw a linear gradient fill (top to bottom) between two colors.
 * Expects p5 colorMode to already be set by the caller.
 * @param {object} p - p5 instance
 * @param {number} x - top-left x
 * @param {number} y - top-left y
 * @param {number} w - width
 * @param {number} h - height
 * @param {number[]} colorA - [c1, c2, c3] top color components
 * @param {number[]} colorB - [c1, c2, c3] bottom color components
 * @param {boolean} [horizontal=false] - if true, gradient runs left to right
 */
export function gradient(p, x, y, w, h, colorA, colorB, horizontal = false) {
  const cA = p.color(colorA[0], colorA[1], colorA[2]);
  const cB = p.color(colorB[0], colorB[1], colorB[2]);
  p.noStroke();
  const steps = horizontal ? w : h;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    p.fill(p.lerpColor(cA, cB, t));
    if (horizontal) {
      p.rect(x + i, y, 1, h);
    } else {
      p.rect(x, y + i, w, 1);
    }
  }
}
