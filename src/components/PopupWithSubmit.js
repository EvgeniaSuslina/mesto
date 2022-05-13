import Popup from "../components/Popup.js";

export default class PopupWithSubmit extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = document.querySelector(".popup__submit_del")
        this.onlyCard = null;
    }

   
    setEventListeners(){
        super.setEventListeners()

        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit(this.onlyCard)
            super.close()
        });
    }
}