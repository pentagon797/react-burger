import OrderInfo from "../../components/order-info/order-info";
import s from "./orderInfo.module.css";
import cn from "classnames";

export const OrderInfoPage = () => {
  return (
    <section className={cn(s.OrderInfoPage)}>
      <OrderInfo />
    </section>
  );
};
