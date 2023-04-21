import cn from "classnames";
import s from "./ingredient-details.module.css";
import React from "react";
import { useAppSelector } from "../../services/hook";
import { useParams } from "react-router-dom";
import { RootState } from "../../services/store";

export const IngredientDetails: React.FC = () => {
  const { idIngredient } = useParams();

  const ingredients = useAppSelector(
    (state: RootState) => state.burgerIngredient.data
  );
  const ingredientDetail = ingredients.find(
    (data) => data._id === idIngredient
  );

  return (
    <div className={cn(s.ingedientDetails)}>
      <h2
        className={cn(s.ingedientDetails__title, "text text_type_main-large")}
      >
        Детали ингредиента
      </h2>
      <img src={ingredientDetail?.image_large} alt={ingredientDetail?.name} />
      <p className="text text_type_main-medium mt-8 mb-8">
        {ingredientDetail?.name}
      </p>
      <ul className={cn(s.ingedientDetails__list)}>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {ingredientDetail?.calories}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Белки, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {ingredientDetail?.proteins}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Жиры, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {ingredientDetail?.fat}
          </li>
        </div>
        <div className={cn(s.ingedientDetails__list_item)}>
          <li className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </li>
          <li className="text text_type_digits-default text_color_inactive">
            {ingredientDetail?.carbohydrates}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default IngredientDetails;
