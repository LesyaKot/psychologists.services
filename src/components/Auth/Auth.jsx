import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import css from "./Auth.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active, css.default);
};

const handleSignOut = (onLogin) => {
  signOut(auth)
    .then(() => {
      onLogin(null);
    })
    .catch((error) => console.error("Error signing out: ", error));
};

export default function Auth({ user, onLogin }) {
  return (
    <>
      <ul className={css.list}>
        {user ? (
          <>
            <li className={css.item}>
              <p className={css.greeting}>
                Hello, {user.displayName || user.email}!
              </p>
            </li>
            <li className={css.item}>
              <button
                className={css.logoutButton}
                onClick={() => handleSignOut(onLogin)}
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={css.item}>
              <NavLink className={getNavLinkClass} to="/register">
                Registration
              </NavLink>
            </li>
            <li className={css.item}>
              <NavLink className={getNavLinkClass} to="/login">
                Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
