import React from "react";
import s from "./order-details.module.css";
import cn from "classnames";
import { useAppSelector } from "../../services/hook";

export const OrderDetails = () => {
  const orderNumber = useAppSelector(
    (state) => state.burgerOrder.order?.order.number
  );
  const orderLoading = useAppSelector((state) => state.burgerOrder.isLoading);

  return (
    <div className={cn(s.orderDetails)}>
      {orderLoading ? (
        <h2 className="text text_type_main-large mt-30 mb-8">Загрузка...</h2>
      ) : (
        <h2 className="text text_type_digits-large mt-30 mb-8">
          {orderNumber}
        </h2>
      )}
      <h3 className="text text_type_main-medium">идентификатор заказа</h3>
      <div className={cn(s.orderDetails__order_icon, "mt-15 mb-15")} />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
