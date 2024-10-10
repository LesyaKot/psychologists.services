import RatingStars from "../RatingStars/RatingStars.jsx";
import css from "./ReviewItem.module.css";

export default function ReviewItem({
  review: { comment, reviewer, rating },
}) {
  return (
    <>
      <div className={css.wrap}>
        <div className={css.firstLetter}>{reviewer[0]}</div>
        <div className={css.nameWrap}>
          <h3 className={css.name}>{reviewer}</h3>
          <RatingStars count={rating} />
        </div>
      </div>
      <p className={css.text}>{comment}</p>
    </>
  );
}
