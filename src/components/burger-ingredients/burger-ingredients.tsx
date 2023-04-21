import { useState, useEffect } from "react";
import { Category } from "../category/category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredients.module.css";
import cn from "classnames";
import { useAppSelector } from "../../services/hook";
import { useInView } from "react-intersection-observer";
import { RootState } from "../../services/store";

const BurgerIngredients: React.FC = () => {
  const ingredients = useAppSelector(
    (state: RootState) => state.burgerIngredient.data
  );

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauce = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  const isLoading = useAppSelector(
    (state: RootState) => state.burgerIngredient.isLoading
  );

  const [current, setCurrent] = useState<string>("bun");

  const [refBun, inViewBun] = useInView();
  const [refMain, inViewMain] = useInView();
  const [refSauce, inViewSauce] = useInView();

  useEffect(() => {
    if (inViewBun) {
      setCurrent("buns");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  function handleClickTab(tab: string) {
    setCurrent(tab);
    const title = document.getElementById(tab) as HTMLDivElement;
    if (title) title.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className={cn(s.ingredients, "ml-2")}>
      <div className={s.menu}>
        <Tab value="buns" active={current === "buns"} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleClickTab}
        >
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>
      {isLoading ? (
        <h1 className="text text_type_main-large">Загрузка...</h1>
      ) : (
        <div className={cn(s.wrapper, "custom-scroll")}>
          <Category title="Булки" id="buns" ingredients={buns} ref={refBun} />
          <Category
            title="Соусы"
            id="sauce"
            ingredients={sauce}
            ref={refSauce}
          />
          <Category
            title="Начинки"
            id="main"
            ingredients={main}
            ref={refMain}
          />
        </div>
      )}
    </section>
  );
};

export default BurgerIngredients;
