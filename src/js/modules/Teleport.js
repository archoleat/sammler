class Teleport {
  constructor(type) {
    this.type = type;
  }

  init() {
    this.objects = [];
    this.teleportClassName = 'teleport';
    this.nodes = [...document.querySelectorAll('[data-teleport]')];

    for (const node of this.nodes) {
      const data = node.dataset.teleport.trim();
      const dataArray = data.split(',');
      const object = {
        element: node,
        parent: node.parentNode,
        destination: document.querySelector(`${dataArray[0].trim()}`),
        breakpoint: dataArray[1]?.trim() ?? '767',
        position: dataArray[2]?.trim() ?? 'last',
        index: this.indexInParent(node.parentNode, node),
      };

      this.objects.push(object);
    }
    this.arraySort(this.objects);
    this.mediaQueries = this.objects
      .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    for (const media of this.mediaQueries) {
      const mediaSplit = media.split(',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];
      const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);

      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, objectsFilter);
      });
      this.mediaHandler(matchMedia, objectsFilter);
    }
  }

  mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      for (const object of objects) {
        object.index = this.indexInParent(object.parent, object.element);
        this.moveTo(object.place, object.element, object.destination);
      }
    } else {
      for (const { parent, element, index } of objects) {
        if (element.classList.contains(this.teleportClassName)) {
          this.moveBack(parent, element, index);
        }
      }
    }
  }

  moveTo(place, element, destination) {
    element.classList.add(this.teleportClassName);

    if (place === 'last') {
      destination.append(element);

      return;
    }

    if (place === 'first') {
      destination.prepend(element);

      return;
    }

    destination.children[place].before(element);
  }

  moveBack(parent, element, index) {
    element.classList.remove(this.teleportClassName);

    if (parent.children[index] === undefined) {
      parent.append(element);
    } else {
      parent.children[index].before(element);
    }
  }

  indexInParent(parent, element) {
    return [...parent.children].indexOf(element);
  }

  arraySort(array) {
    if (this.type === 'min') {
      array.sort((start, end) => {
        if (start.breakpoint === end.breakpoint) {
          if (start.position === end.position) {
            return 0;
          }

          if (start.position === 'first' ?? end.position === 'last') {
            return -1;
          }

          if (start.position === 'last' ?? end.position === 'first') {
            return 1;
          }

          return 0;
        }

        return start.breakpoint - end.breakpoint;
      });
    } else {
      array.sort((start, end) => {
        if (start.breakpoint === end.breakpoint) {
          if (start.position === end.position) {
            return 0;
          }

          if (start.position === 'first' ?? end.position === 'last') {
            return 1;
          }

          if (start.position === 'last' ?? end.position === 'first') {
            return -1;
          }

          return 0;
        }

        return end.breakpoint - start.breakpoint;
      });
    }
  }
}

const teleport = new Teleport('max').init();

export { teleport };
