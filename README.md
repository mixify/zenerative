# Zenerative

Generative sprites & sound toolkit for Godot. Two pipelines, one browser UI.

## Sprites

p5.js generative tiles → PNG sprite sheets.

- Param sliders auto-generated from sketch config
- Export individual tiles or full sprite sheets
- Designed for Godot `AnimatedSprite2D` / `TileSet`

## Sound

Strudel live-coded patterns → WAV / OGG.

- Native Strudel CodeMirror editor per stack (syntax highlighting, mini-notation token boxes, active sound highlighting)
- Inline sliders via `slider(default, min, max)`
- Pianoroll visualization per stack
- Full sample packs (Dirt-Samples, piano, VCSL, drum machines)

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + Enter` | Toggle Play / Stop |
| `Cmd/Ctrl + .` | Stop |

## Sketch format

### Sound sketch

```js
// src/sound/sketches/my-sketch/sketch.js
export const meta = { title: 'My Sketch', description: '...' };
export const config = { duration: 8 };

export const stacks = [
  { name: "bass", pattern: () =>
    note("<c2 g2>(3,8)")
      .s("sawtooth")
      .cutoff(slider(800, 200, 5000))
      .gain(slider(0.5, 0, 1))
  },
  { name: "drums", pattern: () =>
    s("bd sd hh cp")
      .gain(slider(0.7, 0, 1))
  },
];
```

Real JS = syntax highlighted in your editor + LLM-friendly. Each stack gets its own editor, sliders, and visualization in the browser.

### Sprite sketch

```js
// src/sprites/sketches/my-tiles/sketch.js
export const meta = { title: 'My Tiles', description: '...' };
export const config = { width: 32, height: 32, cols: 4, rows: 4 };
export const params = { hue: { min: 0, max: 360, default: 0 } };

export function draw(p, { col, row, width, height, hue }) {
  // p5.js drawing code
}
```

### Auto-discovery

Drop a folder with `sketch.js` into `src/sound/sketches/` or `src/sprites/sketches/` — it registers automatically via `import.meta.glob`. No index file to maintain.

## Setup

```
npm install
npm run dev
```

## Tests

```
npx vitest run          # contract tests
npx playwright test     # e2e tests (requires dev server running)
```

## Stack

- [Vite](https://vitejs.dev/)
- [Strudel](https://strudel.cc/) — live coding patterns
- [p5.js](https://p5js.org/) — generative graphics
- [Playwright](https://playwright.dev/) — e2e tests
