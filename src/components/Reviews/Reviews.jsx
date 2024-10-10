import { nanoid } from "nanoid";
import ReviewItem from "../ReviewItem/ReviewItem.jsx";
import css from "./Reviews.module.css";

export default function Reviews({ reviews = [] }) {
  return (
    <ul className={css.list}>
      {reviews.map((item) => (
        <li className={css.item} key={nanoid()}>
          <ReviewItem review={item} />
        </li>
      ))}
    </ul>
  );
}
