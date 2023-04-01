import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sortArray,
  removeConstructorElement,
} from "../../services/reducers/constructorSlice";

function BurgerConstructorItem({ ingredient, index }) {
  const dispatch = useDispatch();

  const id = ingredient.id;

  const sortRef = useRef();

  const sortingArray = (posStart, posEnd) => {
    let sortedArr = [];
    sortedArr.push(posStart);
    sortedArr.push(posEnd);
    dispatch(sortArray(sortedArr));
  };

  const [, drop] = useDrop({
    accept: "constructorElement",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = sortRef.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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

  const [, drag] = useDrag({
    type: "constructorElement",
    item: () => {
      return { id, index };
    },
  });
  drag(drop(sortRef));

  return (
    <div ref={sortRef}>
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

BurgerConstructorItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;
