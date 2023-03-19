import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/api";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import s from "./app.module.css";
import cn from "classnames";

export const App = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data);
    });
  }, []);

  return (
    <div className={s.app}>
      <AppHeader />
      <h1 className={cn(s.title, "text text_type_main-large mt-10 mb-5")}>
        Соберите бургер
      </h1>
      <main className={s.app__main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor constructorIngredients={ingredients} />
      </main>
    </div>
  );
};
