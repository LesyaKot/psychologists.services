import RatingStars from "../RatingStars/RatingStars.jsx";
import css from "./ReviewItem.module.css";

export default function ReviewItem({
  review: { comment, reviewer_name, reviewer_rating },
}) {
  return (
    <>
      <div className={css.wrap}>
        <div className={css.firstLetter}>{reviewer_name[0]}</div>
        <div className={css.nameWrap}>
          <h3 className={css.name}>{reviewer_name}</h3>
          <RatingStars count={reviewer_rating} />
        </div>
      </div>
      <p className={css.text}>{comment}</p>
    </>
  );
}
