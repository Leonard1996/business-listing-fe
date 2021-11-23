import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { accessToken } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => (!!accessToken ? <RouteComponent {...routeProps} /> : <Redirect to={"/signin"} />)}
    />
  );
};

export default PrivateRoute;
