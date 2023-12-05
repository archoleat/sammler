import { burger } from '@js/components/hamburger'
import { html } from '@js/helpers/node-list'

let bodyLockStatus = true

const delayToggle = (delay = 500) => {
  bodyLockStatus = false

  setTimeout(() => {
    bodyLockStatus = true
  }, delay)
}
const bodyUnlock = (delay) => {
  if (bodyLockStatus) {
    html.classList.remove('lock')
    burger.ariaExpanded = false

    delayToggle(delay)
  }
}
const bodyLock = (delay) => {
  if (bodyLockStatus) {
    html.classList.add('lock')

    delayToggle(delay)
  }
}

const bodyLockToggle = (delay) => {
  html.classList.contains('lock') ? bodyUnlock(delay) : bodyLock(delay)
}

export { bodyLockStatus, bodyLockToggle, bodyUnlock, bodyLock }
