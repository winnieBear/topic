'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async __before(){
  	think.log(function(colors){
		  return colors.yellow("[INFO]") + " do something before...";
		});
  }
}