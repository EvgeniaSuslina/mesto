import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){

        super(popupSelector);
        this.elementFullText = document.querySelector(".popup__caption");
        this.elementFullPic = document.querySelector(".popup__image");
    }
 
    open(name, link){
        super.open();
        this.elementFullText.textContent =  name;
        this.elementFullPic.src = link;
        this.elementFullPic.alt = name;
      
    }    
}