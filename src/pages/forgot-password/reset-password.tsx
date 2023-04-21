import React, { useState } from "react";
import s from "./forgot-password.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/hook";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordNew } from "../../services/reducers/userSlice";

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState({
    password: "",
    token: "",
  });

  const requestBody = value;
  const onSubmit = (requestBody: any) => {
    dispatch(resetPasswordNew(requestBody));
  };

  const isSendAvailable = Boolean(
    value.password.length > 5 && value.token.length > 3
  );
  return (
    <section className={cn(s.forgotPassword)}>
      <form
        className={cn(s.forgotPassword__form)}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(requestBody);
        }}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          onChange={(evt) => setValue({ ...value, token: evt.target.value })}
          value={value.token}
          name={"token"}
          extraClass="mt-6"
          placeholder="Введите код из почты"
        />
        <PasswordInput
          onChange={(evt) => setValue({ ...value, password: evt.target.value })}
          value={value.password}
          name={"password"}
          extraClass="mt-6"
          placeholder="Введите новый пароль"
        />
        {isSendAvailable ? (
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mt-6"
          >
            Сохранить
          </Button>
        ) : (
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mt-6"
            disabled
          >
            Сохранить
          </Button>
        )}
        <div className={cn(s.forgotPassword__container, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link
            to="/login"
            className={cn(
              s.forgotPassword__link,
              "text text_type_main-default"
            )}
          >
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
