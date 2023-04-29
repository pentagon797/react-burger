import s from "./feed.module.css";
import cn from "classnames";
import { useAppSelector } from "../../services/hook";
import { TFeed } from "../../services/actions/feed";
import FeedElement from "../../components/feed-element/feed-element";
import React, { useEffect } from "react";
import { WS_URL_FEED } from "../../utils/burger-api";
import { useAppDispatch } from "../../services/hook";
import {
  wsConnectFeed,
  wsDisconnectFeed,
} from "../../services/actions/feed";

export const FeedPage = () => {
  const dispatch = useAppDispatch(); 
  useEffect(() => {
    dispatch(wsConnectFeed({ wsUrl: WS_URL_FEED, withTokenRefresh: false }));
    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, []);

  const orders = useAppSelector(
    (state) => state.rootReducer.feedPage.data?.orders
  );

  const allOrders = useAppSelector((state) => state.rootReducer.feedPage.data);

  const doneOrders = allOrders?.orders
    .filter((order) => order.status === "done")
    .slice(0, 5);

  const pendingOrders = allOrders?.orders
    .filter((order) => order.status === "pending")
    .slice(0, 5);

  return (
    <section className={s.feed}>
      <div className={s.feed__list_container}>
        <p className={cn(s.feed__title, "text text_type_main-large mb-5 ml-2")}>
          Лента заказов
        </p>
        <ul className={cn(s.feed__list, "custom-scroll")}>
          {orders?.map((order: TFeed) => {
            return (
              <div className={s.feed__element_container} key={order?._id}>
                <FeedElement order={order} />
              </div>
            );
          })}
        </ul>
      </div>
      <div className={cn(s.feed__order_info, "mt-15")}>
        <div className={s.feed__order_info_container}>
          <div className={s.orders}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <ul className={s.orders__list}>
              {doneOrders?.map((order) => {
                return (
                  <li
                    className={cn(
                      s.orders__done,
                      "text text_type_digits-default "
                    )}
                    key={order.number}
                  >
                    {order.number}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={s.orders}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={s.orders__list}>
              {pendingOrders?.map((order) => {
                return (
                  <li
                    className="text text_type_digits-default"
                    key={order.number}
                  >
                    {order.number}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={s.date_ready_list}>
          <p className="text text_type_main-medium mt-15">
            Выполнено за все время:
          </p>
          <p className={cn(s.glow, "text text_type_digits-large")}>
            {allOrders?.total}
          </p>
        </div>
        <div className={s.date_ready_list}>
          <p className="text text_type_main-medium mt-15">
            Выполнено за сегодня:
          </p>
          <p className={cn(s.glow, "text text_type_digits-large")}>
            {allOrders?.totalToday}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeedPage;
