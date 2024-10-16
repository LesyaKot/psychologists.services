import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import Psychologists from "../src/pages/Psychologists/Psychologists";
import Favorites from "./pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/psychologists" element={<Psychologists />}></Route>
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
