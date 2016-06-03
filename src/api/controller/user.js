'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async testAction() {
      let res = await this.checkLogin();
      if(res.errno == 0){
          this.success(res.data);
      }else{
          this.fail(res.errno,res.errmsg);
      }

  }

}
