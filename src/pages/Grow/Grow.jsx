import { Grid, Box, TextField, useMediaQuery } from "@mui/material";
import Category from "./components/Category";
import Hero from "../../common/components/Hero/Hero";

const categories = ["Hot Topics", "Guides", "Business Insights"];

export default function Grow() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Hero
        src={"https://valhallainvestments.co.uk/wp-content/uploads/2020/06/Valhalhalla_Accountability_1600x1120.jpg"}
      />
      <Grid container sx={{ margin: "3rem auto" }}>
        <Grid item xs={12}>
          <form>
            <Box marginBottom={2} sx={{ textAlign: isSmallScreen ? "center" : "right", padding: "0 2rem" }}>
              <TextField
                size="small"
                placeholder="Search"
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
