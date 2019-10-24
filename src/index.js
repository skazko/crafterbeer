import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import CrafterbeerService from './services/crafterbeer-service';
import { CrafterbeerServiceProvider } from './components/crafterbeer-service-context';
import store from './store';

const crafterbeerService = new CrafterbeerService(); 

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <CrafterbeerServiceProvider value={crafterbeerService}>
        <Router>
          <App />
        </Router>
      </CrafterbeerServiceProvider>
    </ErrorBoundry>
  </Provider>, 
  document.getElementById('root')
);