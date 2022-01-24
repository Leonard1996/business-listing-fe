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
import PrivateRoute from "./common/components/PrivateRoute/PrivateRoute";
import ActivateAccount from "./pages/ActivateAccount/ActivateAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Business from "./pages/Business/Business";
import FilterForm from "./pages/FilterForm/FilterForm";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const theme = createTheme({
  palette: {
    warning: {
      main: '#d4ae36',
    },
    secondary: {
      main: '#d4ae36',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/change-password/:token" component={ResetPassword} />
            <Route path="/evaluation" component={Evaluation} />
            <Route path="/grow" component={Grow} />
            <Route path="/sell" component={Sell} />
            <Route path="/signup" component={Authenticate} />
            <Route path="/buy-businesses" component={FilterForm} />
            <Route path="/admin-panel" component={Users} />
            <Route path="/signin" component={Login} />
            <Route path="/verify/:token" component={ActivateAccount} />
            <Route exact path="/businesses/:businessId" component={Business} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
