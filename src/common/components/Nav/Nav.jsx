import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, useScrollTrigger } from "@mui/material";

export default function Nav() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const style = {
    backgroundColor: trigger ? "white" : "transparent",
    color: "black",
    transition: trigger ? "0.3s" : "0.5s",
    boxShadow: "none",
    padding: "10px 0px",
  };

  const iconStyle = {
    fill: "black",
  };

  return (
    <AppBar sx={style} elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Logo</Typography>
        <div>
          <MenuIcon sx={iconStyle} />
        </div>
      </Toolbar>
    </AppBar>
  );
}
