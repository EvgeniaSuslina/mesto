import './index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import {initialCards, config,} from '../utils/constants.js'


const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");

const profileOpenPopupButton = document.querySelector(".profile__edit-button");
const imageAddButton = document.querySelector(".profile__add-button");

const formElementEdit = document.querySelector(".popup__container_type_edit");
const formElementAdd = document.querySelector(".popup__container_type_add");
const nameInput = document.querySelector(".popup__input_type_username");
const jobInput = document.querySelector(".popup__input_type_userinfo");
const nameImg = document.querySelector(".popup__input_type_imagename")
const linkImg = document.querySelector(".popup__input_type_imagelink") 
const groupElements = ".group__elements";

//const nameInput = document.getElementsByName("username")
//const jobInput = document.getElementsByName("userinfo")
//const nameImg = document.getElementsByName("username")
//const linkImg = document.getElementsByName("userinfo")

//валидация форм
const validationElementEdit = new FormValidator(config, formElementEdit);
validationElementEdit.enableValidation()

const validationElementAdd = new FormValidator(config, formElementAdd);
validationElementAdd.enableValidation()



//экземпляр класса userInfo
const userInfo = new UserInfo({
  userSelector: ".profile__user",
  descriptionSelector: ".profile__description",
  });
  

//экземпляр класса PopupWithImage
const openFullImage = new PopupWithImage(popupImage);
openFullImage.setEventListeners()

const handleCArdClick = (name, link) => {
  openFullImage.open(name, link)
}

//экземпляр класса PopupWithForm - редактирование формы
const formEdit = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo({name:inputValues.username, job:inputValues.userinfo});
    formEdit.close();    
  }
  });

  formEdit.setEventListeners()

//заполнение полей input edit
profileOpenPopupButton.addEventListener("click", () =>{
  const userData = userInfo.getUserInfo()
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    validationElementEdit.resetValidation(); 
    formEdit.open()
});
  

//экземпляр класса PopupWithForm - добавление карточки
const formAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (inputValues) => { 
  section.addNewItem(inputValues[nameImg], inputValues[linkImg]);      
    formAdd.close();
  }
  
  });
  
  formAdd.setEventListeners()

//заполнение полей input add
imageAddButton.addEventListener("click", () =>{
  nameImg.value = ''
  linkImg.value = ''  
  validationElementAdd.resetValidation();   ;
  formAdd.open()
});

//генерация карточки
function generateCard (name, link){
  const card = new Card ({name, link}, ".template", handleCArdClick);
  return card.renderCard(); 
}

  //добавление карточки в разметку
const section = new Section({items: initialCards, renderer: generateCard}, groupElements); 
section.renderItems()

//добавление карточки в разметку


console.log(formEdit)
console.log(formAdd)
console.log(openFullImage)
console.log(groupElements)

 
