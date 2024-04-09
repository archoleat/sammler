import { getHash } from '@js/helpers/get-hash';
import { goToBlock } from '@js/helpers/go-to-block';

const pageNavigation = () => {
  const pageNavigationAction = (event) => {
    if (event.type === 'click') {
      const targetElement = event.target;

      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ?? '';
        const noHeader = Object.hasOwn(gotoLink.dataset, 'gotoHeader');
        const offsetTop = Number.parseInt(gotoLink.dataset.gotoTop) ?? 0;

        goToBlock(gotoLinkSelector, noHeader, offsetTop);
        event.preventDefault();
      }
    } else if (event.type === 'watcherCallback' && event.detail) {
      const {entry} = event.detail;
      const targetElement = entry.target;

      if (targetElement.dataset.watch === 'navigator') {
        let navigatorCurrentItem;

        if (
          targetElement.id &&
          document.querySelector(`[data-goto="#${targetElement.id}"]`)
        ) {
          navigatorCurrentItem = document.querySelector(
            `[data-goto="#${targetElement.id}"]`,
          );
        } else if (targetElement.classList.length > 0) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];

            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(
                `[data-goto=".${element}"]`,
              );

              break;
            }
          }
        }

        entry.isIntersecting
          ? navigatorCurrentItem?.classList.add('navigator-active')
          : navigatorCurrentItem?.classList.remove('navigator-active');
      }
    }
  };

  document.addEventListener('click', pageNavigationAction);
  document.addEventListener('watcherCallback', pageNavigationAction);

  if (getHash()) {
    let goToHash;

    document.querySelector(`#${getHash()}`)
      ? (goToHash = `#${getHash()}`)
      : (goToHash = `.${getHash()}`);

    if (goToHash) {
      goToBlock(goToHash, true, 20);
    }
  }
};

export { pageNavigation };
