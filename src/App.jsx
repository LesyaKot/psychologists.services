import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import Psychologists from "../src/pages/Psychologists/Psychologists";
import Favorites from "../src/pages/Favorites/Favorites";
import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/psychologists"
        element={
          <PrivateRoute redirectTo="/login">
            <Psychologists />
          </PrivateRoute>
        }
      >
        <Route path="favorites" element={<Favorites />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
