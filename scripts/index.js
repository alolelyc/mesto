const profileInfo = document.querySelector('.profile__info');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupProfileEdit = document.querySelector('.popup_profile-edit'); //попап редактирования профиля
const popupOpenButtonElement = document.querySelector('.profile__edit-icon');// кнопка открытия редактирования попапа
const popupCloseButtonElement = popupProfileEdit.querySelector('.popup__close'); // кнопка закрытия попапа редакирования
const popupForm = document.querySelector('.popup__profile'); //форма редактирования профиля
const inputNameProfile = document.querySelector('.popup__input_type_name'); // поле введения имени
const inputJobProfile = document.querySelector('.popup__input_type_job'); //поле введения профессии

//1.кнопка открытия редактирования профиля
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const inputProfileClick = function() {
  inputNameProfile.value = nameProfile.textContent;
  inputJobProfile.value = jobProfile.textContent;
 
}
const openPopupProfileEdit = function () {
openPopup(popupProfileEdit);
inputProfileClick();
}

// сохранение  полей формы имени и профессии
const editProfileInfo = function () {
  nameProfile.textContent = inputNameProfile.value;
  jobProfile.textContent = inputJobProfile.value;
}

//закрываем попап 
/*const closePopup = function () {
  popupProfileEdit.classList.remove('popup_opened'); 
  popupCardAdd.classList.remove('popup_opened'); 
  popupFoto.classList.remove('popup_opened');
}*/
const closePopup = function (popup__close) {
  popup__close.classList.remove('popup_opened'); 
 }

const closePopupProfileEdit = function () {
closePopup(popupProfileEdit);
}


// закрытие попапа за его  пределами
const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) { return; }
    else { closePopup(popupProfileEdit); }
    
}

//кнопка Сохранить редактирование и закрыть
const savePopupInfo = function (evt) {
  evt.preventDefault();
  editProfileInfo();
  closePopup(); 
}

//вешаем обработчики
popupForm.addEventListener('submit', savePopupInfo);
popupOpenButtonElement.addEventListener('click', function () {
   openPopup(popupProfileEdit)
  }); 
/*popupCloseButtonElement.addEventListener('click', closePopup);*/
popupCloseButtonElement.addEventListener('click', function() {
  closePopup(popupProfileEdit);
  });
popupProfileEdit.addEventListener('click', closePopupByClickOnOverlay);


const cards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardElement = document.querySelector('.card');
const imageCard = document.querySelector('.card__image');
const titleCard = document.querySelector('.card__title');
const popupCardAdd = document.querySelector('.popup_card-add'); //попап добавления карточки 
const popupOpenButtonCardAdd = document.querySelector('.profile__button-add-icon');//кнопка открытие попапа добавления
const popupCloseButtonCardAdd = popupCardAdd.querySelector('.popup__close');// закрытие попапа добавления
const popupFormAdd = document.querySelector('.popup_profile'); //форма добавления карточки
const inputCardName = document.querySelector('.popup__input_type_add');//поле для введения названия карточки
const inputCardLink= document.querySelector('.popup__input_type_link'); //форма введения ссылки на карточку
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content.querySelector('.card');// получаем шаблон карточки
const popupFoto = document.querySelector('.popup_open-foto'); //попап большого фото
const popupCloseFoto = popupFoto.querySelector('.popup__close'); //кнопка закрытия
const fotoTitle = document.querySelector('.popup__foto-title'); 
const fotoImage = document.querySelector('.popup__foto-image');



const inputCardClick = function () {
  inputCardName.value ='';
  inputCardLink.value ='';
  }
  
const openPopupCard = function () {
openPopup(popupCardAdd);
inputCardClick();
}


const closePopupCardAdd = function () {
  closePopup(popupCardAdd);
  }

//генерируем новую карточку
const generateCard = (dataCard) => {
  const newCard = cardsTemplate.cloneNode(true);//новая карточка
  const titleCard = newCard.querySelector('.card__title');
  titleCard.textContent = dataCard.title;

  const likeCard = newCard.querySelector('.card__like-button');
  const likeCardActive = function () {
  likeCard.classList.toggle('card__like-button_active');
  }
  const imageCard= newCard.querySelector('.card__image');
  imageCard.src = dataCard.link;
  
  const delCard = newCard.querySelector('.card__button-del')
  delCard.addEventListener('click', handleDeleteCard);
  likeCard.addEventListener('click', likeCardActive);
  
  const popupOpenFoto = newCard.querySelector('.card__image'); 
  const openPopupFoto = function () {
   fotoImage.src = dataCard.link;
   fotoImage.alt = dataCard.title;
   fotoTitle.textContent = dataCard.title;
   openPopup(popupFoto);
  }
   popupOpenFoto.addEventListener('click', openPopupFoto);
  
  return newCard;
}

const closePopupFoto = function () {
  closePopup(popupFoto);
  }
  popupCloseFoto.addEventListener('click', function() {
    closePopup(popupFoto);
  });

//добавление карточек
const renderCard = (dataCard) => {
  cardsContainer.prepend(generateCard(dataCard)); 
}
//удаление карточки
const handleDeleteCard = (event) => {
  event.target.closest('.card').remove ();

   };


// сохранение названия карточки и ссылки
const addCardInfo = function () {
  cardName.textContent = inputCardName.value;
  cardLink.src = inputCardLink.value;
}


//кнопка Создать и закрыть
const savePopupInfoCard = function (event) {
  event.preventDefault();
  renderCard({title: inputCardName.value, link: inputCardLink.value});
    closePopup(popupCardAdd); 
};


//вешаем обработчики
popupCardAdd.addEventListener('submit', savePopupInfoCard);
popupOpenButtonCardAdd.addEventListener('click', openPopupCard); 
/*popupCloseButtonCardAdd.addEventListener('click', closePopup);*/
popupCloseButtonCardAdd.addEventListener('click', function() {
  closePopup(popupCardAdd);
  });
popupCardAdd.addEventListener('click', closePopupByClickOnOverlay);


//перебор карточек массива 
cards.forEach((dataCard) => {
  renderCard(dataCard);
});

