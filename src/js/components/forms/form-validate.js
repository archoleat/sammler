import { select } from '@js/components/forms/Select'

class FormValidate {
  constructor() {
    this.formErrorClass = 'form-error'
    this.formErrorClassElement = 'form__error'
  }

  getErrors(form) {
    const formRequiredItems = form.querySelectorAll('*[data-required]')

    let error = 0

    formRequiredItems.forEach((formRequiredItem) => {
      if (
        (formRequiredItem.offsetParent !== null ??
          formRequiredItem.tagName === 'SELECT') &&
        !formRequiredItem.disabled
      ) {
        error += this.validateInput(formRequiredItem)
      }
    })

    return error
  }

  validateInput(formRequiredItem) {
    let error = 0

    if (formRequiredItem.dataset.required === 'email') {
      formRequiredItem.value = formRequiredItem.value.replace(' ', '')

      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem)
        error++
      } else {
        this.removeError(formRequiredItem)
      }
    } else if (
      (formRequiredItem.type === 'checkbox' && !formRequiredItem.checked) ??
      !formRequiredItem.value.trim()
    ) {
      this.addError(formRequiredItem)
      error++
    } else {
      this.removeError(formRequiredItem)
    }

    return error
  }

  addError(formRequiredItem) {
    formRequiredItem.classList.add(this.formErrorClass)
    formRequiredItem.parentElement.classList.add(this.formErrorClass)

    const inputError = formRequiredItem.parentElement.querySelector(
      `.${this.formErrorClassElement}`
    )

    if (inputError) {
      formRequiredItem.parentElement.removeChild(inputError)
    }

    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="${this.formErrorClassElement}">
					${formRequiredItem.dataset.error}
				</div>`
      )
    }
  }

  removeError(formRequiredItem) {
    formRequiredItem.classList.remove(this.formErrorClass)
    formRequiredItem.parentElement.classList.remove(this.formErrorClass)

    if (
      formRequiredItem.parentElement.querySelector(`.${this.formErrorClassElement}`)
    ) {
      formRequiredItem.parentElement.removeChild(
        formRequiredItem.parentElement.querySelector(
          `.${this.formErrorClassElement}`
        )
      )
    }
  }

  formClean(form) {
    form.reset()
    setTimeout(() => {
      const inputs = form.querySelectorAll('input,textarea')

      inputs.forEach((el) => {
        el.parentElement.classList.remove(this.formErrorClass)
        el.classList.remove(this.formErrorClass)
        this.removeError(el)
      })

      const checkboxes = form.querySelectorAll('.checkbox__input')

      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })

      const selects = form.querySelectorAll('.select')

      selects.forEach((selectBlock) => {
        selectBlock.querySelector('select')
        select().selectBuild(selectBlock)
      })
    }, 0)
  }

  emailTest(formRequiredItem) {
    return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(
      formRequiredItem.value
    )
  }
}

const formValidate = new FormValidate()

export { formValidate }
