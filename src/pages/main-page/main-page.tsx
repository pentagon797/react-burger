import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import s from "./main-page.module.css";
import cn from "classnames";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const MainPage = () => {
  return (
    <div className={s.mainPage}>
      <h1
        className={cn(
          s.mainPage__title,
          "text text_type_main-large mt-10 mb-5"
        )}
      >
        Соберите бургер
      </h1>
      <section className={s.mainPage__content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </div>
  );
};
