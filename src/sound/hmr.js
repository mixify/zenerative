/**
 * Live sync: watches sketch file changes via Vite's WebSocket
 * and pushes new code to StrudelMirror instances without page reload.
 */

let mirrors = [];
let slug = null;
let playing = false;
let statusEl = null;
let rerender = null;
let container = null;

export function registerHMR(opts) {
  mirrors = opts.mirrors;
  slug = opts.slug;
  statusEl = opts.statusEl;
  rerender = opts.rerender;
  container = opts.container;
  playing = false;
}

export function setPlaying(val) {
  playing = val;
}

function extractCode(fn) {
  let src = fn.toString();
  src = src.replace(/^\(\)\s*=>\s*\n?/, '');
  const lines = src.split('\n');
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^(\s*)/)[1].length);
  const min = Math.min(...indents);
  if (min > 0) src = lines.map(l => l.slice(min)).join('\n');
  return src.trim();
}

async function reload() {
  if (!slug || !mirrors.length) return;
  try {
    // Fetch raw JS source from Vite dev server (timestamp busts HTTP cache)
    const resp = await fetch(`/src/sound/sketches/${slug}/sketch.js?t=${Date.now()}`);
    const src = await resp.text();

    // Eval as module via blob URL to bypass Vite's module graph cache
    const blob = new Blob([src], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const mod = await import(/* @vite-ignore */ url);
    URL.revokeObjectURL(url);

    if (!mod?.stacks) return;

    // Stack count changed → full re-render with fresh module
    if (mod.stacks.length !== mirrors.length) {
      const wasPlaying = playing;
      mirrors.forEach(m => { m.stop(); m.clear(); });
      if (rerender && container) {
        await rerender(container, slug, wasPlaying, mod);
      }
      return;
    }

    // Same count → update code in-place
    let updated = 0;
    mod.stacks.forEach((stack, i) => {
      const newCode = extractCode(stack.pattern) + '\n  .punchcard({fold:1})';
      // Also update stack name
      const nameEl = container?.querySelectorAll('.stack-name')[i];
      if (nameEl && nameEl.textContent.toLowerCase() !== stack.name.toLowerCase()) {
        nameEl.textContent = stack.name;
      }
      if (newCode !== mirrors[i].code) {
        mirrors[i].setCode(newCode);
        if (playing) mirrors[i].evaluate();
        updated++;
      }
    });

    if (updated && statusEl) {
      statusEl.textContent = playing ? `Live: ${updated} stack updated.` : `${updated} stack updated.`;
    }
  } catch (e) {
    console.warn('[live-sync]', e.message);
  }
}

// Hook into Vite's HMR WebSocket — intercept updates, prevent page reload
if (import.meta.hot) {
  // Prevent full page reload for sketch files
  import.meta.hot.on('vite:beforeFullReload', (payload) => {
    if (slug) {
      // Cancel the reload — we handle it ourselves
      payload.path = '';
    }
  });

  // Listen for any update and check if it's our sketch
  import.meta.hot.on('vite:afterUpdate', (payload) => {
    const isOurs = payload.updates?.some(u =>
      u.acceptedPath?.includes('/sketches/') ||
      u.path?.includes('/sketches/')
    );
    if (isOurs) reload();
  });

  // Also listen for raw file change events from Vite
  const ws = new WebSocket(`ws://${location.host}`, 'vite-hmr');
  ws.addEventListener('message', (e) => {
    try {
      const msg = JSON.parse(e.data);
      if (msg.type === 'update' || msg.type === 'full-reload') {
        const isSketch = msg.updates?.some(u =>
          u.path?.includes(`/sketches/${slug}/`)
        ) || msg.path?.includes(`/sketches/${slug}/`);
        if (isSketch) reload();
      }
    } catch { /* ignore non-JSON */ }
  });

  import.meta.hot.accept();
}
