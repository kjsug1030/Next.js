import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Empty, BackTop, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../component/LoginForm";
import axios from "axios";

import wrapper from "../store/configureStore";
import PostCard from "../component/PostCard";

import {
  LOAD_MY_INFO_REQUEST,
  USER_RATE_REQUEST,
  WEEKRECORD_REQUEST,
  WEEKRECORD_BIKE_REQUEST,
  WEATHER_REQUEST,
  PROGRESS_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_REQUEST,
  FOLLOWING_REQUEST,
  NOTIFICATION_DELETE_REQUEST,
  CHECK_NOTIFICATION_REQUEST,
  BADGE_REQUEST,
} from "../reducers/user";
import { LOAD_MORE_POST_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";

import { END } from "redux-saga";
import MyPurpose from "../component/myPurpose";
import Rank from "../component/Rank";
import Goal from "../component/goal";
import styled from "styled-components";
import MyNoteNote from "../component/MyNoteNote";

import MissionCard from "../component/MissionCard";
import WeekChart from "../component/WeekChart";
import Pie from "../component/Pie";
import Target from "../component/Target";
import MMR from "../component/MMR";
import { ArrowUpOutlined } from "@ant-design/icons";
import PurposePie from "../component/purposePie";
import Progress from "../component/Progress";
// import { disableCursor } from "@fullcalendar/common";

function index() {
  const followAcceptSuccess = () => {
    Modal.success({
      content: "팔로우수락을 했습니다!",
    });
  };

  const { weekRecord, userRate, weekBikeRecord, purposeProgress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    Modal.destroyAll();
  });

  const { searchMap } = useSelector((state) => state.map);
  const { me, notification, notificationCheckCount } = useSelector(
    (state) => state.user
  );
  const {
    mainPosts,
    hasMorePosts,
    loadMorePostLoading,
    loadMorePostErrorBolean,
    loadMorePostNumberError,
  } = useSelector((state) => state.post);

  const [isModal, setIsModal] = useState(false);
  const showModal = () => {
    setIsModal(true);
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
    console.log(isModal);
  };

  // const [notificationCount, setNotificationCount] = useState(0);

  // const [checkNotificationCount, setCheckNotificationCount] = useState(0);

  // const [notificationLength, setNotificationLength] = useState(
  //   notification.data.length
  // );
  // const originalNotificationLength = notification.data.length;
  const dispatch = useDispatch();

  const checkNotificationCountfunction = () => {
    // dispatch({
    //   type:CHECK_NOTIFICATION_REQUEST,
    //   data:notification.data.length
    // })

    localStorage.setItem(me.name, notification.data.length);

    // localStorage[me.name]=notification.data.length
    // setCheckNotificationCount(notification.data.length)//새로고침하면저장이안됨
    setNotificationCount(0);
  };

  // nickName=me.name

  // useEffect(() => {
  //   if (!localStorage.getItem(me.name)) {
  //     localStorage.setItem(me.name, 0);
  //   }

  //   console.log("fd", localStorage);
  //   console.log("length", notification.data.length);
  //   console.log("check", localStorage.originalCount);

  //   if (notification.data.length - localStorage.getItem(me.name) > 0) {
  //     setNotificationCount(
  //       notificationCount +
  //         (notification.data.length - localStorage.getItem(me.name))
  //     );
  //   }
  // }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadMorePostLoading && !loadMorePostErrorBolean) {
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

  const followAccept = (id) => {
    followAcceptSuccess();

    console.log("qwresadasd", id);
    dispatch({
      type: FOLLOWING_REQUEST,
      data: id,
    });
  };

  const notificationDelete = (id) => {
    dispatch({
      type: NOTIFICATION_DELETE_REQUEST,
      data: id,
    });
  };

  return (
    <Container>
      <LeftDiv>
        {/* <GreyLine /> */}
        <PostDiv>
          <BackTop />
          {mainPosts.data.length !== 0 ? (
            mainPosts.data.map((post) => (
              <>
                <span className="title">Post</span>
                <PostCard post={post} key={post.id} />
              </>
            ))
          ) : (
            <Empty description="포스트가 존재하지 않습니다" />
          )}
          {/* {loadMorePostErrorBolean ? null : (
            <LoadingOutlined
              style={{ zIndex: "5", fontSize: 40, marginLeft: 250 }}
            />
          )} */}
        </PostDiv>

        <GreyRightLine />
      </LeftDiv>
      <RightDiv>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            position: "sticky",
            top: "15%",
            // right: 0,
            // padding: 12,
          }}
        >
          <TopDiv>
            <WeekChart
              weekRecord={weekRecord}
              weekBikeRecord={weekBikeRecord}
            />

            {/* <Badge count={notificationCount}>
              <Button onClick={() => checkNotificationCountfunction()}>
                알림확인하기
              </Button>
            </Badge>
            {notification
              ? notification.data.map((m) => (
                  <>
                    <Card>
                      {m.not_message}
                      {m.not_type === "followRequest" ? (
                        <Button
                          primary
                          onClick={() => followAccept(m.target_mem_id)}
                        >
                          요청수락
                        </Button>
                      ) : null}

                      <Button
                        danger
                        onClick={() => notificationDelete(m.not_id)}
                      >
                        삭제
                      </Button>
                    </Card>
                    <br></br>
                  </>
                ))
              : null} */}

            <MMR />
          </TopDiv>

          <BottomDiv>
            <Pie userRate={userRate} />
            <Progress />
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
      type: WEEKRECORD_REQUEST,
    });
    context.store.dispatch({
      type: WEEKRECORD_BIKE_REQUEST,
    });
    context.store.dispatch({
      type: USER_RATE_REQUEST,
    });
    context.store.dispatch({
      type: WEATHER_REQUEST,
    });
    context.store.dispatch({
      type: PROGRESS_REQUEST,
    });
    context.store.dispatch({
      type: NOTIFICATION_REQUEST,
    });

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

  // padding: "3% 0,

  position: relative;

  .ant-card {
    width: 100%;
    // border-radius: 7px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
    margin: 0 !important;
  }

  .ant-back-top-icon {
    background: #467ada;
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
  border-radius: 55px;
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
    top: 30%;
  }

  h2 {
    font-weight: bold;
    font-size: 26px;
  }

  .ant-card {
    border-top-left-radius: 0 !important;
  }

  .title {
    display: inline-block;
    width: 100%;
    max-width: 140px;
    height: 35px;
    line-height: 30px;
    text-align: left;
    background: #467ada;
    color: #fff;
    padding-left: 15px;
    font-size: 26px;
    font-weight: bold;
    clip-path: polygon(65% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    position: relative;
    left: 1px;
  }
`;

const TopDiv = styled.div`
  display: flex;
  width: 100%;

  // .follow_chart {
  //   // display: flex;

  //   position: relative;

  //   img {
  //     width: 165px;
  //     height: 165px;
  //     margin-right: 10%;
  //   }

  //   img:hover {
  //     // border: 4px solid #467ada;
  //     cursor: pointer;
  //   }

  //   p {
  //     position: absolute;
  //     bottom: -5%;
  //     left: 52px;
  //     color: #fff;
  //     font-size: 22px;
  //     font-weight: bold;
  //   }

  //   p:hover {
  //     cursor: pointer;
  //   }
  // }

  // .mmr {
  //   display: inline-block;
  //   margin-left: ;
  // }
`;

const BottomDiv = styled.div`
  margin-top: 7%;
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
  left: 49%;
  margin-left: 15px;
  margin-right: 0;
`;
