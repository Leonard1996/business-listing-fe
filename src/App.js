import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Nav from "./common/components/Nav/Nav";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./common/components/Footer/Footer";
import Evaluation from "./pages/Evaluation/Evaluation";
import Grow from "./pages/Grow/Grow";
import Sell from "./pages/Sell/Sell";
import Authenticate from "./pages/Authenticate/Authenticate";
import AuthProvider from "./context/Auth/Auth";
import Login from "./pages/Authenticate/Login";
import PrivateRoute from "./common/PrivateRoute/PrivateRoute";
import ActivateAccount from "./pages/ActivateAccount/ActivateAccount";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/evaluation" component={Evaluation} />
          <Route path="/grow" component={Grow} />
          <Route path="/sell" component={Sell} />
          <Route path="/signup" component={Authenticate} />
          <Route path="/signin" component={Login} />
          <Route path="/verify/:token" component={ActivateAccount} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
