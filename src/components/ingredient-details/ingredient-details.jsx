import cn from "classnames";
import s from "./ingredient-details.module.css";
import React from "react";
import PropTypes from "prop-types";

export const IngredientDetails = ({ data }) => {
  return (
    <div className={cn(s.ingedientDetails)}>
      <h2
        className={cn(s.ingedientDetails__title, "text text_type_main-large")}
      >
        Детали ингредиента
      </h2>
      <img src={data.image_large} alt={data.name} className="" />
      <p className="text text_type_main-medium mt-8 mb-8">{data.name}</p>
      <ul className={cn(s.ingedientDetails__list)}>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Белки, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {data.proteins}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Жиры, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {data.fat}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {data.carbohydrates}
          </li>
        </div>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IngredientDetails;
