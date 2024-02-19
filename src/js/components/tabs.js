import { dataMediaQueries } from '@js/helpers/data-media';
import { getHash } from '@js/helpers/get-hash';
import { removeClasses } from '@js/helpers/remove-classes';
import { setHash } from '@js/helpers/set-hash';
import { slideDown } from '@js/helpers/slide-down';
import { slideUp } from '@js/helpers/slide-up';

const tabs = () => {
  const tabsAttribute = 'data-tabs';
  const tabsTriggerAttribute = '[data-tabs-trigger]';
  const TriggerActiveClass = 'active';
  const tabsArray = document.querySelectorAll(`[${tabsAttribute}]`);
  const hash = getHash();

  let tabsActiveHash = [];

  if (hash.startsWith('tab-')) {
    tabsActiveHash = hash.replace('tab-', '').split('-');
  }

  const initTabs = (tabsBlock) => {
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex;

    let tabsTriggers = tabsBlock.querySelectorAll(`[${tabsAttribute}-triggers]>*`);
    let tabsPanels = tabsBlock.querySelectorAll(`[${tabsAttribute}-panels]>*`);

    if (tabsActiveHashBlock) {
      const tabsActiveTrigger = tabsBlock.querySelector(
        `[${tabsAttribute}-triggers]>.${TriggerActiveClass}`,
      );

      tabsActiveTrigger?.classList.remove(TriggerActiveClass);
    }

    tabsPanels = Array.from(tabsPanels).filter((panel) => {
      return panel.closest(`[${tabsAttribute}]`) === tabsBlock;
    });
    tabsTriggers = Array.from(tabsTriggers).filter((panel) => {
      return panel.closest(`[${tabsAttribute}]`) === tabsBlock;
    });
    tabsPanels.forEach((tabsPanelsPanel, index) => {
      tabsTriggers[index].setAttribute(`${tabsAttribute}-trigger`, '');
      tabsPanelsPanel.setAttribute(`${tabsAttribute}-panel`, '');

      if (tabsActiveHashBlock && index === tabsActiveHash[1]) {
        tabsTriggers[index].classList.add(TriggerActiveClass);
      }

      tabsPanelsPanel.hidden =
        !tabsTriggers[index].classList.contains(TriggerActiveClass);
    });
  };

  const setTriggerPosition = (tabsMediaArray, matchMedia) => {
    tabsMediaArray.forEach((tabsMediaPanel) => {
      tabsMediaPanel = tabsMediaPanel.panel;

      const tabsTriggers = tabsMediaPanel.querySelector(
        `[${tabsAttribute}-triggers]`,
      );
      const tabsPanels = tabsMediaPanel.querySelector(`[${tabsAttribute}-panels]`);

      let tabsTriggerPanels = tabsMediaPanel.querySelectorAll(tabsTriggerAttribute);
      let tabsPanelsPanels = tabsMediaPanel.querySelectorAll(
        `[${tabsAttribute}-panel]`,
      );

      tabsTriggerPanels = Array.from(tabsTriggerPanels).filter((panel) => {
        return panel.closest(`[${tabsAttribute}]`) === tabsMediaPanel;
      });
      tabsPanelsPanels = Array.from(tabsPanelsPanels).filter((panel) => {
        return panel.closest(`[${tabsAttribute}]`) === tabsMediaPanel;
      });
      tabsPanelsPanels.forEach((tabsPanelsPanel, index) => {
        if (matchMedia.matches) {
          tabsPanels.append(tabsTriggerPanels[index]);
          tabsPanels.append(tabsPanelsPanel);
          tabsMediaPanel.classList.add('tab-spoiler');
        } else {
          tabsTriggers.append(tabsTriggerPanels[index]);
          tabsMediaPanel.classList.remove('tab-spoiler');
        }
      });
    });
  };

  const setTabsStatus = (tabsBlock) => {
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    let tabsTriggers = tabsBlock.querySelectorAll(tabsTriggerAttribute);
    let tabsPanels = tabsBlock.querySelectorAll(`[${tabsAttribute}-panel]`);

    const isTabsAnimate = (tabsBlock) => {
      if (tabsBlock.hasAttribute(`${tabsAttribute}-animate`)) {
        return Number(tabsBlock.dataset.tabsAnimate) ?? 500;
      }
    };

    const tabsBlockAnimate = isTabsAnimate(tabsBlock);
    const isHash = tabsBlock.hasAttribute(`${tabsAttribute}-hash`);

    tabsPanels = Array.from(tabsPanels).filter((panel) => {
      return panel.closest(`[${tabsAttribute}]`) === tabsBlock;
    });
    tabsTriggers = Array.from(tabsTriggers).filter((panel) => {
      return panel.closest(`[${tabsAttribute}]`) === tabsBlock;
    });
    tabsPanels.forEach((tabsPanelsPanel, index) => {
      if (tabsTriggers[index].classList.contains(TriggerActiveClass)) {
        tabsBlockAnimate
          ? slideDown(tabsPanelsPanel, tabsBlockAnimate)
          : (tabsPanelsPanel.hidden = false);

        if (isHash && !tabsPanelsPanel.closest('.popup')) {
          setHash(`tab-${tabsBlockIndex}-${index}`);
        }
      } else if (tabsBlockAnimate) {
        slideUp(tabsPanelsPanel, tabsBlockAnimate);
      } else {
        tabsPanelsPanel.hidden = true;
      }
    });
  };

  const setTabsAction = (event) => {
    const el = event.target;

    if (el.closest(tabsTriggerAttribute)) {
      const tabTrigger = el.closest(tabsTriggerAttribute);
      const tabsBlock = tabTrigger.closest(`[${tabsAttribute}]`);

      if (
        !tabTrigger.classList.contains(TriggerActiveClass) &&
        !tabsBlock.querySelector('.slide')
      ) {
        let tabActiveTrigger = tabsBlock.querySelectorAll(
          `[${tabsAttribute}-trigger].${TriggerActiveClass}`,
        );

        if (tabActiveTrigger) {
          tabActiveTrigger = Array.from(tabActiveTrigger).filter((panel) => {
            return panel.closest(`[${tabsAttribute}]`) === tabsBlock;
          });
        }

        removeClasses(
          `[${tabsAttribute}-trigger].${TriggerActiveClass}`,
          TriggerActiveClass,
        );

        tabTrigger.classList.add(TriggerActiveClass);

        setTabsStatus(tabsBlock);
      }

      event.preventDefault();
    }
  };

  tabsArray.forEach((tabsBlock, index) => {
    tabsBlock.classList.add('tab-init');
    tabsBlock.setAttribute(`${tabsAttribute}-index`, index);
    tabsBlock.addEventListener('click', setTabsAction);

    initTabs(tabsBlock);
  });

  const mdQueriesArray = dataMediaQueries(tabsArray, 'tabs');

  if (mdQueriesArray) {
    mdQueriesArray.forEach((mdQueriesPanel) => {
      mdQueriesPanel.matchMedia.addEventListener('change', () => {
        setTriggerPosition(mdQueriesPanel.PanelsArray, mdQueriesPanel.matchMedia);
      });

      setTriggerPosition(mdQueriesPanel.PanelsArray, mdQueriesPanel.matchMedia);
    });
  }
};

export { tabs };
