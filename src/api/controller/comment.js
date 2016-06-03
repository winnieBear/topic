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
    }

    async listAction() {
        let tid = this.get('tid');
        let CommentService = think.service('api/comment');
        let service = new CommentService();

        let res = await service.list(tid);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }
        this.success(res.data);

    }

    //添加文字评论
    async addAction() {
        //检查登录状态，获取userid
        let checkRes = await this.checkLogin();
        if(checkRes['errno'] != 0){
            return this.fail(checkRes['errno'],checkRes['errmsg']);
        }
        let loginData = checkRes['data'];
        if(!loginData['isLogin']){
            return this.fail('只有登录的用户才能点赞或评论！');
        }
        let userid = loginData['userInfo']['userName'];
        let type = this.post('type');
        let tid = this.post('tid');
        let content = this.post('content') || '';
        let map = this.config('comment')['typeMap'];
        let comment = {
            type: type, //文字评论
            tid: tid,
            userid: userid,
            content: content
        };
        let CommentService = think.service('api/comment');
        let service = new CommentService();
        let res = await service.add(comment);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }

        this.success(res.data);
    }

   

    //删除文字评论/取消赞
    async deleteAction() {
        //检查登录状态，获取userid
        let checkRes = await this.checkLogin();
        if(checkRes['errno'] != 0){
            return this.fail(checkRes['errno'],checkRes['errmsg']);
        }
        let loginData = checkRes['data'];
        if(!loginData['isLogin']){
            return this.fail('只有登录的用户才能取消赞或删除评论！');
        }
        let userid = loginData['userInfo']['userName'];
        let cid = this.post('cid');
        let tid = this.post('tid');
        let conds = {
            id: cid,
            tid: tid,
            userid: userid
        };
        let CommentService = think.service('api/comment');
        let service = new CommentService();
        let res = await service.delete(conds);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }

        this.success(res.data);

    }

   
    //test /comment/foo_bar
    fooBarAction() {
        let CommentService = think.service('api/comment');
        let service = new CommentService();
        let data = service.aaa();
        this.success(data);
    }

}
