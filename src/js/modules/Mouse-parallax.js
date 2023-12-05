import { isMobile } from '@js/helpers/is-mobile'

class MouseParallax {
  constructor() {
    this.config = isMobile.any() ? false : true

    if (this.config) {
      const parallaxMouse = document.querySelectorAll('[data-parallax-mouse]')

      if (parallaxMouse) {
        this.parallaxMouseInit(parallaxMouse)
      }
    }
  }

  parallaxMouseInit(parallaxMouse) {
    parallaxMouse.forEach((el) => {
      const parallaxMouseWrapper = el.closest('[data-parallax-mouse-wrapper]')
      const paramCoefficientX = Number(el.dataset.parallaxCx) ?? 100
      const paramCoefficientY = Number(el.dataset.parallaxCy) ?? 100
      const directionX = el.hasAttribute('data-parallax-dxr') ? -1 : 1
      const directionY = el.hasAttribute('data-parallax-dyr') ? -1 : 1
      const paramAnimation = Number(el.dataset.parallaxA) ?? 50

      let positionX = 0
      let positionY = 0
      let percentCoordX = 0
      let percentCoordY = 0

      const setMouseParallaxStyle = () => {
        const distX = percentCoordX - positionX
        const distY = percentCoordY - positionY

        positionX = positionX + (distX * paramAnimation) / 1000
        positionY = positionY + (distY * paramAnimation) / 1000
        el.style.cssText = `transform: translate3D(${(directionX * positionX) / (paramCoefficientX / 10)
          }%, ${(directionY * positionY) / (paramCoefficientY / 10)}%, 0);`
        requestAnimationFrame(setMouseParallaxStyle)
      }

      const mouseMoveParallax = (wrapper = window) => {
        wrapper.addEventListener('mousemove', (event) => {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY

          if (
            offsetTop >= window.scrollY ??
            offsetTop + el.offsetHeight >= window.scrollY
          ) {
            const parallaxWidth = window.innerWidth
            const parallaxHeight = window.innerHeight
            const coordX = event.clientX - parallaxWidth / 2
            const coordY = event.clientY - parallaxHeight / 2

            percentCoordX = (coordX / parallaxWidth) * 100
            percentCoordY = (coordY / parallaxHeight) * 100
          }
        })
      }

      setMouseParallaxStyle()

      parallaxMouseWrapper
        ? mouseMoveParallax(parallaxMouseWrapper)
        : mouseMoveParallax()
    })
  }
}

const mouseParallax = new MouseParallax()

export { mouseParallax }
