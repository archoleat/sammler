import { formValidate } from '@js/components/forms/Form-validate';
import { popup } from '@js/components/Popup';
import { goToBlock } from '@js/helpers/go-to-block';

const formSubmit = () => {
  const forms = document.forms;

  const formSent = (form) => {
    setTimeout(() => {
      const popupMessage = form.dataset.popupMessage;

      if (popupMessage) {
        popup().open(popupMessage);
      }
    }, 0);
    formValidate.formClean(form);
  };

  const formSubmitAction = async (form, event) => {
    const error = !form.hasAttribute('data-no-validate')
      ? formValidate.getErrors(form)
      : 0;

    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');

      if (ajax) {
        event.preventDefault();

        const formAction = form.getAttribute('action')?.trim() ?? '#';
        const formMethod = form.getAttribute('method')?.trim() ?? 'GET';
        const formData = new FormData(form);

        form.classList.add('sending');

        const response = await fetch(formAction, {
          method: formMethod,
          body: formData,
        });

        if (response.ok) {
          form.classList.remove('sending');

          formSent(form);
        } else {
          alert('Error');
          form.classList.remove('sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        event.preventDefault();

        formSent(form);
      }
    } else {
      event.preventDefault();

      if (
        form.querySelector('.form-error') &&
        form.hasAttribute('data-goto-error')
      ) {
        const formGoToErrorClass = form.dataset.gotoError ?? '.form-error';

        goToBlock(formGoToErrorClass, true);
      }
    }
  };

  if (forms) {
    for (const form of forms) {
      form.addEventListener('submit', (event) => {
        const form = event.target;

        formSubmitAction(form, event);
      });
      form.addEventListener('reset', (event) => {
        const form = event.target;

        formValidate.formClean(form);
      });
    }
  }
};

export { formSubmit };
