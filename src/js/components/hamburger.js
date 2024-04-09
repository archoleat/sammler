import {
  bodyLockStatus,
  bodyLockToggle,
  bodyUnlock,
} from '@js/helpers/body-lock-toggle';
import { html } from '@js/helpers/node-list';

const burger = document.querySelector('.hamburger');

const hamburger = () => {
  if (burger) {
    document.addEventListener('click', ({ target }) => {
      if (bodyLockStatus && target.closest('.hamburger')) {
        html.classList.contains('lock')
          ? (burger.ariaExpanded = false)
          : (burger.ariaExpanded = true);
        bodyLockToggle();
      }

      if (
        bodyLockStatus &&
        !target.closest('.menu__body') &&
        !target.closest('.popup')
      ) {
        burger.ariaExpanded = false;
        bodyUnlock();
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        burger.ariaExpanded = false;
        bodyUnlock();
      }
    });
  }
};

export { hamburger, burger };
