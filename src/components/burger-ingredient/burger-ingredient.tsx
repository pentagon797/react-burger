import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredient.module.css";
import cn from "classnames";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../services/hook";
import { selectCountState } from "../../services/reducers/constructorSlice";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../services/reducers/ingredientsSlice";

interface IBurgerIngredient {
  data: TIngredient;
  onClick?: (data: TIngredient) => void;
}

export const BurgerIngredient: React.FC<IBurgerIngredient> = ({
  data,
  onClick,
}) => {
  const location = useLocation();

  const handleClickIngredient = () => {
    if (typeof onClick === "function") onClick(data);
  };

  const [_, dragRef] = useDrag({
    type: "BurgerIngredient",
    item: data,
  });

  const countID = data._id;
  const counter = useAppSelector((state) => selectCountState(state, countID));

  return (
    <Link
      className={cn(s.ingredient, "mb-6")}
      ref={dragRef}
      state={{ background: location }}
      to={`ingredients/${data._id}`}
      onClick={handleClickIngredient}
    >
      {counter !== 0 && <Counter count={counter} size="default" />}
      <img
        src={data.image}
        alt={data.name}
        className={cn(s.ingredient__image, "pl-4", "pr-4")}
      />
      <div className={cn(s.ingredient__container, "mt-2", "mb-2")}>
        <p className="text text_type_digits-default">{data.price}&nbsp;</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </Link>
  );
};

export default BurgerIngredient;
