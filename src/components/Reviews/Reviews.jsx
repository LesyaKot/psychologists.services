import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { selectPsychologists } from "../../redax/psychologists/selectors.js";
import ReviewItem from '../ReviewItem/ReviewItem.jsx';
import css from "./Reviews.module.css";

export default function Reviews() {
  const { currentItem } = useSelector(selectPsychologists);
  const { reviews } = currentItem;
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
