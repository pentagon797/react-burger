import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import cn from "classnames";
import s from "./category.module.css";
import { Modal } from "../modal/modal";
import { useState } from "react";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const Category = ({ title, id, ingredients }) => {
  const [ingredientModal, setIngredientModal] = useState(null);
  const closeModalIngredient = () => {
    setIngredientModal(null);
  };
  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6" id={id}>
        {title}
      </h2>
      <div className={cn(s.list, "pl-4", "mr-2")}>
        {ingredients?.map((data) => (
          <BurgerIngredient
            key={data._id}
            {...data}
            count={1}
            onClick={setIngredientModal}
          />
        ))}
      </div>
      {ingredientModal && (
        <Modal onClose={closeModalIngredient}>
          <IngredientDetails data={ingredientModal} />
        </Modal>
      )}
    </>
  );
};
