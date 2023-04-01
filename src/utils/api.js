export const BURGER_API_URL = "https://norma.nomoreparties.space/api/";

export const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((res) => Promise.reject(`Ошибка: ${res.message}`));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const getInfoFromServer = () => {
  return request(`${BURGER_API_URL}ingredients`).then((data) => data.data);
};

export default getInfoFromServer;
