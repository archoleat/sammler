import SimpleBar from 'simplebar';

const scrollBars = document.querySelectorAll('[data-simplebar]');

const scrollBar = () => {
  if (scrollBars) {
    for (const scrollBlock of scrollBars) {
      new SimpleBar(scrollBlock, {
        scrollBarMinSize: 100,
        autoHide: false,
      });
    }
  }
};

export { scrollBar };
