import { Card } from "./Card.js";
import { cards, config } from "./data.js";
import { FormValidator } from "./FormValidator.js";

// попап редактирования профиля
const profileInfo = document.querySelector(".profile__info");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const popupProfileEdit = document.querySelector(".popup_type_profile-edit"); //попап редактирования профиля
const popupCloseProfileEdit = popupProfileEdit.querySelector(".popup__close"); // кнопка закрытия попапа редакирования
const popupFormEdit = popupProfileEdit.querySelector(".popup__form"); //форма редактирования профиля
const inputNameProfile = document.querySelector(".popup__input_type_name"); // поле введения имени
const inputJobProfile = document.querySelector(".popup__input_type_job"); //поле введения профессии
const popupOpenProfileEdit = document.querySelector(".profile__edit-icon"); // кнопка открытия редактирования попапа

//попап добавления карточки
const popupOpenButtonCardAdd = document.querySelector(".profile__button-add-icon"); //кнопка открытие попапа добавления
const popupCardAdd = document.querySelector(".popup_type_card-add"); //попап добавления карточки
const popupFormAdd = popupCardAdd.querySelector(".popup__form");
const inputCardName = document.querySelector(".popup__input_type_add"); //поле для введения названия карточки
const inputCardLink = document.querySelector(".popup__input_type_link"); //поле для введения ссылки на карточку
const popupCloseButtonCardAdd = popupCardAdd.querySelector(".popup__close"); // закрытие попапа добавления

//попап большого фото
const popupFoto = document.querySelector(".popup_type_open-foto"); //попап большого фото
const popupCloseFoto = popupFoto.querySelector(".popup__close"); //кнопка закрытия
const popupFotoTitle = popupFoto.querySelector(".popup__foto-title");
const popupFotoImage = popupFoto.querySelector(".popup__foto-image");
const cardsContainer = document.querySelector(".elements");
const openPopupFoto = (title, link) => {
  popupFotoImage.src = link;
  popupFotoImage.alt = title;
  popupFotoTitle.textContent = title;

  openPopup(popupFoto);
};

const renderCard = (item, cardElement) => {
  const card = new Card(item, "#cards-template", openPopupFoto);
  const templateElement = card.generateCard();
  cardElement.prepend(templateElement);
};

cards.forEach(function (item) {
  renderCard(item, cardsContainer);
});

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupByEscKey);
};

// сохранение  полей формы имени и профессии

const editProfileInfo = function () {
  nameProfile.textContent = inputNameProfile.value;
  jobProfile.textContent = inputJobProfile.value;
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscKey);
};

const closePopupProfileEdit = function () {
  closePopup(popupProfileEdit);
};

// закрытие попапа за его  пределами

const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

const closePopupByEscKey = function (e) {
  // закрытие попап нажатием на Esc
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
};

//кнопка Сохранить редактирование профиля и закрыть

const savePopupInfo = function (event) {
  event.preventDefault();
  editProfileInfo();
  closePopup(popupProfileEdit);
};

const openPopupCard = function () {
  openPopup(popupCardAdd);
  popupFormAdd.reset();
};

const closePopupCardAdd = function () {
  closePopup(popupCardAdd);
};

const closePopupFoto = function () {
  closePopup(popupFoto);
};

popupCloseFoto.addEventListener("click", function () {
  closePopup(popupFoto);
});

//кнопка создания закрытия добавления фото

const savePopupInfoCard = function (event) {
  event.preventDefault();
  const formFotoAdd = {
    title: inputCardName.value,
    link: inputCardLink.value,
  };

  renderCard(formFotoAdd, cardsContainer);

  closePopup(popupCardAdd);
};

//вешаем обработчики

popupFormAdd.addEventListener("submit", savePopupInfoCard);
popupOpenButtonCardAdd.addEventListener("click", openPopupCard);
popupCloseButtonCardAdd.addEventListener("click", function () {
  closePopup(popupCardAdd);
});
popupCardAdd.addEventListener("click", closePopupByClickOnOverlay);
popupFoto.addEventListener("click", closePopupByClickOnOverlay);
popupFormEdit.addEventListener("submit", savePopupInfo);

popupOpenProfileEdit.addEventListener("click", function () {
  openPopup(popupProfileEdit);
  inputNameProfile.value = nameProfile.textContent;
  inputJobProfile.value = jobProfile.textContent;
});

popupCloseProfileEdit.addEventListener("click", function () {
  closePopup(popupProfileEdit);
});

popupProfileEdit.addEventListener("click", closePopupByClickOnOverlay);

const validPopupFormAdd = new FormValidator(config, popupFormAdd);
validPopupFormAdd.enableValidation();

const validPopupFormEdit = new FormValidator(config, popupFormEdit);
validPopupFormEdit.enableValidation();
