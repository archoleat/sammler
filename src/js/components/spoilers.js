import { dataMediaQueries } from '@js/helpers/data-media';
import { slideToggle } from '@js/helpers/slide-toggle';
import { slideUp } from '@js/helpers/slide-up';

const spoilers = () => {
  const spoilersInitClass = 'spoiler-init';
  const spoilersActiveClass = 'spoiler-active';
  const spoilersAttribute = 'data-spoilers';
  const detailsElement = 'details';
  const summaryElement = 'summary';
  const spoilers = document.querySelectorAll(`[${spoilersAttribute}]`);
  const spoilersRegular = [...spoilers].filter((item) => !item.dataset.spoilers.split(',')[0]);
  const defaultSpeed = 500;

  const initSpoilerBody = (spoilersBlock, isHideSpoilerBody = true) => {
    let spoilerItems = spoilersBlock.querySelectorAll(detailsElement);

    spoilerItems = [...spoilerItems].filter((item) => item.closest(`[${spoilersAttribute}]`) === spoilersBlock);
    for (const spoilerItem of spoilerItems) {
      const spoilerTrigger = spoilerItem.querySelector(summaryElement);

      if (isHideSpoilerBody) {
        spoilerTrigger.removeAttribute('tabindex');

        if (Object.hasOwn(spoilerItem.dataset, 'open')) {
          spoilerTrigger.classList.add(spoilersActiveClass);
          spoilerItem.open = true;
        } else {
          spoilerItem.open = false;
          spoilerTrigger.nextElementSibling.hidden = true;
        }
      } else {
        spoilerTrigger.setAttribute('tabindex', '-1');
        spoilerTrigger.classList.remove(spoilersActiveClass);
        spoilerItem.open = true;
        spoilerTrigger.nextElementSibling.hidden = false;
      }
    }
  };

  const initSpoilers = (spoilers, isMatchMedia = false) => {
    for (let spoilersBlock of spoilers) {
      spoilersBlock = isMatchMedia ? spoilersBlock.item : spoilersBlock;

      if (isMatchMedia.matches ?? !isMatchMedia) {
        spoilersBlock.classList.add(spoilersInitClass);
        initSpoilerBody(spoilersBlock);
      } else {
        spoilersBlock.classList.remove(spoilersInitClass);
        initSpoilerBody(spoilersBlock, false);
      }
    }
  };

  const hideSpoilersBody = (spoilersBlock) => {
    const spoilerActiveBlock = spoilersBlock.querySelector(
      `${detailsElement}[open]`,
    );

    if (spoilerActiveBlock && spoilersBlock.querySelectorAll('.slide').length === 0) {
      const spoilerActiveTrigger = spoilerActiveBlock.querySelector(summaryElement);
      const spoilerSpeed =
        Number.parseInt(spoilersBlock.dataset.spoilersSpeed) ?? defaultSpeed;

      spoilerActiveTrigger.classList.remove(spoilersActiveClass);
      slideUp(spoilerActiveTrigger.nextElementSibling, spoilerSpeed);
      setTimeout(() => {
        spoilerActiveBlock.open = false;
      }, spoilerSpeed);
    }
  };

  const setSpoilerAction = (event) => {
    const targetElement = event.target;

    if (targetElement.closest(detailsElement)) {
      event.preventDefault();
    }

    if (
      targetElement.closest(summaryElement) &&
      targetElement.closest(`[${spoilersAttribute}]`) &&
      targetElement
        .closest(`[${spoilersAttribute}]`)
        .classList.contains(spoilersInitClass)
    ) {
      const spoilerTrigger = targetElement.closest(summaryElement);
      const spoilerBlock = spoilerTrigger.closest(detailsElement);
      const spoilersBlock = spoilerTrigger.closest(`[${spoilersAttribute}]`);
      const oneSpoiler = Object.hasOwn(spoilersBlock.dataset, 'oneSpoiler');
      const spoilerSpeed =
        Number.parseInt(spoilersBlock.dataset.spoilersSpeed) ?? defaultSpeed;

      if (spoilersBlock.querySelectorAll('.slide').length === 0) {
        if (oneSpoiler && !spoilerBlock.open) {
          hideSpoilersBody(spoilersBlock);
        }

        if (spoilerBlock.open) {
          setTimeout(() => {
            spoilerBlock.open = false;
          }, spoilerSpeed);
        } else {
          spoilerBlock.open = true;
        }

        spoilerTrigger.classList.toggle(spoilersActiveClass);
        slideToggle(spoilerTrigger.nextElementSibling, spoilerSpeed);
      }
    }

    if (!targetElement.closest(`[${spoilersAttribute}]`)) {
      const spoilersClose = document.querySelectorAll('[data-spoiler-close]');

      for (const spoilerClose of spoilersClose) {
        const spoilersBlock = spoilerClose.closest(`[${spoilersAttribute}]`);
        const spoilerCloseBlock = spoilerClose.parentNode;

        if (spoilersBlock.classList.contains(spoilersInitClass)) {
          const spoilerSpeed =
            Number.parseInt(spoilersBlock.dataset.spoilersSpeed) ?? defaultSpeed;

          spoilerClose.classList.remove(spoilersActiveClass);

          slideUp(spoilerClose.nextElementSibling, spoilerSpeed);

          setTimeout(() => {
            spoilerCloseBlock.open = false;
          }, spoilerSpeed);
        }
      }
    }
  };

  document.addEventListener('click', setSpoilerAction);

  if (spoilersRegular) {
    initSpoilers(spoilersRegular);
  }

  const mdQueries = dataMediaQueries(spoilers, 'spoilers');

  if (mdQueries) {
    for (const mdQueriesItem of mdQueries) {
      mdQueriesItem.isMatchMedia.addEventListener('change', () => {
        initSpoilers(mdQueriesItem.items, mdQueriesItem.isMatchMedia);
      });
      initSpoilers(mdQueriesItem.items, mdQueriesItem.isMatchMedia);
    }
  }
};

export { spoilers };
