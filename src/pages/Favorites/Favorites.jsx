import { useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import PsychologistsCard from "../../components/PsychologistsCard/PsychologistsCard";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./Favorites.module.css";

export default function Favorites({ favoritePsychologists }) {
  const [visibleFavorites, setvisibleFavorites] = useState(3);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(3);

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

    setvisibleFavorites(Math.min(3, sortedPsychologists.length));
  };

  const handleLoadMore = () => {
    const newCount = loadMoreCount + 3;
    setLoadMoreCount(newCount);
    setvisibleFavorites(filteredPsychologists.slice(0, newCount));
  };

  return (
    <>
      <FilterForm onFilter={handleFilter} />

      <div>
        {filteredPsychologists.length === 0 ? (
          "No favorite psychologists selected yet."
        ) : (
          <ul>
            {filteredPsychologists.slice(0, visibleFavorites).map((psychologist, index) => (
              <li key={index}>
                <PsychologistsCard psychologist={psychologist} />
              </li>
            ))}
          </ul>
        )}
        {visibleFavorites < filteredPsychologists.length && (
          <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
        )}
      </div>
    </>
  );
}
