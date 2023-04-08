import React, { useState } from "react";
import { Modal } from "../modal/modal";
import { useDispatch } from "react-redux";
import cn from "classnames";
import s from "./category.module.css";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";

export const Category = React.forwardRef(({ title, id, ingredients }, ref) => {
  const [ingredientModal, setIngredientModal] = useState(null);
  const dispatch = useDispatch();

  const closeModalIngredient = () => {
    setIngredientModal(null);
  };

  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6" id={id} ref={ref}>
        {title}
      </h2>
      <div className={cn(s.list, "pl-4", "mr-2")}>
        {ingredients &&
          ingredients?.map((data) => (
            <BurgerIngredient
              key={data._id}
              data={data}
              count={1}
              onClick={setIngredientModal}
              setIngredientWindow={() => dispatch(setIngredientModal(data))}
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
});

export default Category;
