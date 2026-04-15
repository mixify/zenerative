// @ts-nocheck
export const block = {
  name: 'delay-wash',
  tags: ['fx', 'delay', 'reverb', 'wash', 'ambient'],
  description: 'Higher-order wrapper that adds delay and reverb wash to any pattern thunk.',
  example: `delayWash(acidLine(), { delay: 0.5, delaytime: 0.375, room: 0.8 })`,
};

export function delayWash(patternFn, {
  delay = 0.5,
  delaytime = 0.375,
  room = 0.8,
  pan = 0.5,
} = {}) {
  return () =>
    patternFn()
      .delay(delay)
      .delaytime(delaytime)
      .room(room)
      .pan(pan);
}
