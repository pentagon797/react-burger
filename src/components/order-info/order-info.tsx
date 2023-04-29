import React from 'react'
import { useParams, useLocation } from "react-router-dom";
import cn from "classnames";
import s from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/hook";
import { orderDate } from "../feed-element/feed-element";
import { ingredientsIcons } from "../feed-element/feed-element";

function inNotUndefined<T>(item: T | undefined): item is T {
  return item !== undefined 
};

export const OrderInfo = () => {
  const location = useLocation();
  const { id } = useParams<({ id: string })>();
  const ingredients = useAppSelector((state) => state.burgerIngredient.data);

  const profileOrders = useAppSelector((state) => state.rootReducer.orderPage.data?.orders);
  const feedOrders = useAppSelector((state) => state.rootReducer.feedPage.data?.orders);

  const orders = location.pathname.includes("/profile/orders")  
  ? profileOrders
  : feedOrders;

  const order = orders?.find((order) => order._id === id);

  const orderIngredients = order?.ingredients.map((id) => {
    return ingredients.find((item) => item._id === id);
  }).filter(inNotUndefined);

  const getTotalSumOfOrder = orderIngredients?.reduce(
    (prev, ingredient) => prev + ingredient.price,
  0
) || 0;

  return (
    <section className={s.orderInfo}>
      <p className="text text_type_digits-default mt-10">#{order?.number}</p>
      <div className={cn(s.orderInfo__text_area, "mt-10")}>
        <p className={cn(s.orderInfo__name, "text text_type_main-medium")}>
          {order?.name}
        </p>
        <p
          className={cn(
            s.orderInfo__status,
            "text text_type_main-default mt-3"
          )}
        >
          {order?.status === "done" ? "Готов" : "Готовится"}
        </p>
        <p className="text text_type_main-medium mt-15">Состав</p>
      </div>
      <ul className={cn(s.orderInfo__list, "custom-scroll")}>
        {typeof order !== "undefined" &&
          ingredientsIcons(ingredients, order).map((item) => (
            <li className={cn(s.orderInfo__item, "mr-6")} key={item._id}>
              <div className={s.orderInfo__container}>
                <img
                  className={cn(s.orderInfo__image)}
                  src={item.image_mobile}
                  alt={item.name}
                />
                <p
                  className={cn(
                    s.orderInfo__text_element,
                    "text_type_main-default ml-4"
                  )}
                >
                  {item.name}
                </p>
              </div>
              <p
                className={cn(
                  s.orderInfo__price,
                  "text text_type_digits-default"
                )}
              >
                {
                  orderIngredients?.filter(
                    (ingredient) => ingredient?._id === item._id
                  ).length
                }
                {} x {item.price}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          ))}
      </ul>
      <div className={cn(s.orderInfo__total, "mt-10 mb-10")}>
        <p className="text text_type_main-default text_color_inactive">
          {typeof order !== "undefined" &&
            orderDate(new Date(order?.createdAt))}
        </p>
        <div className={s.orderInfo__price}>
          <p className="text text_type_digits-default ">
            {getTotalSumOfOrder}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;
