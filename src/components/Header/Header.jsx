import Pagenav from "../Pagenav/Pagenav";
import Auth from "../Auth/Auth";
import css from "./Header.module.css";

export default function Header() {
  return (
    <>
      <img src="/public/logo.png" alt="logo" />
      <Pagenav></Pagenav>
      <Auth></Auth>
    </>
  );
}
