export default class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems(cardsInfo, userData){
    cardsInfo.reverse().forEach((card) => {
        this._renderer(card, userData);       
        });
    }   
    
    addItem(image){
    this._container.prepend(image);
   }

}

