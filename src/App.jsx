import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";

import { useDispatch, useSelector } from "react-redux";
// import { refreshUser } from '../src/firebase/authOperations.js';

import Loader from "../src/components/Loader/Loader.jsx";
import "./App.css";

const Home = lazy(() => import("../src/pages/Home/Home.jsx"));
const NotFoundPage = lazy(() =>
  import("../src/pages/NotFoundPage/NotFoundPage.jsx")
);
const Psychologists = lazy(() =>
  import("../src/pages/Psychologists/Psychologists.jsx")
);
const Favorites = lazy(() => import("../src/pages/Favorites/Favorites.jsx"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));

function App() {
  return (
    // <>
    //   <Home></Home>
    // </>

    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/register"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/login" component={<LoginPage />} />
            }
          />
          {/* <Route
          path="/"
          element={<PrivateRoute redirectTo="/psychologists" component={<Psychologists />} />}
        /> */}
          {/* <Route path="/psychologists" element={<Psychologists />}>
          <Route path="favorites" element={<Favorites />} />          
        </Route> */}

          <Route
            path="/psychologists"
            element={
              <PrivateRoute redirectTo="/login" component={<Psychologists />} />
            }
          >
            <Route path="favorites" element={<Favorites />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
