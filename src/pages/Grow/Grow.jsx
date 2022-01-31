import { Grid, Box, TextField, useMediaQuery, Button, Typography } from "@mui/material";
import Category from "./components/Category";
import Hero from "../../common/components/Hero/Hero";
import styles from "./components/Category.module.scss";
import banner from "../../assets/images/grow.jpeg";
import React from "react";

const categories = ["Hot Topics", "Guides", "Business Insights"];
const homepageStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};

export default function Grow() {
  const searchRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = searchRef.current.value.trim().split(" ").join("+");
    window.open("https://valhallainvestments.co.uk/?s=" + query, "_blank");
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Hero src={banner} homepageStyles={homepageStyles}>
        <BannerContent />
      </Hero>
      <Grid container sx={{ margin: "3rem auto" }}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2} sx={{ textAlign: isSmallScreen ? "center" : "right", padding: "0 2rem" }}>
              <TextField
                size="small"
                placeholder="Search"
                inputRef={searchRef}
                sx={{
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    background: "#DDD!important",
                    "& fieldset": {
                      borderColor: "black",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
            </Box>
          </form>
        </Grid>
        {categories.map((category, _index) => (
          <Grid item xs={12} key={_index}>
            <Box p={4}>
              <Category title={category} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const BannerContent = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <Box marginLeft="4rem">
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "500",
            textShadow: `1px 1px 1px #000, 
               3px 3px 5px black`,
          }}
        >
          Grow Your Business
        </Typography>
        <Box my={2}>
          <TextField
            label="Email adress"
            variant="outlined"
            size="small"
            sx={{
              "& label.Mui-focused": {
                color: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black",
              },
              "& .MuiOutlinedInput-root": {
                background: "white!important",
                "& fieldset": {
                  borderColor: "black",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
          />
          <Box
            sx={{ display: isSmallScreen ? "block" : "inline-block" }}
            marginX={isSmallScreen ? 0 : 2}
            marginY={isSmallScreen ? 2 : 0}
          >
            <Button variant="contained" className={styles["card__button"]}>
              <Typography variant="caption">Join</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
