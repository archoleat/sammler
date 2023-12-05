import { html } from '@js/helpers/node-list'

const checkWebp = () => {
  const testWebp = (callback) => {
    const webp = new Image()
    const imageMinHeight = 2

    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    webp.onload = webp.onerror = () => callback(webp.height === imageMinHeight)
  }

  testWebp((support) => html.classList.add(support ? 'webp' : 'no-webp'))
}

export { checkWebp }
