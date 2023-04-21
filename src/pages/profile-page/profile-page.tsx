import React from "react";
import s from "./profile-page.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { logoutUser, updateInfoUser } from "../../services/reducers/userSlice";
import { getCookie } from "../../utils/cookie";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const mail = useAppSelector((state) => state.rootReducer?.user?.data?.email);
  const name = useAppSelector((state) => state.rootReducer?.user?.data?.name);
  const [value, setValue] = React.useState({
    name: name,
    email: mail,
    password: "",
  });
  const requestBodyChange = value;
  const token = getCookie("refreshToken");

  const RequestBody = {
    token: token,
  };

  const logout = (RequestBody: any) => {
    dispatch(logoutUser(RequestBody));
  };

  const changeValue = (RequestBody: any) => {
    dispatch(updateInfoUser(RequestBody));
  };

  const cancelEdit = () => {
    setValue({
      name: name,
      email: mail,
      password: "",
    });
  };
  const isEditAvailable = Boolean(value.name !== name || value.email !== mail);

  return (
    <section className={cn(s.profilePage, "mt-30")}>
      <nav className={cn(s.profileNav)}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? cn(
                  s.profileLink,
                  s.profileLink__active,
                  "text text_type_main-medium"
                )
              : cn(
                  s.profileLink,
                  "text text_type_main-medium text_color_inactive"
                )
          }
          to="/profile"
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? cn(
                  s.profileLink,
                  s.profileLink__active,
                  "text text_type_main-medium"
                )
              : cn(
                  s.profileLink,
                  "text text_type_main-medium text_color_inactive"
                )
          }
          to="/404"
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
          В этом разделе вы можете&nbsp; изменить свои персональные данные
        </span>
      </nav>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeValue(requestBodyChange);
        }}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(evt) => setValue({ ...value, name: evt.target.value })}
          value={`${value.name}`}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon="EditIcon"
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={(evt) => setValue({ ...value, email: evt.target.value })}
          value={`${value.email}`}
          name={"email"}
          icon="EditIcon"
          extraClass="mt-6"
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(evt) => setValue({ ...value, password: evt.target.value })}
          value={value.password}
          name={"password"}
          icon="EditIcon"
          extraClass="mt-6"
        />
        <div className={"mt-6"}>
          <Button
            type="secondary"
            size="medium"
            htmlType="reset"
            onClick={cancelEdit}
          >
            Отмена
          </Button>
          {isEditAvailable ? (
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          ) : (
            <Button type="primary" size="medium" htmlType="submit" disabled>
              Сохранить
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
