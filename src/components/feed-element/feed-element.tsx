import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import s from "./feed-element.module.css";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/hook";
import { TFeed } from "../../services/actions/feed";
import { TIngredient } from "../../services/reducers/ingredientsSlice";

export const orderDate = (date: Date | undefined) => {
  if (typeof date === "undefined") {
    return;
  } else if (isToday(date)) {
    return `Сегодня, ${format(date, "H:mm OOO")}`;
  } else if (isYesterday(date)) {
    return `Вчера, ${format(date, "H:mm OOO")}`;
  } else if (differenceInDays(Date.now(), date) < 5) {
    return `${differenceInDays(Date.now(), date)} дня назад, ${format(
      date,
      "H:mm OOO"
    )}`;
  } else if (differenceInDays(Date.now(), date) < 8) {
    return `${differenceInDays(Date.now(), date)} дней назад, ${format(
      date,
      "H:mm OOO"
    )}`;
  } else {
    return format(date, "d.M.y");
  }
};

export const ingredientsIcons = (ingredients: TIngredient[], order: TFeed) =>
  ingredients.filter((ingredient) =>
    order.ingredients.includes(ingredient._id)
  );

function inNotUndefined<T>(item: T | undefined): item is T {
  return item !== undefined
};

const FeedElement = ({ order }: { order: TFeed }) => {
  const location = useLocation();
  const ingredients = useAppSelector((state) => state.burgerIngredient.data);

  const findIngredientByID  = order.ingredients.map (id => {
    return ingredients.find(item => item._id === id);
  }).filter(inNotUndefined);
  
  const getTotalSumOfOrder = findIngredientByID.reduce(
    (prev, ingredient) => prev + ingredient.price,
  0
) || 0;

  return (
    <Link
      to={{
        pathname:
          location.pathname === "/feed"
            ? `/feed/${order._id}`
            : `/profile/orders/${order._id}`,
      }}
      state={{ background: location }}
      className={s.link}
    >
      <li className={cn(s.order, "mr-2 p-6")}>
        <div className={cn(s.order__number, "mb-6")}>
          <p className="text text_type_digits-default">#{order?.number}</p>
          <p className={cn(s.date, "text text_type_main-default")}>
            {typeof order !== "undefined" &&
              orderDate(new Date(order?.createdAt))}
          </p>
        </div>
        <p className={cn(s.element__text, "text text_type_main-medium mb-6")}>
          {order.name}
        </p>
        {location.pathname.includes("profile/orders") && (
          <p className={cn("text text_type_main-default mb-2")}>
            {order?.status === "done" ? "Готов" : "Готовится"}
          </p>
        )}
        <div className={s.row}>
          <ul className={s.row__images}>
            {ingredientsIcons(ingredients, order).map((image) => {
              return (
                <li className={s.row__images__container} key={image._id}>
                  <img
                    src={image.image_mobile}
                    className={s.row__images__image}
                    alt={image.name}
                  />
                </li>
              );
            })}
          </ul>
          <div className={s.total}>
            <p className="text text_type_digits-default mr-2">
              {getTotalSumOfOrder}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FeedElement;
