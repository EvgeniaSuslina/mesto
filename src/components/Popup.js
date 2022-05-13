export default class Popup{
 constructor(popupSelector){
   this._popupSelector = popupSelector;
   this._handleEscClose = this._handleEscClose.bind(this)
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

 _handleOverlayClose = (event) =>{
   if (event.target === this._popupSelector){
    this.close()
   }
 }

 setEventListeners(){
   const closeButton = this._popupSelector.querySelector(".popup__close");
   closeButton.addEventListener('click', () =>{
    this.close()
   })

   this._popupSelector.addEventListener('mousedown', (event) => {
    this._handleOverlayClose(event)
   });
  }
}
