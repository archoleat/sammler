import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const range = () => {
  const rangeSliders = document.querySelectorAll('[data-range]');

  const rangeInit = () => {
    for (const slider of rangeSliders) {
      const inputsContainer = slider.parentElement;
      const inputStart = inputsContainer.querySelector('input[data-price-start');
      const inputEnd = inputsContainer.querySelector('input[data-price-end]');

      noUiSlider.create(slider, {
        start: [inputStart.value, inputEnd.value],
        connect: true,
        range: {
          min: 0,
          max: 1_000_000,
        },
        format: wNumb({
          decimals: 0,
          thousand: ' ',
        }),
      });

      slider.noUiSlider.on('update', (values, handle) => {
        (handle ? inputEnd : inputStart).value = values[handle];
      });

      inputStart.addEventListener('input', ({ target }) => {
        slider.noUiSlider.set([target.value, '']);
      });
      inputEnd.addEventListener('input', ({ target }) => {
        slider.noUiSlider.set(['', target.value]);
      });
    }
  };

  if (rangeSliders) {
    rangeInit();
  }
};

export { range };
