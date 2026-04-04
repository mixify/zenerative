import { describe, it, expect } from 'vitest';
import { sketches } from '../src/sound/sketches/index.js';

describe('Sound sketch contracts', () => {
  for (const [slug, loader] of Object.entries(sketches)) {
    describe(slug, () => {
      it('exports meta with title', async () => {
        const mod = await loader();
        expect(mod.meta).toBeDefined();
        expect(typeof mod.meta.title).toBe('string');
      });

      it('exports config with duration', async () => {
        const mod = await loader();
        expect(mod.config).toBeDefined();
        expect(typeof mod.config.duration).toBe('number');
      });

      it('exports stacks as non-empty array of { name, pattern }', async () => {
        const mod = await loader();
        expect(Array.isArray(mod.stacks)).toBe(true);
        expect(mod.stacks.length).toBeGreaterThan(0);
        mod.stacks.forEach(stack => {
          expect(typeof stack.name).toBe('string');
          expect(typeof stack.pattern).toBe('function');
        });
      });
    });
  }
});
