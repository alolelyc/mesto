import "./index.css";
import { Card } from "../scripts/components/Card.js";
import {
  config,
  popupOpenProfileEdit,
  popupOpenButtonCardAdd,
  popupFormAdd,
  inputNameProfile,
  inputJobProfile,
  popupFormEdit,
  popupButtonAvatar,
  popupFormAvatar,
  templateSelector,
} from "../scripts/utils/data.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

//------------API-------------
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "8d43be2a-82a5-43e7-b68e-9400e1814337",
    "Content-Type": "application/json",
  },
});
let userId;
Promise.all([api.getProfileInfo(), api.getServerCards()])
  .then(([user, initialCards]) => {
    userId = user._id;
    userInfo.setUserInfo({ name: user.name, job: user.about });
    userInfo.setUserAvatar({ avatar: user.avatar });
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//--------------СОЗДАНИЕ КАРТОЧЕК--------------------------------
const openImagePopupHandler = (title, link) => {
  popupImage.open(title, link);
};

const renderCard = (item) => {
  const card = new Card({
    data: item,
    templateSelector: templateSelector,
    userId: userId,
    openImagePopupHandler,

    handleClickLikes: (cardId) => {
      api
        .clickLike(cardId)
        .then((data) => {
          card.knowLikesCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleLikesDel: (cardId) => {
      api
        .delClickLike(cardId)
        .then((data) => {
          card.knowLikesCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },

    handleDeleteCard: (cardId) => {
      popupDelCard.open();
      popupDelCard.setHendleSubmit(() => {
        popupDelCard.loading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupDelCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupDelCard.loading(false);
          });
      });
    },
  });

  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    /*items,*/
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

const popupDelCard = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete-card",
});
popupDelCard.setEventListeners();

//-------------------- ЗАГРУЗКА ПРОФИЛЯ И АВАТАРА  ----------------------------
//обработка  редактирование профиля (сохранить и закрыть)
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar-image",
});

const profileEditPopup = new PopupWithForm("Сохранить", {
  // экземпляр попапа редактирования профиля
  popupSelector: ".popup_type_profile-edit",
  handleFormSubmit: (value) => {
    profileEditPopup.loading(true);
    api
      .setUserInfo({ name: value.name, job: value.job })
      .then((dataProfile) => {
        userInfo.setUserInfo({
          name: dataProfile.name,
          job: dataProfile.about,
        });
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        profileEditPopup.loading(false);
      });
  },
});
profileEditPopup.setEventListeners();

// обработчик кнопки редактирования пользователя
popupOpenProfileEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputNameProfile.value = userData.name;
  inputJobProfile.value = userData.job;
  profileEditPopup.open();
});

const popupEditAvatar = new PopupWithForm("Сохранить", {
  popupSelector: ".popup_type_open-avatar",
  handleFormSubmit: (avatar) => {
    popupEditAvatar.loading(true);
    api
      .setAvatarInfo({ avatar })
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.loading(false);
      });
  },
});

popupEditAvatar.setEventListeners();

popupButtonAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

//--------------------ДОБАВЛЕНИЕ КАРТОЧКИ-------------------------------------

const cardAddPopup = new PopupWithForm(
  "Создать", //экземпляр попапа добавления карточки
  {
    popupSelector: ".popup_type_card-add",
    handleFormSubmit: (formValues) => {
      cardAddPopup.loading(true);
      api
        .renderCard(formValues)
        .then((formValues) => {
          cardList.addItem(renderCard(formValues));
          cardAddPopup.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          cardAddPopup.loading(false);
        });
    },
  }
);
cardAddPopup.setEventListeners();

// обработчик кнопки добавления карточки
popupOpenButtonCardAdd.addEventListener("click", () => {
  cardAddPopup.open();
});

//----------------------------ОТКРЫТИЕ КАРТИНКИ-------------------------------

const popupImage = new PopupWithImage({
  popupSelector: ".popup_type_open-foto",
});
popupImage.setEventListeners();

//-----------ВАЛИДАЦИЯ-----------------------

const validPopupFormAdd = new FormValidator(config, popupFormAdd);
validPopupFormAdd.enableValidation();

const validPopupFormEdit = new FormValidator(config, popupFormEdit);
validPopupFormEdit.enableValidation();

const validFormEditAvatar = new FormValidator(config, popupFormAvatar);
validFormEditAvatar.enableValidation();
