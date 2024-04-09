import { removeClasses } from '@js/helpers/remove-classes';

const toggleClasses = (element, className, array) => {
  if (!element.classList.contains(className)) {
    removeClasses(array, className);
    element.classList.add(className);
  }
};

export { toggleClasses };
