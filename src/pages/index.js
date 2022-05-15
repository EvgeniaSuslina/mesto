import './index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { config } from '../utils/constants.js'


const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupAva = document.querySelector(".popup_type_ava");
const popupDel = document.querySelector(".popup_type_del");
const popupImage = document.querySelector(".popup_type_image");
const popupSubmitButton = document.querySelector(".popup__submit")
const profileOpenPopupButton = document.querySelector(".profile__edit-button");
const imageAddButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__ava-change")
const formElementEdit = document.querySelector(".popup__container_type_edit");
const formElementAdd = document.querySelector(".popup__container_type_add");
const formElementAva = document.querySelector(".popup__container_type_ava")
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_userinfo");
const nameImg = document.querySelector(".popup__input_type_imagename")
const linkImg = document.querySelector(".popup__input_type_imagelink") 
const groupElements = ".group__elements";
let userData = '';



//экземпляр класса userInfo
const userInfo = new UserInfo({
  userSelector: ".profile__user",
  descriptionSelector: ".profile__description",
  avaSelector: ".profile__avatar"
  });

//экземпляр класса Section
const section = new Section({renderer: (item) => {
  const cardItem =  generateCard(item, userData); 
  section.addItem(cardItem) 
}  
}, 
groupElements)

  

//создание класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '9484ac81-4ff0-44be-950c-3006408ead7d',
    'Content-type': 'application/json'
  }
});

//запрос данных user & cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([{name, about, avatar, _id}, cardsInfo]) => {
  userData = {
    userName: name, 
    userJob: about, 
    userAvatar: avatar, 
    userId: _id
  }
  userInfo.setUserInfo(userData);
  section.renderItems(cardsInfo, userData)

console.log({name, about, avatar, _id})
console.log(cardsInfo)

})
.catch((err) => {
  showErrorApi(err);
});


//валидация форм
const validationElementEdit = new FormValidator(config, formElementEdit);
validationElementEdit.enableValidation()

const validationElementAdd = new FormValidator(config, formElementAdd);
validationElementAdd.enableValidation()

const validationElementAva = new FormValidator(config, formElementAva);
validationElementAva.enableValidation()


//экземпляр класса PopupWithImage
const openFullImage = new PopupWithImage(popupImage);
openFullImage.setEventListeners();



//экземпляр класса PopupWithForm - редактирование формы
const formEdit = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: handleProfileEditInfo});
  formEdit.setEventListeners()

  //экземпляр класса PopupWithForm - добавление карточки
const formAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: handlerAddNewCardIntoServer});
  formAdd.setEventListeners()

const formAvatar = new PopupWithForm({
  popupSelector: popupAva, 
  handleFormSubmit: handlerProfileEditAva});
  formAvatar.setEventListeners()

const popupDelete = new PopupWithSubmit({
  popupSelector: popupDel,
  handleFormSubmit: handleSubmitDeleteButton});
  popupDelete.setEventListeners()

//сохранение отредактированных данных на сервере
function handleCardClick({cardLink: cardLink, cardName: cardName}) {
  openFullImage.openBigImage({
    cardLink: cardLink,
    cardName: cardName
  });
}

//сохранение отредактированных данных на сервере
function handleProfileEditInfo (inputValues) {

  loading(true, popupEdit);
  api.editUserInfo(inputValues['username'], inputValues['userinfo']) 
  .then(({name, about, avatar, _id}) => {
    userData = {
      userName: name, 
      userJob: about, 
      userAvatar: avatar, 
      userId: _id
    }
    userInfo.setUserInfo({
      userName: userData.userName, 
      userJob: userData.userJob,
      userAvatar: userData.userAvatar  
    });
    formEdit.close()    
  })
  .catch((err) => {
    showErrorApi(err)
  })
  .finally(() =>{
    loading(false, popupEdit);
  });  
}

//добавление новой карточки на сервер
function handlerAddNewCardIntoServer (inputValues){

  loading(true, popupAdd);
  api.setNewCard(inputValues.imagename, inputValues.imagelink)
  .then((cardsInfo)=> {    
    const newCard = generateCard(cardsInfo, userData);
    section.addNewItem(newCard)
    formAdd.close();
  })
  .catch((err) => {
    console.log(err)
})
.finally(() =>{
  loading(false, popupAdd);
});  

}
 
//сохранение отредактированного аватара на сервер
function handlerProfileEditAva(inputValues){

  loading(true, popupAva);
  api.editUserAvatar(inputValues['avalink'])
  .then(({name, about, avatar, _id}) => {
    userData = {
      userName: name, 
      userJob: about, 
      userAvatar: avatar, 
      userId: _id
    } 

    userInfo.setUserInfo({
      userName: userData.userName, 
      userJob: userData.userJob,
      userAvatar: userData.userAvatar 
    });
    formAvatar.close();
})
.catch((err) => {
  showErrorApi(err)
})
.finally(() =>{
  loading(false, popupAva);
});
} 

//клик на корзину
function handleDeleteButtonFunction(){
  popupDelete.open();
  popupDelete.onlyCard= this;
}

//подтверждение действия по удалению карточки
function handleSubmitDeleteButton(card) {
  api.deleteCard(card.cardId)
    .then(() => {
      card.handleDelete();      
    })
    .catch((err) => {
      showErrorApi(err);
    });
}

//функция обработки лайка на карточку
function handleSetLike(card, likeButton, cardId){
  if(!likeButton.classList.contains('group__element-like_liked')){
    api.addLike(cardId)
    .then(({likes}) => {
      counterLikes(card, likes)
    })
    .catch((err) => {
      showErrorApi(err)
    }); 
  } else {
    api.removeLike(cardId)
    .then(({likes}) => {
      counterLikes(card, likes)
  })
  .catch((err) => {
    showErrorApi(err)
  }); 
 }
}

function counterLikes(card, likes) {
  card.handleSetLike();
  card.handleLikesCounter(likes.length)
}

//генерация карточки
function generateCard (cardsInfo, userData){
  const card = new Card (cardsInfo, userData, ".template", () =>{
    handleCardClick({
      cardLink: cardsInfo.link,
      cardName: cardsInfo.name
    });  
  }, handleDeleteButtonFunction, handleSetLike,);

  const cardElement =  card.renderCard(); 
  return cardElement;

}


function showErrorApi(err){
  console.log('Произошла ошибка!', err)
}

function loading(isLoading, popup){
if (isLoading){
  popup.querySelector(".popup__submit").textContent = "Сохранение...";
} else {
  if (popup.classList.contains("popup_type_add")) {
    popup.querySelector(".popup__submit").textContent = "Создать";
  } else{
    popup.querySelector(".popup__submit").textContent = "Сохранить";
  }
}
}

function getUserInfoFromInputs(){
  const userData = userInfo.getUserInfo()
    nameInput.value = userData.name;
    jobInput.value = userData.job;
}

//обработчик клика на форму редактирования профиля
profileOpenPopupButton.addEventListener("click", () =>{
  getUserInfoFromInputs()
  validationElementEdit.resetValidation(); 
  formEdit.open()    
});

//обработчик клика на форму добавления карточки
imageAddButton.addEventListener("click", () =>{  
  validationElementAdd.resetValidation();   ;
  formAdd.open() 
});

//обработчик клика на форму изменения аватара
avatarEditButton.addEventListener('click', ()=>{
  formAvatar.open()
  validationElementAva.resetValidation();
})
