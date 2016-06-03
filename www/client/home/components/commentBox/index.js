import React from 'react'
import { connect } from 'react-redux';
import marked from 'marked'
import getTimeAgo from '../getTimeAgo/index'
import CommentPanel from '../commentPanel/';
import { addComment,delComment } from '../../actions'

require('./index.scss');


var CommentItem = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  handleClick:function(){
    let {loginUser,userid,cid} = this.props;
    if(!loginUser){
      alert('只有登录之后删除!');
      return;
    }
   
    this.props.delComment({
        type: 2,
        cid: cid
    });
  },
  render: function() {
    let {mine,userid,ctime} = this.props;
    let cs = mine ? 'comment-content mine-comment' : 'comment-content';
    return (
      <div className="comment-item">
        <h4 className="comment-author">
          <span className="author">{userid}</span>,<span className="ctime">{getTimeAgo(ctime*1000)}</span>
        </h4>
        <div className={cs} >
          <div dangerouslySetInnerHTML={this.rawMarkup()} />
          <i className="icon-del-comment" onClick={this.handleClick}>&#xe646;</i>
        </div>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    let {delComment,loginUser} = this.props;
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <CommentItem userid={comment.userid} ctime={comment.ctime} key={comment.id} cid={comment.id} mine={comment.mine} delComment={delComment} loginUser={loginUser}>
          {comment.content}
        </CommentItem>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginUser = this.props.loginUser;
    if(!loginUser){
      alert('只有登录之后才能评论!');
      return;
    }
    var content = this.refs.content.value.trim();
    if (!content) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({content: content,type:2});

    this.refs.content.value = '';
    return;
  },
  render: function() {
    return (
      <div className="comment-form-container">
         <form className="comment-form"  onSubmit={this.handleSubmit}>
          <input className="comment-input" type="text" placeholder="评论些什么..." ref="content" />
          <p className="comment-btn-container">
            <input className="comment-btn cancel-comment" type="reset" value="取消" />
            <input className="comment-btn add-comment" type="submit" value="评论" />
          </p>
        </form>
      </div>
    );
  }
});


var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      folding:true
    }
  },
  toggleFoldComment:function(){
    this.setState({
      folding:!this.state.folding
    })
  },
 
  handleDelComment:function(comment){
    var {tid,dispatch } = this.props;
    comment.tid = tid;
    dispatch(delComment(comment));
  },
  handleAddComment: function(comment) {
    var {tid,dispatch } = this.props;
    comment.tid = tid;
    dispatch(addComment(comment)); 
  },
  render: function() {
    let commentList = this.props.data || [];
    //处理commenList
    let comments ={};
    comments['agree']={
       cnt:0,
       lists:[]
    };
    comments['txt'] = {
        cnt:0,
        lists:[]
    };
    let map = {
      1:'agree',
      2:'txt'
    }
    let loginUser = this.props.loginUser;
    let hasAgreed = false;
    let agreeCid;
    for (const it of commentList) {
        let item = Object.assign({},it);
        let type = map[item.type];
        if (type) {
            comments[type]['cnt']++;
            if(item['userid'] === loginUser){
              if(item['type'] == 1){
                hasAgreed = true;
                agreeCid = item['id'];
              }
              item['mine'] = true;
            }
            comments[type]['lists'].push(item);
        }
    }
    let commentShowStyle="";
    if(this.state.folding){
        commentShowStyle = {display: "none"}
    }else{
        commentShowStyle = {display: "block"}
    }
    return (
    <div>
        <CommentPanel handleClickComment={this.toggleFoldComment} addComment={this.handleAddComment} delComment={this.handleDelComment} likeCnt={comments['agree']['cnt']} hasAgreed={hasAgreed} commentCnt={comments['txt']['cnt']} cid={agreeCid} folding={this.state.folding} loginUser={loginUser}/>
        <div className="comment-box" style={commentShowStyle}>
          <CommentList data={comments['txt']['lists']} delComment={this.handleDelComment} loginUser={loginUser} />
          <CommentForm onCommentSubmit={this.handleAddComment} loginUser={loginUser} />
        </div>
    </div>
    );
  }
});





export default connect()(CommentBox);