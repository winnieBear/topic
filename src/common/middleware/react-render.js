'use strict';

import path from 'path'
import React from 'react'
import {renderToString} from 'react-dom/server';
import {match,browserHistory} from 'react-router'

/**
 * middleware
 */
export default class extends think.middleware.base {
  isLogin () {
    let userInfo = this.http._session.data.userInfo;

    return !think.isEmpty(userInfo);
  }


  async getReactBody() {
    let moduleName = this.http.module;
    var module = require(path.join('../../../share/' + moduleName + '.bundle.js'));
    console.log(module)
    let Root = module.Root;
    let route = module.route;
    let configureStore = module.configureStore;
    let self = this;
    let clientData = JSON.parse(decodeURIComponent(self.http._view.tVar.__CLIENT_DATA__));

    return new Promise(function (resolve, reject) {
      match({routes: route, location: self.http.url}, (error, redirectLocation, renderProps) => {
        if (error) {
          reject(error);
        }
        else if (redirectLocation) {
          resolve(self.http.redirect(redirectLocation));
        }
        else if (renderProps) {
          const history = browserHistory;
          const store = configureStore(clientData);
          //console.info('---------------------',renderProps)
          resolve(renderToString(<Root store={store} history={history} />));
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