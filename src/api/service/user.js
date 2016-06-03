'use strict';
import request from 'request';

export default class extends think.service.base {
    /**
     * init
     * @return {}         []
     */
    init(...args) {
        super.init(...args);
        this.serviceName = 'userService';
        think.log('init', 'INFO')
    }


   async publish(topic){
      let model = this.mod;
      let res = {
        errno:0,
        errmsg:'',
        data:null
      };
      let ctime = parseInt(Date.now()/1000);
      topic['ctime'] = ctime;
      try{
        let insertId = await model.add(topic);
        think.log(this.serviceName +' insertId:'+insertId,'INFO');
        if(insertId){
          let pageNum =  1;
          res.data = await this.list(pageNum);
        }else{
          res.errno = this.errnoMap['QueryDBError'] ;
          res.errmsg = 'insert db['+model.getLastSql+'] fail';
          think.log(this.serviceName + 'insert db['+model.getLastSql+'] fail','ERR');
        }
      }catch(err){
        res.errno = this.errnoMap['Exception'];
        res.errmsg = err.message;
        think.log(this.serviceName + err.message,'ERR');
      }
     
      return res;

  }


}
