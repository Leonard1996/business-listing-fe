import Hero from "../../common/components/Hero/Hero";
import Primary from "../Homepage/components/Primary/Primary";
import Secondary from "./components/Secondary/Secondary";
import Tertiary from "./components/Tertiary/Tertiary";
import Slider from "../../common/components/Slider/Slider";

export default function Homepage() {
  return (
    <>
      <Hero
        src={"https://valhallainvestments.co.uk/wp-content/uploads/2020/06/Valhalhalla_Business-Planning_1600x1120.jpg"}
      />
      <Primary />
      <Secondary />
      <Tertiary />
      <Slider />
    </>
  );
}
