import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Switch, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../imports/containers/App.js';
import HomeContainer from '../imports/containers/Home.js';
import LoginContainer from '../imports/containers/Login.js';
import ListContainer from '../imports/containers/List.js';
import CarouselContainer from '../imports/containers/Carousel.js';




const browserHistory = createBrowserHistory();

export const renderRoutes = () => {
  var routeToLoad = '/app';

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/list" component={ListContainer}/>
        <Route exact path="/home" component={HomeContainer}/>
        <Route exact path="/carousel" component={CarouselContainer}/>
        <Route exact path="/" component={LoginContainer}/>
      </Switch>
    </Router>
  );
}
