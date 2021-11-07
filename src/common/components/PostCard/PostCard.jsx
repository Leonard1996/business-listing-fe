import { Card, CardContent, Grid, Button, Typography, Box } from "@mui/material";
import styles from "./PostCard.module.scss";

export default function PostCard() {
  return (
    <Card elevation={4} sx={{ width: "280px", margin: "1rem" }}>
      <CardContent sx={{ padding: "0" }}>
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b2ZmaWNlJTIwd29ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundPosition: "right, left",
                height: "150px",
                width: "280px",
              }}
            ></div>
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <Typography textAlign="center" sx={{ fontWeight: "bold", color: "#d4ae36" }}>
                RESTRUCTURING POST-COV- ID? MAKE SURE YOU GET IT RIGHT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={1}>
              <Typography variant="body2" textAlign="center" sx={{ fontWeight: "light" }}>
                Many businesses are facing staff changes post-COVID, often as a result of restructuring and cost
                reduction. Full of practical advice, the session will explore how to set up your business so the right
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Box my={1} mx={2}>
                <Button variant="contained" className={styles["card__button"]}>
                  <Typography variant="caption" sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
                    Buy
                  </Typography>
                </Button>
              </Box>
            </div>
            <div>
              <Box my={1} mx={2}>
                <Button variant="contained" className={styles["card__button__reduced"]}>
                  <Typography variant="caption" sx={{ fontSize: "0.5rem", fontWeight: "bold" }}>
                    Guides
                  </Typography>
                </Button>
              </Box>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ padding: "12px 16px 0 0", display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: "bold", cursor: "pointer" }}>
              Read Article
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
