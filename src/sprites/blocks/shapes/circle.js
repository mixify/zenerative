export const block = {
  name: 'circle',
  tags: ['shape', 'primitive'],
  description: 'Draw a filled circle centered at (cx, cy).',
  example: `circle(p, 16, 16, 12)`,
};

/**
 * Draw a filled circle.
 * @param {object} p - p5 instance
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} radius
 */
export function circle(p, cx, cy, radius) {
  p.ellipse(cx, cy, radius * 2, radius * 2);
}
