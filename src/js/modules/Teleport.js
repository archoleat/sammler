// https://github.com/FreelancerLifeStyle/dynamic_adapt
class Teleport {
  constructor(type) {
    this.type = type
  }

  init() {
    this.objects = []
    this.daClassName = 'dynamic-adapt'
    this.nodes = [...document.querySelectorAll('[data-da]')]
    this.nodes.forEach((node) => {
      const data = node.dataset.da.trim()
      const dataArray = data.split(',')
      const object = {
        element: node,
        parent: node.parentNode,
        destination: document.querySelector(`${dataArray[0].trim()}`),
        breakpoint: dataArray[1]?.trim() ?? '767',
        place: dataArray[2]?.trim() ?? 'last',
        index: this.indexInParent(node.parentNode, node)
      }

      this.objects.push(object)
    })
    this.arraySort(this.objects)
    this.mediaQueries = this.objects
      .map(({ breakpoint }) => {
        return `(${this.type}-width: ${breakpoint}px),${breakpoint}`
      })
      .filter((item, index, self) => {
        return self.indexOf(item) === index
      })
    this.mediaQueries.forEach((media) => {
      const mediaSplit = media.split(',')
      const matchMedia = window.matchMedia(mediaSplit[0])
      const mediaBreakpoint = mediaSplit[1]
      const objectsFilter = this.objects.filter(({ breakpoint }) => {
        return breakpoint === mediaBreakpoint
      })

      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, objectsFilter)
      })
      this.mediaHandler(matchMedia, objectsFilter)
    })
  }

  mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach((object) => {
        object.index = this.indexInParent(object.parent, object.element)
        this.moveTo(object.place, object.element, object.destination)
      })
    } else {
      objects.forEach(({ parent, element, index }) => {
        if (element.classList.contains(this.daClassName)) {
          this.moveBack(parent, element, index)
        }
      })
    }
  }

  moveTo(place, element, destination) {
    element.classList.add(this.daClassName)

    if (place === 'last' ?? place >= destination.children.length) {
      destination.append(element)

      return
    }

    if (place === 'first') {
      destination.prepend(element)

      return
    }

    destination.children[place].before(element)
  }

  moveBack(parent, element, index) {
    element.classList.remove(this.daClassName)

    if (parent.children[index] !== undefined) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }

  indexInParent(parent, element) {
    return [...parent.children].indexOf(element)
  }

  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((start, end) => {
        if (start.breakpoint === end.breakpoint) {
          if (start.place === end.place) {
            return 0
          }

          if (start.place === 'first' ?? end.place === 'last') {
            return -1
          }

          if (start.place === 'last' ?? end.place === 'first') {
            return 1
          }

          return 0
        }

        return start.breakpoint - end.breakpoint
      })
    } else {
      arr.sort((start, b) => {
        if (start.breakpoint === end.breakpoint) {
          if (start.place === end.place) {
            return 0
          }

          if (start.place === 'first' ?? end.place === 'last') {
            return 1
          }

          if (start.place === 'last' ?? end.place === 'first') {
            return -1
          }

          return 0
        }

        return end.breakpoint - start.breakpoint
      })
    }
  }
}

const teleport = new Teleport('max').init()

export { teleport }
