import { toast } from "react-hot-toast";
import { getPsychologists } from "../../firebase/operationsFirebase.jsx";
import { useEffect, useState } from "react";
import PsychologistsCard from "../PsychologistsCard/PsychologistsCard.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import { auth } from "../../firebase/firebaseConfig.js";
import css from "./PsychologistsList.module.css";

export default function PsychologistsList() {
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePsychologists, setVisiblePsychologists] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [favoritePsychologists, setFavoritePsychologists] = useState([]);

  useEffect(() => {
    const getAllPsychologists = async () => {
      try {
        setIsLoading(true);
        const data = await getPsychologists();
        setAllPsychologists(data);
        setFilteredPsychologists(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.error("Error fetching psychologists:", error);
        setIsLoading(false);
      }
    };
    getAllPsychologists();
  }, []);

  const handleFilter = (filter) => {
    let sortedPsychologists = [...allPsychologists];
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
        sortedPsychologists = allPsychologists;
        break;
      default:
        break;
    }
    setFilteredPsychologists(sortedPsychologists);
    setVisiblePsychologists(Math.min(3, sortedPsychologists.length));
  };

  const loadMore = () => {
    setVisiblePsychologists((prevCount) => prevCount + 3);
  };

  const handleFavoriteClick = (psychologist) => {
    console.log("Heart clicked for:", psychologist.name);

    const user = auth.currentUser;
    console.log("Checking user authentication: ", user);

    if (!user) {
      console.log("User is not authenticated");

      toast.error("Please log in to use this feature!", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    toast.success("Adding to favorites!", {
      position: "top-center",
      duration: 3000,
    });

    let updatedFavorites = [...favoritePsychologists];
    const index = updatedFavorites.findIndex(
      (fav) => fav.name === psychologist.name
    );

    if (index === -1) {
      updatedFavorites.push(psychologist);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavoritePsychologists(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
 
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <FilterForm onFilter={handleFilter} />
      <div className={css.wrap}>
        <ul className={css.list}>
          {filteredPsychologists
            .slice(0, visiblePsychologists)
            .map((psychologist) => (
              <li key={psychologist.name}>
                <PsychologistsCard
                  psychologist={psychologist}
                  isFavorite={favoritePsychologists.some(
                    (fav) => fav.name === psychologist.name
                  )}
                  onFavoriteClick={() => handleFavoriteClick(psychologist)}
                />
              </li>
            ))}
        </ul>
        {visiblePsychologists < filteredPsychologists.length && (
          <LoadMoreBtn onClick={loadMore} />
        )}
        {error && <p>Error loading psychologists: {error}</p>}
      </div>
    </>
  );
}

