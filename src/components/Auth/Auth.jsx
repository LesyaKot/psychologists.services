import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Auth.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active, css.default);
};

export default function Auth() {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <NavLink className={getNavLinkClass} to="/register">Registration</NavLink>
      </li>

      <li className={css.item}>
        <NavLink className={getNavLinkClass} to="/login">Log in</NavLink>
      </li>
    </ul>
  );
}
