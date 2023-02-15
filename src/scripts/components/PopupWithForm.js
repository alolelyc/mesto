import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(buttonText, { popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._buttonSumbit = this._popupForm.querySelector(".popup__save");
    this._textButton = buttonText;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }


  loading(download)  {
    if (download) {
      this._buttonSumbit.textContent = "Сохранение...";
    } else {
      this._buttonSumbit.textContent = this._textButton;
    }
  }
}
