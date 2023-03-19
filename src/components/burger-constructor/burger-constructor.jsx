import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./burger-constructor.module.css";
import cn from "classnames";
import { Modal } from "../modal/modal";
import { useState } from "react";
import { OrderDetails } from "../order-details/order-details";

export const BurgerConstructor = ({ constructorIngredients }) => {
  const bun = constructorIngredients.find((data) => data.type === "bun");
  const main = constructorIngredients.filter((data) => data.type !== "bun");

  const [orderModal, setOrderModal] = useState(null);
  const closeModalOrder = () => {
    setOrderModal(null);
  };

  return (
    <section className={cn(s.burgerConstructor)}>
      <div className={cn(s.burgerConstructor__list)}>
        <div className={cn(s.burgerConstructor__container, "mb-4", "ml-5")}>
          <ConstructorElement
            {...bun}
            type="top"
            thumbnail={bun?.image}
            text={bun?.name + " (верх)"}
            key={bun?._id}
            isLocked={true}
          />
        </div>
        <div className={cn(s.burgerConstructor__scroll, "custom-scroll")}>
          {main.map((data) => (
            <div className={cn(s.burgerConstructor__container)} key={main?._id}>
              <DragIcon type="primary" />
              <div className={cn(s.burgerConstructor__item)}>
                <ConstructorElement
                  thumbnail={data.image}
                  text={data.name}
                  key={data._id}
                  {...data}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn(s.burgerConstructor__container, "mt-4", "ml-5", "mb-1")}
        >
          <ConstructorElement
            {...bun}
            type="bottom"
            thumbnail={bun?.image}
            text={bun?.name + " (низ)"}
            key={bun?._id}
            isLocked={true}
          />
        </div>
      </div>
      <div
        className={cn(s.burgerConstructor__order_container, "mr-4", "mt-10")}
      >
        <div className={cn(s.burgerConstructor__total_price, "mr-10")}>
          <p className="text text_type_digits-medium mr-4">610</p>
          <div className={cn(s.burgerConstructor__big_currency_icon)}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          onClick={() => {
            setOrderModal(true);
          }}
          size="medium"
          htmlType="button"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
      {orderModal && (
        <Modal onClose={closeModalOrder}>
          <OrderDetails data={orderModal} />
        </Modal>
      )}
    </section>
  );
};
