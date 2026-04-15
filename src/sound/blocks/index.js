const modules = import.meta.glob('./**/*.js', { eager: true });

export const blocks = Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => !path.endsWith('/index.js'))
    .map(([path, mod]) => [mod.block.name, mod])
);

export const catalog = Object.values(blocks).map(mod => mod.block);
