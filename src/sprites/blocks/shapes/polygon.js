export const block = {
  name: 'polygon',
  tags: ['shape', 'primitive'],
  description: 'Draw a regular polygon with a configurable number of sides.',
  example: `polygon(p, 16, 16, 12, 6)`,
};

/**
 * Draw a regular polygon (triangle, square, pentagon, etc.).
 * @param {object} p - p5 instance
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} radius - distance from center to each vertex
 * @param {number} sides - number of sides (3 = triangle, 4 = square, etc.)
 * @param {number} [rotation=0] - rotation offset in radians
 */
export function polygon(p, cx, cy, radius, sides, rotation = 0) {
  const angle = p.TWO_PI / sides;
  p.beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle * i + rotation - p.HALF_PI;
    p.vertex(cx + p.cos(a) * radius, cy + p.sin(a) * radius);
  }
  p.endShape(p.CLOSE);
}
