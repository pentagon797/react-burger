import { ILogoutBody } from "../components/profile-navigation/profile-navigation";
import { TIngredient } from "../services/reducers/ingredientsSlice";
import { getCookie, setCookie } from "./cookie";

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const WS_URL_FEED = 'wss://norma.nomoreparties.space/orders/all';
export const WS_URL_ORDERS = 'wss://norma.nomoreparties.space/orders';

type TResponseServer = {
  success: boolean;
}

type TResponseIngredientsServer = {
  data: TIngredient[]
} & TResponseServer;

export const getInfoFromServer = () => {
  return request<TResponseIngredientsServer>(`${BURGER_API_URL}/ingredients`).then((data) => data.data);
};

export const checkResponse = (res: Response): Promise<any> => {
  return res.ok
    ? res.json()
    : res
      .json()
      .then((err) => Promise.reject({ ...err, statusCode: res.status } as ErrorResponse));
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse);
};

export interface ErrorResponse {
  statusCode?: number;
  message?: string;
}

export interface IUser {
  email?: string,
  name?: string,
  password?: string,
  accessToken?: string,
  refreshToken?: string,
}

export interface IUserReq {
  user: IUser,
  success: boolean,
  accessToken: string,
  refreshToken: string,
}

export type TUserResponse = {
  success: boolean,
  user: IUser,
  accessToken: string,
  refreshToken: string,
}


export class BurgerApi {

  fetchWithRefresh = async (url: RequestInfo, options: RequestInit) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (error: any) {
      console.log("fetchWithRefresh", error);
      if (error.statusCode === 401 || error.statusCode === 403) {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          Promise.reject(refreshData)
        }

        setCookie("accessToken", refreshData.accessToken);
        setCookie("refreshToken", refreshData.refreshToken);
        if (options.headers) {
          (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;

        }
        const res = await fetch(url, options);
        return await checkResponse(res);

      } else {
        Promise.reject(error)
      }
    }
  }

  registerUser = (data: IUser): Promise<IUserReq> => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
      });
  };

  loginUser = (data: IUser): Promise<IUserReq> => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
      });
  };

  logoutUser = (data: ILogoutBody) => {
    return fetch(`${BURGER_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
      });
  };

  forgotPasswordEmail = (data: IUser) => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
      });
  };

  forgotPasswordNew = (data: IUser) => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
      });
  };

  updateInfoUser = (data: IUser) => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken")
      } as HeadersInit,
      body: JSON.stringify(data),
    }).then(checkResponse)
      .then(data => {
        if (data?.success) return data;
        return Promise.reject(data)
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

  getUser = (): Promise<TUserResponse> => {
    return this.fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
      headers: {
        authorization: getCookie("accessToken"),
      } as HeadersInit,
    }).then(data => {
      if (data?.success) return data;
      return Promise.reject(data)
    });
  }
}

export default new BurgerApi()