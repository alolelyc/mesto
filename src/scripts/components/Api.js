export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getProfileInfo() {
    //получение информации о пользователе с сервера
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._verifyResponse(res));
  }

  setUserInfo({ name, job }) {
    // редактирование информации  о пользователе скобки
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  setAvatarInfo({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  getServerCards() {
    // Загрузка карточек с сервера
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._verifyResponse(res));
  }

  renderCard(item) {
    // добавление новой карточки
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => this._verifyResponse(res));
  }

  clickLike(cardId) {
    //ставим лайк
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._verifyResponse(res));
  }

  delClickLike(cardId) {
    //снимаем лайк
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._verifyResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._verifyResponse(res));
  }
}
