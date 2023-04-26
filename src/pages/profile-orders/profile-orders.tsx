import cn from "classnames";
import s from "./profile-orders.module.css";
import { useAppSelector } from "../../services/hook";
import { TFeed } from "../../services/actions/feed";
import FeedElement from "../../components/feed-element/feed-element";

export const ProfileOrders = () => {
  const orders = useAppSelector(
    (state) => state.rootReducer.orderPage.data?.orders
  );

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
