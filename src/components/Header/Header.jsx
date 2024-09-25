import { NavLink } from "react-router-dom";
import Pagenav from "../Pagenav/Pagenav";
import Auth from "../Auth/Auth";
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.wrap}>
      {/* <img src="/logo.png" alt="logo" /> */}
      <NavLink className={css.logo} to="/">
      <span className={css.accent}>psychologists.</span>services
    </NavLink>
      <Pagenav></Pagenav>
      <Auth></Auth>
    </div>
  );
}
