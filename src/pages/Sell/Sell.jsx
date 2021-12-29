import Hero from "../../common/components/Hero/Hero";
import Tertiary from "../Homepage/components/Tertiary/Tertiary";
import Primary from "./components/Primary/Primary";
import Quote from "./components/Quote/Quote";
import Slider from "../../common/components/Slider/Slider";

export default function Sell() {
  return (
    <>
      <Hero
        src={
          "https://valhallainvestments.co.uk/wp-content/uploads/2020/06/Valhalhalla_Mergers-Acquisitions_1600x1120-1.jpg"
        }
      />
      <Primary />
      <Quote />
      <Tertiary />
      <Slider />
    </>
  );
}
