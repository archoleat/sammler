// https://atomiks.github.io/tippyjs
import tippy from 'tippy.js'

const initTippy = () => {
  if (document.querySelectorAll('[data-tippy-content]')) {
    tippy('[data-tippy-content]', {
      plugins: [],
      delay: 0,
      duration: [300, 250],
      interactive: false,
      interactiveBorder: 2,
      interactiveDebounce: 0,
      maxWidth: 350,
      moveTransition: '',
      offset: [0, 10],
      placement: 'top',
      role: 'tooltip',
      showOnCreate: false,
      theme: '',
      touch: true,
      trigger: 'click',
      triggerTarget: null
    })
  }
}

export { initTippy }
