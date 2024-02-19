import { slideDown } from '@js/helpers/slide-down';
import { slideUp } from '@js/helpers/slide-up';

const slideToggle = (target, duration = 500) => {
  target.hidden ? slideDown(target, duration) : slideUp(target, duration);
};

export { slideToggle };
