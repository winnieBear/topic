import {sprintf} from 'sprintf-js'
import {apiConf} from '../conf';
/*
 * action 类型
 */

/*
 * action 创建函数
 */

function requestTopic(url,action) {
  return {
    type: 'REQUEST_TOPIC_DATA',
    action,
    url,
    requestAt:Date.now()
  }
}

function receiveTopic(url, data) {
  return {
    type: 'RECEIVE_TOPIC_DATA',
    url,
    data,
    receivedAt: Date.now()
  }
}

function requestComment(url,action) {
  return {
    type: 'REQUEST_COMMENT_DATA',
    action,
    url,
    requestAt:Date.now()
  }
}

function receiveComment(url, tid, comments) {
  return {
    type: 'RECEIVE_COMMENT_DATA',
    url,
    tid,
    comments,
    receivedAt: Date.now()
  }
}


function connectObj(obj){
  let arr = [];
  for(let k of Object.keys(obj)){
    arr.push(k+'='+encodeURIComponent(obj[k]));
  }
  return arr.join('&');
}


export function addTopic(topic){
	let url = apiConf['publish_topic'];
	return dispatch => {
    dispatch(requestTopic(url,'addTopic'));
    return fetch(url,{
    		method:'post',
        credentials:'same-origin',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
    		body:connectObj(topic),
    	})
      .then(response => {
        return response.json()
      })
      .then(res => {
      	let data = res.data;
        return {
          userid:data['userid'],
          tLists:data['data'],
          page:{
            pageNum:data['currentPage'],
            totalPages:data['totalPages']
          }
        }
      })
      .then(data => dispatch(receiveTopic(url, data)))
  }
}

export function listTopicByPage(pageNum=1){
  let url = sprintf(apiConf['get_topic'],pageNum);
  return dispatch => {
    dispatch(requestTopic(url,'listTopicByPage'));
    return fetch(url,{
        method:'get',
        credentials:'same-origin',
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        let data = res.data;
        return {
          userid:data['userid'],
          tLists:data['data'],
          page:{
            pageNum:data['currentPage'],
            totalPages:data['totalPages']
          }
        }
      })
      .then(data => dispatch(receiveTopic(url, data)))
  }
}


export function addComment(comment){
  let url = apiConf['add_comment'];
  return dispatch => {
    dispatch(requestComment(url,'addComment'));
    let tid = comment['tid'];
    return fetch(url,{
        method:'post',
        credentials:'same-origin',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:connectObj(comment),
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        return res.data
      })
      .then(data => dispatch(receiveComment(url, tid, data))
      )
  }
}


export function delComment(comment){
  let url = apiConf['del_comment'];
  return dispatch => {
    dispatch(requestComment(url,'delComment'));
    let tid = comment['tid'];
    return fetch(url,{
        method:'post',
        credentials:'same-origin',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:connectObj(comment),
      })
      .then(response => {
        return response.json()
      })
      .then(res => {
        return res.data
      })
      .then(data => dispatch(receiveComment(url, tid, data))
      )
  }
}


export function logout(){
  return {
     type: 'LOGOUT',
  }
}

