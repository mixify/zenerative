// @ts-nocheck
export const block = {
  name: 'chopped-break',
  tags: ['drums', 'breakbeat', 'chop', 'jungle'],
  description: 'Chopped breakbeat loop with random reverse and optional striate.',
  example: `choppedBreak({ sample: 'break:4', chops: 16, gain: 0.9 })`,
};

export function choppedBreak({
  sample = 'break:4',
  loopBars = 2,
  chops = 16,
  reverseChance = 0.5,
  striateChance = 0.3,
  striateN = 4,
  gain = 0.9,
  shape = 0.4,
  room = 0.1,
} = {}) {
  return () =>
    s(sample)
      .loopAt(loopBars)
      .chop(chops)
      .sometimes(x => x.speed('-1'))
      .sometimesBy(striateChance, x => x.striate(striateN))
      .gain(gain)
      .shape(shape)
      .room(room);
}
