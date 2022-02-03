const profileOpenPopupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-icon')
const popupSaveButton = document.querySelector('.popup__submit')

const formElement = document.querySelector('.popup__container')
const nameInput = document.querySelector('.popup__user-name')
const jobInput = document.querySelector('.popup__user-info')
const profileUser = document.querySelector('.profile__user')
const profileDescription = document.querySelector('.profile__description')

function openPopup(){
    popup.classList.add ('popup_opened'); 
    nameInput.value = profileUser.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup(){
    popup.classList.remove ('popup_opened')
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();   
    profileUser.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;   
    closePopup();
}


formElement.addEventListener('submit', handleProfileFormSubmit)
profileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)


 

  