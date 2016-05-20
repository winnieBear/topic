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
        let CommentService = think.service('home/comment');
        let service = new CommentService();

        let res = await service.list(tid);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }
        this.success(res.data);

    }

    //添加文字评论
    async addTxtAction() {
        //获取userid
        let userid = this.post('userid') || 'aaaa';
        let tid = this.post('tid');
        let map = this.config('comment')['typeMap'];
        let comment = {
            type: map['TXT'], //文字评论
            tid: tid,
            userid: userid,
            content: this.post('content')
        };
        let CommentService = think.service('home/comment');
        let service = new CommentService();
        let res = await service.add(comment);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }

        this.success(res.data);
    }

    //添加赞
    async addAgreeAction() {
        //获取userid
        let userid = this.post('userid') || 'aaaa';
        let tid = this.post('tid');
        let map = this.config('comment')['typeMap'];
        let comment = {
            type: map['AGREE'], //文字评论
            tid: tid,
            userid: userid,
        };

        let CommentService = think.service('home/comment');
        let service = new CommentService();
        let res = await service.add(comment);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }

        this.success(res.data);

    }

    //删除文字评论/取消赞
    async deleteAction() {
        let userid = this.post('userid') || 'aaaa';
        let id = this.post('id');
        let tid = this.post('tid');
        let conds = {
            id: id,
            tid: tid,
            userid: userid
        };
        let CommentService = think.service('home/comment');
        let service = new CommentService();
        let res = await service.delete(conds);
        if (res.errno !== 0) {
            return this.fail(res.errmsg);
        }

        this.success(res.data);

    }

   
    //test /comment/foo_bar
    fooBarAction() {
        let CommentService = think.service('home/comment');
        let service = new CommentService();
        let data = service.aaa();
        this.success(data);
    }

}
