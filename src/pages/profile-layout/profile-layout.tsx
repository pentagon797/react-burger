import { Outlet } from "react-router";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import s from "./profile-layout.module.css";
import cn from "classnames";

export const ProfileLayout = () => {
  return (
    <section className={cn(s.profilePage, "mt-30")}>
      <ProfileNavigation />
      <Outlet />
    </section>
  );
};
