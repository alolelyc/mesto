import { Popup } from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._buttonSumbit = this._popupForm.querySelector(".popup__save");
  }

  setHendleSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  //изменение кнопки во время загрузки
  loading(download) {
    if (download) {
      this._buttonSumbit.textContent = "Удаление...";
    } else {
      this._buttonSumbit.textContent = this._textButton;            // "Да";
    }
  }
}
