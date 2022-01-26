console.log ("Hello world!")

const ProfileOpenPopupButton = document.querySelector('.profile__edit-button')

const popup = document.querySelector('.popup')

const popupCloseButton = document.querySelector('.popup__close-icon')

const popupSaveButton = document.querySelector('.popup__submit')

function openPopup(){
    popup.classList.add ('popup__opened')
}

function closePopup(){
    popup.classList.remove ('popup__opened')
}

ProfileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)





  