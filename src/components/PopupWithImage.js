import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){

        super(popupSelector);
        this.elementFullText = document.querySelector(".popup__caption");
        this.elementFullPic = document.querySelector(".popup__image");
    }
 
    openBigImage({cardLink, cardName}){ 
        super.open();       
        this.elementFullText.textContent =  cardName;
        this.elementFullPic.src = cardLink;
        this.elementFullPic.alt = cardName;
      
    }    
}
