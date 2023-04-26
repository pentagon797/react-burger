import { Outlet } from "react-router";
import { AppHeader } from "../../components/app-header/app-header";
import s from "./main-layout.module.css";

export const MainLayout = () => {
  return (
    <div className={s.page}>
      <AppHeader />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
};
