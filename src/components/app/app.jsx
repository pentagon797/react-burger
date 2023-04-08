import { useEffect } from "react";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import s from "./app.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux/es/exports";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

export const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={s.app}>
      <AppHeader />
      <h1 className={cn(s.title, "text text_type_main-large mt-10 mb-5")}>
        Соберите бургер
      </h1>
      <main className={s.app__main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
