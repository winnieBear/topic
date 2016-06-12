var path = require('path');
var _ = require('lodash');


var pages = {
  home: {
    client: path.join(__dirname, './www/client/home/client'),
    server: path.join(__dirname, './www/client/home/server')
  },
 /* admin: {
    client: path.join(__dirname, './www/client/admin/client'),
    server: path.join(__dirname, './www/client/admin/server')
  }*/
};

exports.getClient = function () {
  var result = {};
  _.each(pages, function (val, name) {
    result[name] = val.client;
  });

  result['vendor'] = ['babel-polyfill','sprintf-js','marked','react','redux','react-router','react-dom','react-redux','react-router-redux','redux-thunk'];

  return result;
};

exports.getServer = function () {
  var result = {};
  _.each(pages, function (val, name) {
    result[name] = val.server;
  });

  return result;
}