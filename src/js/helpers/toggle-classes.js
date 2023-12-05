import { removeClasses } from '@js/helpers/remove-classes'

const toggleClasses = (elem, className, array) => {
  if (!elem.classList.contains(className)) {
    removeClasses(array, className)
    elem.classList.add(className)
  }
}

export { toggleClasses }
