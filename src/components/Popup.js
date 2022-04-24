
export default class Popup{
 constructor(popupSelector){
   this._popupSelector = popupSelector;  
 }

//открытие popup
 open(){
   this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); 
 }

//закрытие popup
 close(){
   this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown",  this._handleEscClose)
 }

 //функция закрытия popup по нажатию на esc
 _handleEscClose = (event) => {
    if (event.key === "Escape"){
        this.close()
      }
 }

 setEventListeners(){
   this._popupSelector.addEventListener('mousedown', (evt) =>{
      if (evt.target.classList.contains('popup_opened')) {
         this.close()
     }
     if (evt.target.classList.contains('popup__close')) {
         this.close()
     };
   });
   }
}