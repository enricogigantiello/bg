import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import App from '../imports/containers/App.js';
import { renderRoutes } from './routes.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
