/**
 * Per-stack slider system for Strudel's slider() calls.
 *
 * slider(0.5, 0, 1) → transpiler → sliderWithID("slider_42", 0.5, 0, 1)
 * We track which stack is being evaluated and group sliders accordingly.
 */

const sliderState = {};  // id → { value, min, max, step, stackIndex }
const stackContainers = {};  // stackIndex → DOM element
let currentStackIndex = 0;
let onChangeCallback = null;

/** Set which stack is currently being evaluated. */
export function setCurrentStack(index) {
  currentStackIndex = index;
}

/** Called by transpiled code. Returns the current slider value. */
export function sliderWithID(id, defaultValue, min = 0, max = 1, step) {
  if (!(id in sliderState)) {
    sliderState[id] = {
      value: defaultValue,
      min,
      max,
      step: step ?? (max - min) / 200,
      defaultValue,
      stackIndex: currentStackIndex,
    };
    renderSlider(id);
  }
  return sliderState[id].value;
}

/** Register a DOM container for a specific stack's sliders. */
export function registerStackContainer(index, el) {
  stackContainers[index] = el;
}

/** Set the change callback. */
export function onSliderChange(cb) {
  onChangeCallback = cb;
}

/** Clear all state. */
export function clearSliders() {
  Object.keys(sliderState).forEach(k => delete sliderState[k]);
  Object.values(stackContainers).forEach(el => { if (el) el.innerHTML = ''; });
}

function renderSlider(id) {
  const s = sliderState[id];
  const container = stackContainers[s.stackIndex];
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'strudel-slider';
  el.dataset.sliderId = id;

  const label = document.createElement('span');
  label.className = 'slider-label';
  label.textContent = formatValue(s.value, s.max);

  const minLabel = document.createElement('span');
  minLabel.className = 'slider-range';
  minLabel.textContent = s.min;

  const input = document.createElement('input');
  input.type = 'range';
  input.min = s.min;
  input.max = s.max;
  input.step = s.step;
  input.value = s.value;

  const maxLabel = document.createElement('span');
  maxLabel.className = 'slider-range';
  maxLabel.textContent = s.max;

  input.addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    sliderState[id].value = v;
    label.textContent = formatValue(v, s.max);
    if (onChangeCallback) onChangeCallback(id, v);
  });

  el.appendChild(label);
  el.appendChild(minLabel);
  el.appendChild(input);
  el.appendChild(maxLabel);
  container.appendChild(el);
}

function formatValue(v, max) {
  return max >= 100 ? Math.round(v).toString() : v.toFixed(2);
}
