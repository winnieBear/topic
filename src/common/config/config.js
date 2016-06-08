'use strict';
/**
 * config
 */
export default {
  route_on: true,
  default_module: "home",
  default_controller: "topic", 
  default_action: "index",
  //key: value
  topic:{
  	//每一页条数
  	pageCount:5
  },
  comment:{
  	typeMap:{
  		'AGREE':1,
  		'TXT':2
  	}
  }
};