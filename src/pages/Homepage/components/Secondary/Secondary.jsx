import { Typography, Grid, Card, CardContent, Box, Button } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import styles from "./Secondary.module.scss";

export default function Secondary() {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ backgroundColor: "#D4AE36" }}>
        <Typography variant="h5" textAlign="center" mt={4} sx={{ fontWeight: "bold" }}>
          Every Day, Valhalla Helps Business Owners Achieve Thier Goals
        </Typography>
        <Typography variant="subtitle2" textAlign="center" mt={4} sx={{ fontWeight: "light" }}>
          Don't believe us? We're rated Excelent on Trustpilot
        </Typography>
        <div className={styles["container"]}>
          <div className={styles["container__main"]}>
            <span>
              <StarOutlinedIcon sx={{ fill: "#01B779", transform: "scale(1.3)", margin: "6px" }} fontSize="large" />
            </span>
            <Typography variant="h5" component="span" sx={{ color: "white", fontWeight: "bold" }}>
              Trustpilot
            </Typography>
          </div>
          <div className={styles["container__secondary"]}>
            <div>
              <StarOutlinedIcon sx={{ fill: "#FEFEFF" }} />
            </div>
            <div>
              <StarOutlinedIcon sx={{ fill: "#FEFEFF" }} />
            </div>
            <div>
              <StarOutlinedIcon sx={{ fill: "#FEFEFF" }} />
            </div>
            <div>
              <StarOutlinedIcon sx={{ fill: "#FEFEFF" }} />
            </div>
            <div className={styles["container__secondary--last"]}>
              <StarOutlinedIcon sx={{ fill: "#FEFEFF" }} />
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          background: "linear-gradient(to bottom, #D4AE36 50%, white 0%)",
          display: "flex",
          justifytContent: "center",
          padding: "2rem",
          marginTop: "-2px;",
        }}
      >
        <Card elevation={2} sx={{ width: "100vw" }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <Box mt={3}>
                  <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
                    How Much Is Your
                  </Typography>
                  <Typography variant="h6" textAlign="center" sx={{ fontWeight: "bold" }}>
                    Business Worth?
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
                    Find out with a FREE {"&"} instant
                  </Typography>
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
                    business valuation
                  </Typography>
                </Box>
                <Box mt={3} sx={{ textAlign: "center" }}>
                  <Button variant="contained" className={styles["card__button"]}>
                    <Typography variant="caption">Start now</Typography>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ textAlign: "center" }} my={3}>
                  <img src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
