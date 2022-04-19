import React, { useEffect } from "react";
import { Menu, Button, Row, Col, Card, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../component/LoginForm";
import UserProfile from "../component/UserProfile";
import UserBadge from "../component/userBadge";
import axios from "axios";

import wrapper from "../store/configureStore";
import PostCard from "../component/PostCard";
// import AppLayout from '../component/AppLayout';
import MyNote from "../component/MyNote";
import PostForm from "../component/postForm";
import Badge from "../component/badge";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import SideBar from "../component/Layout/SideBar";
// import wrapper from '../store/configureStore'
import { END } from "redux-saga";
import MyPurpose from "../component/myPurpose";
import Rank from "../component/Rank";
import Goal from "../component/goal";
import cookie from "react-cookies";
import cookies from "next-cookies";

import { setCookie, getCookie, removeCookie } from "react-cookies";

import styled from "styled-components";
import MyNoteNote from "../component/MyNoteNote";
import Guild from "../component/Guild";

import MissionCard from "../component/MissionCard";

function index() {
  const { searchMap } = useSelector((state) => state.map);
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  // useEffect(()=>{
  // dispatch({
  //   type:LOAD_MY_INFO_REQUEST
  // })
  // },[])
  // useEffect(() => {
  //  dispatch({
  //    type:LOAD_MY_INFO_REQUEST
  //  })

  //  console.log('me',me)
  // },[]);

  // useEffect(()=>{
  //   dispatch({
  //     type:LOAD_POSTS_REQUEST
  //    })
  // },[me])

  const sss = () => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  };
  return (
    <Container>
      <LeftDiv>
        {/* <MyNoteNote />
        <Guild /> */}

        <PostDiv>
          {/* <div
            style={{
              // height: "30%",
              marginBottom: "20px",
            }}
          >
            <h2>팔로워 중 나의 랭킹</h2>
            <Rank />
          </div> */}
          {mainPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </PostDiv>
      </LeftDiv>

      <RightDiv>{/* <MissionCard /> */}</RightDiv>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default index;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  // padding-top: 2%;
  padding: 0 5%;
  // border: 1px solid grey;

  .ant-card {
    width: 100%;
    // border-radius: 7px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
    margin: 0 !important;
  }
`;

const LeftDiv = styled.div`
  display: inline-block;
  width: 45%;
  height: 100%;
  border: 1px solid grey;
  // padding-left: 180px;
  padding-right: 2.5%;
`;

const LeftBottomDiv = styled.div`
  margin-top: 20px;
  display: flex;
  width: 70%;
  // border: 1px solid grey;
`;

const MidDiv = styled.div`
  display: inline-block;
  width: 40%;
  border: 1px solid grey;
`;

const RightDiv = styled.div`
  display: inline-block;
  width: 55%;
  height: 100%;
  border: 1px solid grey;
  // padding-left: 50px;
  padding-left: 2.5%;
  position: sticky;
  right: 0;
  top: 0;
`;

const PostDiv = styled.div`
  // 무한스크롤
  // overflow: auto;
  // overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding-left: 5px;
  // height: 88vh;
  // height: 70%;
  border-lef-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
  // border-style: solid;
  // border-color: #1890ff;
`;
