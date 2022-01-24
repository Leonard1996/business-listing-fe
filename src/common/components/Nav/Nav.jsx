import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useScrollTrigger, Drawer, breadcrumbsClasses } from "@mui/material";
import React, { useContext } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
//

import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AuthContext } from "../../../context/Auth/Auth";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SellIcon from "@mui/icons-material/Sell";
import TimelineIcon from "@mui/icons-material/Timeline";
import logo from "../../../assets/images/grow.png";
//

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
    fill: trigger ? "black" : "#d4ae36",
    transform: trigger ? "scale(1.0)" : "scale(1.75)",
  };

  const [drawer, setDrawer] = React.useState(false);

  return (
    <>
      <AppBar sx={style} elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} width={80} />
          <div>
            <MenuIcon sx={iconStyle} onClick={() => setDrawer(true)} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="right">
        <Routes onClose={() => setDrawer(false)} />
      </Drawer>
    </>
  );
}

const Routes = ({ onClose }) => {
  const { accessToken } = useContext(AuthContext);
  const icons = [<HomeIcon />, <AddBusinessIcon />, <SellIcon />, <TimelineIcon />];

  const history = useHistory();
  const handleClick = (index) => {
    switch (index) {
      case 0:
        history.push("/");
        onClose();
        break;
      case 1:
        history.push("/buy-businesses");
        onClose();
        break;
      case 2:
        history.push("/sell");
        onClose();
        break;
      case 3:
        history.push("/grow");
        onClose();
        break;
      case 4:
        history.push("/signin");
        onClose();
        break;
      case 10:
        history.push("/dashboard");
        onClose();
        break;
      default:
        localStorage.clear();
        window.location.reload(false);
        onClose();
    }
  };
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["Home", "Buy Businesses", "Sell your business", "Grow your business"].map((text, index) => (
          <ListItem button key={text} onClick={() => handleClick(index)}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {!accessToken && (
          <ListItem button onClick={() => handleClick(4)}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Authenticate" />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {accessToken &&
          ["Dashboard", "Sign out"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleClick(index + 10)}>
              <ListItemIcon>
                {text === "Dashboard" && <DashboardIcon sx={{ fill: "#d4ae36" }} />}
                {text === "Sign out" && <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
