import { html } from '@js/helpers/node-list'

const addLoadedClass = () => {
  if (!html.classList.contains('loading')) {
    window.addEventListener('load', html.classList.add('loaded'))
  }
}

export { addLoadedClass }
