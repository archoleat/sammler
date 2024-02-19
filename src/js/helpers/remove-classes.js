const removeClasses = (array, className) => {
  document.querySelectorAll(array).forEach((item) => {
    return item.classList.remove(className);
  });
};

export { removeClasses };
