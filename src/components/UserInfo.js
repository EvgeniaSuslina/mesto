

export default class UserInfo{
    constructor({userSelector, descriptionSelector}){
        this._user  = document.querySelector(userSelector)
        this._description = document.querySelector(descriptionSelector);
    }

    getUserInfo(){
        return {
        name: this._user.textContent,
        job:  this._description.textContent,
        }        
    }

    setUserInfo = ({name, job}) => {
        this._user.textContent = name;
        this._description.textContent = job;
    }
};