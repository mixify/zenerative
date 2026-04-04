/**
 * Builds slider/select controls from a params definition and calls onChange
 * whenever a value changes.
 *
 * Param types (auto-detected from definition):
 *   { min, max, default, step? }          → range slider
 *   { options: [...], default }           → select dropdown
 *   { default: true/false }               → checkbox toggle
 *   { default: '#ff0000' }                → color picker (if string starts with #)
 */

/**
 * Render param controls into a container element.
 * @param {HTMLElement} containerEl
 * @param {object} paramsDef - { paramName: { min, max, default, ... }, ... }
 * @param {function} onChange - called with full values object on any change
 * @returns {{ getValues: () => object, destroy: () => void }}
 */
export function buildParamsUI(containerEl, paramsDef, onChange) {
  containerEl.innerHTML = '';
  const values = {};
  const inputs = {};

  for (const [name, def] of Object.entries(paramsDef)) {
    values[name] = def.default;

    const row = document.createElement('div');
    row.className = 'param-row';

    const label = document.createElement('label');
    label.className = 'param-label';
    label.textContent = name;

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'param-value';

    let input;

    if (def.options) {
      // Select dropdown
      input = document.createElement('select');
      input.className = 'param-input';
      for (const opt of def.options) {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (opt === def.default) o.selected = true;
        input.appendChild(o);
      }
      valueDisplay.textContent = def.default;
      input.addEventListener('change', () => {
        values[name] = input.value;
        valueDisplay.textContent = input.value;
        onChange(values);
      });
    } else if (typeof def.default === 'boolean') {
      // Checkbox
      input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'param-input';
      input.checked = def.default;
      valueDisplay.textContent = def.default;
      input.addEventListener('change', () => {
        values[name] = input.checked;
        valueDisplay.textContent = input.checked;
        onChange(values);
      });
    } else if (typeof def.default === 'string' && def.default.startsWith('#')) {
      // Color picker
      input = document.createElement('input');
      input.type = 'color';
      input.className = 'param-input';
      input.value = def.default;
      valueDisplay.textContent = def.default;
      input.addEventListener('input', () => {
        values[name] = input.value;
        valueDisplay.textContent = input.value;
        onChange(values);
      });
    } else {
      // Range slider
      input = document.createElement('input');
      input.type = 'range';
      input.className = 'param-input param-slider';
      input.min = def.min ?? 0;
      input.max = def.max ?? 100;
      input.step = def.step ?? ((def.max - def.min) <= 2 ? 0.01 : 1);
      input.value = def.default;
      valueDisplay.textContent = def.default;
      input.addEventListener('input', () => {
        const v = parseFloat(input.value);
        values[name] = v;
        valueDisplay.textContent = Number.isInteger(v) ? v : v.toFixed(2);
        onChange(values);
      });
    }

    inputs[name] = input;
    row.appendChild(label);
    row.appendChild(input);
    row.appendChild(valueDisplay);
    containerEl.appendChild(row);
  }

  return {
    getValues: () => ({ ...values }),
    destroy: () => { containerEl.innerHTML = ''; },
  };
}
