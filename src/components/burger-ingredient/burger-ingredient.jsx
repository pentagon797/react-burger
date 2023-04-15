import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-ingredient.module.css";
import cn from "classnames";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { selectCountState } from "../../services/reducers/constructorSlice";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export const BurgerIngredient = ({ data, onClick }) => {
  const location = useLocation();

  const handleClickIngredient = () => {
    if (typeof onClick === "function") onClick(data);
  };

  const [_, dragRef] = useDrag({
    type: "BurgerIngredient",
    item: data,
  });

  const countID = data._id;
  const counter = useSelector((state) => selectCountState(state, countID));

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
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </Link>
  );
};

BurgerIngredient.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BurgerIngredient;
