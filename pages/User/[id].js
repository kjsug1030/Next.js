import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LockOutlined } from "@ant-design/icons";
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
  Avatar,
  Spin,
  Alert,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import { ADD_TRACK_REQUEST, LOAD_CREATEMAP_REQUEST } from "../../reducers/map";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {
  OTHER_PROFILE_REQUEST,
  LOAD_MY_INFO_REQUEST,
  FOLLOWING_REQUEST,
  UNFOLLOWING_REQUEST,
  FOLLOW_CANCEL_REQUEST,
  FOLLOW_NOFICATION_REQUEST,
  OTHER_USER_TOTAL_BIKE_TIME_REQUEST,
  OTHER_USER_TOTAL_CALORIE_REQUEST,
  OTHER_USER_TOTAL_RUN_TIME_REQUEST,
  OTHER_USER_TOTAL_TIME_REQUEST,
  OTHER_USER_BADGE_REQUEST,
} from "../../reducers/user";
import {
  LOAD_MORE_POST_REQUEST,
  LOAD_POSTS_REQUEST,
} from "../../reducers/post";
import BadgeModal from "../../component/User/BadgeModal";
import SportsChart from "../../component/User/SportsChart";
import FollowerPost from "../../component/User/Post";
import FollowerMMR from "../../component/User/MMR";
import Follower from "../../component/User/Follower";
import FollowerPie from "../../component/User/Pie";

function userProfile() {
  const [isModal, setIsModal] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (isFollowing === false) {
  //     <Spin spinning={loading}>
  //       <Alert
  //         message="Alert message title"
  //         description="Further details about the context of this alert."
  //         type="info"
  //       />
  //     </Spin>;
  //     setLoading(true);
  //   }
  //   setLoading(false);
  // }, []);

  const showModal = () => {
    setIsModal(true);
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
    console.log(isModal);
  };

  const {
    otherProfile,
    otherUserTotalTime,
    otherUserTotalCalorie,
    otherUserTotalRunTime,
    otherUserTotalBikeTime,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { me, follower } = useSelector((state) => state.user);

  const isFollowing = me.followings.find((v) => v.id === otherProfile.id);

  const followCancel = () => {
    dispatch({
      type: FOLLOW_CANCEL_REQUEST,
      data: otherProfile.id,
    });
  };

  const follow = () => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOWING_REQUEST,
        data: otherProfile.id,
      });
    } else {
      dispatch({
        type: FOLLOW_NOFICATION_REQUEST,
        data: otherProfile.id,
      });
    }
  };

  function timeChange(seconds) {
    //3항 연산자를 이용하여 10보다 작을 경우 0을 붙이도록 처리 하였다.
    var hour =
      parseInt(seconds / 3600) < 10
        ? // ? "0" + parseInt(seconds / 3600)
          parseInt(seconds / 3600)
        : null;
    var min =
      parseInt((seconds % 3600) / 60) < 10
        ? "0" + parseInt((seconds % 3600) / 60)
        : parseInt((seconds % 3600) / 60);
    var sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;
    //연산한 값을 화면에 뿌려주는 코드
    const value = hour === 0 ? min + ":" + sec : hour + ":" + min + ":" + sec;
    return value;
  }

  const cardScore = [
    {
      title: "총 운동 시간",
      distance: timeChange(otherUserTotalTime),
    },
    {
      title: "총 소모 칼로리",
      distance: otherUserTotalCalorie + "Kcal",
    },
    {
      title: "총 라이딩 거리",
      distance: otherUserTotalRunTime.distance
        ? otherUserTotalRunTime.distance + "km"
        : 0 + "km",
    },
    {
      title: "총 러닝 거리",
      distance: otherUserTotalBikeTime.distance
        ? otherUserTotalBikeTime.distance.toFixed(2) + "km"
        : 0 + "km",
    },
  ];

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
            {otherProfile.followCheck === 3 ? (
              <Button
                className="follow_btn"
                style={{ backgroundColor: "green" }}
                onClick={followCancel}
              >
                요청중
              </Button>
            ) : otherProfile.followCheck === 1 ? (
              <Button className="follow_btn" onClick={follow}>
                언팔로우
              </Button>
            ) : (
              <Button className="follow_btn" onClick={follow}>
                팔로우
              </Button>
            )}
          </div>
          <div className="follow">
            <h2 className="follower">
              게시물 : {otherProfile.post ? otherProfile.posts.length : 0}
            </h2>
            <h2 className="follower">
              팔로워 :{" "}
              {otherProfile.followers ? otherProfile.followers.length : 0}
            </h2>
            <h2>
              팔로잉 :{" "}
              {otherProfile.followings ? otherProfile.followings.length : 0}
            </h2>
          </div>
          <h2>자기소개 : {otherProfile.introduce}</h2>
          {/* <Button onClick={showModal}>도감</Button> */}
        </div>

        {otherProfile.followCheck === 1 && (
          <div className="follow_chart">
            <img src="/badgeBook2.png" onClick={showModal} />
            <p className="badge" onClick={showModal}>
              Badge
            </p>
            <BadgeModal
              otherProfile={otherProfile}
              isModal={isModal}
              openModal={openModal}
            />
            {/* <FollowerPie className="follow_pie" userRate={userRate} /> */}
            {/* <BadgeBook /> */}
            <SportsChart
              runWeekRecord={otherProfile.runWeekData}
              bikeWeekRecord={otherProfile.bikeWeekData}
            />
            {/* <Pie userRate={userRate} /> */}
          </div>
        )}
      </div>

      {otherProfile.followCheck === 1 ? (
        <div className="div_wrapper">
          {/* <BadgeBook /> */}
          <LeftDiv>
            <div className="follow_list">
              <span className="follow_title">Follower</span>
              <Follower follower={otherProfile.followers} />
            </div>
            <GreyRightLine />
          </LeftDiv>
          <MidDiv>
            <PostDiv>
              {otherProfile.posts.length > 0 ? (
                otherProfile.posts
                  .slice(0)
                  .reverse()
                  .map((post) => (
                    <>
                      <span className="post_title">Post</span>
                      <FollowerPost
                        post={post}
                        key={post.id}
                        user={otherProfile}
                        className="follow_post"
                      />
                    </>
                  ))
              ) : (
                <Empty description="포스트가 존재하지 않습니다" />
              )}
            </PostDiv>
          </MidDiv>
          <RightDiv>
            {/* <div className="sports_count">
              <div className="sports_content">
                <h2>이번달 운동횟수</h2>
                <p>5</p>
              </div>
            </div> */}
            <FollowerMMR mmr={otherProfile.mmr} />
            <ScoreDiv>
              <Row gutter={[16, 16]}>
                {cardScore.map((card, index) => (
                  <Col xs={24} xl={12}>
                    <DivLine />
                    <Card key={index} hoverable>
                      <h3>{card.title}</h3>
                      <p>{card.distance}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ScoreDiv>
            <FollowerPie
              bikePercentage={otherProfile.bikePercentage}
              runPercentage={otherProfile.runPercentage}
            />
            {/* <BadgeBook /> */}
          </RightDiv>
        </div>
      ) : (
        <Card className="card_wrapper">
          {/* 언팔로잉 때 컴포넌트 */}
          <div className="card_div">
            <div className="flex_div">
              <h1>비공개 계정입니다</h1>
              <LockOutlined className="lock" />
            </div>
            <p>포스트 및 기록을 보려면 팔로우하세요</p>
          </div>
        </Card>
      )}
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
        profileUserId: context.params.id,
        userId: posts.data.id,
      },
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: OTHER_USER_TOTAL_CALORIE_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: OTHER_USER_TOTAL_BIKE_TIME_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: OTHER_USER_TOTAL_RUN_TIME_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: OTHER_USER_TOTAL_TIME_REQUEST,
      data: context.params.id,
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
  // padding-left: 30px;

  h1 {
    font-size: 24px !important;
    font-weight: 550;
  }

  .flex_div {
    display: flex;
    position: relative;

    // border-bottom: 1px solid #e9e9e9;
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

    position: absolute;
    right: 0;

    img {
      width: 165px;
      height: 165px;
      margin-right: 10%;
    }

    img:hover {
      // border: 4px solid #467ada;
      cursor: pointer;
    }

    p {
      position: absolute;
      bottom: 31%;
      left: 52px;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
    }

    p:hover {
      cursor: pointer;
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

  .div_wrapper {
    display: flex;
    width: 100%;
    height: 600px;
    margin-top: 40px;
    // border: 1px solid grey;

    border-top: 1px solid #e9e9e9;
  }

  .follow_title {
    display: inline-block;
    width: 100%;
    // max-width: 220px;
    max-width: 160px;
    height: 35px;
    line-height: 30px;
    text-align: left;
    background: #467ada;
    color: #fff;
    // padding-left: 10px;
    padding-left: 15px;
    font-size: 26px;
    font-weight: bold;
    clip-path: polygon(80% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    position: relative;
    left: 1px;
    z-index: 99;
  }

  .follow_list {
    position: absolute;
    left: 5%;
    bottom: 0%;
  }
`;

const LeftDiv = styled.div`
  width: 18%;
  height: 600px;
  // border-right: 1px solid grey;
`;

const MidDiv = styled.div`
  width: 52%;
  height: 600px;
  // border: 1px solid grey;
  overflow-y: scroll;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  padding: 0 2%;
`;

const RightDiv = styled.div`
  width: 30%;
  height: 600px;
  // border-left: 1px solid grey;
  padding: 0 30px;
  padding-top: 30px;

  .sports_count {
    width: 290px;
    height: 120px;

    margin: 0 auto;
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
  }

  .follow_pie {
    width: 400px;
    height: 400px;
  }
`;

const PostDiv = styled.div`
  // 무한스크롤
  // width: 600px;
  width: 100%;

  position: relative;

  margin-top: 30px;

  .ant-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
  }

  h2 {
    font-weight: bold;
    font-size: 26px;
  }

  .ant-card {
    border-top-left-radius: 0 !important;
  }

  .post_title {
    display: inline-block;
    width: 100%;
    max-width: 160px;
    height: 37px;
    line-height: 35px;
    text-align: left;
    background: #467ada;
    color: #fff;
    padding-left: 15px;
    font-size: 28px;
    font-weight: bold;
    clip-path: polygon(65% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    position: relative;
    top: 0;
    left: 0;
  }
`;

const GreyLine = styled.div`
  display: inline-block;
  position: sticky;
  top: 12%;
  left: 3%;
  width: 1px;
  // height: 790px;
  margin-right: 10px;
  background: #ebeef3;
`;

const GreyRightLine = styled(GreyLine)`
  left: 49%;
  margin-left: 15px;
  margin-right: 0;
`;

const ScoreDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  p {
    margin: 7px;
  }

  h3 {
    margin: 0;
    font-weight: bold;
  }

  .ant-card {
    border-radius: 9px;
    // box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  .ant-card-body {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 3;
  }
`;

const DivLine = styled.div`
  display: inline-block;

  border-top: 60px solid #467ada;
  border-right: 60px solid #fff;
  border-top-left-radius: 12px;
  position: absolute;
  bottom: 30%;
  left: 9px;
  top: 2px;
  z-index: 1;
`;
