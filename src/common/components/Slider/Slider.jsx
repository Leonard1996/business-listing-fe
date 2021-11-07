import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostCard from "../PostCard/PostCard";
import { Grid } from "@mui/material";
import styles from "./Slider.module.scss";

const posts = new Array(5).fill(true);
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Slider() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Carousel responsive={responsive} infinite={true}>
          {posts.map((post, _index) => (
            <div className={styles["container"]} key={_index}>
              <PostCard />
            </div>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
