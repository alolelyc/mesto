const profileInfo = document.querySelector(".profile__info");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const popupProfileEdit = document.querySelector(".popup_type_profile-edit"); //попап редактирования профиля
const popupOpenProfileEdit = document.querySelector(".profile__edit-icon"); // кнопка открытия редактирования попапа
const popupCloseProfileEdit = popupProfileEdit.querySelector(".popup__close"); // кнопка закрытия попапа редакирования
const popupFormEdit = popupProfileEdit.querySelector(".popup__form"); //форма редактирования профиля
const inputNameProfile = document.querySelector(".popup__input_type_name"); // поле введения имени
const inputJobProfile = document.querySelector(".popup__input_type_job"); //поле введения профессии

const popupCardAdd = document.querySelector(".popup_type_card-add"); //попап добавления карточки
const popupOpenButtonCardAdd = document.querySelector(
  ".profile__button-add-icon"
); //кнопка открытие попапа добавления
const popupCloseButtonCardAdd = popupCardAdd.querySelector(".popup__close"); // закрытие попапа добавления
const popupFormAdd = popupCardAdd.querySelector(".popup__form");
const inputCardName = document.querySelector(".popup__input_type_add"); //поле для введения названия карточки
const inputCardLink = document.querySelector(".popup__input_type_link"); //форма введения ссылки на карточку
const cardsContainer = document.querySelector(".elements");
const cardsTemplate = document
  .querySelector("#cards-template")
  .content.querySelector(".card"); // получаем шаблон карточки
const popupFoto = document.querySelector(".popup_type_open-foto"); //попап большого фото
const popupCloseFoto = popupFoto.querySelector(".popup__close"); //кнопка закрытия
const fotoTitle = document.querySelector(".popup__foto-title");
const fotoImage = document.querySelector(".popup__foto-image");

//1.кнопка открытия редактирования профиля
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", escClosePopupByKey);
};

// сохранение  полей формы имени и профессии
const editProfileInfo = function () {
  nameProfile.textContent = inputNameProfile.value;
  jobProfile.textContent = inputJobProfile.value;
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClosePopupByKey);
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

const escClosePopupByKey = function (e) {
  // закрытие попап нажатием на Esc
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
};

//кнопка Сохранить редактирование и закрыть
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

//генерируем новую карточку
const generateCard = (dataCard) => {
  const newCard = cardsTemplate.cloneNode(true); //новая карточка
  const titleCard = newCard.querySelector(".card__title");
  titleCard.textContent = dataCard.title;

  const likeCard = newCard.querySelector(".card__like-button");
  const likeCardActive = function () {
    likeCard.classList.toggle("card__like-button_active");
  };
  const imageCard = newCard.querySelector(".card__image");
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.alt;

  const delCard = newCard.querySelector(".card__button-del");
  delCard.addEventListener("click", handleDeleteCard);
  likeCard.addEventListener("click", likeCardActive);

  const openPopupFoto = function () {
    fotoImage.src = dataCard.link;
    fotoImage.alt = dataCard.title;
    fotoTitle.textContent = dataCard.title;
    openPopup(popupFoto);
  };

  imageCard.addEventListener("click", openPopupFoto);

  return newCard;
};

const closePopupFoto = function () {
  closePopup(popupFoto);
};
popupCloseFoto.addEventListener("click", function () {
  closePopup(popupFoto);
});

//добавление карточек
const renderCard = (dataCard) => {
  cardsContainer.prepend(generateCard(dataCard));
};
//удаление карточки
const handleDeleteCard = (event) => {
  event.target.closest(".card").remove();
};

//кнопка Создать и закрыть
const savePopupInfoCard = function (event) {
  event.preventDefault();
  renderCard({ title: inputCardName.value, link: inputCardLink.value });
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

//перебор карточек массива
cards.forEach((dataCard) => {
  renderCard(dataCard);
});
