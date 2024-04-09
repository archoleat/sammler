const getDigFormat = (item) => item.toString().replaceAll(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');

export { getDigFormat };
