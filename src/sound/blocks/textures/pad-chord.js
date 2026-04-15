// @ts-nocheck
export const block = {
  name: 'pad-chord',
  tags: ['pad', 'ambient', 'chord', 'evolving'],
  description: 'Slow evolving triangle pad with perlin-driven cutoff sweep.',
  example: `padChord({ cutoffHi: 1400, attack: 2 })`,
};

export function padChord({
  pattern = '<[c3,eb3,g3] [bb2,d3,f3] [ab2,c3,eb3] [g2,bb2,d3]>/8',
  cutoffLo = 300,
  cutoffHi = 1400,
  cutoffSlow = 16,
  attack = 2,
  decay = 4,
  sustain = 0.6,
  release = 3,
  gain = 0.12,
  room = 1,
  delay = 0.4,
  delaytime = 1.5,
} = {}) {
  return () =>
    note(pattern)
      .s('triangle')
      .cutoff(perlin.range(cutoffLo, cutoffHi).slow(cutoffSlow))
      .attack(attack)
      .decay(decay)
      .sustain(sustain)
      .release(release)
      .gain(gain)
      .room(room)
      .delay(delay)
      .delaytime(delaytime)
      .pan(perlin.range(0.3, 0.7).slow(12));
}
