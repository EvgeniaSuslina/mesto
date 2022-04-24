import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector(".popup__container");
        this._inputList= this._form.querySelectorAll(".popup__input");
        this._inputValues = {}
        
    }
    

    _getInputValues(){      
        
        this._inputList.forEach(input =>{
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues
    }

    setEventListeners(){
        super.setEventListeners()

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleFormSubmit(this._getInputValues())
            

        });
    }
    close(){
        this._form.reset()
        super.close()
    }  
}