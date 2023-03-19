const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const getIngredients = () => {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
        .then(dataIngrediens => {
            if (dataIngrediens.success) {
                return dataIngrediens.data;
            }
        })
}
