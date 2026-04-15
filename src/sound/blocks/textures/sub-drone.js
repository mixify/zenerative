// @ts-nocheck
export const block = {
  name: 'sub-drone',
  tags: ['bass', 'drone', 'sub', 'dark'],
  description: 'Low frequency sawtooth drone with tight cutoff for sub-bass hum.',
  example: `subDrone({ cutoff: 120, gain: 0.15 })`,
};

export function subDrone({
  pattern = '<c1 [c1,g1]>/8',
  cutoff = 120,
  resonance = 8,
  gain = 0.15,
  shape = 0.3,
  room = 0.9,
  slow = 2,
} = {}) {
  return () =>
    note(pattern)
      .s('sawtooth')
      .cutoff(cutoff)
      .resonance(resonance)
      .gain(gain)
      .shape(shape)
      .room(room)
      .slow(slow);
}
