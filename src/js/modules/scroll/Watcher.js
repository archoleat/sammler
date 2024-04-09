import { html } from '@js/helpers/node-list';
import { uniqArray } from '@js/helpers/uniq-array';

class ScrollWatcher {
  constructor() {
    this.observer;

    if (!html.classList.contains('watcher')) {
      this.scrollWatcherRun();
    }
  }

  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }

  scrollWatcherRun() {
    html.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }

  scrollWatcherConstructor(items) {
    const uniqParameters = uniqArray(
      [...items].map((item) => `${item.dataset.watchRoot ?? null}|${
          item.dataset.watchMargin ?? '0px'
        }|${item.dataset.watchThreshold ?? 0}`),
    );

    for (const uniqParameter of uniqParameters) {
      const uniqParameterArray = uniqParameter.split('|');
      const parametersWatch = {
        root: uniqParameterArray[0],
        margin: uniqParameterArray[1],
        threshold: uniqParameterArray[2],
      };
      const groupItems = [...items].filter((item) => {
        const watchRoot = item.dataset.watchRoot ?? null;
        const watchMargin = item.dataset.watchMargin ?? '0px';
        const watchThreshold = item.dataset.watchThreshold ?? 0;

        if (
          String(watchRoot) === parametersWatch.root &&
          String(watchMargin) === parametersWatch.margin &&
          String(watchThreshold) === parametersWatch.threshold
        ) {
          return item;
        }
      });
      const configWatcher = this.getScrollWatcherConfig(parametersWatch);

      this.scrollWatcherInit(groupItems, configWatcher);
    }
  }

  getScrollWatcherConfig(parametersWatch) {
    const configWatcher = {};

    if (document.querySelector(parametersWatch.root)) {
      configWatcher.root = document.querySelector(parametersWatch.root);
    }

    configWatcher.rootMargin = parametersWatch.margin;

    if (parametersWatch.threshold === 'prx') {
      parametersWatch.threshold = [];

      for (let index = 0; index <= 1; index += 0.005) {
        parametersWatch.threshold.push(index);
      }
    } else {
      parametersWatch.threshold = parametersWatch.threshold.split(',');
    }

    configWatcher.threshold = parametersWatch.threshold;

    return configWatcher;
  }

  scrollWatcherCreate(configWatcher) {
    this.observer = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
         this.scrollWatcherCallback(entry, observer); continue;
      }
    }, configWatcher);
  }

  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    for (const item of items) {
       this.observer.observe(item); continue;
    }
  }

  scrollWatcherIntersecting(entry, targetElement) {
    const watcherViewClass = 'watcher-view';

    if (entry.isIntersecting) {
      if (!targetElement.classList.contains(watcherViewClass)) {
        targetElement.classList.add(watcherViewClass);
      }
    } else {
      targetElement.classList.remove(watcherViewClass);
    }
  }

  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }

  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;

    this.scrollWatcherIntersecting(entry, targetElement);

    if (Object.hasOwn(targetElement.dataset, 'watchOnce') && entry.isIntersecting) {
      this.scrollWatcherOff(targetElement, observer);
    }

    document.dispatchEvent(new CustomEvent('watcherCallback', { detail: entry }));
  }
}

const scrollWatcher = new ScrollWatcher();

export { scrollWatcher };
