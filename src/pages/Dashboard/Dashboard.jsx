import { Grid, useMediaQuery } from "@mui/material";
import Menu from "./components/Menu/Menu";
import React from "react";
import PrivateRoute from "../../common/components/PrivateRoute/PrivateRoute";
import MyDetails from "./components/MyDetails/MyDetails";
import MyBusiness from "./components/MyBusiness/MyBusiness";
import SavedBusinessList from "./components/SavedBusinessList/SavedBusinessList";

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(false);
  const [openSecondary, setOpenSecondary] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const smallScreenStyle = isSmallScreen
    ? {
        display: "flex",
        justifyContent: "center",
      }
    : {};

  return (
    <Grid container sx={{ marginTop: "100px", backgroundColor: "#eee", minHeight: "100vh" }}>
      <Grid item xs={0} sm={1} lg={2} />
      <Grid item xs={12} sm={4} lg={2} sx={{ backgroundColor: "white", ...smallScreenStyle }}>
        <Menu
          handleClick={() => setOpen(!open)}
          open={open}
          openSecondary={openSecondary}
          handleClickSecondary={() => setOpenSecondary(!openSecondary)}
          {...props}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrivateRoute exact path={props.match.url + "/" + "my-details"} component={MyDetails} />
        <PrivateRoute exact path={props.match.url + "/" + "saved-businesses"} component={SavedBusinessList} />
        <PrivateRoute exact path={props.match.url + "/" + "my-business"} component={MyBusiness} />
      </Grid>
    </Grid>
  );
}

const test2 = () => <p>saved</p>;
