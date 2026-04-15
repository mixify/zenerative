# Zenerative

Two pipelines for generating Godot game assets:

- **Sprites**: p5.js generative tiles → PNG sprite sheets (`src/sprites/`)
- **Sound**: Strudel live-coded patterns → WAV/OGG (`src/sound/`)

## Sound sketches

Each sketch at `src/sound/sketches/{name}/sketch.js` exports `stacks` — an array of `{ name, pattern: () => StrudelPattern }`. Strudel globals (`note`, `s`, `slider`, `perlin`, `rev`, etc.) are available at runtime. Use `slider(default, min, max)` for browser-side controls.

## Sprite sketches

Each sketch at `src/sprites/sketches/{name}/sketch.js` exports a `draw(p, opts)` function using p5.js.

## Blocks

Reusable functions at `src/{sound,sprites}/blocks/`. Auto-discovered via `import.meta.glob`. Run `npm run catalog` to regenerate `CATALOG.md`.

## Commands

- `npm run dev` — Vite dev server with live sync (sketch edits update browser without reload)
- `npm run test` — vitest contract tests
- `npm run catalog` — regenerate block catalogs

## Claude skills

- `/save-block` — save working code as a reusable block
- `/browse-blocks` — search blocks by tags
- `/new-sketch` — compose a new sketch from blocks
