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
            type: 1,
            //userid:'abc',
            //content:'this is a test- '+ Math.random()*1000,
        };

        let isAnony = this.post('isAnony');
        if (isAnony == 1) {
            topic['userid'] = '';
        } else {
            topic['userid'] = this.post('userid') || '';
        }
        topic['content'] = this.post('content');
        //do some handle
        let TopicService = think.service('home/topic');
        let topicService = new TopicService();
        let res = await topicService.publish(topic);
        if (res.errno !== 0) {
            return this.fail(res.errno, errmsgPre + res.errmsg);
        } else {
            return this.success(res.data);
        }
    }

    async listAction() {
        let pageNum = this.get("pn") || 1;
        let TopicService = think.service('home/topic');
        let topicService = new TopicService();
        let data = await topicService.list(pageNum);

        this.success(data);
    }

    async deleteAction() {
        let errmsgPre = 'delete topic fail:';
        let curPageNum = this.post('curPn');
        let tid = this.post('tid');
        let userid = this.post('userid');
        //匿名的topic不能被普通人删除；登陆的用户只能删除自己发布的topic
        if (userid == '') {
            return this.fail('只有登陆的用户才能删除topic！');
        }
        let conditions = {
            id: tid,
            curPageNum: curPageNum
        };
        if (userid !== 'admin') {
            conditions['userid'] = ['=', userid];
        }

        let TopicService = think.service('home/topic');
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
         let TopicService = think.service('home/topic');
         let topicService = new TopicService();
         let data = yield topicService.list(pageNum);     
        this.success(data);
     }*/

    async testAction() {
        let pageNum = this.get("pn") || 1;
        let TopicService = think.service('home/topic');
        let topicService = new TopicService();
        let data = await topicService.list(pageNum);
        this.success(data);
    }

    fooBarAction(){
      this.success('foo_bar');
    }

}
