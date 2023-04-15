import React, { useState } from "react";
import s from "./login-page.module.css";
import cn from "classnames";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/reducers/userSlice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const isLoginAvailable = Boolean(
    value.email.includes("@") && value.password.length > 5
  );
  const isUserLoginnedSuccessfully = useSelector(
    (state) => state?.rootReducer?.user?.data
  );
  const onClickLogin = (data) => {
    dispatch(loginUser(data));
    if (isUserLoginnedSuccessfully) {
      navigate("/profile");
    }
    setValue({
      email: "",
      password: "",
    });
  };

  const isLoading = useSelector(
    (state) => state?.rootReducer?.user?.loginUserRequest
  );
  const isError = useSelector(
    (state) => state?.rootReducer?.user?.loginUserError
  );

  return (
    <section className={cn(s.loginPage)}>
      {isError !== null && (
        <h2 className={`text text_type_digits mb-8 `}>Произошла ошибка...</h2>
      )}
      {isLoading ? (
        <h2 className={`text text_type_digits-large mb-8 `}>Загрузка...</h2>
      ) : (
        <form className={cn(s.loginPage__form)}>
          <h2 className="text text_type_main-medium">Вход</h2>
          <EmailInput
            onChange={(evt) => setValue({ ...value, email: evt.target.value })}
            value={value.email}
            name={"email"}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={(evt) =>
              setValue({ ...value, password: evt.target.value })
            }
            value={value.password}
            name={"password"}
            icon="ShowIcon"
            extraClass="mt-6"
          />
          {isLoginAvailable ? (
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              extraClass="mt-6"
              onClick={() => {
                onClickLogin(value);
              }}
            >
              Войти
            </Button>
          ) : (
            <Button
              type="primary"
              size="medium"
              htmlType="submit"
              extraClass="mt-6"
              disabled={true}
            >
              Войти
            </Button>
          )}
          <div className={cn(s.loginPage__container, `mt-20`)}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?
            </p>
            <Link
              to="/register"
              className={cn(s.loginPage__link, `text text_type_main-default`)}
            >
              Зарегистрироваться
            </Link>
          </div>
          <div className={cn(s.loginPage__container, `mt-4`)}>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
            </p>
            <Link
              to="/forgot-password"
              className={cn(s.loginPage__link, `text text_type_main-default`)}
            >
              Восстановить пароль
            </Link>
          </div>
        </form>
      )}
    </section>
  );
};

export default LoginPage;
