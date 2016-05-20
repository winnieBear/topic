'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args){
    super.init(...args);

    this.relation = {
       comment:{
          type: think.model.HAS_MANY, //relation type
          name:'comment',
          key: "id", 
          fKey: "tid", //forign key
          //field:"id,tid,userid,content",
          order:"create_time desc"
       }
      
    }
  }
}