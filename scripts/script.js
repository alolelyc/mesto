const profileInfo = document.querySelector('.profile__info');
const popupElement = document.querySelector('.popup');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupOpenButtonElement = profileInfo.querySelector('.profile__edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__profile');
const inputNameProfile = document.querySelector('.popup__input_name');
const inputJobProfile = document.querySelector('.popup__input_job');

const openPopup = function () {
    popupElement.classList.add('popup_opened')
    inputNameProfile.value = nameProfile.textContent;
    inputJobProfile.value = jobProfile.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function (event) {
   if (event.target !== event.currentTarget) { return; }
    else { closePopup(); }
   }

const editProfileInfo = function () {
    nameProfile.textContent = inputNameProfile.value;
    jobProfile.textContent = inputJobProfile.value;
}

const savePopupInfo = function (evt) {
    evt.preventDefault();
    editProfileInfo();
    closePopup();
}

popupForm.addEventListener('submit', savePopupInfo);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);