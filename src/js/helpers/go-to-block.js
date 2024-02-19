import { bodyUnlock } from '@js/helpers/body-lock-toggle';
import { html, header, headerScrollClass } from '@js/helpers/node-list';

const goToBlock = (targetBlock, noHeader = false, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);

  if (targetBlockElement) {
    let headerItemHeight;

    if (noHeader) {
      const headerElement = document.querySelector(header);

      if (!headerElement.classList.contains(headerScrollClass)) {
        headerElement.style.cssText = 'transition-duration: 0;';
        headerElement.classList.add(headerScrollClass);
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove(headerScrollClass);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }

    if (html.classList.contains('lock')) {
      bodyUnlock();
    }

    let targetBlockElementPosition =
      targetBlockElement.getBoundingClientRect().top + scrollY;

    targetBlockElementPosition = headerItemHeight
      ? targetBlockElementPosition - headerItemHeight
      : targetBlockElementPosition;
    targetBlockElementPosition = offsetTop
      ? targetBlockElementPosition - offsetTop
      : targetBlockElementPosition;
    window.scrollTo({
      top: targetBlockElementPosition,
    });
  }
};

export { goToBlock };
