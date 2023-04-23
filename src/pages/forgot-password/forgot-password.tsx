import React, { useState } from "react";
import s from "./forgot-password.module.css";
import cn from "classnames";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { resetPasswordEmail } from "../../services/reducers/userSlice";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
  });

  const requsetBody = value;
  const isRequestSuccess = useAppSelector(
    (state) => state?.rootReducer?.user?.resetPasswordEmailError
  );

  const onSubmit = (requsetBody: object) => {
    dispatch(resetPasswordEmail(requsetBody));
    if (!isRequestSuccess) {
      navigate("/reset-password", { state: { fromForgotPassword: true } });
    }
  };

  const isSendAvailable = Boolean(
    value.email.length > 0 && value.email.includes("@")
  );

  return (
    <section className={cn(s.forgotPassword)}>
      <form
        className={cn(s.forgotPassword__form)}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(requsetBody);
        }}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={(evt) => setValue({ ...value, email: evt.target.value })}
          value={value.email}
          name={"email"}
          extraClass="mt-6"
          placeholder="Укажите e-mail"
        />
        {isSendAvailable ? (
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mt-6"
          >
            Восстановить
          </Button>
        ) : (
          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mt-6"
            disabled
          >
            Восстановить
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

export default ForgotPasswordPage;
