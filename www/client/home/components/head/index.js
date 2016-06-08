import React from 'react'
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { logout } from '../../actions'


require('./index.scss')

let headComponent =  React.createClass({
  loginOut:function(e){
    e.preventDefault();
    cookie.remove('Sso_ssid', { path: '/', domain:'.58corp.com'});
    cookie.remove('Sso_UserID', { path: '/', domain:'.58corp.com'});
    //location.reload();
    this.props.dispatch(logout());
  },
  onLogin:function(e){
    e.preventDefault();
    let loginUrl = 'https://sso.58corp.com/login/go?url='+encodeURIComponent(location.href);
    location.href = loginUrl;
  },
  render: function() {
    let user = this.props.userid;
    return (
      <div className="head-wrapper">
        <div className="account">
          <i className="icon-user" />
          { user == '' ? <a href="javascript:;" onClick={this.onLogin}>请登录</a> : <span>{user},<a href="javascript:;" onClick={this.loginOut}>退出</a></span> }
        </div> 
      </div>
    );
  }
});

function mapStateToProps(state) {
  return { userid:state.topic.userid };
}

export default connect(mapStateToProps)(headComponent);