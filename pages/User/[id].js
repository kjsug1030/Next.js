import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  Form,
  Card,
  Table,
  Button,
  Slider,
  Switch,
  Row,
  Col,
  Input,
  Modal,
  Avatar
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import { ADD_TRACK_REQUEST, LOAD_CREATEMAP_REQUEST } from "../../reducers/map";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { OTHER_PROFILE_REQUEST,LOAD_MY_INFO_REQUEST,FOLLOWING_REQUEST,UNFOLLOWING_REQUEST, FOLLOW_CANCEL_REQUEST, FOLLOW_NOFICATION_REQUEST } from "../../reducers/user";
import BadgeModal from '../badgeModal'

function userProfile() {


    const [isModal, setIsModal] = useState(false);

    const showModal = () => {
      setIsModal(true);
    };

    const openModal = () => {
         setIsModal((prev) => !prev);
        console.log(isModal);
    };

  


    const {otherProfile} =useSelector((state)=>state.user)

    const dispatch = useDispatch();
    const { me, follower } = useSelector((state) => state.user);
    const isFollowing=me.followings.find((v)=>v.id===otherProfile.id)

    const followCancel=()=>{
        dispatch({
            type:FOLLOW_CANCEL_REQUEST,
            data:otherProfile.id
        })
    }

    const follow=()=>{
        if(isFollowing){
          dispatch({
            type:UNFOLLOWING_REQUEST,
            data:otherProfile.id
          })
        }else{
          
          dispatch({
            type:FOLLOW_NOFICATION_REQUEST,
            data:otherProfile.id
          })
        }
      }
  return (
    <Container>
        <BadgeModal
        isModal={isModal}
        openModal={openModal}
        setIsModal={setIsModal}
      />
    <div className="flex_div">
      <Avatar size={160} src={otherProfile.profile} />
      <div className="profile_wrapper">
        <div className="flex_div">
          <h1 className="user_name">{otherProfile.name}</h1>
          {otherProfile.followCheck===3 ? 
               <Button className="follow_btn" style={{backgroundColor:'green'}} onClick={()=>followCancel()}>
               요청중
             </Button>:otherProfile.followCheck===1?
             (<Button className="follow_btn" onClick={()=>follow()}>
               언팔로우
             </Button>):
             ( <Button className="follow_btn" onClick={()=>follow()}>
               팔로우
             </Button>)

          }
   
        </div>
        <div className="follow">
          <h2 className="follower">게시물 : {otherProfile.post?otherProfile.posts.length:0}</h2>
          <h2 className="follower">팔로워 : {otherProfile.followers?otherProfile.followers.length:0}</h2>
          <h2>팔로잉 : {otherProfile.followings?otherProfile.followings.length:0}</h2>
        </div>
        <h2>자기소개 : {otherProfile.introduce}</h2>
        <Button onClick={showModal}>도감</Button>
      </div>
      </div>
    </Container>
  );
}

// export async function getStaticPaths() {
//   const posts = await axios.get("https://2yubi.shop/api/allUser");

//   var paths1 = posts.data.map((id) => ({
//     params: { id: id.id.toString()},
//   }));

//   return {
//     paths: paths1,
//     // paths:[  { params: { id: '5' } },],
//     fallback: false,
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });


//   context.store.dispatch({
//     type: OTHER_PROFILE_REQUEST,
//     data: context.params.id,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });





export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
      // const { query } = context;
  
      const cookie = context.req ? context.req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      console.log("qwiejnbbds", context.params.id);
      const posts = await axios.get("https://2yubi.shop/api/user");
    //   https://2yubi.shop/api/user
    // var userId=posts.data.id

      context.store.dispatch({
        type: OTHER_PROFILE_REQUEST,
        data: {
            profileUserId:context.params.id,
            userId:posts.data.id
      }}
      );
      context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    
      
  
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
    }
  );
  


export default userProfile;


const Container = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;

  padding: 0 5%;
  padding-top: 70px;

  h1 {
    font-size: 24px !important;
    font-weight: 550;
  }

  .flex_div {
    display: flex;
    position: relative;
  }

  .lock {
    font-size: 30px;
    padding-left: 7px;
    padding-top: 2px;
  }

  .user_name {
    margin-right: 10px;
  }

  .follow {
    display: flex;
    justify-content: center;

    .follower {
      margin-right: 20px;
    }
  }

  .follow_btn {
    width: 90px;
    height: 35px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    background: #467ada;
    border: 1px solid #467ada;
    color: #fff;
  }

  .follow_chart {
    display: flex;
    // width: 100%;
    // justify-content: space-between;

    position: absolute;
    // top: 0;
    right: 0;

    // .follow_pie {
    //   margin-right: 5% !important;
    // }

    img {
      width: 165px;
      height: 165px;
    }

    p {
      position: absolute;
      top: 0;
    }
  }

  .profile_wrapper {
    margin-top: 20px;
    margin-left: 20px;
  }

  .card_wrapper {
    width: 100%;
    height: 600px;
    margin-top: 30px;
    background: #f7f7fa;

    .card_div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      p {
        font-size: 20px;
      }
    }
  }

  .sports_count {
    width: 290px;
    height: 120px;
    position: absolute;
    top: 13%;
    right: 30%;
    text-align: center;
    border: 1px solid #e9e9e9;
    border-radius: 12px;

    h2 {
      margin: 0;
    }

    p {
      font-size: 48px;
      font-weight: bold;
      margin: 0;
    }

    .sports_content {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .div_wrapper {
    display: flex;
    width: 100%;
    height: 600px;
    margin-top: 40px;
    // padding-top: 20px;
    // background: #f7f7fa;
    border: 1px solid grey;
  }

  .follow_title {
    display: inline-block;
    width: 100%;
    // max-width: 220px;
    max-width: 140px;
    height: 35px;
    line-height: 30px;
    text-align: left;
    background: #467ada;
    color: #fff;
    padding-left: 10px;
    font-size: 22px;
    font-weight: bold;
    clip-path: polygon(65% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    position: relative;
    left: 1px;
    z-index: 99;

    // position: sticky;
    // top: 0;
    // left: 0;
  }

  .follow_list {
    position: absolute;
    left: 5%;
    bottom: 5%;
  }
`;