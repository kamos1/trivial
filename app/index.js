import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import { browserRouter as Router } from 'react-router-dom';
import { browserHistory } from 'react-router';

render(
  // <Router history={browserHistory}>
      <App /> , document.getElementById('main-app')
  // </Router>
)
