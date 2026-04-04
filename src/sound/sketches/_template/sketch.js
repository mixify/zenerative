// @ts-nocheck — strudel globals available at runtime
export const meta = {
  title: 'Untitled Sound Sketch',
  description: 'Describe what this sound sketch generates.',
};

export const config = {
  duration: 4,
};

// Each stack: { name, pattern: () => Pattern }
// Write real JS — IDE highlights it. Browser shows native Strudel editor.
// Use ._pianoroll() or ._scope() for inline visualization.
// Use slider(default, min, max) for inline sliders.
export const stacks = [
  { name: "lead", pattern: () =>
    note("c3 e3 g3")
      .s("piano")
      .gain(slider(0.5, 0, 1))
      ._pianoroll()
  },
];
