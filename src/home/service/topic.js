'use strict';

export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(...args){
    super.init(...args);
    this.serviceName = 'topicService';
    this.errnoMap = think.config('error')['errnoMap'];
    this.mod = this.model('topic');
    think.log('init','INFO')
  }

  aaa(){
  	think.log('service topic/aaa','test');
  	return 'aaaa';
  }

  async publish(topic){
			let model = this.mod;
			let res = {
				errno:0,
				errmsg:'',
				data:null
			};
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

  async list(pageNum){
    think.log(this.serviceName +' list','INFO');
		let model = this.mod;
  	let pageCount = think.config('topic')['pageCount'] || 10;
  	let data = await model.page(pageNum, pageCount)
      .order('create_time desc').countSelect();
    return data;
  }

  async delete(delCons){
    think.log(this.serviceName +' delete','INFO');
  	let model = this.mod;
  	let res = {
			errno:0,
			errmsg:'',
			data:null
		};
    let pageNum =  delCons.curPageNum;
    delete delCons.curPageNum;
    try{
    	await model.startTrans();
    	let affectedRows  = await model.where(delCons).delete();
	    //可能tid不存在，或者别人先于操作者删除了该topic
	    if(affectedRows < 1){
	      think.log('delete topic[id='+delCons.id + '] exception:deleted rows < 1!','WARN');
	      await model.rollback();
	    }else{
	    	await model.commit();
	    }

    	res.data = await this.list(pageNum);
    }catch(err){
    	res.errno = this.errnoMap['Exception'];
			res.errmsg = err.message;
    }

    return res;
  }
  
}