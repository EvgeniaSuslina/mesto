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

const popupSaveButton = document.querySelector(".popup__submit");
const formElementEdit = document.querySelector(".popup__container_type_edit");
const formElementAdd = document.querySelector(".popup__container_type_add");
const nameInput = document.querySelector(".popup__user-name");
const jobInput = document.querySelector(".popup__user-info");
const nameImg = document.querySelector(".popup__image-name")
const linkImg = document.querySelector(".popup__image-link") 
const profileUser = document.querySelector(".profile__user");
const profileDescription = document.querySelector(".profile__description");

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

//открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

profileOpenPopupButton.addEventListener("click", function () {
    nameInput.value = profileUser.textContent;
    jobInput.value = profileDescription.textContent;

    openPopup(popupEdit);
  });

imageAddButton.addEventListener("click", function () {
    openPopup(popupAdd);
  });



//закрытие popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
popupCloseButtonEdit.addEventListener("click", function () {
    closePopup(popupEdit);
  });
popupCloseButtonAdd.addEventListener("click", function () {
    closePopup(popupAdd);
  });
    popupCloseButtomImg.addEventListener("click", function(){
    closePopup(popupImage);
    })
 

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUser.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}


function handleAddFormSubmit(evt) {
  evt.preventDefault();  
  const image = renderCard(nameImg.value, linkImg.value);
  groupElements.prepend(image); 
  closePopup(popupAdd);
  formElementAdd.reset()
}

formElementEdit.addEventListener("submit", handleProfileFormSubmit);
formElementAdd.addEventListener("submit", handleAddFormSubmit);

//удаление

const handleDelete = (evt) => {
  evt.target.closest(".group__element").remove();
};

//лайк
const handleLike = (event) => {
  event.target.classList.toggle("group__element-like_liked");
}

//массив карточек
const template = document.querySelector(".template").content; //нахожу заготовку 

function renderCard(name, link) {
//создание карточки

  const newItem = template.querySelector(".group__element").cloneNode(true); //делаю копию 

  const elementImage = newItem.querySelector(".group__element-img");
  const elementText = newItem.querySelector(".group__element-text");
  const deleteButton = newItem.querySelector(".group__element-trash");
  const likeButton = newItem.querySelector(".group__element-like");
  const fullImage = newItem.querySelector(".group__element-img");

  console.log(likeButton)

  elementImage.src = link;
  elementImage.alt = name;
  elementText.textContent = name;
  
  deleteButton.addEventListener("click", handleDelete)
  likeButton.addEventListener("click", handleLike)

//открываю картинку на весь экран
  fullImage.addEventListener("click", () => {
      fullText.textContent = name;
      fullPic.src = link;
      fullPic.alt = name;
      openPopup(popupImage);
    })
  
  return newItem;
}

const groupElements = document.querySelector(".group__elements");
//добавление карточки в разметку
function addCard(image) {
  groupElements.append(image);
}
//добавление массива карточек
initialCards.forEach((item) => {
    const image = renderCard(item.name, item.link);

    // добавление карточки на страницу
    addCard(image);
  });
