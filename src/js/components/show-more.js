import { dataMediaQueries } from '@js/helpers/data-media';
import { slideDown } from '@js/helpers/slide-down';
import { slideUp } from '@js/helpers/slide-up';

const showMore = () => {
  const showMoreAttribute = 'data-showmore';
  const showMoreBlocksArray = document.querySelectorAll(`[${showMoreAttribute}]`);

  let showMoreBlocksRegular;
  let mdQueriesArray;

  const getHeight = (showMoreBlock, showMoreContent) => {
    const showMoreType = showMoreBlock.dataset.showmore ?? 'size';

    let hiddenHeight = 0;

    if (showMoreType === 'items') {
      const showMoreTypeValue = showMoreContent.dataset.showmoreContent ?? 3;

      const showMoreItems = showMoreContent.children;

      for (let index = 1; index < showMoreItems.length; index++) {
        const showMoreItem = showMoreItems[index - 1];

        hiddenHeight += showMoreItem.offsetHeight;

        if (i === showMoreTypeValue) {
          break;
        }
      }
    } else {
      const showMoreTypeValue = showMoreContent.dataset.showmoreContent ?? 150;

      hiddenHeight = showMoreTypeValue;
    }

    return hiddenHeight;
  };

  const getOriginalHeight = (showMoreContent) => {
    const hiddenHeight = showMoreContent.offsetHeight;

    let parentHidden;

    showMoreContent.style.removeProperty('height');

    if (showMoreContent.closest('[hidden]')) {
      parentHidden = showMoreContent.closest('[hidden]');
      parentHidden.hidden = false;
    }

    const originalHeight = showMoreContent.offsetHeight;

    if (parentHidden) {
      parentHidden.hidden = true;
    }

    showMoreContent.style.height = `${hiddenHeight}px`;

    return originalHeight;
  };

  const initItem = (showMoreBlock, matchMedia = false) => {
    showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;

    let showMoreContent = showMoreBlock.querySelectorAll(
      `[${showMoreAttribute}-content]`,
    );
    let showMoreButton = showMoreBlock.querySelectorAll(
      `[${showMoreAttribute}-button]`,
    );

    showMoreContent = [...showMoreContent].find((item) => item.closest(`[${showMoreAttribute}]`) === showMoreBlock);
    showMoreButton = [...showMoreButton].find((item) => item.closest(`[${showMoreAttribute}]`) === showMoreBlock);

    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

    if (matchMedia.matches ?? !matchMedia) {
      if (hiddenHeight < getOriginalHeight(showMoreContent)) {
        slideUp(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = false;
      } else {
        slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
  };

  const initItems = (showMoreBlocksArray, matchMedia) => {
    for (const showMoreBlock of showMoreBlocksArray) {
       initItem(showMoreBlock, matchMedia); continue;
    }
  };

  const initItemsMedia = (mdQueriesArray) => {
    for (const mdQueriesItem of mdQueriesArray) {
       initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia); continue;
    }
  };

  const showMoreActions = (event) => {
    const targetEvent = event.target;
    const targetType = event.type;

    if (targetType === 'click') {
      if (targetEvent.closest(`[${showMoreAttribute}-button]`)) {
        const showMoreButton = targetEvent.closest(`[${showMoreAttribute}-button]`);
        const showMoreBlock = showMoreButton.closest(`[${showMoreAttribute}]`);
        const showMoreContent = showMoreBlock.querySelector(
          `[${showMoreAttribute}-content]`,
        );
        const showMoreSpeed = showMoreButton.dataset.showmoreButton ?? '500';
        const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

        if (!showMoreContent.classList.contains('slide')) {
          showMoreButton.ariaExpanded === 'true'
            ? slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
            : slideDown(showMoreContent, showMoreSpeed, hiddenHeight);

          showMoreButton.ariaExpanded === 'true'
            ? (showMoreButton.ariaExpanded = false)
            : (showMoreButton.ariaExpanded = true);
        }
      }
    } else if (targetType === 'resize') {
      if (showMoreBlocksRegular) {
        initItems(showMoreBlocksRegular);
      }

      if (mdQueriesArray) {
        initItemsMedia(mdQueriesArray);
      }
    }
  };

  if (showMoreBlocksArray) {
    showMoreBlocksRegular = [...showMoreBlocksArray].filter((item) => !item.dataset.showmoreMedia);

    if (showMoreBlocksRegular) {
      initItems(showMoreBlocksRegular);
    }

    document.addEventListener('click', showMoreActions);
    window.addEventListener('resize', showMoreActions);
    mdQueriesArray = dataMediaQueries(showMoreBlocksArray, 'showmoreMedia');

    if (mdQueriesArray) {
      for (const mdQueriesItem of mdQueriesArray) {
        mdQueriesItem.matchMedia.addEventListener('change', () => {
          initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
      }
      initItemsMedia(mdQueriesArray);
    }
  }
};

export { showMore };
