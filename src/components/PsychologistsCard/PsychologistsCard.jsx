import { useDispatch, useSelector } from "react-redux";
import { SuitHeart, StarFill } from "react-bootstrap-icons";
import { chooseFavorite } from "../../redax/psychologists/slice.js";
import { selectPsychologists } from "../../redax/psychologists/selectors.js";
import css from "./PsychologistsCard.module.css";

export default function PsychologistsCard({ psychologist }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector(selectPsychologists);
  const isFavorite = favorites.some((item) => item.id === psychologist.id);

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
    dispatch(chooseFavorite(psychologist.id));
  };
  console.log("psychologist:", psychologist);

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
      <button variant="small" to={`/psychologist/${id}`}>
        Read more
      </button>
    </div>
  );
}
