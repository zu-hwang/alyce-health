import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import {} from 'redux';
import Home from 'pages/Home';
import Bookmark from 'pages/Bookmark';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/bookmark" component={Bookmark}></Route>
      </Switch>
    </Router>
  );
};

export default Routes;
