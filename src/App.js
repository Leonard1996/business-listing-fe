import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from "./common/components/Nav/Nav";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./common/components/Footer/Footer";
import Evaluation from "./pages/Evaluation/Evaluation";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/evaluation" component={Evaluation} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
