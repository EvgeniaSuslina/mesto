class FormValidator{
    constructor(config, formElement){
        this._formElement = formElement;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
    } 

    _getform(){
        return document.querySelector(this._formSelector);
    }    
   

    _showError(inputElement, errorMessage){
        const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);   
    
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage; 
    }

    _hideError(inputElement){
        const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);

        inputElement.classList.remove(this._inputErrorClass);   
        errorElement.textContent = '';

    }
    
    _checkValidity = (inputElement) => {    
        const isInputNotValid = !inputElement.validity.valid;
    
        if(isInputNotValid) {
            const errorMessage = inputElement.validationMessage;
            this._showError(inputElement, errorMessage)
        } else {
            this._hideError(inputElement)
        }
    };   

    _disableButton(){
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
        this._submitButtonElement.setAttribute('disabled', '');
    }   

    _enableButton(){
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
        this._submitButtonElement.removeAttribute('disabled');
    }

    _toggleButtonState() {
        this._inputElements = Array.from(this._inputList);   
        const hasInvalidInput = this._inputElements.every((inputElement) => {
    
            return inputElement.validity.valid; 
        });
    
        if (!hasInvalidInput) {
            this._disableButton()
        } else {
            this._enableButton()
        }
    };   

    _setEventListeners(){
        //this._formElement.addEventListener('submit', (event) =>{
            //event.preventDefault();
        //});

        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);   
        
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._inputElements = Array.from(this._inputList); 

        this._toggleButtonState()

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () =>{      
            this._checkValidity( inputElement);

            this._toggleButtonState();
            });
        });
    }
    
    enableValidation() {     
        
        this._form = this._getform()
        this._setEventListeners();
    }  
    
    resetValidation() {
        this._toggleButtonState(); 
  
        this._inputList.forEach((inputElement) => {
        this._hideError(inputElement) 
        });     
    }    
}

export { FormValidator }
