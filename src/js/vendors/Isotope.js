import Isotope from 'isotope-layout';

const filter = () => {
  const imagesInit = () => {
    const images = document.querySelectorAll('.article__image');

    for (const image of images) {
      const imageItem = image.querySelector('img');
      const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100;

      image.style.paddingBottom = `${padding}%`;
      imageItem.classList.add('init');
    }
  };

  const gridInit = () => {
    const items = document.querySelector('.articles__items');
    const itemsGrid = new Isotope(items, {
      itemSelector: '.article',
      masonry: {
        fitWidth: true,
        gutter: 20,
      },
    });

    document.addEventListener('click', (event) => {
      const targetElement = event.target;

      if (targetElement.closest('.filter__button')) {
        const filterItem = targetElement.closest('.filter__button');
        const filterValue = filterItem.dataset.filter;
        const filterActiveItem = document.querySelector('.filter__button.active');

        filterValue === '*'
          ? itemsGrid.arrange({ filter: '' })
          : itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });
        filterActiveItem.classList.remove('active');
        filterItem.classList.add('active');
        event.preventDefault();
      }
    });
  };

  imagesInit();
  gridInit();
};

export { filter };
