let ProfileOpenPopupButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close-icon')
let popupSaveButton = document.querySelector('.popup__submit')

let formElement = document.querySelector('.popup__container')
let nameInput = document.querySelector('.popup__user-name')
let jobInput = document.querySelector('.popup__user-info')
let ProfileUser = document.querySelector('.profile__user')
let ProfileDescription = document.querySelector('.profile__description')

function openPopup(){
    popup.classList.add ('popup__opened'); 
    nameInput.value = ProfileUser.textContent;
    jobInput.value = ProfileDescription.textContent;
}

function closePopup(){
    popup.classList.remove ('popup__opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();   
    ProfileUser.textContent = nameInput.value;
    ProfileDescription.textContent = jobInput.value;   
    closePopup();
}


formElement.addEventListener('submit', formSubmitHandler)
ProfileOpenPopupButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)


 

  