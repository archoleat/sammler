import { formValidate } from '@js/components/forms/Form-validate';
import { slideToggle } from '@js/helpers/slide-toggle';
import { slideUp } from '@js/helpers/slide-up';

class Select {
  constructor(properties, data = null) {
    const defaultConfig = { init: true };

    this.config = Object.assign(defaultConfig, properties);
    this.selectClasses = {
      classSelect: 'select',
      classSelectBody: 'select__body',
      classSelectTitle: 'select__title',
      classSelectValue: 'select__value',
      classSelectLabel: 'select__label',
      classSelectInput: 'select__input',
      classSelectText: 'select__text',
      classSelectLink: 'select__link',
      classSelectOptions: 'select__options',
      classSelectOptionsScroll: 'select__scroll',
      classSelectOption: 'select__option',
      classSelectContent: 'select__content',
      classSelectRow: 'select__row',
      classSelectData: 'select__asset',
      classSelectDisabled: 'select-disabled',
      classSelectTag: 'select-tag',
      classSelectOpen: 'select-open',
      classSelectActive: 'select-active',
      classSelectFocus: 'select-focus',
      classSelectMultiple: 'select-multiple',
      classSelectCheckBox: 'select-checkbox',
      classSelectOptionSelected: 'select-selected',
      classSelectPseudoLabel: 'select-pseudo-label',
    };
    this.that = this;
    this.searchAttribute = 'data-search';

    if (this.config.init) {
      const selectItems = data
        ? document.querySelectorAll(data)
        : document.querySelectorAll('select');

      if (selectItems) {
        this.selectsInit(selectItems);
      }
    }
  }

  getSelectClass(className) {
    return `.${className}`;
  }

  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    };
  }

  selectsInit(selectItems) {
    for (const [index, originalSelect] of selectItems.entries()) {
      this.selectInit(originalSelect, index + 1);
    }
    document.addEventListener('click', (event) => {
      this.selectsActions(event);
    });
    document.addEventListener('keydown', (event) => {
      this.selectsActions(event);
    });
    document.addEventListener('focusin', (event) => {
      this.selectsActions(event);
    });
    document.addEventListener('focusout', (event) => {
      this.selectsActions(event);
    });
  }

  selectInit(originalSelect, index) {
    const that = this;
    const selectItem = document.createElement('div');

    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.append(originalSelect);
    originalSelect.hidden = true;

    if (index) {
      originalSelect.dataset.id = index;
    }

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder =
        this.getSelectPlaceholder(originalSelect).value;

      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle,
        ).selectElement;

        selectItemTitle.insertAdjacentHTML(
          'afterbegin',
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(originalSelect).label.text ??
            this.getSelectPlaceholder(originalSelect).value
          }</span>`,
        );
      }
    }

    selectItem.insertAdjacentHTML(
      'beforeend',
      `
				<div class="${this.selectClasses.classSelectBody}">
					<div class="${this.selectClasses.classSelectOptions}" hidden>
					</div>
				</div>
			`,
    );
    this.selectBuild(originalSelect);
    originalSelect.dataset.speed ??= 150;
    originalSelect.addEventListener('change', (event) => {
      that.selectChange(event);
    });
  }

  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;

    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classMod;

    if (originalSelect.dataset.classMod) {
      selectItem.classList.add(`select--${originalSelect.dataset.classMod}`);
    }

    originalSelect.multiple
      ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
      : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    Object.hasOwn(originalSelect.dataset, 'checkbox') && originalSelect.multiple
      ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
      : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);

    if (originalSelect.hasAttribute(this.searchAttribute)) {
      this.searchActions(selectItem);
    }

    if (Object.hasOwn(originalSelect.dataset, 'open')) {
      this.selectAction(selectItem);
    }

    this.selectDisabled(selectItem, originalSelect);
  }

  selectsActions(event) {
    const targetElement = event.target;
    const targetType = event.type;

    if (
      targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) ??
      targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))
    ) {
      const selectItem = targetElement.closest('.select')
        ? targetElement.closest('.select')
        : document.querySelector(
            `.${this.selectClasses.classSelect}[data-id="${
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag),
              ).dataset.selectId
            }"]`,
          );
      const {originalSelect} = this.getSelectElement(selectItem);

      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTag),
            )
          ) {
            const targetTag = targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTag),
            );
            const optionItem = document.querySelector(
              `.${this.selectClasses.classSelect}
								[data-id="${targetTag.dataset.selectId}"]
									.select__option[data-value="${targetTag.dataset.value}"]
							`,
            );

            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTitle),
            )
          ) {
            this.selectAction(selectItem);
          } else if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectOption),
            )
          ) {
            const optionItem = targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectOption),
            );

            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' ?? targetType === 'focusout') {
        if (
          targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))
        ) {
          targetType === 'focusin'
            ? selectItem.classList.add(this.selectClasses.classSelectFocus)
            : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && event.code === 'Escape') {
        this.selectsClose();
      }
    } else {
      this.selectsClose();
    }
  }

  selectsClose(selectOneGroup) {
    const selectsGroup = selectOneGroup ?? document;
    const selectActiveItems = selectsGroup.querySelectorAll(
      `${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(
        this.selectClasses.classSelectOpen,
      )}`,
    );

    for (const selectActiveItem of selectActiveItems) {
      this.selectClose(selectActiveItem);
    }
  }

  selectClose(selectItem) {
    const {originalSelect} = this.getSelectElement(selectItem);
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;

    if (!selectOptions.classList.contains('slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      slideUp(selectOptions, originalSelect.dataset.speed);
    }
  }

  selectAction(selectItem) {
    const {originalSelect} = this.getSelectElement(selectItem);
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;

    if (originalSelect.closest('[data-one-select]')) {
      const selectOneGroup = originalSelect.closest('[data-one-select]');

      this.selectsClose(selectOneGroup);
    }

    if (!selectOptions.classList.contains('slide')) {
      selectItem.classList.toggle(this.selectClasses.classSelectOpen);
      slideToggle(selectOptions, originalSelect.dataset.speed);
    }
  }

  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectBody,
    ).selectElement;
    const selectItemTitle = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectTitle,
    ).selectElement;

    if (selectItemTitle) {
      selectItemTitle.remove();
    }

    selectItemBody.insertAdjacentHTML(
      'afterbegin',
      this.getSelectTitleValue(selectItem, originalSelect),
    );
  }

  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;

    if (originalSelect.multiple && Object.hasOwn(originalSelect.dataset, 'tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect)
        .elements.map((option) => `<span role="button" data-select-id="${
            selectItem.dataset.id
          }" data-value="${option.value}"
						class="select-tag">${this.getSelectElementContent(option)}</span>`)
        .join('');

      if (
        originalSelect.dataset.tags &&
        document.querySelector(originalSelect.dataset.tags)
      ) {
        document.querySelector(originalSelect.dataset.tags).innerHTML =
          selectTitleValue;

        if (originalSelect.hasAttribute(this.searchAttribute)) {
          selectTitleValue = false;
        }
      }
    }

    selectTitleValue = originalSelect.dataset.placeholder ?? '';

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';

    if (Object.hasOwn(originalSelect.dataset, 'pseudoLabel')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel
        ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"`
        : ' data-pseudo-label="Fill in attribute"';
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    this.getSelectedOptionsData(originalSelect).values.length > 0
      ? selectItem.classList.add(this.selectClasses.classSelectActive)
      : selectItem.classList.remove(this.selectClasses.classSelectActive);

    if (originalSelect.hasAttribute(this.searchAttribute)) {
      return `
				<div class="${this.selectClasses.classSelectTitle}">
					<span ${pseudoAttribute}
						class="${this.selectClasses.classSelectValue}">
						<input class="${this.selectClasses.classSelectInput}"
							type="text"
							placeholder="${selectTitleValue}">
					</span>
				</div>
			`;
    }

    const customClass =
      this.getSelectedOptionsData(originalSelect).elements.length > 0 &&
      this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
        ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}`
        : '';

    return `
			<button class="${this.selectClasses.classSelectTitle}"
				type="button">
				<span${pseudoAttribute}
					class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}">
						<span class="${this.selectClasses.classSelectContent}${customClass}">
							${selectTitleValue}
						</span>
					</span>
			</button>
		`;
  }

  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset
      ? `${selectOption.dataset.asset}`
      : '';
    const selectOptionDataHTML =
      selectOptionData.includes('img')
        ? `<img src="${selectOptionData}" alt="">`
        : selectOptionData;

    let selectOptionContentHTML = '';

    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectRow}">`
      : '';
    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectData}">`
      : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? '</span>' : '';
    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectText}">`
      : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? '</span>' : '';
    selectOptionContentHTML += selectOptionData ? '</span>' : '';

    return selectOptionContentHTML;
  }

  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = [...originalSelect.options].find((option) => !option.value);

    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: Object.hasOwn(selectPlaceholder.dataset, 'show'),
        label: {
          show: Object.hasOwn(selectPlaceholder.dataset, 'label'),
          text: selectPlaceholder.dataset.label,
        },
      };
    }
  }

  getSelectedOptionsData(originalSelect) {
    let selectedOptions = [];

    if (originalSelect.multiple) {
      selectedOptions = [...originalSelect.options]
        .filter((option) => option.value)
        .filter((option) => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }

    return {
      elements: selectedOptions.map((option) => option),
      values: selectedOptions
        .filter((option) => option.value)
        .map((option) => option.value),
      html: selectedOptions.map((option) => this.getSelectElementContent(option)),
    };
  }

  getOptions(originalSelect) {
    const selectOptionsScroll = Object.hasOwn(originalSelect.dataset, 'scroll')
      ? 'data-simplebar'
      : '';
    const selectOptionsScrollHeight = originalSelect.dataset.scroll
      ? `style="max-height:${originalSelect.dataset.scroll}px"`
      : '';

    let selectOptions = [...originalSelect.options];

    if (selectOptions) {
      let selectOptionsHTML = '';

      if (
        (this.getSelectPlaceholder(originalSelect) &&
          !this.getSelectPlaceholder(originalSelect).show) ??
        originalSelect.multiple
      ) {
        selectOptions = selectOptions.filter((option) => option.value);
      }

      selectOptionsHTML += selectOptionsScroll
        ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight}
						class="${this.selectClasses.classSelectOptionsScroll}">`
        : '';
      for (const selectOption of selectOptions) {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      }
      selectOptionsHTML += selectOptionsScroll ? '</div>' : '';

      return selectOptionsHTML;
    }
  }

  getOption(selectOption, originalSelect) {
    const selectOptionSelected =
      selectOption.selected && originalSelect.multiple
        ? ` ${this.selectClasses.classSelectOptionSelected}`
        : '';
    const selectOptionHide =
      selectOption.selected &&
      !Object.hasOwn(originalSelect.dataset, 'showSelected') &&
      !originalSelect.multiple
        ? 'hidden'
        : '';
    const selectOptionClass = selectOption.dataset.class ?? '';
    const selectOptionLink = selectOption.dataset.href;
    const selectOptionLinkTarget = Object.hasOwn(selectOption.dataset, 'hrefBlank')
      ? 'target="_blank"'
      : '';

    let selectOptionHTML = '';

    selectOptionHTML += selectOptionLink
      ? `<a
					class="${this.selectClasses.classSelectOption} ${selectOptionClass} ${selectOptionSelected}"
					href="${selectOptionLink}"
					data-value="${selectOption.value}"
							${selectOptionLinkTarget}
							${selectOptionHide}
				>`
      : `<button
					class="${this.selectClasses.classSelectOption} ${selectOptionClass} ${selectOptionSelected}"
					type="button"
					data-value="${selectOption.value}"
					${selectOptionHide}
				>`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? '</a>' : '</button>';

    return selectOptionHTML;
  }

  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;

    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }

  optionAction(selectItem, originalSelect, optionItem) {
    if (originalSelect.multiple) {
      optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);

      const originalSelectSelectedItems =
        this.getSelectedOptionsData(originalSelect).elements;

      for (const originalSelectSelectedItem of originalSelectSelectedItems) {
        originalSelectSelectedItem.removeAttribute('selected');
      }

      const selectSelectedItems = selectItem.querySelectorAll(
        this.getSelectClass(this.selectClasses.classSelectOptionSelected),
      );

      selectSelectedItems.forEach((selectSelectedItems) => {
        originalSelect
          .querySelector(`option[value="${selectSelectedItems.dataset.value}"]`)
          .setAttribute('selected', 'selected');
      });
    } else {
      if (!Object.hasOwn(originalSelect.dataset, 'showSelected')) {
        if (
          selectItem.querySelector(
            `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
          )
        ) {
          selectItem.querySelector(
            `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
          ).hidden = false;
        }

        optionItem.hidden = true;
      }

      originalSelect.value = Object.hasOwn(optionItem.dataset, 'value')
        ? optionItem.dataset.value
        : optionItem.textContent;
      this.selectAction(selectItem);
    }

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setSelectChange(originalSelect);
  }

  selectChange(event) {
    const originalSelect = event.target;

    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }

  setSelectChange(originalSelect) {
    if (Object.hasOwn(originalSelect.dataset, 'validate')) {
      formValidate.validateInput(originalSelect);
    }

    if (Object.hasOwn(originalSelect.dataset, 'submit') && originalSelect.value) {
      const temporaryButton = document.createElement('button');

      temporaryButton.type = 'submit';
      originalSelect.closest('form').append(temporaryButton);
      temporaryButton.click();
      temporaryButton.remove();
    }
  }

  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle,
      ).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle,
      ).selectElement.disabled = false;
    }
  }

  searchActions(selectItem) {
    const selectInput = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectInput,
    ).selectElement;
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(
      `.${this.selectClasses.classSelectOption}`,
    );
    const that = this;

    selectInput.addEventListener('input', () => {
      for (const selectOptionsItem of selectOptionsItems) {
        selectOptionsItem.textContent
          .toUpperCase()
          .includes(selectInput.value.toUpperCase())
          ? (selectOptionsItem.hidden = false)
          : (selectOptionsItem.hidden = true);
      }

      if (selectOptions.hidden) {
        that.selectAction(selectItem);
      }
    });
  }
}

const select = new Select();

export { select };
