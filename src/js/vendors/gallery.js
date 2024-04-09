import lightGallery from 'lightgallery';

const gallery = () => {
  const galleries = document.querySelectorAll('[data-gallery]');

  for (const gallery of galleries) {
    lightGallery(gallery, {
      licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
      speed: 500,
    });
  }
};

export { gallery };
