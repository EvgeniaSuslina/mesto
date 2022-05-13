export default class UserInfo{
    constructor({userSelector, descriptionSelector, avaSelector}){
        this._user  = document.querySelector(userSelector)
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avaSelector)
        this._userInfo = {}
    }

    getUserInfo(){
        this._userInfo.name = this._user.textContent;
        this._userInfo.job = this._description.textContent;               
        return this._userInfo;      
    }

    setUserInfo = ({userName, userJob, userAvatar}) => {
        this._user.textContent = userName;
        this._description.textContent = userJob;
        this._avatar.src = userAvatar;
        this._avatar.name = userName;
    }     
};
