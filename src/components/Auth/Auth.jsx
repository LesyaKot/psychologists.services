import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { NavLink } from "react-router-dom";
import css from "./Auth.module.css";

const handleSignOut = (onLogin) => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("isAuthenticated");
      onLogin(null);
      window.location.reload();
    })
    .catch((error) => console.error("Error signing out: ", error));
};

export default function Auth({ user, onLogin }) {
  return (
    <ul className={css.list}>
      {user ? (
        <>
          <li>
            <p>Hello, {user.displayName || user.email}!</p>
          </li>
          <li>
            <button onClick={() => handleSignOut(onLogin)}>Log out</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/register">Registration</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </>
      )}
    </ul>
  );
}
