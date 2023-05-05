import OrderInfo from "../../components/order-info/order-info";
import s from "./orderInfo.module.css";
import cn from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../services/hook";
import { wsConnectFeed, wsConnectOrder, wsDisconnectFeed, wsDisconnectOrder } from "../../services/actions/feed";
import { WS_URL_FEED, WS_URL_ORDERS } from "../../utils/burger-api";
import { useLocation } from "react-router-dom";

export const OrderInfoPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location.pathname.includes("/profile/orders")) {
      dispatch(wsConnectOrder({ wsUrl: WS_URL_ORDERS, withTokenRefresh: true }));}
    else {
      dispatch(wsConnectFeed({ wsUrl: WS_URL_FEED, withTokenRefresh: false })); }
    return () => {
      if (location.pathname.includes("/profile/orders")) {
        dispatch(wsDisconnectOrder());}
      else {
        dispatch(wsDisconnectFeed());}
    };
  }, [location.pathname]);
  return (
    <section className={cn(s.OrderInfoPage)}>
      <OrderInfo />
    </section>
  );
};
