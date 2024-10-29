import MainBtn from "../../components/MainBtn/MainBtn";
import { useNavigate } from "react-router-dom";
import {
  Question,
  People,
  CheckSquare,
  ArrowUpRight,
} from "react-bootstrap-icons";
import css from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const handleMainBtn = () => {
    navigate("/psychologists");
  };

  return (
    <>
      <section className={css.wrap}>
        <div className={css.left}>
          <h1 className={css.title}>
            The road to the <span className={css.accent}>depths</span> of the
            human soul
          </h1>
          <h3 className={css.text}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </h3>
          <MainBtn onClick={handleMainBtn}>
            Get started
            <ArrowUpRight className={css.arrowIcon}></ArrowUpRight>
          </MainBtn>
        </div>

        <div className={css.right}>
          <img className={css.img} src="/heroImage.png" alt="hero-image" />

          <div className={css.expPsyco}>
            <div className={css.checkCont}>
              <CheckSquare className={css.iconCheck}></CheckSquare>
            </div>
            <div className={css.textCont}>
              <p className={css.expPsycoText}>
                Experienced psychologists
                <span className={css.whiteAssent}>15,000</span>
              </p>
            </div>
          </div>

          <div className={css.mainQuestCont}>
            <Question className={css.svgMainQuestion}></Question>
          </div>

          <div className={css.people}>
            <People className={css.peopleIcon}></People>
          </div>
        </div>
      </section>
    </>
  );
}
