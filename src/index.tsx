import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import http from './utils/http'

import {Provider} from 'react-redux'
import store from './redux'

// http.get('/posts')
// http.get('/posts/1')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

