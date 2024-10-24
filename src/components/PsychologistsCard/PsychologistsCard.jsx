import { useState, useEffect } from "react";
import { SuitHeart, StarFill } from "react-bootstrap-icons";
import Reviews from "../../components/Reviews/Reviews";
import Modal from "../../components/Modal/Modal";
import Appointment from "../Appointment/Appointment";
import css from "./PsychologistsCard.module.css";

export default function PsychologistsCard({ psychologist }) {
  const {
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const favoritePsychologists =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = favoritePsychologists.some((fav) => fav.name === name);
    setIsFavorite(isFav);
  }, [name]);

  const handleFavoriteToggle = () => {
    let favoritePsychologists =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favoritePsychologists = favoritePsychologists.filter(
        (fav) => fav.name !== name
      );
      localStorage.setItem("favorites", JSON.stringify(favoritePsychologists));
      setIsFavorite(false);
    } else {
      favoritePsychologists.push(psychologist);
      localStorage.setItem("favorites", JSON.stringify(favoritePsychologists));
      setIsFavorite(true);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
    console.log(openModal);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(closeModal);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={css.wrap}>
      <img
        className={css.avatar}
        src={avatar_url}
        alt="avatar"
        width="96px"
        height="96px"
      />
      <div>
        <p>Psychologist</p>
        <p className={css.price}>
          Price: {price_per_hour ? price_per_hour.toFixed(2) : "N/A"}
        </p>

        <div className={css.ratingWrap}>
          <StarFill className={css.starIcon} size={16} />
          <p>
            Rating: {rating} ({reviews.length})
          </p>
        </div>

        <button className={css.isFavoriteBtn} onClick={handleFavoriteToggle}>
          <SuitHeart
            className={isFavorite ? css.isFavoriteIconRed : css.isFavoriteIcon}
            size={24}
          />
        </button>

        <h2 className={css.name}>{name}</h2>
        <p>Experience: {experience}</p>
        <p>License: {license}</p>
        <p>Specialization: {specialization}</p>
        <p>Initial consultation: {initial_consultation}</p>
        <p className={css.about}>{about}</p>
      </div>

      {!isExpanded && <button onClick={toggleReadMore}>Read More</button>}
      {isExpanded && (
        <>
          {reviews && reviews.length > 0 ? (
            <Reviews reviews={reviews} />
          ) : (
            <p>No reviews yet.</p>
          )}
          <button className={css.appointmentBtn} onClick={openModal}>
            Make an appointment
          </button>
          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            <Appointment psychologist={psychologist} />
          </Modal>
        </>
      )}
    </div>
  );
}

