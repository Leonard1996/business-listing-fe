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

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/evaluation" component={Evaluation} />
        <Route path="/grow" component={Grow} />
        <Route path="/sell" component={Sell} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
