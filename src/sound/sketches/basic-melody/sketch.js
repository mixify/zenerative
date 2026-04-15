// @ts-nocheck — strudel globals available at runtime
export const meta = {
  title: 'Basic Melody',
  description: 'A simple generative melody with stacked patterns.',
};

export const config = {
  duration: 8,
};

export const stacks = [
  { name: "meloy", pattern: () =>
    note("<b3 e3 d3 e3>(3,8)")
      .s("piano")
      .room(slider(0.5, 0, 1))
      .gain(slider(0.5, 0, 1))
      .cutoff(slider(800, 200, 5000))
      .jux(rev)
  },

  { name: "drums", pattern: () =>
    s("bd sd:1 bd hh sd:3 hh*2 cp hh")
      .gain(slider(0.7, 0, 1))
  },



];
