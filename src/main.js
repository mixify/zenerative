const app = document.getElementById('app');

function getParams() {
  const p = new URLSearchParams(location.search);
  return { mode: p.get('mode'), sketch: p.get('sketch') };
}

function navigate(params) {
  const url = new URL(location.href);
  for (const [k, v] of Object.entries(params)) {
    if (v == null) url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  }
  history.pushState(null, '', url);
  route();
}

window.addEventListener('popstate', () => route());

async function route() {
  const { mode, sketch } = getParams();

  // Clean up previous view
  app.innerHTML = '';

  if (!mode) {
    renderLanding();
  } else if (mode === 'sprites') {
    if (sketch) {
      const { renderViewer } = await import('./sprites/viewer.js');
      renderViewer(app, sketch);
    } else {
      await renderSketchList('sprites');
    }
  } else if (mode === 'sound') {
    if (sketch) {
      const { renderPlayer } = await import('./sound/player.js');
      renderPlayer(app, sketch);
    } else {
      await renderSketchList('sound');
    }
  }
}

function renderLanding() {
  app.innerHTML = `
    <div class="landing">
      <h1>Zenerative</h1>
      <div class="modes">
        <a class="mode-card" data-mode="sprites">
          <h2>Sprites</h2>
          <p>p5.js generative tiles &rarr; PNG sprite sheets for Godot</p>
        </a>
        <a class="mode-card" data-mode="sound">
          <h2>Sound</h2>
          <p>Strudel generative patterns &rarr; WAV / OGG for Godot</p>
        </a>
      </div>
    </div>
  `;
  app.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => navigate({ mode: card.dataset.mode }));
  });
}

async function renderSketchList(mode) {
  const registry = mode === 'sprites'
    ? (await import('./sprites/sketches/index.js')).sketches
    : (await import('./sound/sketches/index.js')).sketches;

  const title = mode === 'sprites' ? 'Sprite Sketches' : 'Sound Sketches';

  app.innerHTML = `
    <div class="sketch-list">
      <a class="back" data-nav="home">&larr; Back</a>
      <h1>${title}</h1>
      <ul>
        ${Object.keys(registry).map(slug =>
          `<li><a data-sketch="${slug}">${slug}</a></li>`
        ).join('')}
      </ul>
    </div>
  `;

  app.querySelector('[data-nav="home"]').addEventListener('click', (e) => {
    e.preventDefault();
    navigate({ mode: null, sketch: null });
  });

  app.querySelectorAll('[data-sketch]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate({ mode, sketch: link.dataset.sketch });
    });
  });
}

route();
