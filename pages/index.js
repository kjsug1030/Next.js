import React, { useEffect } from "react";
import {
  Menu,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Modal,
  Empty,
  Statistic,
  Progress
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../component/LoginForm";
import axios from "axios";

import wrapper from "../store/configureStore";
import PostCard from "../component/PostCard";
import MyNote from "../component/MyNote";
import { LOAD_MY_INFO_REQUEST , USER_RATE_REQUEST, WEEKRECORD_REQUEST,WEEKRECORD_BIKE_REQUEST, WEATHER_REQUEST, PROGRESS_REQUEST} from "../reducers/user";
import { LOAD_MORE_POST_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";

import { END } from "redux-saga";
import MyPurpose from "../component/myPurpose";
import Rank from "../component/Rank";
import Goal from "../component/goal";
import styled from "styled-components";
import MyNoteNote from "../component/MyNoteNote";
import Guild from "../component/Guild";

import MissionCard from "../component/MissionCard";
import WeekChart from "../component/WeekChart";
import Pie from "../component/Pie";
import Target from "../component/Target";
import MMR from "../component/MMR";
import { ArrowUpOutlined } from "@ant-design/icons";
import PurposePie from "../component/purposePie";

function index() {

  const {weekRecord,userRate,weekBikeRecord,purposeProgress}=useSelector((state)=>(state.user))


  useEffect(() => {
    Modal.destroyAll();
  });

  const { searchMap } = useSelector((state) => state.map);
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadMorePostLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadMorePostLoading) {
          dispatch({
            type: LOAD_MORE_POST_REQUEST,
            data: mainPosts.nextPage,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadMorePostLoading]);

  return (
    <Container>
    <LeftDiv>
      <GreyLine />
      <PostDiv>
        {mainPosts.length === 0 ? (
          <Empty description="포스트가 존재하지 않습니다" />
        ) : (
          mainPosts.data.map((post) => <PostCard post={post} key={post.id} />)
        )}
        {/* <Empty description="포스트가 존재하지 않습니다" /> */}
      </PostDiv>
      <GreyRightLine />
    </LeftDiv>
    <RightDiv
    // style={{
    //   display: "inline-block",
    //   width: "50%",
    //   position: "fixed",
    //   top: "13%",
    //   right: 0,
    //   padding: 12,
    //   // overflow: "visible",
    //   height: "100%",
    // }}
    >
      <div
        style={{
          display: "inline-block",
          width: "100%",
          position: "sticky",
          top: "10%",
          right: 0,
          padding: 12,
        }}
      >
        <TopDiv>
          <WeekChart weekRecord={weekRecord} weekBikeRecord={weekBikeRecord} />
          <MMR />
        </TopDiv>
        <BottomDiv>
          <Pie userRate={userRate} />
          {/* <MyNoteNote /> */}
          {/* <PurposePie purposeProgress={purposeProgress}></PurposePie> */}
          <Card>
          *러닝목표율
          {purposeProgress.run[0]?<div><Progress type="circle" percent={purposeProgress.run[0].progress}></Progress><div>목표:{purposeProgress.run[0].goalDistance}km</div><div>시작일:{purposeProgress.run[0].firstDate}</div><div>종료일:{purposeProgress.run[0].lastDate}</div></div>:<div>러닝등록된목표가없습니다.</div>}

          *자전거목표율
          {purposeProgress.bike[0]?<div><Progress type="circle" percent={purposeProgress.bike[0].progress}></Progress><div>목표:{purposeProgress.bike[0].goalDistance}km</div><div>시작일:{purposeProgress.bike[0].firstDate}</div><div>종료일:{purposeProgress.bike[0].lastDate}</div></div>:<div>자전거등록된목표가없습니다.</div>}

          </Card>
          
          <Target />
        </BottomDiv>
      </div>
    </RightDiv>
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
    context.store.dispatch({
      type:WEEKRECORD_REQUEST
    })
    context.store.dispatch({
      type:WEEKRECORD_BIKE_REQUEST
    })
    context.store.dispatch({
      type:USER_RATE_REQUEST
    })
    context.store.dispatch({
      type:WEATHER_REQUEST
    })
    context.store.dispatch({
      type:PROGRESS_REQUEST
    })
    
    
    console.log("getssr", new Date().toTimeString());

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default index;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  // height: 1300px;
  padding: 0 2%;
  // border: 1px solid grey;

  position: relative;

  .ant-card {
    width: 100%;
    // border-radius: 7px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
    margin: 0 !important;
  }
`;

const LeftDiv = styled.div`
  display: inline-block;
  display: flex;
  position: relative;
  width: 45%;
  // border: 1px solid grey;

  padding-right: 1.5%;
  padding-left: 1.5%;
  margin-top: 70px;
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
  // border: 1px solid grey;
`;

const RightDiv = styled.div`
  display: inline-block;
  width: 53%;
  height: 100%;
  margin: 0 auto;

  // background: #ebedf3;

  border-radius: 55px;
  // position: sticky;
  // top: 15%;
  // padding: 12px;
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

  .ant-empty {
    position: relative;
    top: 10%;
  }

  h2 {
    font-weight: bold;
    font-size: 26px;
  }
`;

const TopDiv = styled.div`
  display: flex;
  width: 100%;
`;

const BottomDiv = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  // vertical-align: middle;
`;

const GreyLine = styled.div`
  display: inline-block;
  position: sticky;
  top: 12%;
  left: 3%;
  width: 1px;
  height: 790px;
  margin-right: 10px;
  background: #ebeef3;
`;

const GreyRightLine = styled(GreyLine)`
  left: 45%;
  margin-left: 15px;
  margin-right: 0;
`;