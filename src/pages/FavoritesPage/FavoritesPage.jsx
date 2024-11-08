import FilterForm from "../../components/FilterForm/FilterForm";
import { useState, useEffect } from "react";
import PsychologistsCard from "../../components/PsychologistsCard/PsychologistsCard";
import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const [favoritePsychologists, setFavoritePsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritePsychologists(storedFavorites);
    setFilteredPsychologists(storedFavorites);
  }, []);

  const handleFilter = (filter) => {
    let sortedPsychologists = [...favoritePsychologists];
    switch (filter) {
      case "A to Z":
        sortedPsychologists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sortedPsychologists.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Less than 10$":
        sortedPsychologists = sortedPsychologists.filter(
          (p) => p.price_per_hour < 10
        );
        break;
      case "Greater than 10$":
        sortedPsychologists = sortedPsychologists.filter(
          (p) => p.price_per_hour > 10
        );
        break;
      case "Popular":
        sortedPsychologists.sort((a, b) => b.rating - a.rating);
        break;
      case "Not popular":
        sortedPsychologists.sort((a, b) => a.rating - b.rating);
        break;
      case "Show all":
        sortedPsychologists = favoritePsychologists;
        break;
      default:
        break;
    }
    setFilteredPsychologists(sortedPsychologists);
  };

  return (
    <div className={css.wrap}>
      <FilterForm onFilter={handleFilter} />
      {favoritePsychologists.length === 0 ? (
        <p>No psychologists available to display.</p>
      ) : (
        <div className={css.wrap}>
          <ul className={css.list}>
            {filteredPsychologists.map((psychologist) => (
              <li key={psychologist.name}>
                <PsychologistsCard psychologist={psychologist} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
