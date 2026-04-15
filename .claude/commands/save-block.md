Save a reusable code block to the block library.

Ask me for the following if not provided:
1. **Pipeline**: `sound` or `sprites`
2. **Category**: e.g. `textures`, `rhythm`, `fx`, `shapes`, `fills`, `transforms`
3. **Block name**: kebab-case, e.g. `acid-line`
4. **Description**: One-line description of what this block does
5. **Tags**: Comma-separated keywords for discovery

Then:

1. Create the block file at `src/{pipeline}/blocks/{category}/{name}.js` following this format:

For **sound** blocks:
```js
// @ts-nocheck
export const block = {
  name: '{name}',
  tags: [{tags}],
  description: '{description}',
  example: `{functionName}({ param1: value1 })`,
};

/**
 * {description}
 * @param {object} opts
 * @returns {() => Pattern}
 */
export function {functionName}({ param1 = default1 } = {}) {
  return () =>
    // Strudel pattern here
}
```

For **sprite** blocks:
```js
export const block = {
  name: '{name}',
  tags: [{tags}],
  description: '{description}',
  example: `{functionName}(p, cx, cy, size)`,
};

/**
 * {description}
 * @param {object} p - p5 instance
 */
export function {functionName}(p, ...args) {
  // p5 drawing code
}
```

Key rules:
- Sound block factories accept **plain numbers/strings** as params (not `slider()` calls)
- Sound blocks return `() => Pattern` (a thunk, matching the stacks contract)
- FX blocks are higher-order: `(patternFn, opts) => () => Pattern`
- Sprite blocks take `p` as first argument, are pure drawing functions
- Add JSDoc for all parameters
- Keep defaults sensible — extracted from working code

2. Run `node scripts/gen-catalog.js` to regenerate CATALOG.md

3. Show the user the created block and how to use it in a sketch:
```js
import { functionName } from '../blocks/category/name.js';
export const stacks = [
  { name: "example", pattern: functionName({ param1: value1 }) },
];
```

If the user provides code (a working pattern or function), extract it into the block format automatically — parameterize magic numbers as options with the original values as defaults.
