const modules = import.meta.glob('./**/sketch.js');

export const sketches = Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => !path.includes('_template'))
    .map(([path, loader]) => {
      const slug = path.split('/')[1];
      return [slug, loader];
    })
);

// Accept HMR here — prevent sketch file changes from triggering full page reload.
// The actual live-reload is handled by hmr.js via WebSocket.
if (import.meta.hot) {
  import.meta.hot.accept();
}
