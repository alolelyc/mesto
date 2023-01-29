import './index.css';
import { Card } from "../scripts/components/Card.js";
import {
  config,
  popupOpenProfileEdit,
  popupOpenButtonCardAdd,
  popupFormAdd,
  inputNameProfile,
  inputJobProfile,
  popupFormEdit,
  templateSelector,
} from "../scripts/utils/data.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { cards } from "../scripts/utils/data.js";

const popupFoto = (title, link) => {
  popupImage.open(title, link);
};

const renderCard = (item) => {
  const card = new Card(
    {
      title: item.title,
      link: item.link,
    },
    templateSelector,
    popupFoto
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

cardList.renderItems();

const popupImage = new PopupWithImage({
  popupSelector: ".popup_type_open-foto",
});
popupImage.setEventListeners();

//обработка  редактирование профиля (сохранить и закрыть)
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

const handleFormSubmitProfileEdit = (formValues) => {
  userInfo.setUserInfo(formValues.name, formValues.job);
  profileEditPopup.close();
};

const profileEditPopup = new PopupWithForm(
  { popupSelector: ".popup_type_profile-edit" },
  handleFormSubmitProfileEdit
); // экземпляр попапа редактирования профиля
profileEditPopup.setEventListeners();

// обработчик кнопки редактирования пользователя
popupOpenProfileEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputNameProfile.value = userData.name;
  inputJobProfile.value = userData.job;
  profileEditPopup.open();
});

//обработка формы добавления картинки
const handleFormSubmitCardAdd = (formValues) => {
  const { title, url } = formValues;
  const cardElement = renderCard({ name: title, link: url });
  cardList.addItem(cardElement);
  cardAddPopup.close(); // закрываем попап
};

const cardAddPopup = new PopupWithForm(
  { popupSelector: ".popup_type_card-add" },
  handleFormSubmitCardAdd
); //экземпляр попапа добавления карточки
cardAddPopup.setEventListeners();

const validPopupFormAdd = new FormValidator(config, popupFormAdd);
validPopupFormAdd.enableValidation();

const validPopupFormEdit = new FormValidator(config, popupFormEdit);
validPopupFormEdit.enableValidation();

// обработчик кнопки добавления карточки
popupOpenButtonCardAdd.addEventListener("click", () => {
  cardAddPopup.open();
});
