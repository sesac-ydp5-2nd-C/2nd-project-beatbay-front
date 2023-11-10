import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App';
import { Provider } from 'react-redux';
import store from './store';
import './config/Fonts/Font.css';
import Modal from 'react-modal';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export const persistor = persistStore(store);

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
);
