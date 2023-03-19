import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredient.module.css";
import cn from "classnames";

export const BurgerIngredient = ({ onClick, ...data }) => {
  function handleClickIngredient() {
    onClick(data);
  }
  return (
    <>
      <div className={cn(s.ingredient, "mb-6")} onClick={handleClickIngredient}>
        <Counter />
        <img
          src={data.image}
          alt={data.name}
          className={cn(s.ingredient__image, "pl-4", "pr-4")}
        />
        <div className={cn(s.ingredient__container, "mt-2", "mb-2")}>
          <p className="text text_type_digits-default">{data.price}&nbsp;</p>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default">{data.name}</p>
      </div>
    </>
  );
};
