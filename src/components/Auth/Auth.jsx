import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Person } from "react-bootstrap-icons";
import css from "./Auth.module.css";


const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active, css.default);
};

const handleSignOut = async (onLogin, navigate) => {
  try {
    await signOut(auth);
    localStorage.removeItem("isAuthenticated");
    console.log("User signed out. Redirecting to /");
    onLogin(null);
    navigate("/"); 
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export default function Auth({ user, onLogin }) {
  const navigate = useNavigate();
  return (
    <ul className={css.list}>
      {user ? (
        <>
          <li className={css.listitem}>
          <Person className={css.personIcon}           
            size={24}
          />
            <p className={css.name}>Hello, {user.displayName || user.email}!</p>
          </li>
          <li className={css.listitem}>
            <NavLink className={getNavLinkClass} onClick={() => handleSignOut(onLogin, navigate)} >Log out</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink className={getNavLinkClass} to="/register">Registration</NavLink>
          </li>
          <li>
            <NavLink className={getNavLinkClass} to="/login">Log in</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}
