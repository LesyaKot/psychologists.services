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

  const isOnline = true;
  const statusClass = isOnline ? css.online : css.offline;

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
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    
    <div className={css.wrap}>
      
      <div className={css.imgWrap}>
        <div className={`${css.statusIndicator} ${statusClass}`}></div>
        <img
          className={css.avatar}
          src={avatar_url}
          alt="avatar"
          width="96px"
          height="96px"
        />
      </div>

      <div className={css.sectionsWrap}>
      <div className={css.infoWrap}>
        <div className={css.nameWrap}>
          <p className={css.role}>Psychologist</p>
          <h2 className={css.name}>{name}</h2>
        </div>

        <div className={css.priceRatingWrap}>
          <StarFill className={css.starIcon} size={16} />
          <p>Rating: {rating}</p>

          <p className={css.price}>
            Price / 1 hour:
            <span className={css.green}>
              {" "}
              {price_per_hour ? price_per_hour.toFixed(2) : "N/A"}$
            </span>
          </p>

          <button className={css.isFavoriteBtn} onClick={handleFavoriteToggle}>
            <SuitHeart
              className={
                isFavorite ? css.isFavoriteIconRed : css.isFavoriteIcon
              }
              size={26} style={{ fill: isFavorite ? "#fc832c" : "#191a15" }} 
            />
          </button>
        </div>

      </div>

      <div className={css.jobWrap}>
      <p className={css.jobWrapItem}><span className={css.grey}>Experience:</span> {experience}</p>
      <p className={css.jobWrapItem}><span className={css.grey}>License:</span> {license}</p>
      <p className={css.jobWrapItem}><span className={css.grey}>Specialization:</span> {specialization}</p>
      <p className={css.jobWrapItem}><span className={css.grey}>Initial consultation:</span> {initial_consultation}</p>
      </div>


      <p className={css.about}>{about}</p>
      {!isExpanded && (
        <button className={css.readMoreBtn} onClick={toggleReadMore}>
          Read More
        </button>
      )}
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
    </div>
  );
}
