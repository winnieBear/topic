import React from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

require('./index.scss')

let Page =  React.createClass({
  render: function() {
    let {pageNum,totalPages} = this.props.page;
    let prevNum,nextNum,prevDisabledCls,nextDisabledCls;
    let prevA;
    if(pageNum > 1){
      prevNum = pageNum - 1;
      prevDisabledCls = '';
    }else{
      prevNum = pageNum;
      prevDisabledCls = 'disabled';
    }
    if(pageNum < totalPages){
      nextNum = pageNum + 1;
      nextDisabledCls = '';
    }else{
      nextNum = pageNum;
      nextDisabledCls = 'disabled'
    }
    return (
      <div className="page-wrapper">
        <Link className={"page-icon "+prevDisabledCls} to={'/topic/pn/'+prevNum} >&#xe679;</Link>
        <span>{pageNum}/{totalPages}</span>  
        <Link className={"page-icon "+nextDisabledCls} to={'/topic/pn/'+nextNum} >&#xe6a3;</Link>
      </div>
    );
  }
});

/*
function mapStateToProps(state, ownProps) {
  console.log('------------------',ownProps)
  return {
    pageNum: ownProps.params.pageNum,
  };
}
export default connect(mapStateToProps)(Page)*/

export default Page;