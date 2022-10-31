import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Empty, BackTop, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

function index() {
  const { t } = useTranslation();
  const router = useRouter();

  const followAcceptSuccess = () => {
    Modal.success({
      content: t("index:agree"),
      // content: "팔로우수락을 했습니다!",
    });
  };

  const { weekRecord, userRate, weekBikeRecord, purposeProgress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    Modal.destroyAll();
  }, []);

  const { searchMap } = useSelector((state) => state.map);
  const { me, notification, notificationCheckCount } = useSelector(
    (state) => state.user
  );

  // useEffect(() => {
  //   console.log("user정보", me);
  //   if (!me) {
  //     window.location.href = "/LoginTest";
  //   }
  // }, []);

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
        <PostDiv>
          <BackTop visibilityHeight={70} />
          {mainPosts.data.length !== 0 ? (
            mainPosts.data.map((post) => (
              <>
                <span className="title">Post</span>
                <PostCard post={post} key={post.id} t={t} />
              </>
            ))
          ) : (
            <Empty description={t("index:postDesc")} />
            // <Empty description="포스트 존재 X" />
          )}
          {loadMorePostErrorBolean ? null : (
            <LoadingOutlined
              style={{
                zIndex: "5",
                fontSize: 40,
                position: "relative",
                left: "50%",
              }}
            />
          )}
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
          }}
        >
          <TopDiv>
            <WeekChart
              weekRecord={weekRecord}
              weekBikeRecord={weekBikeRecord}
              t={t}
            />

            <MMR t={t} />
          </TopDiv>

          <BottomDiv>
            <Pie userRate={userRate} t={t} />
            <Progress t={t} />
            <Target t={t} />
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
    } else {
      // return {
      //   redirect: {
      //     destination: "/LoginTest",
      //     permanent: false,
      //   },
      // };
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

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "index",
          "common",
          "week",
          "login",
          "layout",
          "badge",
          "profile",
          "notification",
        ])),
      },
    };
  }
);

export default index;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 2%;
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
  border-left-width: 0;
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
  margin-top: 9%;
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
