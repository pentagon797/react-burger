import React, { ForwardedRef } from "react";
import cn from "classnames";
import s from "./category.module.css";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { TIngredient } from "../../services/reducers/ingredientsSlice";

interface ICategoryProps {
  title: string;
  id: string;
  ingredients: TIngredient[];
}

export const Category = React.forwardRef<HTMLDivElement, ICategoryProps>(
  ({ title, id, ingredients }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <>
        <h2 className="text text_type_main-medium mt-10 mb-6" id={id} ref={ref}>
          {title}
        </h2>
        <div className={cn(s.list, "pl-4", "mr-2")}>
          {ingredients &&
            ingredients?.map((data) => (
              <BurgerIngredient key={data._id} data={data} />
            ))}
        </div>
      </>
    );
  }
);

export default Category;
