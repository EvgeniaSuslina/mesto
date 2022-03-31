import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/FormValidator.js'

const popups = document.querySelectorAll('.popup')
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");

const fullText = document.querySelector(".popup__caption");
const fullPic = document.querySelector(".popup__image");
const profileOpenPopupButton = document.querySelector(".profile__edit-button");
const imageAddButton = document.querySelector(".profile__add-button");
const popupCloseButtonEdit = document.querySelector(".popup__close_type_edit");
const popupCloseButtonAdd = document.querySelector(".popup__close_type_add");
const popupCloseButtomImg = document.querySelector(".popup__close_type_image");

const popupSaveButton = document.querySelector(".popup__submit_add");
const popupSaveBtnEdit = document.querySelector(".popup__submit_edit")
const formElementEdit = document.querySelector(".popup__container_type_edit");
const formElementAdd = document.querySelector(".popup__container_type_add");
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_userinfo");
const nameImg = document.querySelector(".popup__input_type_imagename")
const linkImg = document.querySelector(".popup__input_type_imagelink") 
const profileUser = document.querySelector(".profile__user");
const profileDescription = document.querySelector(".profile__description");
const groupElements = document.querySelector(".group__elements");

//массив карточек
const initialCards = [
  {
    name: "Барселона, Испания",
    link: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Париж, Франция",
    link: "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Амстердам, Нидерланды",
    link: "https://images.unsplash.com/photo-1603145766673-e53569466b7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    name: "Рим, Италия",
    link: "https://images.unsplash.com/photo-1621095424109-10bb944d1798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Брюссель, Бельгия",
    link: "https://images.unsplash.com/photo-1563738191-ff3efe7d2646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    name: "Тбилиси, Грузия",
    link: "https://images.unsplash.com/photo-1621868811134-2548d9e7f147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];

//конфигурация для валидации
const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  
};

//валидация форм
const validationElementEdit = new FormValidator(config, formElementEdit);
validationElementEdit.enableValidation()

const validationElementAdd = new FormValidator(config, formElementAdd);
validationElementAdd.enableValidation()


//открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleFormSubmitEsc); 

}

//заполнение полей input edit
function handleInputEdit () {
  nameInput.value = profileUser.textContent;
  jobInput.value = profileDescription.textContent;
  validationElementEdit.resetValidation();
  openPopup(popupEdit);
}

//заполнение полей input add
function handleInputAdd (){
  nameImg.value = ''
  linkImg.value = ''  
  validationElementAdd.resetValidation();
    openPopup(popupAdd);
}

profileOpenPopupButton.addEventListener("click", handleInputEdit);
imageAddButton.addEventListener("click", handleInputAdd);


//закрытие popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleFormSubmitEsc)
}

//объединение обработчиков оверлея и крестиков
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        };
    });
});

//функция закрытия popup по нажатию на esc
function handleFormSubmitEsc(event) {
  if (event.key === "Escape"){
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUser.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;  
  closePopup(popupEdit);
}


function handleAddFormSubmit(evt) {
  evt.preventDefault();  
  const image = generateCard(nameImg.value, linkImg.value);
  groupElements.prepend(image);
  evt.target.reset();  
  closePopup(popupAdd);
 
}

formElementEdit.addEventListener("submit", handleProfileFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);


//открываю картинку на весь экран
export function openImagePopup(name, link){
  fullText.textContent = name;
    fullPic.src = link;
    fullPic.alt = name;
    openPopup(popupImage);
}


//генерация карточки
function generateCard(name, link){
  const card = new Card (name, link, ".template", openImagePopup);
  const cardElement = card.renderCard();
  return cardElement;
}


//добавление карточки в разметку
function addCard(image) {
  groupElements.append(image);
}

//добавление массива карточек
initialCards.forEach((item) => {
    const image = generateCard(item.name, item.link);

  // добавление карточки на страницу
    addCard(image);
  });


 