import Hero from "../../common/components/Hero/Hero";
import Tertiary from "../Homepage/components/Tertiary/Tertiary";
import Primary from "./components/Primary/Primary";
import Quote from "./components/Quote/Quote";
import Slider from "../../common/components/Slider/Slider";
import styles from "./components/Primary/Primary.module.scss";
import { Box, Button, Typography } from "@mui/material";
const homepageStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function Sell() {
  return (
    <>
      <Hero
        src={
          "https://valhallainvestments.co.uk/wp-content/uploads/2020/06/Valhalhalla_Mergers-Acquisitions_1600x1120-1.jpg"
        }
        homepageStyles={homepageStyles}
      >
        <BannerContent />
      </Hero>
      <Primary />
      <Quote />
      <Tertiary />
      <Slider />
    </>
  );
}

const BannerContent = () => {
  return (
    <div>
      <Box p={3}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "500",
            textShadow: `1px 1px 1px #000, 
               3px 3px 5px black`,
          }}
        >
          Sell Your Business For
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "500",
            textShadow: `1px 1px 1px #000, 
               3px 3px 5px black`,
          }}
        >
          FREE
        </Typography>
        <Box marginY={1}>
          <Button variant="contained" className={styles["card__button"]}>
            <Typography variant="caption">Sell for free</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};
