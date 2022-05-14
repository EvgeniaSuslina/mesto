class Card {
    constructor(cardsInfo, userData, cardSelector, handleCardClickFunction, handleDeleteCard, handleLikeCard) {
    this._name = cardsInfo.name;
    this._link = cardsInfo.link;
    this._numberOflikes = cardsInfo.likes.length;
    this._likes = cardsInfo.likes;
    this.cardId = cardsInfo._id;    
    this._ownerId = cardsInfo.owner._id

    this._userId = userData.userId;
    this._cardSelector = cardSelector;

    this._elementImage = '';    
    this._deleteButton = '';
    this._likeButton = '';

    this._handleCardClickFunction = handleCardClickFunction;
    this._handleDeleteCard = handleDeleteCard;    
    this._handleLikeCard = handleLikeCard;
   
    }

    
       
    _getTemplate(){
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".group__element")
        .cloneNode(true);
              
        return cardElement;
    }

    
    handleDelete(){
        this._element.remove();
        this._element = null;
    }

    
    handleSetLike(){
        this._likeButton.classList.toggle("group__element-like_liked");
    }      
   

    _checkIfCardWasLiked() {
        this._likes.forEach((like) => {
            if (like._id === this._userId){
                this.handleSetLike();
            }
        });
    }
        
    handleLikesCounter(counter){
        this._element.querySelector(".group__like-counter").textContent = counter;
    }


    _hideDeleteButton(){
        if(this._ownerId!== this._userId){
            this._deleteButton.classList.add("group__element-trash-hide")
        }
    }

    
    _setEventlisteners(){
    this._deleteButton.addEventListener('click', () => {
        this._handleDeleteCard()
        });
      
        
    this._likeButton.addEventListener('click', () => {
        this._handleLikeCard(this, this._likeButton, this.cardId);
        });  
        
    this._elementImage.addEventListener('click', () =>{
        this._handleCardClickFunction(this._elementImage.alt, this._elementImage.src);
        });
   
    }

    
    renderCard(){
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector(".group__element-img");
    this._elementText = this._element.querySelector(".group__element-text");
    this._deleteButton = this._element.querySelector(".group__element-trash");
    this._likeButton = this._element.querySelector(".group__element-like");
    this._fullImage = this._element.querySelector(".group__element-img");
    this._elementCounter = this._element.querySelector(".group__like-counter")

    this._setEventlisteners()
    
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementText.textContent = this._name;
    

    this.handleLikesCounter(this._numberOflikes);
    this._checkIfCardWasLiked();
    this._hideDeleteButton();
      

    return this._element
    }    
}

export { Card }