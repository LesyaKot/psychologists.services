import { getPsychologists } from "../../firebase/operationsFirebase.jsx";
import { useEffect, useState } from "react";
import PsychologistsCard from "../PsychologistsCard/PsychologistsCard.jsx";
import css from "./PsychologistsList.module.css";

export default function PsychologistsList() {
  const [psychologists, setPsychologists] = useState([]);
  const [ error, setError] = useState(null); 

    useEffect(() => {
    const getAllPsychologists = async () =>{
      try{
        const data = await getPsychologists();
        setPsychologists(data);
      } catch(error){
        setError(error);
        console.error("Error fetching psychologists:", error);
      }
    }
    getAllPsychologists();
  }, []);
  

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {psychologists.map((psychologist) => (
          <li key={psychologist.name}>
            <PsychologistsCard psychologist={psychologist} />
          </li>
        ))}
      </ul>
      {error && <p>Error loading psychologists: {error}</p>}
    </div>
  );
}
