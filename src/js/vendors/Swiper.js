// https://swiperjs.com
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'

const initSliders = () => {
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      TouchRatio: 0,
      simulateTouch: true,
      lazy: true,

      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }
    })
  }
}

export { initSliders }
