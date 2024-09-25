import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Pagenav.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active, css.default);
};

export default function Pagenav() {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <NavLink to="/home" className={getNavLinkClass}>
          Home
        </NavLink>
      </li>

      <li className={css.item}>
        <NavLink to="/psychologists" className={getNavLinkClass}>
          Psychologists
        </NavLink>
      </li>
    </ul>
  );
}
