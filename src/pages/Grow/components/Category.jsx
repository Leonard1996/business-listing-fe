import { Typography, Box, Button } from "@mui/material";
import Slider from "../../../common/components/Slider/Slider";
import styles from "./Category.module.scss";

export default function Category({ title }) {
  return (
    <>
      <Box marginBottom={5}>
        <Typography variant="h4" sx={{ color: "#D4AE36", fontWeight: "700" }}>
          {title}
        </Typography>
      </Box>
      <Slider category={title} />
      <Box mt={3} sx={{ textAlign: "center" }}>
        <Button variant="contained" className={styles["card__button"]}>
          <Typography variant="caption">View All</Typography>
        </Button>
      </Box>
    </>
  );
}
