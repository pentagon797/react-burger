import React from "react";
import s from "./profile-navigation.module.css";
import cn from "classnames";
import { NavLink, useMatch } from "react-router-dom";
import { logoutUser } from "../../services/reducers/userSlice";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch } from "../../services/hook";

export type ILogoutBody = {
  token: string | undefined;
};

export const ProfileNavigation = () => {
  const isProfile = useMatch("/profile");
  const isProfileOrders = useMatch("/profile/orders");

  const dispatch = useAppDispatch();
  const token = getCookie("refreshToken");
  const RequestBody: ILogoutBody = {
    token: token,
  };
  const logout = (RequestBody: ILogoutBody) => {
    dispatch(logoutUser(RequestBody));
  };

  return (
    <nav className={cn(s.profileNav)}>
      <NavLink
        className={cn(
          s.profileLink,
          `text text_type_main-medium ${
            isProfile ? `${s.profileLink__active}` : "text_color_inactive"
          }`
        )}
        to="/profile"
      >
        Профиль
      </NavLink>
      <NavLink
        className={cn(
          s.profileLink,
          `text text_type_main-medium ${
            isProfileOrders ? `${s.profileLink__active}` : "text_color_inactive"
          }`
        )}
        to="/profile/orders"
      >
        История заказов
      </NavLink>
      <button
        className={cn(
          s.profile__exit_button,
          "text text_type_main-medium text_color_inactive"
        )}
        onClick={() => {
          logout(RequestBody);
        }}
      >
        Выход
      </button>
      <span
        className={cn(
          s.profile__span_text,
          "text text_type_main-default text_color_inactive mt-20"
        )}
      >
        {isProfile
          ? "В этом разделе вы можете изменить свои персональные данные"
          : "В этом разделе вы можете просмотреть свою историю заказов"}
      </span>
    </nav>
  );
};
