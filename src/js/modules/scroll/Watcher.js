import { html } from '@js/helpers/node-list'
import { uniqArray } from '@js/helpers/uniq-array'

class ScrollWatcher {
  constructor() {
    this.observer

    if (!html.classList.contains('watcher')) {
      this.scrollWatcherRun()
    }
  }

  scrollWatcherUpdate() {
    this.scrollWatcherRun()
  }

  scrollWatcherRun() {
    html.classList.add('watcher')
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'))
  }

  scrollWatcherConstructor(items) {
    const uniqParams = uniqArray(
      Array.from(items).map((item) => {
        return `${item.dataset.watchRoot ?? null}|${item.dataset.watchMargin ?? '0px'
          }|${item.dataset.watchThreshold ?? 0}`
      })
    )

    uniqParams.forEach((uniqParam) => {
      const uniqParamArray = uniqParam.split('|')
      const paramsWatch = {
        root: uniqParamArray[0],
        margin: uniqParamArray[1],
        threshold: uniqParamArray[2]
      }
      const groupItems = Array.from(items).filter((item) => {
        const watchRoot = item.dataset.watchRoot ?? null
        const watchMargin = item.dataset.watchMargin ?? '0px'
        const watchThreshold = item.dataset.watchThreshold ?? 0

        if (
          String(watchRoot) === paramsWatch.root &&
          String(watchMargin) === paramsWatch.margin &&
          String(watchThreshold) === paramsWatch.threshold
        ) {
          return item
        }
      })
      const configWatcher = this.getScrollWatcherConfig(paramsWatch)

      this.scrollWatcherInit(groupItems, configWatcher)
    })
  }

  getScrollWatcherConfig(paramsWatch) {
    const configWatcher = {}

    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root)
    }

    configWatcher.rootMargin = paramsWatch.margin

    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = []

      for (let index = 0; index <= 1.0; index += 0.005) {
        paramsWatch.threshold.push(index)
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',')
    }

    configWatcher.threshold = paramsWatch.threshold

    return configWatcher
  }

  scrollWatcherCreate(configWatcher) {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        return this.scrollWatcherCallback(entry, observer)
      })
    }, configWatcher)
  }

  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher)
    items.forEach((item) => {
      return this.observer.observe(item)
    })
  }

  scrollWatcherIntersecting(entry, targetElement) {
    const watcherViewClass = 'watcher-view'

    if (entry.isIntersecting) {
      if (!targetElement.classList.contains(watcherViewClass)) {
        targetElement.classList.add(watcherViewClass)
      }
    } else {
      targetElement.classList.remove(watcherViewClass)
    }
  }

  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement)
  }

  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target

    this.scrollWatcherIntersecting(entry, targetElement)

    if (targetElement.hasAttribute('data-watch-once') && entry.isIntersecting) {
      this.scrollWatcherOff(targetElement, observer)
    }

    document.dispatchEvent(new CustomEvent('watcherCallback', { detail: entry }))
  }
}

const scrollWatcher = new ScrollWatcher()

export { scrollWatcher }
