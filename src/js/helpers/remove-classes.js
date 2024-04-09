const removeClasses = (array, className) => {
  for (const item of document.querySelectorAll(array)) {
     item.classList.remove(className); continue;
  }
};

export { removeClasses };
