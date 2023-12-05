// https://mattboldt.github.io/typed
import Typed from 'typed.js'

const initTyped = () => {
  if (document.querySelector('[data-typed]')) {
    new Typed('[data-typed]', {
      strings: ['working'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 500,
      startDelay: 1000,
      loop: true,
      fadeOut: false,
      smartBackspace: true,
      showCursor: false
    })
  }
}

export { initTyped }
