import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostCard from "../PostCard/PostCard";
import { Grid } from "@mui/material";
import styles from "./Slider.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// const posts = new Array(5).fill(true);
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1700 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1700, min: 1024 },
    items: 4,
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

export default function Slider({ category }) {
  const [posts, setPosts] = useState([]);
  const categoryIdMap = {
    Buy: 1,
    // Buy: 65,
    "Hot Topics": 1,
    Guides: 1,
    "Business Insights": 1,
    Uncategorised: 1,
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        `https://valhallainvestments.co.uk/wp-json/wp/v2/posts?categories=${categoryIdMap[category]}`
      );
      setPosts(data);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        {posts && posts.length ? (
          <Carousel responsive={responsive} infinite={true}>
            {posts.map((post, _index) => {
              const {
                link,
                title: { rendered },
                excerpt: { rendered: excertpRendered },
              } = post;
              return (
                <div className={styles["container"]} key={_index}>
                  <PostCard
                    category={category}
                    link={link}
                    title={rendered}
                    excerpt={excertpRendered}
                    media={post["_links"]?.["wp:featuredmedia"]?.[0]?.href}
                  />
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </Grid>
    </Grid>
  );
}
