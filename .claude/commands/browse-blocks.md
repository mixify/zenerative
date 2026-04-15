Browse and search the block library.

1. Read the catalog files:
   - `src/sound/blocks/CATALOG.md` for sound blocks
   - `src/sprites/blocks/CATALOG.md` for sprite blocks

2. If the user provides a search query or tags, filter blocks by matching name, description, or tags.

3. Present matching blocks with:
   - Name and description
   - Tags
   - Example usage
   - Which sketch(es) already use this block (search for import statements)

4. If the user wants to use a block, show the import + usage code ready to paste into their sketch.

If no CATALOG.md exists yet, run `node scripts/gen-catalog.js` first.