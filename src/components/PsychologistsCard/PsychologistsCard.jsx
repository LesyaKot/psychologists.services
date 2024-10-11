import { SuitHeart, StarFill } from "react-bootstrap-icons";
import { useState } from "react";
import Reviews from "../../components/Reviews/Reviews";
import Modal from "../Modal/Modal";
import Appointment from "../Appointment/Appointment";
import css from "./PsychologistsCard.module.css";


export default function PsychologistsCard({ psychologist, onFavoriteToggle }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  const {
    id,
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

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    setModalIsOpen(true);
    console.log(openModal);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(closeModal);
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

        <p className={css.price}>Price: {price_per_hour.toFixed(2)}</p>

        <div className={css.ratingWrap}>
          <StarFill className={css.starIcon} size={16} />
          <p>
            Rating:{rating}({reviews.length})
          </p>
        </div>

        <button className={css.isFavoriteBtn} onClick={handleClick}>
          <SuitHeart
            className={isFavorite ? css.isFavoriteIconRed : css.isFavoriteIcon}
            size={24}
          />
        </button>

        <h2 className={css.name}>{name}</h2>
        <p> Experience: {experience}</p>
        <p>License: {license}</p>
        <p>Specialization: {specialization}</p>
        <p>Initial_consultation:{initial_consultation}</p>
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

          <button className={css.appointmentBtn} onClick={openModal}>Make an appointment</button>

          <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <Appointment psychologist={psychologist} />
          </Modal>
        </>
      )}
    </div>
  );
}
