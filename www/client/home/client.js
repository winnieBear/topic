import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'

import configureStore from './store/configureStore'
require('./index.scss')

const store = configureStore(/*{
	topic:{
		page:{
			pageNum:1,
			totalPages:1,
		},
		isFetching:false,
		tLists:[],
		userid:''
	}
}*/)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('react-dom')
)
