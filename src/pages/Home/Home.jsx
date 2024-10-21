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
            The road to the depths of the human soul
          </h1>
          <h3>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </h3>
        </div>
        <div className={css.right}>
          <img className={css.img} src="/heroImage.png" alt="hero-image" />

          <div>
            <CheckSquare className={css.iconCheck}></CheckSquare>
          </div>

          <p className={css.expPsyco}>
            Experienced psychologists
            <span className={css.whiteAssent}>15,000</span>
          </p>

          <div>
            <Question className={css.svgMainQuestion}></Question>
          </div>
          <div className={css.user}>
            <People className={css.user}></People>
          </div>
        </div>

        <MainBtn onClick={handleMainBtn}>
          Get started
          <ArrowUpRight className={css.user}></ArrowUpRight>
        </MainBtn>
      </section>
    </>
  );
}
