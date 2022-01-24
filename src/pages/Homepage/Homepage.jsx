import Hero from "../../common/components/Hero/Hero";
import Primary from "../Homepage/components/Primary/Primary";
import Secondary from "./components/Secondary/Secondary";
import Tertiary from "./components/Tertiary/Tertiary";
import Slider from "../../common/components/Slider/Slider";
import { Box, Button, Typography } from "@mui/material";
import styles from "./components/Primary/Primary.module.scss";
import banner from "../../assets/images/homepage.jpeg";

const homepageStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Homepage() {
  return (
    <>
      <Hero src={banner} homepageStyles={homepageStyles}>
        <BannerContent />
      </Hero>
      <Primary />
      <Secondary />
      <Tertiary />
      <Slider category="Uncategorised" />
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
          textAlign="center"
        >
          Buy, Grow & Sell Your Business
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "500",
            textShadow: `1px 1px 1px #000, 
               3px 3px 5px black`,
          }}
          textAlign="center"
        >
          for FREE
        </Typography>
        <Box sx={{ textAlign: "center" }} marginY={1}>
          <Button variant="contained" className={styles["card__button"]}>
            <Typography variant="caption">Sell for free</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};
