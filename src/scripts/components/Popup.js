export class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonClose = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
    
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", this.handleOverlay);
    this._buttonClose.addEventListener("click", () => { this.close() });
      
  }
}
