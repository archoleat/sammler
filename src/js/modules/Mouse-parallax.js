import { isMobile } from '@js/helpers/is-mobile';

class MouseParallax {
  constructor() {
    this.config = !isMobile.any();

    if (this.config) {
      const parallaxMouse = document.querySelectorAll('[data-parallax-mouse]');

      if (parallaxMouse) {
        this.parallaxMouseInit(parallaxMouse);
      }
    }
  }

  parallaxMouseInit(parallaxMouse) {
    for (const element of parallaxMouse) {
      const parallaxMouseWrapper = element.closest('[data-parallax-mouse-wrapper]');
      const parameterCoefficientX = Number(element.dataset.parallaxCx) ?? 100;
      const parameterCoefficientY = Number(element.dataset.parallaxCy) ?? 100;
      const directionX = Object.hasOwn(element.dataset, 'parallaxDxr') ? -1 : 1;
      const directionY = Object.hasOwn(element.dataset, 'parallaxDyr') ? -1 : 1;
      const parameterAnimation = Number(element.dataset.parallaxA) ?? 50;

      let positionX = 0;
      let positionY = 0;
      let percentCoordX = 0;
      let percentCoordY = 0;

      const setMouseParallaxStyle = () => {
        const distributionX = percentCoordX - positionX;
        const distributionY = percentCoordY - positionY;

        positionX += (distributionX * parameterAnimation) / 1000;
        positionY += (distributionY * parameterAnimation) / 1000;
        element.style.cssText = `transform: translate3D(${
          (directionX * positionX) / (parameterCoefficientX / 10)
        }%, ${(directionY * positionY) / (parameterCoefficientY / 10)}%, 0);`;
        requestAnimationFrame(setMouseParallaxStyle);
      };

      const mouseMoveParallax = (wrapper = window) => {
        wrapper.addEventListener('mousemove', (event) => {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY;

          if (
            offsetTop >= window.scrollY ??
            offsetTop + element.offsetHeight >= window.scrollY
          ) {
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;
            const coordX = event.clientX - parallaxWidth / 2;
            const coordY = event.clientY - parallaxHeight / 2;

            percentCoordX = (coordX / parallaxWidth) * 100;
            percentCoordY = (coordY / parallaxHeight) * 100;
          }
        });
      };

      setMouseParallaxStyle();

      parallaxMouseWrapper
        ? mouseMoveParallax(parallaxMouseWrapper)
        : mouseMoveParallax();
    }
  }
}

const mouseParallax = new MouseParallax();

export { mouseParallax };
