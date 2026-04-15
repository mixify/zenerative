# Available Samples

> All samples are loaded at runtime from CDN. Use with `s("name")` or `s("name:variation")`.

## Dirt-Samples (github:tidalcycles/dirt-samples)

### Kick
`bd` (24), `808bd` (25), `hardkick` (6), `clubkick` (5), `kicklinn` (1), `popkick` (10), `reverbkick` (1)

### Snare
`sd` (2), `808sd` (25), `sn` (52), `rs` (1), `cp` (2), `realclaps` (4)

### Hihat
`hh` (13), `808oh` (5), `808hc` (5), `hh27` (13), `linnhats` (6)

### Cymbal
`808cy` (25), `cr` (6)

### Tom
`808ht` (5), `808lt` (5), `808mt` (5), `ht` (16), `lt` (16), `mt` (16)

### Percussion
`perc` (6), `tabla` (26), `tabla2` (46), `tablex` (3), `hand` (17), `stomp` (10), `tok` (4)

### Metallic / Tin
`tink` (5), `metal` (10), `click` (4), `can` (14), `coins` (1), `glasstap` (3), `chin` (4), `bottle` (13), `cb` (1), `pebbles` (1)

### Bass
`bass` (4), `bass0` (3), `bass1` (30), `bass2` (5), `bass3` (11), `jvbass` (13), `jungbass` (20), `bassfoo` (3), `bassdm` (24), `moog` (7)

### Synth
`arpy` (11), `arp` (2), `juno` (12), `hoover` (6), `pad` (3), `padlong` (1), `pluck` (17), `stab` (23), `bleep` (13), `blip` (2)

### Breaks
`breaks125` (2), `breaks152` (1), `breaks157` (1), `breaks165` (1), `amencutup` (32)

### Noise / Glitch
`noise` (1), `noise2` (8), `glitch` (8), `glitch2` (8), `industrial` (32)

### Vocal
`speech` (7), `speechless` (10), `mouth` (15), `hmm` (1), `yeah` (31), `miniyeah` (4), `alphabet` (26), `numbers` (9), `speakspell` (12)

### World
`world` (3), `east` (9), `sitar` (8), `chin` (4)

### Nature
`birds` (10), `birds3` (19), `crow` (4), `insect` (3), `fire` (1), `wind` (10), `outdoor` (6), `bubble` (8)

### FX
`feelfx` (8), `space` (18), `cosmicg` (15), `future` (17), `invaders` (18)

### Other notable
`808` (6), `909` (1), `dr` (42), `dr2` (6), `dr55` (4), `drum` (6), `drumtraks` (13), `electro1` (13), `gabba` (4), `gretsch` (24), `house` (8), `jazz` (8), `jungle` (13), `kurt` (7), `led` (1), `rave` (8), `sequential` (8), `sheffield` (1), `short` (5), `sid` (12), `techno` (7), `tech` (13), `trump` (11), `wobble` (1), `xmas` (1)

## felixroos/samples

`kalimba`, `pluck`, `rhodes`, `rhodes2x`, `ebass`, `xylo`, `flute`, `jazzbass`, `stage73`, `vibtail`, `beautybeast`, `rene`

## Strudel CDN (strudel.b-cdn.net)

### Piano
`piano` — Salamander Grand Piano (multi-velocity sampled)

### VCSL
Orchestral samples — strings, brass, woodwind, etc.

### Tidal Drum Machines
`RolandTR808`, `RolandTR909`, `LinnDrum`, `RolandCR78`, etc. (hundreds of classic drum machines)

## Built-in Synths (no samples needed)
`sine`, `sawtooth`, `square`, `triangle`

## Custom samples

Load additional samples in `engine.js`:
```js
samples('https://your-server.com/samples.json', 'https://your-server.com/audio/');
```

Or load individual files:
```js
samples({ mySound: ['path/to/sound.wav'] }, 'https://base-url/');
```
