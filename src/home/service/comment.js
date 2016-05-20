'use strict';

export default class extends think.service.base {
    /**
     * init
     * @return {}         []
     */
    init(...args) {
        super.init(...args);
        this.serviceName = 'commentService';
        this.errnoMap = think.config('error')['errnoMap'];
        this.mod = this.model('comment');
        think.log('init comment service', 'INFO')
    }

    aaa() {
        think.log('service comment/aaa', 'test');
        return 'aaaa';
    }

    async add(comment) {
        let model = this.mod;
        let res = {
            errno: 0,
            errmsg: '',
            data: null
        };
        try {
            let tid = comment['tid'];
            let insertId = await model.add(comment);
            think.log(this.serviceName + ' insertId:' + insertId, 'INFO');
            if (insertId) {
                let listRes = await this.list(tid);
                if (listRes.errno !== 0) {
                    res.errno = listRes.errno;
                    res.errmsg = listRes.errmsg;
                    return res;
                }
                res.data = listRes.data;
            } else {
                res.errno = this.errnoMap['QueryDBError'];
                res.errmsg = 'insert db[' + model.getLastSql + '] fail';
                think.log(this.serviceName + 'insert db[' + model.getLastSql + '] fail', 'ERR');
            }
        } catch (err) {
            res.errno = this.errnoMap['Exception'];
            res.errmsg = err.message;
            think.log(this.serviceName + err.message, 'ERR');
        }

        return res;
    }

    async list(tid) {
        think.log(this.serviceName + ' list', 'INFO');
        let res = {
            errno: 0,
            errmsg: '',
            data: null
        };
        let model = this.mod;
        let map = think.config('comment')['typeMap'];
        try {
            let data = await model.where({
                tid: tid
            }).order('create_time asc').select();
            let arrData = {},
                arrCnt = {};
            for (const type in map) {
                arrData[map[type]] = [];
                arrCnt[map[type]] = 0;
            }
            for (const item of data) {
                let type = item.type;
                if (type) {
                    arrData[type].push(item);
                    arrCnt[type]++;
                }
            }

            res.data = {
                comments: arrData,
                cnt: arrCnt
            };
        } catch (err) {
            res.errno = this.errnoMap['Exception'];
            res.errmsg = err.message;
            think.log(this.serviceName + err.message, 'ERR');
        }
        return res;
    }

    async delete(delConds) {
        think.log(this.serviceName + ' delete', 'INFO');
        let model = this.mod;
        let res = {
            errno: 0,
            errmsg: '',
            data: null
        };
        let tid = delConds['tid'];
        delete delConds['tid'];
        //todo:添加管理员可以删除任何评论逻辑

            
        try {
            let affectedRows = await model.where(delConds).delete();
            //可能tid不存在，或者别人先于操作者删除了该topic
            if (affectedRows < 1) {
                think.log('delete topic[id=' + delConds.id + '] exception:deleted rows < 1!', 'WARN');
            } 
            res.data = await this.list(tid);
        } catch (err) {
            res.errno = this.errnoMap['Exception'];
            res.errmsg = err.message;
        }

        return res;
    }

}
