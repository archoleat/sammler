const getDigFromString = (item) => Number.parseInt(item.replaceAll(/\D/g, ''));

export { getDigFromString };
