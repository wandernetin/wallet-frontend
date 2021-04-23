import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from './main/layout';

import './assets/css/main.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={Layout} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;