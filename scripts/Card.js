class Card {
    constructor(name, link, templateSelector, openImagePopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup
    }

    //работаем с темплейтом
    _getTemplate(){
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector(".group__element")
        .cloneNode(true);
              
        return cardElement;
    }

    //удаление
    _handleDelete(){
        this._element.closest(".group__element").remove();
    }

    //лайк
    _handleLike(){
        this._likeButton.classList.toggle("group__element-like_liked");
    }

    //вешаем обработчики
    _setEventlisteners(){
    this._deleteButton.addEventListener('click', () => {
        this._handleDelete()
        });
        
        
    this._likeButton.addEventListener('click', () => {
        this._handleLike()
        });  
        
    this._elementImage.addEventListener('click', () =>{
        this._openImagePopup(this._name, this._link);
        });
    }

    //создание карточки
    renderCard(){
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector(".group__element-img");
    this._elementText = this._element.querySelector(".group__element-text");
    this._deleteButton = this._element.querySelector(".group__element-trash");
    this._likeButton = this._element.querySelector(".group__element-like");
    this._fullImage = this._element.querySelector(".group__element-img");

    
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementText.textContent = this._name;

    this._setEventlisteners()

    return this._element
    }
}

export { Card }