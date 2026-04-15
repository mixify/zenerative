// @ts-nocheck
export const block = {
  name: 'acid-line',
  tags: ['bass', 'acid', '303', 'synth'],
  description: 'Classic 303-style acid bassline with resonant filter sweep.',
  example: `acidLine({ cutoffHi: 4000, resonance: 15 })`,
};

export function acidLine({
  pattern = '<0 3 7 [10 12]>(5,8)',
  scale = 'C2:minor',
  cutoffLo = 200,
  cutoffHi = 4000,
  resonance = 15,
  decay = 0.08,
  gain = 0.6,
  shape = 0.5,
  room = 0.2,
} = {}) {
  return () =>
    note(pattern)
      .scale(scale)
      .s('sawtooth')
      .cutoff(perlin.range(cutoffLo, cutoffHi).slow(4))
      .resonance(resonance)
      .decay(decay)
      .sustain(0)
      .gain(gain)
      .shape(shape)
      .room(room)
      .sometimes(x => x.speed(2))
      .every(4, x => x.rev());
}
