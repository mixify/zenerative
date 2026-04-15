// @ts-nocheck
export const block = {
  name: 'rapid-hats',
  tags: ['drums', 'hihat', 'fast', 'percussion'],
  description: 'Fast hihat pattern with velocity variation and perlin speed modulation.',
  example: `rapidHats({ gain: 0.4, speedChance: 0.3 })`,
};

export function rapidHats({
  sample = 'hh',
  rate = 8,
  velocities = '0.8 0.4 0.6 0.4 0.9 0.4 0.5 0.4',
  speedChance = 0.3,
  speedLo = 0.8,
  speedHi = 2.5,
  panLo = 0.2,
  panHi = 0.8,
  shape = 0.2,
  gain = 0.4,
} = {}) {
  return () =>
    s(`${sample}*${rate}`)
      .gain(velocities)
      .sometimesBy(speedChance, x => x.speed(perlin.range(speedLo, speedHi)))
      .pan(perlin.range(panLo, panHi))
      .shape(shape)
      .gain(gain);
}
