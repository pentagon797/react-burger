import { getCookie, setCookie } from "./cookie";

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export const getInfoFromServer = () => {
  return request(`${BURGER_API_URL}/ingredients`).then((data) => data.data);
};

export const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : res
        .json()
        .then((err) => Promise.reject({ ...err, statusCode: res.status }));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

class BurgerApi {
  fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (error) {
      console.log("fetchWithRefresh", error);
      if (error.statusCode === 401 || error.statusCode === 403) {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          Promise.reject(refreshData);
        }

        setCookie("accessToken", refreshData.accessToken);
        setCookie("refreshToken", refreshData.refreshToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        Promise.reject(error);
      }
    }
  };

  registerUser = (data) => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  loginUser = (data) => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  logoutUser = (data) => {
    return fetch(`${BURGER_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  forgotPasswordEmail = (data) => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  forgotPasswordNew = (data) => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  updateInfoUser = (data) => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) => {
        if (data?.success) return data;
        return Promise.reject(data);
      });
  };

  refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    }).then(checkResponse);
  };

  getUser = () => {
    return this.fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
      headers: {
        authorization: getCookie("accessToken"),
      },
    }).then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
  };
}

export default new BurgerApi();
