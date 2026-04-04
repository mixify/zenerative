// @ts-nocheck — strudel globals available at runtime
export const meta = {
  title: 'Basic Melody',
  description: 'A simple generative melody with stacked patterns.',
};

export const config = {
  duration: 8,
};

export const stacks = [
  { name: "melody", pattern: () =>
    note("<c3 e3 g3 b3>(3,8)")
      .s("piano")
      .room(slider(0.5, 0, 1))
      .gain(slider(0.5, 0, 1))
      .cutoff(slider(800, 200, 5000))
      .jux(rev)
  },

  { name: "drums", pattern: () =>
    s("bd sd:2 bd hh sd:3 hh*2 cp hh")
      .gain(slider(0.7, 0, 1))
  },
];
