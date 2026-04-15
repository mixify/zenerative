Create a new sketch by composing blocks from the library.

1. Ask the user what they want to create (mood, style, reference)
2. Read `src/sound/blocks/CATALOG.md` and/or `src/sprites/blocks/CATALOG.md` to find relevant blocks
3. Compose a new sketch using existing blocks where possible, writing new code only for parts that don't have blocks yet

For **sound** sketches:
- Create `src/sound/sketches/{name}/sketch.js`
- Import block factories and use them in the stacks array
- Add `slider()` calls where the user would want live control
- Keep stacks named descriptively

```js
// @ts-nocheck
import { acidLine } from '../../blocks/textures/acid-line.js';
import { choppedBreak } from '../../blocks/rhythm/chopped-break.js';

export const meta = { title: '...', description: '...' };
export const config = { duration: 8 };

export const stacks = [
  { name: "bass", pattern: acidLine({ cutoffHi: slider(4000, 1000, 8000) }) },
  { name: "breaks", pattern: choppedBreak({ glitchChance: slider(0.3, 0, 0.8) }) },
];
```

For **sprite** sketches:
- Create `src/sprites/sketches/{name}/sketch.js`
- Import block functions and call them in the draw function

4. If you write any new reusable pattern/function that could be a block, ask: "Want me to save this as a block too?"

The sketch auto-registers via import.meta.glob — no index file to update.
