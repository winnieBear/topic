//reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
//(previousState, action) => newState
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const topic = (state={
  pageNum:1,
  totalPages:1,
  userid:'',
  tLists:[],
  isFetching:false
}, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return Object.assign({},state,{
        userid:''
      });
    case 'REQUEST_TOPIC_DATA':
      return Object.assign({}, state, {
        isFetching: true,
      })
    case 'RECEIVE_TOPIC_DATA':
      let data = action.data;
      let d = {
        isFetching:false,
        page:data.page,
        tLists:data.tLists,
      };
      if(typeof data.userid !== 'undefined'){
        d.userid = data.userid;
      }
      return Object.assign({},state,d);
    case 'RECEIVE_COMMENT_DATA':
      let tid = action.tid;
      let oldLists = state.tLists;
      let comments = action.comments;
      let index = oldLists.findIndex(item=> item.id == tid);
      if(index < 0){
        return state;
      }
      let newItem = Object.assign({},oldLists[index],{
        comment:comments
      });
      let arrBefore = index > 0 ? oldLists.slice(0,index): [];
      let arrAfter = oldLists.slice(index+1);
      let newLists = arrBefore.concat([newItem],arrAfter);
//console.info(arrBefore,newItem,arrAfter)

      return Object.assign({},state,{
        isFetching:false,
        tLists:newLists
      })
      
    case 'LIST_TOPIC_BY_PAGE':
      return state;
    default:
      return state
  }
}




const rootReducer = combineReducers({
  topic,
  routing
})

export default rootReducer
