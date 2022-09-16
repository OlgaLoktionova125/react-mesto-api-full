import { config } from "./utils";

class Api {
  
    constructor(options) {
        this._options = options;
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };

    setJwt = (token) => {
      this._headers.authorization = `Bearer ${token}`; 
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getCardsList() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
      })
        .then(this._handleResponse);
    }

    updateUserInfo(obj) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            about: obj.about
          })
        })
        .then(this._handleResponse);    
    }

    setUserAvatar(obj) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: obj.avatar 
          })
        })
        .then(this._handleResponse);
    }

    createCard(obj) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            link: obj.link
          })
        })
        .then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers                            
      })
      .then(this._handleResponse);
    }

    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers
      }).then(this._handleResponse);
    }
}

const api = new Api(config);

export default api;