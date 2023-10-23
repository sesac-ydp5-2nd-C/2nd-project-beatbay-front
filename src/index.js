import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import MainScreen from './screen/main';
import SignUpForm from './screen/user/register';
import LoginModal from './screen/user/login';
import ParentComponent from './screen/main';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <ParentComponent></ParentComponent> */}
    {/* <LoginModal /> */}
    {/* <SignUpForm></SignUpForm> */}
    <MainScreen></MainScreen>
  </Provider>,
  {
    /* </React.StrictMode>, */
  },
);
