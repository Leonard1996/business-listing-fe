import Hero from "../../common/components/Hero/Hero";
import Primary from "../Homepage/components/Primary/Primary";
import Secondary from "./components/Secondary/Secondary";
import Tertiary from "./components/Tertiary/Tertiary";
import Slider from "../../common/components/Slider/Slider";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Primary />
      <Secondary />
      <Tertiary />
      <Slider />
    </>
  );
}
