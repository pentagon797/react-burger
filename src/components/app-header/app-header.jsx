import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./app-header.module.css";
import cn from "classnames";

export const AppHeader = () => {
  return (
    <header className={cn(s.header)}>
      <nav className={cn(s.nav, "pt-4", "pb-4", "ml-3")}>
        <div className={cn(s.header__column, s.link__wrap)}>
          <a href="#" className={cn(s.link, s.link_active, "p-5", "mr-2")}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </a>
          <a href="#" className={cn(s.link, s.link_active, "p-5")}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </span>
          </a>
        </div>
        <div className={cn(s.header__column, s.logo)}>
          <Logo />
        </div>
        <div className={cn(s.header__column, s.header__column_right)}>
          <a href="#" className={cn(s.link, s.link_active, "p-5")}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};
