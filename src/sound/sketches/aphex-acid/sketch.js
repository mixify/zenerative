// @ts-nocheck — strudel globals available at runtime
export const meta = {
  title: 'Aphex Acid',
  description: 'Warped acid breaks in the style of Richard D. James.',
};

export const config = {
  duration: 16,
};

export const stacks = [
  { name: "breaks", pattern: () =>
    s("break:4")
      .loopAt(2)
      .chop(16)
      .sometimes(x => x.speed("-1"))
      .sometimesBy(slider(0.3, 0, 0.8), x => x.striate(4))
      .gain(slider(0.9, 0.3, 1))
      .shape(0.4)
      .room(0.1)
  },

  { name: "acid", pattern: () =>
    note("<0 3 7 [10 12]>(5,8)")
      .scale("C2:minor")
      .s("sawtooth")
      .cutoff(perlin.range(
        slider(200, 100, 800),
        slider(4000, 1000, 8000)
      ).slow(4))
      .resonance(slider(15, 1, 30))
      .decay(slider(0.08, 0.02, 0.3))
      .sustain(0)
      .gain(0.6)
      .shape(0.5)
      .room(0.2)
      .sometimes(x => x.speed(2))
      .every(4, x => x.rev())
  },

  { name: "stab", pattern: () =>
    note("<7 10 0 3>/4")
      .scale("C3:minor")
      .s("square")
      .cutoff(slider(1200, 300, 5000))
      .gain(slider(0.25, 0, 0.5))
      .attack(0.01)
      .decay(0.1)
      .sustain(0)
      .room(0.6)
      .pan(perlin.range(0.3, 0.7))
      .delay(0.3)
      .delaytime(0.375)
  },

  { name: "hats", pattern: () =>
    s("hh*8")
      .gain("0.8 0.4 0.6 0.4 0.9 0.4 0.5 0.4")
      .sometimesBy(0.3, x => x.speed(perlin.range(0.8, 2.5)))
      .pan(perlin.range(0.2, 0.8))
      .shape(0.2)
      .gain(slider(0.4, 0, 0.7))
  },

  { name: "ghost", pattern: () =>
    s("~ cp ~ ~")
      .speed(perlin.range(0.5, 1.5))
      .gain(slider(0.15, 0, 0.4))
      .delay(0.5)
      .delaytime(perlin.range(0.1, 0.5).slow(8))
      .room(0.8)
      .pan(rand)
  },
];
