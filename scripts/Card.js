export class Card {
  constructor(data, templateSelector, openPopupFoto) {
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupFoto = openPopupFoto;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._title;
    this._elementImg.alt = this._title;
    this._elementImg.src = this._link;

    return this._element;
  }

  _btnDelClick() {
    this._element.remove();
  }

  _btnLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._elementImg.addEventListener("click", () => {
      this._openPopupFoto(this._title, this._link);
    });

    this._element
      .querySelector(".card__button-del")
      .addEventListener("click", () => {
        this._btnDelClick();
      });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._btnLikeClick();
      });
  }
}
