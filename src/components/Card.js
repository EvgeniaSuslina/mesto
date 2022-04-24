class Card {
    constructor(data, cardSelector, handleCArdClick) {
    this._data = data;      
    this._cardSelector = cardSelector;
    this._handleCArdClick = handleCArdClick
    }

    /* handleCardClick*/

    //получаем темплейт
    _getTemplate(){
        const cardElement = document
        .querySelector(this._cardSelector)
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
        this._handleCArdClick (this._data.name, this._data.link);
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

    
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._elementText.textContent = this._data.name;

    this._setEventlisteners()

    return this._element
    }

    
}

export { Card }