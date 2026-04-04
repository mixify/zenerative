import { renderSpriteSheet, getCanvas, destroy } from './engine.js';
import { exportPNG } from './export.js';
import { buildParamsUI } from '../params-ui.js';
import { sketches } from './sketches/index.js';

export async function renderViewer(container, slug) {
  const loader = sketches[slug];
  if (!loader) {
    container.innerHTML = `<p>Sketch "${slug}" not found.</p>`;
    return;
  }

  const sketch = await loader();
  const hasParams = sketch.params && Object.keys(sketch.params).length > 0;

  container.innerHTML = `
    <div class="toolbar">
      <a class="back" id="back">&larr; Back</a>
      <h2>${sketch.meta.title}</h2>
      <button id="export-png">Export PNG</button>
      <button id="re-render">Re-render</button>
    </div>
    <div class="config-bar toolbar">
      <label>Tile: <input id="cfg-w" type="number" value="${sketch.config.width}" style="width:50px"> x <input id="cfg-h" type="number" value="${sketch.config.height}" style="width:50px"></label>
      <label>Grid: <input id="cfg-cols" type="number" value="${sketch.config.cols}" style="width:40px"> x <input id="cfg-rows" type="number" value="${sketch.config.rows}" style="width:40px"></label>
    </div>
    ${hasParams ? '<div class="params-panel"><h3>Parameters</h3><div id="params-container"></div></div>' : ''}
    <div id="canvas-container"></div>
  `;

  const canvasContainer = container.querySelector('#canvas-container');
  let currentParamValues = {};

  function render() {
    const cfg = {
      width: parseInt(container.querySelector('#cfg-w').value) || sketch.config.width,
      height: parseInt(container.querySelector('#cfg-h').value) || sketch.config.height,
      cols: parseInt(container.querySelector('#cfg-cols').value) || sketch.config.cols,
      rows: parseInt(container.querySelector('#cfg-rows').value) || sketch.config.rows,
    };
    canvasContainer.innerHTML = '';
    renderSpriteSheet(canvasContainer, {
      config: cfg,
      meta: sketch.meta,
      draw: (p, tileInfo) => sketch.draw(p, { ...tileInfo, ...currentParamValues }),
    });
  }

  // Build param sliders
  if (hasParams) {
    const paramsContainer = container.querySelector('#params-container');
    const paramsUI = buildParamsUI(paramsContainer, sketch.params, (values) => {
      currentParamValues = values;
      render();
    });
    currentParamValues = paramsUI.getValues();
  }

  render();

  container.querySelector('#back').addEventListener('click', (e) => {
    e.preventDefault();
    destroy();
    const url = new URL(location.href);
    url.searchParams.delete('sketch');
    history.pushState(null, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  container.querySelector('#export-png').addEventListener('click', () => {
    const canvas = getCanvas();
    if (canvas) {
      const cols = parseInt(container.querySelector('#cfg-cols').value) || sketch.config.cols;
      const rows = parseInt(container.querySelector('#cfg-rows').value) || sketch.config.rows;
      exportPNG(canvas, `${slug}-${cols}x${rows}.png`);
    }
  });

  container.querySelector('#re-render').addEventListener('click', render);
}
