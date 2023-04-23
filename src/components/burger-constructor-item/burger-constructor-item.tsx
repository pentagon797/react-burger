import React, { useRef } from "react";
import { useAppDispatch } from "../../services/hook";
import { useDrag, useDrop } from "react-dnd";
import s from "./burger-constructor-item.module.css";
import cn from "classnames";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sortArray,
  removeConstructorElement,
} from "../../services/reducers/constructorSlice";
import { TIngredient } from "../../services/reducers/ingredientsSlice";

interface IBurgerConstructorItem {
  ingredient: TIngredient;
  index: number;
}

const BurgerConstructorItem: React.FC<IBurgerConstructorItem> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();

  const id = ingredient.id;

  const sortRef = useRef<HTMLDivElement>(null);

  const sortingArray = (posStart: number, posEnd: number) => {
    let sortedArr = [];
    sortedArr.push(posStart);
    sortedArr.push(posEnd);
    dispatch(sortArray(sortedArr));
  };

  const [_, drop] = useDrop({
    accept: "constructorElement",
    hover(item: { index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = sortRef.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const hoverMiddleY =
        hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0;
        const hoverClientY = clientOffset ? clientOffset.y - (hoverBoundingRect?.top ?? 0) : 0;

      if (!sortRef.current) {
        return;
      }
      if (dragIndex === hoverIndex) {
        return;
      }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      sortingArray(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: "constructorElement",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(sortRef));

  return (
    <div ref={sortRef} className={cn(isDragging ? s.burgerConstructor_item_dragging : s.burgerConstructor_item)}>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch(removeConstructorElement(ingredient));
        }}
      />
    </div>
  );
}

export default BurgerConstructorItem;
