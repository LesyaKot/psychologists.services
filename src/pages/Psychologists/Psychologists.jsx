import { useState, useEffect } from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList.jsx";

import { Toaster } from "react-hot-toast";
import Header from "../../components/Header/Header.jsx";
import css from "./Psychologists.module.css";

export default function Psychologists() {
  return (
    <>
      <Header></Header>
     
      <PsychologistsList />
      <Toaster position="top-left" containerStyle={{ zIndex: 9999 }} />
    </>
  );
}
