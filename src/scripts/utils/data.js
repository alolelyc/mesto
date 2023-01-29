 export const cards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


//кнопки
export const popupOpenProfileEdit = document.querySelector(".profile__edit-icon"); // 1.кнопка открытия редактирования попапа
export const popupOpenButtonCardAdd = document.querySelector(".profile__button-add-icon"); //2.кнопка открытие попапа добавления


//попапы
export const popupProfileEdit = document.querySelector(".popup_type_profile-edit"); //3.попап редактирования профиля


export const popupCardAdd = document.querySelector(".popup_type_card-add"); //7. попап добавления карточки


export const popupFoto = document.querySelector(".popup_type_open-foto"); //попап большого фото


//формы
export const popupFormEdit = popupProfileEdit.querySelector(".popup__form"); //4.форма редактирования профиля
export const inputNameProfile = popupFormEdit.querySelector(".popup__input_type_name"); //5. поле введения имени
export const inputJobProfile = popupFormEdit.querySelector(".popup__input_type_job"); //6.поле введения профессии
export const popupFormAdd = popupCardAdd.querySelector(".popup__form");
export const inputCardName =popupFormAdd.querySelector(".popup__input_type_add"); //поле для введения названия карточки
export const inputCardLink = popupFormAdd.querySelector(".popup__input_type_link"); //поле для введения ссылки на карточку
export const popupFotoTitle = popupFoto.querySelector(".popup__foto-title");
export const popupFotoImage = popupFoto.querySelector(".popup__foto-image");



export const cardsContainer = document.querySelector(".elements");
export const templateSelector = "#cards-template";