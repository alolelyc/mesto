const selector = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass); //скрывает сообщение об ошибке
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config); //передаем сообщение об ошибке вторым аргументом
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // проходим по этому массиву методом some
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    // Если есть хотя бы один невалидный инпут
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    // сделай кнопку неактивной
    buttonElement.disabled = "disabled";
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = "";
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    config.submitButtonSelector
  ); // Найдём в текущей форме кнопку отправки

  toggleButtonState(inputList, buttonElement, config); // Вызовем toggle и передадим ей массив полей и ввода кнопки
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement,config);
      toggleButtonState(inputList, buttonElement, config);
      formElement.addEventListener("reset", function () {
        setTimeout(() => {
          toggleButtonState(inputList, buttonElement, config);
        }, 0);
      });
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement,config);
  });
};

// Вызовем функцию
enableValidation(selector);
