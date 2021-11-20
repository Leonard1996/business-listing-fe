import { Grid } from "@mui/material";
import Menu from "./Components/Menu/Menu";
import React from "react";

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [openSecondary, setOpenSecondary] = React.useState(false);

  return (
    <Grid container sx={{ marginTop: "100px", backgroundColor: "#eee", minHeight: "100vh" }}>
      <Grid item xs={0} sm={1} lg={2} />
      <Grid item xs={12} sm={4} lg={2} sx={{ backgroundColor: "white" }}>
        <Menu
          handleClick={() => setOpen(!open)}
          open={open}
          openSecondary={openSecondary}
          handleClickSecondary={() => setOpenSecondary(!openSecondary)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        hello 2
      </Grid>
    </Grid>
  );
}
