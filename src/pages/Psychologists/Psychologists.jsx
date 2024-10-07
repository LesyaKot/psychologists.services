import PsychologistsList from "../../components/PsychologistsList/PsychologistsList.jsx";
// import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import { Toaster } from "react-hot-toast";
import css from "./Psychologists.module.css";

export default function Psychologists() {
  return (
    <>
      {/* // <FilterForm /> */}
      <PsychologistsList />
      <Toaster position="top-left" containerStyle={{ zIndex: 9999 }} />
    </>
  );
}
