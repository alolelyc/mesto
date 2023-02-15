export class Card {
  constructor({
    data,
    templateSelector,
    userId,
    openImagePopupHandler,
    handleClickLikes,
    handleLikesDel,
    handleDeleteCard,
  }) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._userId = userId; // id пользователя
    this._cardId = data._id; //id карточки
    this._ownerCardId = data.owner._id; //id  владельца карточки*/
    this._openImagePopupHandler = openImagePopupHandler;
    this._handleClickLikes = handleClickLikes;
    this._likes = data.likes;
    this._handleLikesDel = handleLikesDel;
    this._handleDeleteCard = handleDeleteCard;
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
    this._element.querySelector(".card__title").textContent = this._title;
    this._elementImg = this._element.querySelector(".card__image");
    this._delButton = this._element.querySelector(".card__button-del");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._countLikes = this._element.querySelector(".card__count-likes");
    this._setEventListeners();
    this._elementImg.alt = this._title;
    this._elementImg.src = this._link;
    this.hasDeleteBtn();
    this._hasCardLike();
    this._countLikes.textContent = this._likes.length;
    return this._element;
  }

  _hasCardLike() {
    // есть ли лайк
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  knowLikesCard(data) {
    //кол-во лайков
    this._likes = data.likes;
    this._countLikes.textContent = this._likes.length;
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // проверяем владельца карточки и убираем кнопку Delete
  hasDeleteBtn() {
    if (this._userId !== this._ownerCardId) {
      this._delButton.remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementImg.addEventListener("click", () => {
      this._openImagePopupHandler(this._title, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("card__like-button_active")) {
        this._handleLikesDel(this._cardId);
      } else {
        this._handleClickLikes(this._cardId);
      }
    });

    this._delButton.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId);
    });
  }
}
