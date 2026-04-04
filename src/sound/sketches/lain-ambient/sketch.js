// @ts-nocheck — strudel globals available at runtime
export const meta = {
  title: 'Lain Ambient',
  description: 'Haunted digital ambience. Humming wires, ghostly pads, glitched whispers.',
};

export const config = {
  duration: 32,
};

export const stacks = [
  { name: "hum", pattern: () =>
    note("<c1 [c1,g1]>/8")
      .s("sawtooth")
      .cutoff(slider(120, 50, 300))
      .resonance(8)
      .gain(slider(0.15, 0, 0.3))
      .shape(0.3)
      .room(0.9)
      .slow(2)
  },

  { name: "pad", pattern: () =>
    note("<[c3,eb3,g3] [bb2,d3,f3] [ab2,c3,eb3] [g2,bb2,d3]>/8")
      .s("triangle")
      .cutoff(perlin.range(300, slider(1400, 500, 3000)).slow(16))
      .attack(slider(2, 0.5, 4))
      .decay(4)
      .sustain(0.6)
      .release(3)
      .gain(slider(0.12, 0, 0.25))
      .room(1)
      .delay(0.4)
      .delaytime(1.5)
      .pan(perlin.range(0.3, 0.7).slow(12))
  },

  { name: "wire", pattern: () =>
    note("~ <g5 eb6 bb5 d6>/4 ~ ~")
      .s("sine")
      .gain(perlin.range(0, slider(0.06, 0, 0.15)).slow(8))
      .attack(0.3)
      .decay(1)
      .sustain(0)
      .delay(0.7)
      .delaytime(perlin.range(0.2, 0.8).slow(16))
      .room(1)
      .pan(rand)
  },

  { name: "glitch", pattern: () =>
    s("~ ~ ~ hh:3")
      .sometimesBy(slider(0.4, 0, 0.8), x =>
        x.speed(perlin.range(-2, 3))
      )
      .gain(perlin.range(0, slider(0.08, 0, 0.2)).slow(6))
      .shape(0.6)
      .delay(0.6)
      .delaytime(0.666)
      .room(0.9)
      .pan(rand)
      .degradeBy(0.5)
  },

  { name: "pulse", pattern: () =>
    s("sine")
      .note(perlin.range(48, 52).slow(32))
      .gain(perlin.range(0.02, slider(0.07, 0, 0.15)).slow(20))
      .shape(0.1)
      .room(1)
      .pan(0.5)
      .slow(4)
  },
];
