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

  async checkLogin(){
  	let res = {
			errno:0,
			errmsg:'',
			data:{
				isLogin:false,
				userInfo:{}
			}
		};
  	let uid = await this.cookie('Sso_UserID');
    let sid = await this.cookie('Sso_ssid');
    if(uid && sid) {
      let rqtUtil = think.require(think.APP_PATH+'/common/utils/request_promise.js');
      try{
      	 let ret = await rqtUtil.sendPost('http://sso.web.58dns.org/login/get_user_data', {SSID:sid,UserID:uid});
      	 let retData = JSON.parse(ret);
      	  if(retData.result) {
      	  	const {uid,realName,userName } = retData.result;
            if(uid && userName){
              res.data['isLogin'] = true;
              res.data['userInfo'] = {uid,realName,userName};
            }
      	  	
		      }
      }catch(err){
      	res.errno = 1;
      	res.errmsg = err.message;
      }
    
    } /*else {
        return self.redirect('/editor/user/login?url=' + self.http.url);
    }*/
    return res;

  }

  


}