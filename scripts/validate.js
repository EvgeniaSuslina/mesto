const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    
  }; 

const showError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);   
    
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage; 
}


const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    inputElement.classList.remove(config.inputErrorClass);   
    errorElement.textContent = '';
}


const checkValidity = (formElement, inputElement, config) => {    
    const isInputNotValid = !inputElement.validity.valid;

    if(isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage, config)
    } else {
        hideError(formElement, inputElement, config)
    }
};


const toggleButtonState = (inputList, submitButtonElement, config) => {
    const inputElements = Array.from(inputList);    
    const hasInvalidInput = inputElements.every((inputElement) => {

        return inputElement.validity.valid; 
    });

    if (!hasInvalidInput) {
        submitButtonElement.classList.add(config.inactiveButtonClass);
        submitButtonElement.setAttribute('disabled', '');
    } else {
        submitButtonElement.classList.remove(config.inactiveButtonClass);
        submitButtonElement.removeAttribute('disabled');
    }
};


const setEventListeners = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector)

    toggleButtonState(inputList, submitButtonElement, config);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) =>{

        console.log(event.target.name, event.target.value);

        checkValidity(formElement, inputElement, config);
        toggleButtonState(inputList, submitButtonElement, config);
        });
    });    
};


const enableValidation = config => {

    const formList = document.querySelectorAll(config.formSelector);
    
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) =>{
            event.preventDefault();
        });

    setEventListeners(formElement, config);
    });
};
enableValidation(config)

