import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/landing";
import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Courses from "./components/courses/courses"


//for redux
import  {Provider} from "react-redux";
import store from "./store"

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router>
        <div id="page">
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/courses" component={Courses} />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
