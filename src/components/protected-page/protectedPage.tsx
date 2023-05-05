import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hook";
import { getCookie } from "../../utils/cookie";

type TProtectedPage = {
  onlyUnAuth?: boolean,
  children: ReactElement,
}

export const ProtectedPage: React.FC<TProtectedPage> = ({ onlyUnAuth, children }) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.rootReducer?.user.data);
  const token = getCookie('accessToken');

  if (onlyUnAuth && user && token) {
    const { from } = location.state || { from: { pathname: "/" } };
    const { background } = location.state?.from?.state || { background: null };
    return <Navigate replace to={from} state={{ background }} />;
  }

  if (!onlyUnAuth && !user && !token) {
    return (
      <Navigate
        replace
        to={{ pathname: "/login" }}
        state={{ from: location }}
      />
    );
  }

  return children;
};
