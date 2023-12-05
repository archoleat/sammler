import { toggleClasses } from '@js/helpers/toggle-classes'

const changeFontSize = () => {
  const range = document.querySelector('[data-font-range]')
  const value = document.querySelector('[data-font-value]')
  const text = document.querySelector('[data-font-text]')

  const addSize = (value) => {
    text.style.fontSize = `${parseInt(value)}px`
  }

  if (text) {
    if (range && value) {
      value.innerHTML = range.value
      addSize(range.value)
      range.oninput = () => {
        value.innerHTML = range.value
        addSize(range.value)
      }
    }

    document.addEventListener('click', (event) => {
      const targetElement = event.target

      if (targetElement.closest('[data-font-size]')) {
        addSize(targetElement.dataset.fontSize)
        toggleClasses(targetElement, 'active', '[data-font-size].active')
      }
    })
  }
}

export { changeFontSize }
