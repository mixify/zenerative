const modules = import.meta.glob('./**/sketch.js');

export const sketches = Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => !path.includes('_template'))
    .map(([path, loader]) => {
      const slug = path.split('/')[1];
      return [slug, loader];
    })
);
