import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./app-header.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export const AppHeader = () => {
  return (
    <header className={cn(s.header)}>
      <nav className={cn(s.nav, "pt-4", "pb-4", "ml-3")}>
        <div className={cn(s.header__column, s.link__wrap)}>
          <NavLink className={cn(s.link, "p-5", "mr-2")} to="/">
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? cn(s.link_active, "text text_type_main-default ml-2")
                      : "text text_type_main-default ml-2"
                  }
                >
                  Конструктор
                </span>
              </>
            )}
          </NavLink>
          <NavLink className={cn(s.link, "p-5")} to="/feed">
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? cn(s.link_active, "text text_type_main-default ml-2")
                      : "text text_type_main-default ml-2"
                  }
                >
                  Лента заказов
                </span>
              </>
            )}
          </NavLink>
        </div>
        <NavLink className={cn(s.header__column, s.logo)} to="/">
          <Logo />
        </NavLink>
        <div className={cn(s.header__column, s.header__column_right)}>
          <NavLink className={cn(s.link, "p-5")} to="/profile">
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <span
                  className={
                    isActive
                      ? cn(s.link_active, "text text_type_main-default ml-2")
                      : "text text_type_main-default ml-2"
                  }
                >
                  Личный кабинет
                </span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
