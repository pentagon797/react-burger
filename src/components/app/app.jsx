import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/reducers/userSlice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedPage } from "../protected-page/protectedPage";
import { MainLayout } from "../../pages/layout/main-layout";
import { MainPage } from "../../pages/main-page/main-page";
import { IngredientPage } from "../../pages/ingredient/ingredient-page";
import { Page404 } from "../../pages/page-404/page-404";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegisterPage } from "../../pages/register/register-page";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/forgot-password/reset-password";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
            path="/profile"
            element={
              <ProtectedPage>
                <ProfilePage />
              </ProtectedPage>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedPage onlyUnAuth>
                <RegisterPage />
              </ProtectedPage>
            }
          />

          <Route
            path="forgot-password"
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
        </Routes>
      )}
    </>
  );
}

export default App;
