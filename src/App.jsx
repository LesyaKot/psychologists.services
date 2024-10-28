import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../src/pages/Home/Home";
import RegisterPage from "../src/pages/RegisterPage/RegisterPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import Psychologists from "../src/pages/Psychologists/Psychologists";
import Favorites from "./pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";
import PrivateRoute from "./PrivateRoute";
import { auth } from "./firebase/firebaseConfig";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/Auth/Auth";
import './App.css'; 

export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user); 
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
  };

  
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
     <Toaster position="top-right" />

     <div className="container">
     <Header user={user} onLogin={handleLogin} onRegister={handleRegister} />
     <Auth user={user} onLogin={handleLogin} onRegister={handleRegister}/> 
     </div>
    
    
    <Routes>
      <Route path="/" element={<Home user={user}  />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/psychologists" element={<Psychologists />}></Route>
      <Route
        path="/favorites"
        element={
          <PrivateRoute user={user}>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
