import { useState } from "react";
import { Category } from "../category/category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredients.module.css";
import cn from "classnames";

export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("buns");

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauce = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  function handleClickTab(tab) {
    setCurrent(tab);
    const title = document.getElementById(tab);
    console.log(title);
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
      <div className={cn(s.wrapper, "custom-scroll")}>
        <Category title="Булки" id="buns" ingredients={buns} />
        <Category title="Соусы" id="sauce" ingredients={sauce} />
        <Category title="Начинки" id="main" ingredients={main} />
      </div>
    </section>
  );
};
