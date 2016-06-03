'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true, //是否记录 sql 语句
  log_connect: true, // 是否记录连接数据库的信息
  adapter: {
    mysql: {
     /* host: 'localhost',
      port: '3306',
      database: 'topic',
      user: 'topic',
      password: '',*/
      host: '192.168.119.5',
      port: '3306',
      database: 'topic',
      user: 'topic',
      password: 'topic-dev',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};