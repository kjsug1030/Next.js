import React,{useCallback,useState,useEffect} from 'react';
import {Button} from 'antd'
import PropTypes from 'prop-types'
import { useSelector,useDispatch } from 'react-redux';
import { FOLLOWING_REQUEST,UNFOLLOWING_REQUEST } from '../reducers/user';

function FollowButton({post}) {



  const dispatch=useDispatch();
  const {me, follower} = useSelector((state)=>state.user)

  
  
  const isFollowing=me.followings.find((v)=>v.id===post.id)
 
   

    const follow=()=>{
      if(isFollowing){
        dispatch({
          type:UNFOLLOWING_REQUEST,
          data:post.id
        })
      }else{
        
        dispatch({
          type:FOLLOWING_REQUEST,
          data:{id:post.id,name:post.name}
        })
      }
    }
  
  return (
    <div>
        {isFollowing?<Button style={{bottom:30,fontSize:15,position:'relative',left:350,bottom:60}} onClick={follow}>언팔로우</Button>:<Button style={{bottom:30,fontSize:15,position:'relative',left:350,bottom:60}} onClick={follow}>팔로우</Button>}
        </div>
  )
}

export default FollowButton