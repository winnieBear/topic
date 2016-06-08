'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: false, //是否记录 sql 语句
  log_connect: true, // 是否记录连接数据库的信息
  adapter: {
    mysql: {
      host: 'localhost',
      port: '3306',
      database: 'topic',
      user: 'topic',
<<<<<<< HEAD
      password: '',
    /*
      host: '192.168.119.5',
=======
      password: '',*/
      host: '192.168.119.*',
>>>>>>> 2603a66592ec35374c32bba9ad58349cf9b6f213
      port: '3306',
      database: 'topic',
      user: 'topic',
      password: 'topic-dev',
    */
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
