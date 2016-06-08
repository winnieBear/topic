import React from 'react'
import { Route, IndexRoute, IndexRedirect} from 'react-router'
//import Root from './root'

import Topic from './containers/topic'


module.exports = (
  <Route path="/" component={Topic}>
    <IndexRedirect to="/topic/pn/1" />
    <Route path="topic/pn/:pageNum" component={Topic} />
  </Route>
)

/*module.exports = (
  <Route path="/" component={Topic}>
    <IndexRedirect to="/topic/pn/1" />
    <Route path="topic/pn/:pageNum" component={Topic} />
  </Route>
)*/
