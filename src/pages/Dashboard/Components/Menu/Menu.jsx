import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Menu({ handleClick, open, handleClickSecondary, openSecondary, history }) {
  const handleRedirectClick = (route) => {
    history.push("/dashboard/" + route);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="My Account" sx={{ color: "#D4AE36" }} primaryTypographyProps={{ variant: "h5" }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleRedirectClick("my-details")}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="My details" onClick={handleRedirectClick} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleRedirectClick("saved-businesses")}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Saved Businesses" />
          </ListItemButton>
          <Divider variant="middle" />
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickSecondary}>
        <ListItemText primary="My Business" sx={{ color: "#D4AE36" }} primaryTypographyProps={{ variant: "h5" }} />
        {openSecondary ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSecondary} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleRedirectClick("my-business")}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <p>my-business</p>
          </ListItemButton>
          <Divider variant="middle" />
        </List>
      </Collapse>
    </List>
  );
}
