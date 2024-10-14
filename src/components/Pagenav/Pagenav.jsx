import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Pagenav.module.css";

const getNavLinkCl = ({ isActive }) => {
  return clsx(css.item, isActive && css.active, css.default);
};

export default function Pagenav() {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <NavLink to="/" className={getNavLinkCl}>
          Home
        </NavLink>
      </li>

      <li className={css.item}>
        <NavLink to="/psychologists" className={getNavLinkCl}>
          Psychologists
        </NavLink>
      </li>
      <li className={css.item}>
        <NavLink to="/favorites" className={getNavLinkCl}>
          Favorites
        </NavLink>
      </li>
    </ul>
  );
}
