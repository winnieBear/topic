import React from 'react'
import {Link} from 'react-router'

require('./index.scss')

export default React.createClass({

  render: function() {
    let {pageNum,totalPages} = this.props.page;
    let turnPage = this.props.turnPage;
    return (
      <div className="page-wrapper">
        <Link className="page-icon " onClick={(e) => {e.preventDefault();if(pageNum >1) turnPage(pageNum-1) } } to={'/topic/pn/'+(pageNum -1)}>&#xe679;</Link>
        <span>{pageNum}/{totalPages}</span>  
        <Link className="page-icon " onClick={() =>{if(pageNum < totalPages) turnPage(pageNum + 1) }} to={'/topic/pn/'+(pageNum+1)}>&#xe6a3;</Link>
      </div>
    );
  }
});