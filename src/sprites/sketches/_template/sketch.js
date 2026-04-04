export const meta = {
  title: 'Untitled Sprite Sketch',
  description: 'Describe what tiles this sketch generates.',
};

export const config = {
  width: 32,   // tile width in px
  height: 32,  // tile height in px
  cols: 4,     // columns in sprite sheet
  rows: 4,     // rows in sprite sheet
};

// Tweakable parameters — auto-generates sliders in the UI.
// Types: { min, max, default } → slider, { options, default } → dropdown,
//        { default: true } → checkbox, { default: '#ff0000' } → color picker
export const params = {
  // size: { min: 4, max: 32, default: 16 },
  // color: { default: '#ffffff' },
};

/**
 * Draw a single tile.
 * @param {object} p - p5 instance
 * @param {object} opts - { col, row, width, height, ...paramValues }
 */
export function draw(p, { col, row, width, height }) {
  p.background(0, 0);
  // Draw your tile here
}
