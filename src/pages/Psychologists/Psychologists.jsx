import { useState } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList.jsx";
import { Toaster } from "react-hot-toast";
import Header from "../../components/Header/Header.jsx";
import css from "./Psychologists.module.css";

export default function Psychologists() {
  const [favoritePsychologists, setFavoritePsychologists] = useState([]);

  const handleFavoriteToggle = (psychologist) => {
    setFavoritePsychologists((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === psychologist.id)) {
        return prevFavorites.filter((fav) => fav.id !== psychologist.id);
      } else {
        return [...prevFavorites, psychologist];
      }
    });
  };
  return (
    <>
      <Header />    
      <PsychologistsList onFavoriteToggle={handleFavoriteToggle}/>
      <Toaster position="top-left" containerStyle={{ zIndex: 9999 }} />
    </>
  );
}
