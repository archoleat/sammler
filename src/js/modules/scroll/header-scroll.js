import { header, headerScrollClass } from '@js/helpers/node-list'

const headerScroll = () => {
  const headerShow = header.hasAttribute('data-scroll-show')
  const headerShowClass = 'header-show'
  const headerShowTimer = header.dataset.scrollShow ?? 500
  const startPoint = header.dataset.scroll ?? 1

  let scrollDirection = 0
  let timer

  document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY

    clearTimeout(timer)

    if (scrollTop >= startPoint) {
      if (!header.classList.contains(headerScrollClass)) {
        header.classList.add(headerScrollClass)
      }

      if (headerShow) {
        if (scrollTop > scrollDirection) {
          if (header.classList.contains(headerShowClass)) {
            header.classList.remove(headerShowClass)
          }
        } else {
          header.classList.add(headerShowClass)
        }

        timer = setTimeout(() => {
          if (!header.classList.contains(headerShowClass)) {
            header.classList.add(headerShowClass)
          }
        }, headerShowTimer)
      }
    } else {
      if (header.classList.contains(headerScrollClass)) {
        header.classList.remove(headerScrollClass)
      }

      if (headerShow && header.classList.contains(headerShowClass)) {
        header.classList.remove(headerShowClass)
      }
    }

    scrollDirection = scrollTop <= 0 ? 0 : scrollTop
  })
}

export { headerScroll }
