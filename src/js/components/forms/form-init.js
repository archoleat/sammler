import { formValidate } from '@js/components/forms/Form-validate';

const formFieldsInit = (
  options = {
    viewPass: false,
    autoHeight: false,
  },
) => {
  const formFocus = 'form-focus';

  document.body.addEventListener('focusin', (event) => {
    const targetElement = event.target;

    if (targetElement.tagName === 'INPUT' ?? targetElement.tagName === 'TEXTAREA') {
      if (!Object.hasOwn(targetElement.dataset, 'noFocusClasses')) {
        targetElement.classList.add(formFocus);
        targetElement.parentElement.classList.add(formFocus);
      }

      formValidate.removeError(targetElement);
    }
  });
  document.body.addEventListener('focusout', (event) => {
    const targetElement = event.target;

    if (targetElement.tagName === 'INPUT' ?? targetElement.tagName === 'TEXTAREA') {
      if (!Object.hasOwn(targetElement.dataset, 'noFocusClasses')) {
        targetElement.classList.remove(formFocus);
        targetElement.parentElement.classList.remove(formFocus);
      }

      if (Object.hasOwn(targetElement.dataset, 'validate')) {
        formValidate.validateInput(targetElement);
      }
    }
  });

  if (options.viewPass) {
    document.addEventListener('click', (event) => {
      const targetElement = event.target;

      if (targetElement.closest('[class*="__view-pass"]')) {
        const inputType = targetElement.classList.contains('view-pass')
          ? 'password'
          : 'text';

        targetElement.parentElement
          .querySelector('input')
          .setAttribute('type', inputType);
        targetElement.classList.toggle('view-pass');
      }
    });
  }

  const textAreas = document.querySelectorAll('textarea[data-auto-height]');

  const setHeight = (textarea, height) => {
    textarea.style.height = `${height}px`;
  };

  for (const textarea of textAreas) {
    const startHeight =
      Number(textarea.dataset.autoHeightMin) ?? Number(textarea.offsetHeight);
    const maxHeight = Number(textarea.dataset.autoHeightMax) ?? Number.POSITIVE_INFINITY;

    setHeight(textarea, Math.min(startHeight, maxHeight));
    textarea.addEventListener('input', () => {
      if (textarea.scrollHeight > startHeight) {
        textarea.style.height = 'auto';
        setHeight(
          textarea,
          Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight),
        );
      }
    });
  }

  if (options.autoHeight) {
    setHeight();
  }
};

export { formFieldsInit };
