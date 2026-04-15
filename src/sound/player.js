import { prebake } from './engine.js';
import { exportAudio } from './export.js';
import { sketches } from './sketches/index.js';
import { StrudelMirror } from '@strudel/codemirror';
import { transpiler } from '@strudel/transpiler';
import '@strudel/draw';
import { webaudioOutput, initAudioOnFirstClick, getAudioContext } from '@strudel/webaudio';
import { registerHMR, setPlaying } from './hmr.js';

export async function renderPlayer(container, slug) {
  const loader = sketches[slug];
  if (!loader) {
    container.innerHTML = `<p>Sound sketch "${slug}" not found.</p>`;
    return;
  }

  const sketch = await loader();
  const mirrors = [];

  initAudioOnFirstClick();

  container.innerHTML = `
    <div class="toolbar">
      <a class="back" id="back">&larr; Back</a>
      <h2>${sketch.meta.title}</h2>
      <p class="sketch-desc">${sketch.meta.description || ''}</p>
    </div>

    <div class="stacks-container">
      ${sketch.stacks.map((stack, i) => `
        <div class="stack-block" data-stack="${i}">
          <div class="stack-header">
            <span class="stack-name">${stack.name}</span>
          </div>
          <div class="stack-editor" id="editor-${i}"></div>
          <canvas class="stack-canvas" id="canvas-${i}"></canvas>
        </div>
      `).join('')}
    </div>

    <div class="transport">
      <button id="play-all" class="transport-btn">&#9654; Play All</button>
      <button id="stop-all" class="transport-btn">&#9632; Stop All</button>
      <button id="export-wav" class="transport-btn">Export WAV (${sketch.config?.duration || 4}s)</button>
      <button id="export-ogg" class="transport-btn">Export OGG (${sketch.config?.duration || 4}s)</button>
    </div>

    <p id="status" style="color:#888;font-size:0.8rem;margin-top:0.5rem"></p>
  `;

  const statusEl = container.querySelector('#status');

  sketch.stacks.forEach((stack, i) => {
    const root = container.querySelector(`#editor-${i}`);
    const canvas = container.querySelector(`#canvas-${i}`);
    const code = extractCode(stack.pattern);

    const w = canvas.offsetWidth || 800;
    const h = 100;
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const codeWithViz = code + '\n  .punchcard({fold:1})';

    const mirror = new StrudelMirror({
      root,
      id: `stack-${slug}-${i}`,
      initialCode: codeWithViz,
      prebake,
      transpiler,
      drawContext: ctx,
      drawTime: [-2, 2],
      autodraw: false,
      solo: false,
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
    });

    mirrors.push(mirror);
  });

  // Register for live sync
  registerHMR({ mirrors, slug, statusEl });

  let playing = false;

  function playAll() {
    statusEl.textContent = 'Playing...';
    mirrors.forEach(m => m.evaluate());
    playing = true;
    setPlaying(true);
  }

  function stopAll() {
    mirrors.forEach(m => m.stop());
    statusEl.textContent = 'Stopped.';
    playing = false;
    setPlaying(false);
  }

  const onKeydown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (playing) { stopAll(); } else { playAll(); }
    }
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      e.preventDefault();
      stopAll();
    }
  };
  document.addEventListener('keydown', onKeydown);

  container.querySelector('#play-all').addEventListener('click', playAll);
  container.querySelector('#stop-all').addEventListener('click', stopAll);

  container.querySelector('#back').addEventListener('click', (e) => {
    e.preventDefault();
    mirrors.forEach(m => { m.stop(); m.clear(); });
    document.removeEventListener('keydown', onKeydown);
    const url = new URL(location.href);
    url.searchParams.delete('sketch');
    history.pushState(null, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  container.querySelector('#export-wav').addEventListener('click', async () => {
    const dur = sketch.config?.duration || 4;
    statusEl.textContent = `Recording ${dur}s...`;
    await exportAudio(dur, 'wav', slug);
    statusEl.textContent = 'WAV exported!';
  });

  container.querySelector('#export-ogg').addEventListener('click', async () => {
    const dur = sketch.config?.duration || 4;
    statusEl.textContent = `Recording ${dur}s...`;
    await exportAudio(dur, 'ogg', slug);
    statusEl.textContent = 'OGG exported!';
  });
}

function extractCode(fn) {
  let src = fn.toString();
  src = src.replace(/^\(\)\s*=>\s*\n?/, '');
  const lines = src.split('\n');
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length);
  const minIndent = Math.min(...indents);
  if (minIndent > 0) src = lines.map(l => l.slice(minIndent)).join('\n');
  return src.trim();
}
