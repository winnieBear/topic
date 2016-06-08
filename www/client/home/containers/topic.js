import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'

import { addTopic,listTopicByPage} from '../actions'
import * as actionCreators from '../actions'
import TopicBox from '../components/topicBox/index'
import TopicForm from '../components/topicForm/index'
import Page from '../components/page/index'
import Head from '../components/head/index'

class Topic extends Component {
  constructor(props) {
    super(props)
    this.publishTopic = this.publishTopic.bind(this);
    //this.first = process.env.BROWSER ? (window.clientData ? true : false):false;
  }
  componentDidMount() {
    let pageNum = this.props.params.pageNum || 1;
    let first = process.env.BROWSER ? (window.clientData ? true : false):false;
    if(!first){
      this.props.dispatch(listTopicByPage(pageNum));
    }
  }
  componentDidUpdate(prevProps) {
    let prevPageNum = prevProps.params.pageNum;
    let pageNum = this.props.params.pageNum ;
    if(pageNum && pageNum != prevPageNum){
      this.props.dispatch(listTopicByPage(pageNum));
    }
  }
 
 
 	publishTopic(topic) {
    this.props.dispatch(addTopic(topic));
  }

  render() {
    //console.log('render -----------------topic')
    const { tLists,loginUser,page,isFetching} = this.props;
   	return (
      <div>
        <Head user={loginUser} />
        <TopicForm publishTopic={this.publishTopic} />
        <TopicBox  data={tLists}  loginUser={loginUser} />
        <Page  page={page} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let topic = state.topic;
  return {
    tLists: topic.tLists || [],
    loginUser: topic.userid || '',
    page:topic.page ||{
      pageNum:1,
      totalPages:1
    },
    isFetching:topic.isFetching || false,
  }
}



export default connect(mapStateToProps)(Topic)
