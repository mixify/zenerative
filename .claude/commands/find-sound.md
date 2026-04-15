Find and suggest sound samples for a Strudel pattern.

1. Read `src/sound/SAMPLES.md` to see all available samples and categories.

2. Based on what the user is looking for (e.g. "tin sound", "ambient pad", "808 kick"), suggest matching samples with:
   - Sample name and variation count: e.g. `tink` (5 variations, use `s("tink:0")` through `s("tink:4")`)
   - Category it belongs to
   - How to use it in Strudel code
   - Similar alternatives from other categories

3. If no built-in sample matches, suggest:
   - Built-in synths (`sine`, `sawtooth`, `square`, `triangle`) with effects to approximate
   - External sample packs that could be loaded via `samples()` in engine.js
   - Free sample sources (freesound.org, etc.)

4. Show a ready-to-use code snippet:
```js
// Example: metallic tin sound
{ name: "tink", pattern: () =>
    s("tink:0 tink:2 tink:1 tink:3")
      .gain(slider(0.5, 0, 1))
      .room(0.3)
      .delay(0.2)
}
```

5. If the user wants to add a custom sample:
   - Add it to `engine.js` in the `prebake()` function using `samples()`
   - Update `SAMPLES.md` with the new entry

Variation syntax: `s("name:N")` where N is 0-indexed. Example: `metal:0` through `metal:9`.
To play random variations: `s("metal").n(irand(10))`.
