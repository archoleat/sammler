const quantity = () => {
  const quantityAttribute = 'data-quantity';

  document.addEventListener('click', (event) => {
    const targetElement = event.target;

    if (
      targetElement.closest(`[${quantityAttribute}-plus]`) ??
      targetElement.closest(`[${quantityAttribute}-minus]`)
    ) {
      const valueElement = targetElement
        .closest(`[${quantityAttribute}]`)
        .querySelector(`[${quantityAttribute}-value]`);

      let value = parseInt(valueElement.value);

      if (targetElement.hasAttribute(`${quantityAttribute}-plus`)) {
        value++;

        if (
          Number(valueElement.dataset.quantityMax) &&
          Number(valueElement.dataset.quantityMax) < value
        ) {
          value = valueElement.dataset.quantityMax;
        }
      } else {
        --value;

        if (
          Number(valueElement.dataset.quantityMin) &&
          Number(valueElement.dataset.quantityMin) > value
        ) {
          value = valueElement.dataset.quantityMin;
        } else if (value < 1) {
          value = 1;
        }
      }

      targetElement
        .closest(`[${quantityAttribute}]`)
        .querySelector(`[${quantityAttribute}-value]`).value = value;
    }
  });
};

export { quantity };
