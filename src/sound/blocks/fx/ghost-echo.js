// @ts-nocheck
export const block = {
  name: 'ghost-echo',
  tags: ['fx', 'ghost', 'sparse', 'ambient', 'eerie'],
  description: 'Sparse ghostly hits with perlin-modulated delay and wide stereo field.',
  example: `ghostEcho({ sample: 'cp', gain: 0.15 })`,
};

export function ghostEcho({
  pattern = '~ cp ~ ~',
  notePattern = '~ <g5 eb6 bb5 d6>/4 ~ ~',
  mode = 'sample',
  speedLo = 0.5,
  speedHi = 1.5,
  gain = 0.15,
  gainHi = 0.06,
  attack = 0.3,
  decay = 1,
  delay = 0.6,
  delaytimeLo = 0.1,
  delaytimeHi = 0.5,
  delaytimeSlow = 8,
  room = 0.9,
} = {}) {
  if (mode === 'note') {
    return () =>
      note(notePattern)
        .s('sine')
        .gain(perlin.range(0, gainHi).slow(8))
        .attack(attack)
        .decay(decay)
        .sustain(0)
        .delay(0.7)
        .delaytime(perlin.range(0.2, 0.8).slow(16))
        .room(1)
        .pan(rand);
  }
  return () =>
    s(pattern)
      .speed(perlin.range(speedLo, speedHi))
      .gain(gain)
      .delay(delay)
      .delaytime(perlin.range(delaytimeLo, delaytimeHi).slow(delaytimeSlow))
      .room(room)
      .pan(rand);
}
