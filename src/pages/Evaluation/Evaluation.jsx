import { Grid, Typography, Button, Box, useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "./Evaluation.module.scss";

export default function Evaluation() {
  const isMediumScreen = useMediaQuery("(max-width:900px)");

  return (
    <Grid container sx={{ marginTop: "100px" }}>
      <Grid
        item
        md={6}
        xs={12}
        sx={
          !isMediumScreen
            ? { paddingLeft: "4rem", paddingRight: "1rem", marginBottom: "100px" }
            : { padding: "1.5rem 4rem 0 1rem", marginBottom: "50px" }
        }
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          FREE Valuation
        </Typography>
        <div className={styles["container"]}>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "light", paddingLeft: "1rem" }}>
              Get a business valuation in 60 seconds
            </Typography>
          </div>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "light", paddingLeft: "1rem" }}>
              Only 3 questions to answer
            </Typography>
          </div>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "light", paddingLeft: "1rem" }}>
              It's free, quick {"&"} easy
            </Typography>
          </div>
        </div>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            How Does Valhalla Value a Business?
          </Typography>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              To put it simply, we’ve got a really clever tool - we call it our Valuation Calculator... cool name,
              right?
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              We’ll ask you 3 simple questions about your business. This information is com- bined with our knowledge of
              the market to provide you with a valuation range
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              which you might expect to achieve for your sale This free business valuation is quick and simple, so what
              are you waiting for? Get started now
            </Typography>
          </p>
          <Box mt={3}>
            <Button variant="contained" className={styles["card__button"]}>
              <Typography variant="caption">Start now</Typography>
            </Button>
          </Box>
        </div>
      </Grid>
      <Grid item md={6} xs={12} sx={{ backgroundColor: "#DDDDDD", padding: "1.5rem 4rem 0 1rem" }}>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            How to Value a Business
          </Typography>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              Wondering “how do I value my business?” well, you’re not alone - this is a common question
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              There are lots of ways to value a business to find out how much a company is worth. The most common way is
              to base the valuation on turnover or net profit
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              If you’re valuing a company based on net profit, you must make sure you adjust your figures by adding back
              any exceptional costs that the business has incurred. Then, use a market multiple and consider any assets
              and liabilities to work out how much your busi- ness is worth
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              It might seem like working out the value of a business is complicat- ed, but an accurate company valuation
              is key to balancing getting the highest price vs. a quick business sale
            </Typography>
          </p>
          <p>
            <Typography variant="body2" sx={{ fontWeight: "light" }}>
              Want to value your business for sale? Click 'Start Now' to begin
            </Typography>
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
