
import { all,call,fork,put,takeLatest, take} from 'redux-saga/effects'

import { LOAD_POSTS_FAILURE, LOAD_POSTS_SUCCESS,LOAD_POSTS_REQUEST,ADD_COMMENT_REQUEST,ADD_COMMENT_FAILURE,ADD_COMMENT_SUCCESS,LOADS_POSTS_FAILURE,LOADS_POSTS_SUCCESS,LOADS_POSTS_REQUEST, LOAD_MORE_POST_REQUEST, LOAD_MORE_POST_SUCCESS, LOAD_MORE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE} from '../reducers/post'
import axios from 'axios'




const loadPostsAPI =async()=>{
    console.log('1111')
    const res=await axios.get('https://2yubi.shop/api/post/index')

    const data=await res.data
    console.log('jjjjjj',data)
    return data
    }
    

function* loadPosts(action){
    try{
        const result = yield call(loadPostsAPI)
        console.log('dongresultss',result)
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data:{
            data:result.data,
            nextPage:result.next_page_url
            }
                
                
        })

    }catch(err){
        yield put({
            type:LOAD_POSTS_FAILURE,
            error:'xx',
             
        })

    }
}





const morePostAPI =async(datas)=>{
   

    const res= await fetch(`${datas}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        
      });




    

      const data= await res.json()
    console.log('pageResult',data)
    return data
    }
    

function* morePost(action){
    try{
        const result = yield call(morePostAPI,action.data)
        console.log('dongresultss',result)
        yield put({
            type:LOAD_MORE_POST_SUCCESS,
            data:{
                data:result.data,
                nextPage:result.next_page_url
            }
                
                
        })

    }catch(err){
        yield put({
            type:LOAD_MORE_POST_FAILURE,
            error:'xx',
             
        })

    }
}











const loadsPostsAPI =async()=>{
    try{
        const res= await fetch("https://2yubi.shop/api/post/index", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            
          });
          const data= await res.json()

          return data

    }catch(err){
        console.log(err)
    }
}
    

function* loadsPosts(action){
    try{
        const result = yield call(loadsPostsAPI)
        console.log('dongresultss',result)
        yield put({
            type:LOADS_POSTS_SUCCESS,
            data:{
                data:result.data,
                nextPage:result.next_page_url
                            }
                                
        })

    }catch(err){
        yield put({
            type:LOADS_POSTS_FAILURE,
            error:'xx',
             
        })

    }
}








const addCommentAPI=async(datas)=>{

    try{
        
        const res= await fetch(`https://2yubi.shop/api/comment/store/${datas.postId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              content:datas.contents.content
             
        }),
          });
          const data= await res.json()
        
      
          return data

    }catch(err){
        console.log(err)
    }

    }
    

function* addComment(action){
    try{
        const result=yield call(addCommentAPI,action.data)
        console.log('commentresult',result)
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:{
                id:action.data.postId,
                result

            }
        })

    }catch(err){
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:'err.response.data',
             
        })

    }
}











function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST,loadPosts)
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment)
}
function* watchLoadsPosts(){
    yield takeLatest(LOADS_POSTS_REQUEST,loadsPosts)
}
function* watchLoadMorePost(){
    yield takeLatest(LOAD_MORE_POST_REQUEST,morePost)
}


export default function* rootSaga(){

    yield all([
        fork(watchLoadPosts),
        fork(watchAddComment),
        fork(watchLoadsPosts),
        fork(watchLoadMorePost),
      
    ])

}
