'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
        //this.fail(100,'this action is not existed!');
    }

    async publishAction() {
        let errmsgPre = 'insert topic fail:';
        //get publish content
        let topic = {
            type: this.post('type') || 1,
            //userid:'abc',
            //content:'this is a test- '+ Math.random()*1000,
        };

        let isAnony = this.post('anony');
        if (isAnony == 1) {
            topic['userid'] = '';
        } else {
            let userid = '';
            let checkRes = await this.checkLogin();
            if(checkRes['errno'] == 0){
                let loginData = checkRes['data'];
                if(loginData['isLogin']){
                    userid = loginData['userInfo']['userName'];
                }
            }

            topic['userid'] = userid;
            if(!userid){
                return this.fail('非匿名发布，检查登陆状态失败！');
            }
            
        }
        topic['content'] = this.post('content');
        console.log('centent:---------------',topic['content']);
        //do some handle
        let TopicService = think.service('api/topic');
        let topicService = new TopicService();
        let res = await topicService.publish(topic);
        if (res.errno !== 0) {
            return this.fail(res.errno, errmsgPre + res.errmsg);
        } else {
            return this.success(res.data);
        }
    }

    async listAction() {
         //检查登录状态，获取userid
        let userid = '';
        let checkRes = await this.checkLogin();
        if(checkRes['errno'] == 0){
            let loginData = checkRes['data'];
            if(loginData['isLogin']){
                userid = loginData['userInfo']['userName'];
            }
        }
       
        let pageNum = this.get("pn") || 1;
        let TopicService = think.service('api/topic');
        let topicService = new TopicService();
        let data = await topicService.list(pageNum);
        data.userid = userid;

        this.success(data);
    }

    async deleteAction() {
         //检查登录状态，获取userid
        let checkRes = await this.checkLogin();
        if(checkRes['errno'] != 0){
            return this.fail(checkRes['errno'],checkRes['errmsg']);
        }
        let loginData = checkRes['data'];
        if(!loginData['isLogin']){
            return this.fail('只有登录的用户才能删除！');
        }
        let userid = loginData['userInfo']['userName'];
        //匿名的topic不能被普通人删除；登陆的用户只能删除自己发布的topic
        if (userid == '') {
            return this.fail('只有登陆的用户才能删除topic！');
        }
        let errmsgPre = 'delete topic fail:';
        let curPageNum = this.post('curPn');
        let tid = this.post('tid');
        
        let conditions = {
            id: tid,
            curPageNum: curPageNum
        };
        if (userid !== 'admin') {
            conditions['userid'] = ['=', userid];
        }

        let TopicService = think.service('api/topic');
        let topicService = new TopicService();
        let res = await topicService.delete(conditions);
        if (res.errno !== 0) {
            return this.fail(res.errno, errmsgPre + res.errmsg);
        } else {
            return this.success(res.data);
        }



    }

    /* * testAction(){
         let pageNum = this.get("pn") || 1;
         let TopicService = think.service('api/topic');
         let topicService = new TopicService();
         let data = yield topicService.list(pageNum);     
        this.success(data);
     }*/

    async testAction() {
        let pageNum = this.get("pn") || 1;
        let TopicService = think.service('api/topic');
        let topicService = new TopicService();
        let data = await topicService.list(pageNum);
        this.success(data);
    }

    fooBarAction(){
      this.success('foo_bar');
    }

}
