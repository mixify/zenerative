export const meta = {
  title: 'Basic Tiles',
  description: 'Simple geometric tile variations with tweakable colors and sizes.',
};

export const config = {
  width: 32,
  height: 32,
  cols: 4,
  rows: 4,
};

export const params = {
  hueOffset: { min: 0, max: 360, default: 0 },
  saturation: { min: 0, max: 100, default: 70 },
  shapeSize: { min: 0.2, max: 0.9, default: 0.6, step: 0.05 },
  bgBrightness: { min: 0, max: 40, default: 15 },
  accentSize: { min: 0, max: 0.4, default: 0.2, step: 0.02 },
};

export function draw(p, { col, row, width, height, hueOffset = 0, saturation = 70, shapeSize = 0.6, bgBrightness = 15, accentSize = 0.2 }) {
  const seed = col * 73 + row * 137;
  p.randomSeed(seed);

  const hue = (col * 60 + row * 90 + hueOffset) % 360;
  p.colorMode(p.HSB, 360, 100, 100);
  p.background(hue, 30, bgBrightness);

  p.noStroke();

  const cx = width / 2;
  const cy = height / 2;
  const size = width * shapeSize;

  p.fill(hue, saturation, 80);

  const shape = (col + row) % 3;
  if (shape === 0) {
    p.ellipse(cx, cy, size, size);
  } else if (shape === 1) {
    p.rectMode(p.CENTER);
    p.rect(cx, cy, size, size);
  } else {
    p.triangle(
      cx, cy - size / 2,
      cx - size / 2, cy + size / 2,
      cx + size / 2, cy + size / 2
    );
  }

  if (accentSize > 0) {
    p.fill(hue, 40, 100);
    p.ellipse(cx, cy, size * accentSize, size * accentSize);
  }
}
