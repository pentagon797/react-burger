import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { WS_URL_FEED, WS_URL_ORDERS } from "../../utils/burger-api";
import {
  wsConnectFeed,
  wsDisconnectFeed,
  wsConnectOrder,
  wsDisconnectOrder,
} from "../../services/actions/feed";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";
import { useAppDispatch } from "../../services/hook";
import { checkUserAuth } from "../../services/reducers/userSlice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedPage } from "../protected-page/protectedPage";
import { MainLayout } from "../../pages/main-layout/main-layout";
import { MainPage } from "../../pages/main-page/main-page";
import { IngredientPage } from "../../pages/ingredient/ingredient-page";
import { Page404 } from "../../pages/page-404/page-404";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegisterPage } from "../../pages/register/register-page";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/forgot-password/reset-password";
import { FeedPage } from "../../pages/feed/feed";
import { ProfileLayout } from "../../pages/profile-layout/profile-layout";
import { ProfileOrders } from "../../pages/profile-orders/profile-orders";
import { OrderInfoPage } from "../../pages/order-info-page/orderInfo";
import OrderInfo from "../order-info/order-info";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(
    function () {
      dispatch(fetchIngredients());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(wsConnectOrder({ wsUrl: WS_URL_ORDERS, withTokenRefresh: true }));
    dispatch(wsConnectFeed({ wsUrl: WS_URL_FEED, withTokenRefresh: false }));
    return () => {
      dispatch(wsDisconnectOrder());
      dispatch(wsDisconnectFeed());
    };
  }, []);

  function handleCloseModal() {
    navigate(background.pathname, { replace: true });
  }

  const isFromForgotPassword = location.state?.fromForgotPassword;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path={"ingredients/:idIngredient"}
            element={<IngredientPage />}
          />
          <Route path="/404" element={<Page404 />} />
          <Route
            path="/login"
            element={
              <ProtectedPage onlyUnAuth>
                <LoginPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedPage onlyUnAuth>
                <RegisterPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedPage onlyUnAuth>
                <ForgotPasswordPage />
              </ProtectedPage>
            }
          />
          {isFromForgotPassword && (
            <Route
              path="/reset-password"
              element={
                <ProtectedPage onlyUnAuth>
                  <ResetPasswordPage />
                </ProtectedPage>
              }
            />
          )}
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderInfoPage />} />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedPage>
                <OrderInfoPage />
              </ProtectedPage>
            }
          />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route
              path="/profile"
              element={
                <ProtectedPage>
                  <ProfilePage />
                </ProtectedPage>
              }
            />
            <Route
              path="/profile/orders"
              element={
                <ProtectedPage>
                  <ProfileOrders />
                </ProtectedPage>
              }
            />
          </Route>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:idIngredient"
            element={
              <Modal onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
