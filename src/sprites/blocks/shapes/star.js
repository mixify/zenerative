export const block = {
  name: 'star',
  tags: ['shape', 'decorative'],
  description: 'Draw a star with configurable points and inner/outer radius.',
  example: `star(p, 16, 16, 6, 12, 5)`,
};

/**
 * Draw a star shape.
 * @param {object} p - p5 instance
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} innerRadius - radius of inner vertices
 * @param {number} outerRadius - radius of outer vertices
 * @param {number} points - number of star points
 * @param {number} [rotation=0] - rotation offset in radians
 */
export function star(p, cx, cy, innerRadius, outerRadius, points, rotation = 0) {
  const step = p.TWO_PI / (points * 2);
  p.beginShape();
  for (let i = 0; i < points * 2; i++) {
    const a = step * i + rotation - p.HALF_PI;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    p.vertex(cx + p.cos(a) * r, cy + p.sin(a) * r);
  }
  p.endShape(p.CLOSE);
}
