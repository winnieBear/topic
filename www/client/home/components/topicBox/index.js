import React from 'react'
import marked from 'marked'
import getTimeAgo from '../getTimeAgo'
import CommentBox from '../commentBox'


require('./index.scss');


var TopicItem = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="topic-item">
        <h4 className="topic-author">
          <span className="author">{this.props.userid == '' ? '匿名人士':this.props.userid}</span>,<span className="ctime">{getTimeAgo(this.props.ctime*1000)}</span>
        </h4>
        <div className="comment-content" dangerouslySetInnerHTML={this.rawMarkup()} />
        <CommentBox data={this.props.comment} tid={this.props.tid}  loginUser={this.props.loginUser} />
      </div>
    );
  }
});

var TopicList = React.createClass({
  render: function() {
    var loginUser = this.props.loginUser;
    var topicNodes = this.props.data.map(function (topic) {
      let {id,type,...other } = topic;
      return (
        <TopicItem {...other} key={id} tid={id}  loginUser={loginUser}>
          {topic.content}
        </TopicItem>
      );
    });
    return (
      <div className="topic-list">
        {topicNodes}
      </div>
    );
  }
});



var TopicBox = React.createClass({
  render: function() {
    let { data,loginUser} = this.props;
    return (
      <div className="topic-wrapper">
        <h2>TopicList</h2>
        <TopicList data={data}  loginUser={loginUser} />
      </div>
    );
  }
});


export default TopicBox;