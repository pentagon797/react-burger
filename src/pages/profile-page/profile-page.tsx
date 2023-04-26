import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { updateInfoUser } from "../../services/reducers/userSlice";
import { IUser } from "../../utils/burger-api";

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

  const changeValue = (RequestBody: IUser) => {
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
    <div>
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
    </div>
  );
};

export default ProfilePage;
