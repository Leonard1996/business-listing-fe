import { Grid, Card, CardContent, Typography, Box, useMediaQuery } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import styles from "./Quote.module.scss";

export default function Quote() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Card sx={{ width: isSmallScreen ? "370px" : "450px", margin: "2rem auto" }}>
      <CardContent sx={{ backgroundColor: "#DDDDDD" }}>
        <div className={styles["container__quote"]}>
          <div>
            <FormatQuoteIcon sx={{ transform: "scale(2.5) rotate(180deg)", fill: "#596367" }} />
          </div>
          <div>
            <Typography textAlign="center" variant="h6">
              Valhalla helped me get removed
            </Typography>
            <Typography textAlign="center" variant="h6">
              from the day to day running of the
            </Typography>
            <Typography textAlign="center" variant="h6">
              company and got the business sold
            </Typography>
            <Typography textAlign="center" variant="h6">
              for me in a month.
            </Typography>
          </div>
          <div>
            <FormatQuoteIcon sx={{ transform: "scale(2.5)", fill: "#596367" }} />
          </div>
        </div>
        <div>
          <Box marginTop={3} marginBottom={3}>
            <Typography textAlign="center" variant="body1" sx={{ fontWeight: "700" }}>
              Terry Steel
            </Typography>
            <Typography textAlign="center" variant="subtitle1" sx={{ fontWeight: "light" }}>
              The Wedding Guide
            </Typography>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}
