import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './router/App';

import { Provider } from 'react-redux';
import MainScreen from './screen/main';

import store from './store';
import './config/Fonts/Font.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MainScreen></MainScreen>
  </Provider>,
  {
    /* </React.StrictMode>, */
  },
);
