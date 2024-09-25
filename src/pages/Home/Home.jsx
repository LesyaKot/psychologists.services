import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import css from "./Home.module.css";

export default function Home() {
  return (
    <>

     <Header></Header>
      <h1>The road to the depths of the human soul</h1>
      <h3>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </h3>
      <img src="/heroImage.png" alt="hero-image"/>
      <Button>Get started</Button>
    </>
  );
}
