import React from 'react'
require('./index.scss')

export default React.createClass({
    handleClick: function(e) {
        let {loginUser,hasAgreed} = this.props;
        if(!loginUser){
            alert('只有登录之后才能点赞/删除赞!');
            return;
        }
        hasAgreed = !hasAgreed;
        if (hasAgreed) {
            this.props.addAgree({
                type: 1,
                cid:this.props.cid,
                content: ''
            });
        } else {
            this.props.delAgree({
                type: 1,
                cid: this.props.cid
            });
        }

    },

    render: function() {
        let hoverTips = this.props.hasAgreed ? '取消赞同' : '赞同';
        return ( 
            <div className = "like-btn-wrapper" >
              <i onClick={ this.handleClick } title={hoverTips}  className="icon iconfont like-icon">&#xe668; </i>{this.props.likeCtn}个赞 
            </div>
        );
    }
});
