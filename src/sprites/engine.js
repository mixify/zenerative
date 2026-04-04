import p5 from 'p5';

let currentInstance = null;

/**
 * Renders a sprite sheet by calling sketch.draw() for each tile cell.
 * Returns the p5 instance (canvas lives inside containerEl).
 */
export function renderSpriteSheet(containerEl, sketch) {
  destroy();

  const { width, height, cols, rows } = sketch.config;
  const sheetW = width * cols;
  const sheetH = height * rows;

  currentInstance = new p5((p) => {
    p.setup = () => {
      p.createCanvas(sheetW, sheetH);
      p.noLoop();
      p.pixelDensity(1);
      p.background(0, 0);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          p.push();
          p.translate(col * width, row * height);
          // Clip to tile bounds
          p.drawingContext.save();
          p.drawingContext.beginPath();
          p.drawingContext.rect(0, 0, width, height);
          p.drawingContext.clip();
          sketch.draw(p, { col, row, width, height });
          p.drawingContext.restore();
          p.pop();
        }
      }
    };
  }, containerEl);

  return currentInstance;
}

export function getCanvas() {
  if (!currentInstance) return null;
  return currentInstance.canvas ?? currentInstance.drawingContext?.canvas;
}

export function destroy() {
  if (currentInstance) {
    currentInstance.remove();
    currentInstance = null;
  }
}
