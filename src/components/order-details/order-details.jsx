import s from "./order-details.module.css";
import cn from "classnames";

export const OrderDetails = () => {
  return (
    <div className={cn(s.orderDetails)}>
      <h2 className="text text_type_digits-large mt-30 mb-8">123456</h2>
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
