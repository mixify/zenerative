import { defaultPrebake, hush, evalScope } from '@strudel/web';
import { samples } from '@strudel/webaudio';
import { slider, sliderWithID } from '@strudel/codemirror';
// Side-effect imports: registers _pianoroll, _scope, etc. as widget methods
import '@strudel/codemirror/widget.mjs';

let prebaked = null;

/**
 * Shared prebake function for all StrudelMirror instances.
 * Loads synth sounds + sample packs once.
 */
export function prebake() {
  if (!prebaked) {
    prebaked = (async () => {
      await defaultPrebake();
      // Make slider, draw, and webaudio functions available in eval scope
      await evalScope({ slider, sliderWithID }, import('@strudel/draw'), import('@strudel/webaudio'));
      const cdn = 'https://strudel.b-cdn.net';
      await Promise.all([
        samples('github:tidalcycles/dirt-samples'),
        samples('github:felixroos/samples'),
        samples(`${cdn}/piano.json`, `${cdn}/piano/`, { prebake: true }),
        samples(`${cdn}/vcsl.json`, `${cdn}/VCSL/`, { prebake: true }),
        samples(`${cdn}/tidal-drum-machines.json`, `${cdn}/tidal-drum-machines/machines/`, { prebake: true }),
      ]);
    })();
  }
  return prebaked;
}

export function stop() {
  hush();
}
