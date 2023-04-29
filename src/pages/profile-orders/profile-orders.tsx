import s from "./profile-orders.module.css";
import cn from "classnames";
import { useAppSelector } from "../../services/hook";
import { TFeed } from "../../services/actions/feed";
import FeedElement from "../../components/feed-element/feed-element";
import React, { useEffect } from "react";
import { WS_URL_ORDERS } from "../../utils/burger-api";
import { useAppDispatch } from "../../services/hook";
import {
  wsConnectOrder,
  wsDisconnectOrder,
} from "../../services/actions/feed";


export const ProfileOrders = () => {
  const orders = useAppSelector(
    (state) => state.rootReducer.orderPage.data?.orders
  );
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    dispatch(wsConnectOrder({ wsUrl: WS_URL_ORDERS, withTokenRefresh: true }));
    return () => {
      dispatch(wsDisconnectOrder());
    };
  }, []);

  return (
    <div>
      {typeof orders !== "undefined" && orders?.length > 0 ? (
        <ul className={cn(s.profile__orders, "custom-scroll")}>
          {orders?.map((order: TFeed) => {
            return (
              <div className={cn(s.profile__order_element)} key={order?._id}>
                <FeedElement order={order} />
              </div>
            );
          })}
        </ul>
      ) : (
        <p className={cn(s.empty, "text text_type_main-medium")}>
          Список заказов пуст...
        </p>
      )}
    </div>
  );
};

export default ProfileOrders;
