import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from './root'

import Topic from './containers/topic'


module.exports = (
  <Route path="/" component={Root}>
    <IndexRoute component={Topic}/>// 首页的组件入口
    <Route path="topic/pn/:pageNum" component={Topic} />
  </Route>
)

