import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, useScrollTrigger, Drawer } from "@mui/material";
import React from "react";
//

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
    fill: "black",
  };

  const [drawer, setDrawer] = React.useState(false);

  return (
    <>
      <AppBar sx={style} elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={
              "https://valhallainvestments.co.uk/wp-content/uploads/2019/09/Valhalla-Investment_Logo-Long_210x100-01.png"
            }
          />
          <div>
            <MenuIcon sx={iconStyle} onClick={() => setDrawer(true)} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)} anchor="right">
        {routes()}
      </Drawer>
    </>
  );
}

const routes = () => (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Box>
);
