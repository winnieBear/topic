'use strict';

import Base from './base.js';

async function getTopicData(self){
   let userid = '';
    let checkRes = await self.checkLogin();
    if(checkRes['errno'] == 0){
        let loginData = checkRes['data'];
        if(loginData['isLogin']){
            userid = loginData['userInfo']['userName'];
        }
    }
   
    let pageNum = self.get("pn") || 1;
    let TopicService = think.service('api/topic');
    let topicService = new TopicService();
    let data = await topicService.list(pageNum);
    data.userid = userid;
    return data;
}



export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file topic_index.html
    let http = this.http;
    let self = this;
    let data = await getTopicData(self);
    let __CLIENT_DATA__ = {
      topic:{
        userid:data['userid'],
        tLists:data['data'],
        page:{
          pageNum:data['currentPage'] || 1,
          totalPages:data['totalPages'] || 1
        }
      },
    };
    this.assign('__CLIENT_DATA__', encodeURIComponent(JSON.stringify(__CLIENT_DATA__)));
    return this.display();
  }

  commentAction(){
    //auto render template file index_index.html
    return this.display();
  }
  topicAction(){
    //auto render template file index_index.html
    return this.display();
  }
}