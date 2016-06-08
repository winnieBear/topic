'use strict';

import Base from './base.js';
import path from 'path'
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory,RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
var module = require(path.join('../../../share/home.bundle.js'));
let routes = module.route;
let configureStore = module.configureStore;
//import Root from './containers/Root'

async function getTopicData(self){
   let userid = '';
    let checkRes = await self.checkLogin();
    if(checkRes['errno'] == 0){
        let loginData = checkRes['data'];
        if(loginData['isLogin']){
            userid = loginData['userInfo']['userName'];
        }
    }
   
    let pageNum = self.get("pn") || 1;
    let TopicService = think.service('api/topic');
    let topicService = new TopicService();
    let data = await topicService.list(pageNum);
    data.userid = userid;
    return data;
}



export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file topic_index.html
    let http = this.http;
    let self = this;
    const memoryHistory = createMemoryHistory(http.pathname)
    let store = configureStore(memoryHistory )
    const history = syncHistoryWithStore(memoryHistory, store)

    match({routes, location: http.url }, async (err, redirectLocation, renderProps) => {
      if (err) {
        think.log(`Internal Server Error ${err}`,'ERROR');
        return think.statusAction(500);
      } else if (redirectLocation) {
        think.log('route redirect to '+redirectLocation.pathname + redirectLocation.search,'INFO');
        http.redirect(redirectLocation.pathname + redirectLocation.search)
        //res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        try{
            let data = await getTopicData(self);
            let __CLIENT_DATA__ = {
              topic:{
                userid:data['userid'],
                tLists:data['data'],
                page:{
                  pageNum:data['currentPage'] || 1,
                  totalPages:data['totalPages'] || 1
                }
              },
              //routing:renderProps
            };
            store = configureStore(memoryHistory, __CLIENT_DATA__ )
            const html = renderToString(
            <div>
                <Provider store={store}>
                  <RouterContext {...renderProps} />
                </Provider>
            </div>
            );
            this.assign('html',html)
            this.assign('__CLIENT_DATA__', encodeURIComponent(JSON.stringify(__CLIENT_DATA__)));
          }catch(err){
            think.log(err.stack.split("\n"), 'ERROR');
            return think.statusAction(503,self.http);
          }
          return this.display();
      } else {
        think.log('404 Not found','ERROR');
        return think.statusAction(404,self.http);
      }
    });

  }

  commentAction(){
    //auto render template file index_index.html
    return this.display();
  }
  topicAction(){
    //auto render template file index_index.html
    return this.display();
  }
}