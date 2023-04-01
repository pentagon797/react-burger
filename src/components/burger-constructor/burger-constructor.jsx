import {
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import s from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { addConstructorElement } from "../../services/reducers/constructorSlice";
import { sendOrder } from "../../services/reducers/orderSlice";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

export const BurgerConstructor = () => {
  const selectBuns = useSelector((state) => state.burgerConstructor.bun);
  const selectIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const dispatch = useDispatch();

  const [orderModal, setOrderModal] = useState(null);
  const closeModalOrder = () => {
    setOrderModal(null);
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: "BurgerIngredient",
    drop(ingredient) {
      dispatch(addConstructorElement(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const total = useMemo(() => {
    let total = 0;
    selectBuns ? (total += selectBuns.price * 2) : (total = 0);
    selectIngredients.map((ingredient) => {
      total += ingredient.price;
    });
    return total;
  });

  const sendRequest = () => {
    const orderList = [];
    const chosenBuns = selectBuns?._id;
    orderList.push(chosenBuns, chosenBuns);
    selectIngredients.forEach((ingredient) => {
      orderList.push(ingredient._id);
    });
    dispatch(sendOrder(orderList));
  };

  return (
    <section className={cn(s.burgerConstructor)} ref={dropRef}>
      <div className={cn(s.burgerConstructor__list)}>
        <div className={cn(s.burgerConstructor__item, "mb-4", "ml-5")}>
          {selectBuns != null ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectBuns.name} (вверх)`}
              price={selectBuns.price}
              thumbnail={selectBuns.image}
              key={selectBuns.id}
            />
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              thumbnail="https://realadmin.ru/assets/images/articles/2021/03/svg-loaders/rings.svg"
              text="Выберите булку"
            />
          )}
        </div>
        <div className={cn(s.burgerConstructor__scroll, "custom-scroll")}>
          {selectIngredients.length !== 0 ? (
            selectIngredients.map((selectIngredients, index) => {
              return (
                <div
                  className={cn(s.burgerConstructor__container)}
                  key={uuidv4()}
                >
                  <DragIcon type="primary" />
                  <div className={cn(s.burgerConstructor__item)}>
                    <BurgerConstructorItem
                      ingredient={selectIngredients}
                      index={index}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className={cn(s.burgerConstructor__container)}>
              <DragIcon type="primary" />
              <div className={cn(s.burgerConstructor__item)}>
                <ConstructorElement
                  isLocked={true}
                  thumbnail="https://realadmin.ru/assets/images/articles/2021/03/svg-loaders/circles.svg"
                  text="Выберите начинку"
                />
              </div>
            </div>
          )}
        </div>
        <div className={cn(s.burgerConstructor__item, "mt-4", "ml-5", "mb-1")}>
          {selectBuns != null ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectBuns.name} (вверх)`}
              price={selectBuns.price}
              thumbnail={selectBuns.image}
              key={selectBuns.id}
            />
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              thumbnail="https://realadmin.ru/assets/images/articles/2021/03/svg-loaders/rings.svg"
              text="Выберите булку"
            />
          )}
        </div>
      </div>
      <div
        className={cn(s.burgerConstructor__order_container, "mr-4", "mt-10")}
      >
        <div className={cn(s.burgerConstructor__total_price, "mr-10")}>
          <p className="text text_type_digits-medium mr-4">{total}</p>
          <div className={cn(s.burgerConstructor__big_currency_icon)}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        {selectIngredients == false || selectBuns == null ? (
          <Button htmlType="button" type="primary" size="medium" disabled>
            Оформить заказ
          </Button>
        ) : (
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => {
              sendRequest();
              setOrderModal(true);
            }}
          >
            Оформить заказ
          </Button>
        )}
      </div>
      {orderModal && (
        <Modal onClose={closeModalOrder}>
          <OrderDetails data={orderModal} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
