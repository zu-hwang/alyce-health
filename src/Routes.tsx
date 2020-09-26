import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import {} from 'redux';
import Home from 'components/Home';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/BookMark" component={BookMark}></Route> */}
      </Switch>
    </Router>
  );
};

export default Routes;
