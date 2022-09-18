export const BASE_URL = 'https://api.backend.mesto.nomoredomains.sbs';

export const config = {
    url: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
    }
}

