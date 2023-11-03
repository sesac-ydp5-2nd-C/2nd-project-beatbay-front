import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App';
import { Provider } from 'react-redux';
import store from './store';
import './config/Fonts/Font.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
);
