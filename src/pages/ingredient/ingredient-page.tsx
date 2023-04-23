import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import s from "./ingredient-page.module.css";
import cn from "classnames";

export const IngredientPage = () => {
  return (
    <section className={cn(s.ingredientPage)}>
      <IngredientDetails />
    </section>
  );
};
