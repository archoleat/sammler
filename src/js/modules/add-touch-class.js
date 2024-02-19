import { html } from '@js/helpers/node-list';
import { isMobile } from '@js/helpers/is-mobile';

const addTouchClass = () => {
  if (isMobile.any()) {
    html.classList.add('touch');
  }
};

export { addTouchClass };
