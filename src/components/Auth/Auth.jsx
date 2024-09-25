import { NavLink } from "react-router-dom";
import css from "./Auth.module.css";

export default function Auth() {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <NavLink to="/register">Registration</NavLink>
      </li>

      <li className={css.item}>
        <NavLink to="/login">Log in</NavLink>
      </li>
    </ul>
  );
}
