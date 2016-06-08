import 'babel-polyfill'
import { render } from 'react-dom'
import { browserHistory,Router } from 'react-router'
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import routes from './routes'

import { syncHistoryWithStore } from 'react-router-redux'
//import Root from './containers/Root'

import configureStore from './store/configureStore'
require('./index.scss')

let initialState = window.clientData || undefined;

const store = configureStore(browserHistory,initialState);
//const store = configureStore();
//const history = browserHistory;
const history = syncHistoryWithStore(browserHistory, store)

const Root = (props) => {
  return (
    <div>
      <Provider store={store}>
        <Router history={history} >
         {routes}
        </Router>
      </Provider>
    </div>
  );
}

render(<Root />, document.getElementById('react-dom'));



