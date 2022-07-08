import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/styles/css/index.css';
import './static/styles/scss/app.scss';
import App from './App';
import {Provider} from "react-redux";
import store, {persistor} from './redux/store';
import {PersistGate} from "reduxjs-toolkit-persist/lib/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

