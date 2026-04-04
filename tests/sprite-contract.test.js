import { describe, it, expect } from 'vitest';
import { sketches } from '../src/sprites/sketches/index.js';

describe('Sprite sketch contracts', () => {
  for (const [slug, loader] of Object.entries(sketches)) {
    describe(slug, () => {
      it('exports meta with title', async () => {
        const mod = await loader();
        expect(mod.meta).toBeDefined();
        expect(typeof mod.meta.title).toBe('string');
      });

      it('exports config with width, height, cols, rows', async () => {
        const mod = await loader();
        expect(mod.config).toBeDefined();
        expect(typeof mod.config.width).toBe('number');
        expect(typeof mod.config.height).toBe('number');
        expect(typeof mod.config.cols).toBe('number');
        expect(typeof mod.config.rows).toBe('number');
      });

      it('exports draw as a function', async () => {
        const mod = await loader();
        expect(typeof mod.draw).toBe('function');
      });

      it('exports params as an object (can be empty)', async () => {
        const mod = await loader();
        expect(typeof mod.params).toBe('object');
      });
    });
  }
});
