import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import EditUser from "./component/EditUser";

function App() {
  return (
    <Router className="App__container">
      <Routes />
    </Router>
  );
}

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/home" component={Home} />
      <ProtectedLogin path="/login" component={Login} />
      {/* <Route path="/home" component={Home} /> */}
      <Route path="/register" component={Register} />
      <PrivateRoute path="/user/:id" component={EditUser} />
    </Switch>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? <Component /> : <Redirect to="login" />)}
    />
  );
};

const ProtectedLogin = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={() => (!isLoggedIn ? <Component /> : <Redirect to="/home" />)}
    />
  );
};
export default App;
