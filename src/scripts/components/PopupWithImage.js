import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fotoTitle = this._popupElement.querySelector(".popup__foto-title");
    this._fotoImage = this._popupElement.querySelector(".popup__foto-image");
  }
  open(title, link) {
    super.open(title, link);
    this._fotoTitle.textContent = title;
    this._fotoImage.src = link;
    this._fotoTitle.alt = title;
  }
}
