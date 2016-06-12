'use strict';

import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server';
import { createMemoryHistory,RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';


/**
 * middleware
 */
export default class extends think.middleware.base {
  

  async getReactBody() {
    let self = this;
    let http = this.http;
    let moduleName = http.module;
    var module = require(path.join('../../../share/' + moduleName + '.bundle.js'));
    let routes = module.route;
    let configureStore = module.configureStore;
    
    const memoryHistory = createMemoryHistory(http.pathname)
    let store = configureStore(memoryHistory )
    const history = syncHistoryWithStore(memoryHistory, store)
    

    let clientData = JSON.parse(decodeURIComponent(http._view.tVar.__CLIENT_DATA__));

    return new Promise(function (resolve, reject) {
      match({routes: routes, location: http.url}, (error, redirectLocation, renderProps) => {
        if (error) {
          think.log(`Internal Server Error ${err}`,'ERROR');
          reject(error);
        }
        else if (redirectLocation) {
          think.log('route redirect to '+redirectLocation.pathname + redirectLocation.search,'INFO');
          resolve(http.redirect(redirectLocation.pathname + redirectLocation.search));
        }
        else if (renderProps) {
          store = configureStore(memoryHistory, clientData )
          const html = renderToString(
          <div>
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
          </div>
          );
          resolve(html);
        }
        else {
          resolve('component not found');
        }
      });
    });
  }

  /**
   * run
   * @return {} []
   */
  async run(content) {

    let data = await this.getReactBody();

    return content.replace(/\{html\}/, data);
  }
}