// Strudel globals — injected by initStrudel() at runtime.
// This file gives editors (WebStorm, VS Code) autocomplete + removes "unresolved" warnings.

type Pattern = {
  s(sound: string): Pattern;
  note(n: string): Pattern;
  n(n: string | number): Pattern;
  sound(s: string): Pattern;
  gain(g: number): Pattern;
  cutoff(f: number): Pattern;
  lpf(f: number): Pattern;
  hpf(f: number): Pattern;
  room(r: number): Pattern;
  delay(d: number): Pattern;
  pan(p: number): Pattern;
  speed(s: number): Pattern;
  shape(s: number): Pattern;
  vowel(v: string): Pattern;
  cpm(c: number): Pattern;
  fast(f: number): Pattern;
  slow(s: number): Pattern;
  rev: Pattern;
  jux(fn: typeof rev | ((p: Pattern) => Pattern)): Pattern;
  every(n: number, fn: (p: Pattern) => Pattern): Pattern;
  sometimes(fn: (p: Pattern) => Pattern): Pattern;
  sometimesBy(chance: number, fn: (p: Pattern) => Pattern): Pattern;
  struct(s: string): Pattern;
  euclid(pulses: number, steps: number): Pattern;
  striate(n: number): Pattern;
  chop(n: number): Pattern;
  degradeBy(d: number): Pattern;
  velocity(v: number | Pattern): Pattern;
  scale(s: string): Pattern;
  add(n: string): Pattern;
  superimpose(fn: (p: Pattern) => Pattern): Pattern;
  pianoroll(opts?: object): Pattern;
  scope(opts?: object): Pattern;
  play(): Pattern;
  [key: string]: any;
};

declare function note(n: string): Pattern;
declare function s(sound: string): Pattern;
declare function sound(s: string): Pattern;
declare function jux(fn: typeof rev | ((p: Pattern) => Pattern)): Pattern;
declare const rev: (p: Pattern) => Pattern;
declare function stack(...patterns: Pattern[]): Pattern;
declare function seq(...patterns: Pattern[]): Pattern;
declare function cat(...patterns: Pattern[]): Pattern;
declare function silence(): Pattern;
declare function gain(g: number): Pattern;
declare function speed(s: number): Pattern;
declare function pan(p: number): Pattern;
declare function cutoff(f: number): Pattern;
declare function n(n: string | number): Pattern;
declare function samples(url: string, base?: string, opts?: object): Promise<void>;
declare function fast(f: number): Pattern;
declare function slow(s: number): Pattern;
declare function every(n: number, fn: (p: Pattern) => Pattern): Pattern;
declare function sometimes(fn: (p: Pattern) => Pattern): Pattern;
declare function struct(s: string): Pattern;
declare function euclid(pulses: number, steps: number): Pattern;
declare function hush(): void;

declare function slider(defaultValue: number, min?: number, max?: number, step?: number): number;

declare const perlin: Pattern;
