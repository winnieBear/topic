import React from 'react'
import LikeBtn from '../likeBtn'
import CommentBtn from '../commentBtn'

export default React.createClass({
  render: function() {
  	let {likeCnt,hasAgreed,cid,commentCnt,addComment,delComment,handleClickComment,folding,loginUser} = this.props;
    return (
      <div className="comment-panel">
        <LikeBtn likeCtn={likeCnt} hasAgreed={hasAgreed} cid={cid} addAgree={addComment} delAgree={delComment} loginUser={loginUser}/>
        <CommentBtn CommentCtn={commentCnt} handleClick={handleClickComment} folding={folding} />
      </div>
    );
  }
});




