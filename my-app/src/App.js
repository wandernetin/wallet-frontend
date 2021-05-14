import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthService from './services/auth.service';

import Layout from './main/layout';
import Login from './login/login';

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/main.css';

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  const loggedIn = AuthService.isUserAuth();
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
            <Redirect
              to="/login"
            />
          );
      }}
    />
  );
};

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/" component={Layout} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;