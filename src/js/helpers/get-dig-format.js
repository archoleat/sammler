const getDigFormat = (item) => {
  return item.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};

export { getDigFormat };
