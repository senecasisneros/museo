import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const css = require('./Styles/style.css');
import globalStyles from './assets/styles/global.css';
render(
  <App />,
  document.getElementById('root')
);
