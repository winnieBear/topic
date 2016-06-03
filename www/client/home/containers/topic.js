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
    this.publishTopic = this.publishTopic.bind(this)
    this.turnPage = this.turnPage.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(listTopicByPage(this.props.page.pageNum));
  }
 
 	publishTopic(topic) {
    this.props.dispatch(addTopic(topic));
  }

  turnPage(pageNum){
    this.props.dispatch(listTopicByPage(pageNum));
  }
 
  render() {
    const { tLists,loginUser,page,isFetching} = this.props;
   	return (
      <div>
        <Head user={loginUser} />
        <TopicForm publishTopic={this.publishTopic} />
        <TopicBox  data={tLists}  loginUser={loginUser} />
        <Page turnPage={this.turnPage}  page={page} />
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
    isFetching:topic.isFetching || false
  }
}



export default connect(mapStateToProps)(Topic)
