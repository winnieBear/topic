import React from 'react'
require('./index.scss')

export default React.createClass({
  handleClick:function(e){
    this.props.handleClick();
  },
 
  render: function() {
    let showTxt = this.props.folding ? this.props.CommentCtn+'条评论':'收起评论';
    return (
      <div className="comment-btn-wrapper" onClick={this.handleClick}>
         <i title="点击评论" className="icon iconfont comment-icon">&#xe666;</i>{showTxt}
      </div>
    );
  }
});