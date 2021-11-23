import { Grid } from "@mui/material";
import Menu from "./components/Menu/Menu";
import React from "react";
import PrivateRoute from "../../common/components/PrivateRoute/PrivateRoute";
import MyDetails from "./components/MyDetails/MyDetails";

export default function Dashboard(props) {
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
          {...props}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrivateRoute exact path={props.match.url + "/" + "my-details"} component={MyDetails} />
        <PrivateRoute exact path={props.match.url + "/" + "saved-businesses"} component={test2} />
        <PrivateRoute exact path={props.match.url + "/" + "my-business"} component={test3} />
      </Grid>
    </Grid>
  );
}

const test1 = () => <p>my-det</p>;
const test2 = () => <p>saved</p>;
const test3 = () => <p>my-bus</p>;
