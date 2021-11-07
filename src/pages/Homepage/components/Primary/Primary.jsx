import { CardContent, Grid, Typography, Card, Box, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styles from "./Primary.module.scss";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function Primary() {
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
                    <AddShoppingCartIcon sx={{ transform: "scale(3.5)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    BUY
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu lorem et turpis hendrerit
                      volutpat. Vivamus consequat leo id dolor varius, quis semper est interdum. Morbi et pulvinar
                      nulla.
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={styles["card-container"]}>
                  <div className={styles["icon-container"]}>
                    <TrendingUpIcon sx={{ transform: "scale(3.5)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    GROW
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu lorem et turpis hendrerit
                      volutpat. Vivamus consequat leo id dolor varius, quis semper est interdum. Morbi et pulvinar
                      nulla.
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={styles["card-container"]}>
                  <div className={styles["icon-container"]}>
                    <LocalAtmIcon sx={{ transform: "scale(3.5)" }} />
                  </div>
                  <Typography color="#D4AE36" variant="h6" textAlign="center">
                    SELL
                  </Typography>
                  <div className={styles["description"]}>
                    <Typography textAlign="center" variant="subtitle2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu lorem et turpis hendrerit
                      volutpat. Vivamus consequat leo id dolor varius, quis semper est interdum. Morbi et pulvinar
                      nulla.
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
    </Grid>
  );
}
