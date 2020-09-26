import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'src/components/Home';
import GlobalStyle from 'src/styles/globalStyle';

const Routes = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/BookMark" component={BookMark}></Route> */}
      </Switch>
    </Router>
  );
};

export default Routes;
