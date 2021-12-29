import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import React from "react";
import SavedBusinessList from "../Dashboard/components/SavedBusinessList/SavedBusinessList";

export default function FilterForm() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [count, setCount] = React.useState(0);
  return (
    <Grid container sx={{ minheight: "100vh", marginTop: "150px" }}>
      <Grid item xs={12} md={8} sx={{ backgroundColor: "#DDDDDD" }}>
        <Box p={3}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: "800" }}>
                Businesses For Sale
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
              <Typography variant="h5" sx={{ fontWeight: "800", color: "#D5B552" }} display="inline">
                {count}
              </Typography>
              <Box sx={{ display: "inline", marginLeft: "0.5rem" }}>
                <Typography variant="h5" display="inline">
                  Available
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="body2" sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
                We understand that it’s an exciting prospect to buy a business. The idea of being your own boss can be
                an appealing career move. That’s why we’ve ensured we have the best businesses for sale across the UK.
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
                No matter what type of business you’re looking for, we’ll have one. Want to buy an online business, a
                small business, or a high street business? Bizdaq will find the perfect business for you.
              </Typography>
              <Typography variant="body2">
                We have a range of opportunities to suit your pocket, from start-ups to long es- tablished businesses
                and everything in between.
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
                Interested? Browse our business listings and see what businesses are for sale now.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12}>
          <Box p={isSmallScreen ? 0 : 3}>
            <SavedBusinessList hidden={true} isFilter={true} setFilterCount={setCount} />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box p={3}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              Refine
            </Typography>
            <Typography variant="h6">Reset</Typography>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
}
