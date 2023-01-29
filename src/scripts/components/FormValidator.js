export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Функция, которая добавляет класс с ошибкой

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass); //скрывает сообщение об ошибке
    errorElement.textContent = "";
  }

  // Функция, которая проверяет валидность поля

  _toggleInputErrorState(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage); //передаем сообщение об ошибке вторым аргументом
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  // Функция принимает массив полей

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // проходим по этому массиву методом some
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);

      this._buttonElement.disabled = "disabled";
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState(); // Вызовем toggle и передадим ей массив полей и ввода кнопки
    this._inputList.forEach((inputElement) => {
      // Обойдём все элементы полученной коллекции
      inputElement.addEventListener("input", () => {
        // каждому полю добавим обработчик события input
        this._toggleInputErrorState(inputElement); // Внутри колбэка вызовем toggleInputErrorStated, передав ей форму и проверяемый элемент
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(); // Для переданной формы вызовем функцию setEventListeners,// передав ей элемент формы
  }
}
