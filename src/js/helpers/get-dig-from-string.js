const getDigFromString = (item) => {
  return parseInt(item.replace(/\D/g, ''));
};

export { getDigFromString };
