import InputMask from 'inputmask/dist/inputmask.es6.js';

const initInputMasks = () => {
  new InputMask().mask(document.querySelectorAll('input'));
};

export { initInputMasks };
