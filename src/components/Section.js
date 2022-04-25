export default class Section{
    constructor({items, renderer}, containerSelector){
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems(){
    //добавление массива карточек
    this._initialArray.forEach(data => {
        const image = this._renderer(data.name, data.link)
        this.addItem(image);  
        });
    }
    //добавление карточки в разметку
    addItem(image){
        this._container.append(image);
    }

   addNewItem(image){
    this._container.prepend(image);
   }

}

