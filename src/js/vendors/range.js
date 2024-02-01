import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

const range = () => {
  const rangeSliders = document.querySelectorAll('[data-range]')

  const rangeInit = () => {
    rangeSliders.forEach(slider => {
      const inputsContainer = slider.parentElement
      const inputStart = inputsContainer.querySelector('input[data-price-start')
      const inputEnd = inputsContainer.querySelector('input[data-price-end]')

      noUiSlider.create(slider, {
        start: [inputStart.value, inputEnd.value],
        connect: true,
        range: {
          min: 0,
          max: 1000000
        },
        format: wNumb({
          decimals: 0,
          thousand: ' '
        })
      })

      slider.noUiSlider.on('update', (values, handle) => {
        (handle ? inputEnd : inputStart).value = values[handle]
      })

      inputStart.oninput = ({ target }) => {
        slider.noUiSlider.set([target.value, ''])
      }
      inputEnd.oninput = ({ target }) => {
        slider.noUiSlider.set(['', target.value])
      }
    })
  }

  if (rangeSliders) {
    rangeInit()
  }
}

export { range }
