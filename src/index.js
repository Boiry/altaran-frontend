import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n';

import App from 'src/containers/App';
import store from './store';

const rootReactElement = (
  <Provider store={store}>
    <App />
  </Provider>
);

const target = document.getElementById('root');
const root = createRoot(target);
root.render(rootReactElement);
