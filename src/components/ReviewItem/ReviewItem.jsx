import { StarFill } from "react-bootstrap-icons";
import css from "./ReviewItem.module.css";

export default function ReviewItem({ review: { comment, reviewer, rating } }) {
  return (
    <>
      <div className={css.wrap}>
        <div className={css.firstLetter}>{reviewer[0]}</div>
        <h3 className={css.name}> </h3>
        <div className={css.nameWrap}>
          {reviewer}{" "}
          <span className={css.rating}>
            <StarFill className={css.starIcon} size={16} />
            {rating}
          </span>
        </div>
      </div>
      <p className={css.text}>{comment}</p>
    </>
  );
}
