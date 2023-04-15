import cn from "classnames";
import s from "./page-404.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Page404 = () => {
  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

  return (
    <div className={cn(s.page404)}>
      <h2 className="text text_type_digits-large">404</h2>
      <h2 className="text text_type_main-large mt-4">
        Страница не найдена...☹
      </h2>
      <div className="text text_type_main-small mt-8">
        <Button htmlType="button" type="secondary" size="medium" onClick={back}>
          ← вернуться
        </Button>
      </div>
    </div>
  );
};
