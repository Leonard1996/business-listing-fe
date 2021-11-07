import { CardContent, Grid, Typography, Card, Box, Button, useMediaQuery } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./Primary.module.scss";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import shine from "../../../assets/images/shine.svg";

export default function Primary() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Grid container>
      <Grid item xs={12} sx={{ backgroundColor: "#D4AE36" }}>
        <Typography variant="h5" textAlign="center" mt={4} sx={{ fontWeight: "bold" }}>
          It's Free, Quick and Easy
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          background: "linear-gradient(to bottom, #D4AE36 50%, white 0%)",
          display: "flex",
          justifytContent: "center",
          padding: "2rem",
          marginTop: "-1px",
        }}
      >
        <Card elevation={2} sx={{ width: "100vw" }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <div className={styles["card-container"]}>
                  <div className={styles["icon-container"]}>
                    <AccessTimeIcon sx={{ transform: "scale(3.5)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    On Your Marks
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Think like a buyer - you’ll need to know your stuff. Your latest accounts are a great place to
                      start, but consider what else you’d like to know if you were buying your business.
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={styles["card-container"]}>
                  <div className={styles["icon-container"]}>
                    <LightbulbIcon sx={{ transform: "scale(3.5)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    Get Set
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Got a price in mind? Great... use it. Not sure? Don’t worry... we’ve got you covered. With your
                      input and the latest market data, our free valuation calculator will give you an instant price
                      range.
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={styles["card-container"]}>
                  <div className={styles["icon-container"]}>
                    <ArrowCircleUpIcon sx={{ transform: "scale(3.5) rotate(90deg)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    Go!
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Step-by-step, Valhalla will guide you through creating your 5-star business listing. This simple
                      process gathers key information and presents it in a way that means potential buyers will find
                      your business quickly.
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
            }}
          >
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
              How Much Will it Cost to
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
              Sell Your Business?
            </Typography>
            <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
              Nothing, Nada... Zip!
            </Typography>
            <Box mt={3} sx={{ textAlign: "center" }}>
              <Button variant="contained" className={styles["card__button"]}>
                <Typography variant="caption">Sell for free</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "400px",
              alignItems: "center",
            }}
          >
            <video width="355" height="280" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p>
          <Typography variant="h6" sx={{ fontWeight: "bold", padding: "2rem 2rem 0 2rem" }}>
            Okay, You’re Listed... Now What?
          </Typography>
        </p>
      </Grid>
      <Grid item md={6} sm={8} xs={12}>
        <div className={styles["container"]}>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
              Connect with Buyers
            </Typography>
          </div>
          <p>
            <Typography
              variant="body1"
              component="h1"
              sx={{
                fontWeight: "light",
                paddingLeft: isSmallScreen ? "2.5rem" : "5rem",
                paddingRight: isSmallScreen ? "2.5rem" : "5rem",
              }}
            >
              As soon as you’re live over 100,000 buyers will instantly see your listing and will automatically be
              matched if they’re look- ing for a business just like yours Valhalla will alert you whenever a potential
              buyer interacts with your business. Any enquiries will be sent to you directly, and you can also track
              your business’s sale performance
            </Typography>
          </p>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
              Negotiate
            </Typography>
          </div>
          <p>
            <Typography
              variant="body1"
              component="h1"
              sx={{
                fontWeight: "light",
                paddingLeft: isSmallScreen ? "2.5rem" : "5rem",
                paddingRight: isSmallScreen ? "2.5rem" : "5rem",
              }}
            >
              Once matched, you’ll start to receive offers. It’s now time to get your negotiating hat on and work with
              buyers to achieve the best possible price for your business
            </Typography>
          </p>
          <div className={styles["container__options"]}>
            <CheckCircleOutlineIcon fontSize="large" sx={{ fill: "#D4AD36" }} />
            <Typography variant="body1" component="span" sx={{ fontWeight: "bold", paddingLeft: "1rem" }}>
              Complete
            </Typography>
          </div>
          <p>
            <Typography
              variant="body1"
              component="h1"
              sx={{
                fontWeight: "light",
                paddingLeft: isSmallScreen ? "2.5rem" : "5rem",
                paddingRight: isSmallScreen ? "2.5rem" : "5rem",
              }}
            >
              As everything comes together, you and your chosen buyer will work together towards a completion date. This
              is the day that the money will land in your pocket... yippee! Your busi- ness has officially changed
              hands... and that’s that!
            </Typography>
          </p>
        </div>
      </Grid>
      <Grid item md={5} sm={4} xs={12}>
        <div className={styles.shine}>
          <img src={shine} />
        </div>
      </Grid>
    </Grid>
  );
}
