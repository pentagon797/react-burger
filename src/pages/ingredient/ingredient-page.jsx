import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";
import { useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import s from "./ingredient-page.module.css";
import cn from "classnames";

export const IngredientPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <section className={cn(s.ingredientPage)}>
      <IngredientDetails />
    </section>
  );
};
