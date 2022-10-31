import React from "react";
import wrapper from "../store/configureStore";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { END } from "redux-saga";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_SEARCH_REQUEST,
  LOAD_MY_INFO_REQUEST,
  OTHER_PROFILE_REQUEST,
  NOTIFICATION_REQUEST,
} from "../reducers/user";
import { Card, Input, Avatar, Button, Row, Col, Result } from "antd";
import FollowButton from "../component/FollowButton";
import userProfile from "./User/[id]";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function userSearch() {
  const { t } = useTranslation("layout");
  const { Search } = Input;
  const Router = useRouter();

  const dispatch = useDispatch();
  const { searchUsers } = useSelector((state) => state.user);

  const handleButton = () => {
    const searchName = document.getElementById("searchName").value;

    dispatch({
      type: USER_SEARCH_REQUEST,
      data: searchName,
    });
  };

  // const userProfiles=(userId)=>{
  //   if (userId) {

  //     dispatch({
  //       type: OTHER_PROFILE_REQUEST,
  //       data: userId,
  //     });
  //     Router.push({
  //       pathname: "/User/[id]",
  //       query: { id: userId },
  //     });
  //   }
  // }

  return (
    <Container>
      <h1>{t("userSearch")}</h1>
      {/* <h1>유저탐색</h1> */}
      <Search
        //   loading={searchmapLoading}
        onPressEnter={handleButton}
        placeholder={t("userInput")}
        enterButton
        // allowClear
        icon={<SearchOutlined />}
        id="searchName"
        size="large"
        style={{ marginBottom: 40 }}
      />
      <Row gutter={32}>
        {searchUsers[0]
          ? // {
            searchUsers.map((m) => (
              <Col xs={24} sm={12} md={8} xl={6} style={{ padding: "0 30px" }}>
                <Card className="card_wrapper" hoverable>
                  <TitleCard />
                  <ProfileCard>
                    <ProfileDiv className="profile_div">
                      <Avatar size={160} src={m.profile} />
                      {/* <Avatar size={160} src="user.png" /> */}
                      <h2 className="user_name">{m.name}</h2>
                      <ProfileText className="profile_text">
                        <p>
                          {t("userIntroduce")} : {m.introduce}
                        </p>
                        {/* <p>자기소개 : {m.introduce}</p> */}
                        {/* <p>생일 : {m.birth}</p> */}
                        {/* <p>활동지역 : {m.location}</p> */}
                        <div className="follow">
                          <p className="follower">
                            {t("userBirth")} : {m.birth}
                          </p>
                          {/* <p className="follower">생일 : {m.birth}</p> */}
                          <p>
                            {t("userSex")} : {m.sex}
                          </p>
                          {/* <p>성별 : {m.sex}</p> */}
                        </div>
                        <div className="follow">
                          <p className="follower">
                            {t("userLocation")} : {m.location}
                          </p>
                          {/* <p className="follower">활동지역 : {m.location}</p> */}
                          <p>MMR : {m.mmr}</p>
                        </div>
                      </ProfileText>
                    </ProfileDiv>
                    <FollowButton className="follower_btn" post={m} t={t} />
                  </ProfileCard>
                </Card>
                {/* <Button>
              {" "}
              <a href={"User/" + m.id}>상세보기</a>
            </Button> */}
                {/* <FollowButton className="follower_btn" post={m} /> */}
              </Col>
            ))
          : // <Result
            //   status="404"
            //   title="해당하는 유저의 정보를 찾을 수 없습니다"
            //   subTitle="이름이 헷갈리지는 않았는지 확인해주세요"
            //   style={{
            //     width: "100%",
            //     margin: "65px 0",
            //     position: "absolute",
            //     top: "50%",
            //     left: "50%",
            //     transform: "translate(-50%,-50%)",
            //   }}
            // />
            null}
      </Row>
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
      type: NOTIFICATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "layout",
          "login",
          "badge",
          "profile",
        ])),
      },
    };
  }
);

export default userSearch;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  padding: 0 5% 0 5%;
  padding-top: 70px;

  h1 {
    font-size: 32px;
    font-weight: bold;
  }

  .ant-card {
    width: 100%;
  }

  .ant-card-hoverable:hover {
    transition: all 0.5s;
  }

  .card_wrapper {
    border-radius: 40px;
    transition: all 0.5s;

    // position: relative;
    // top: 70%;

    .ant-card-body {
      padding: 0;
    }

    &:hover {
      .profile_text {
        &::before {
          width: 95%;
        }

        &::after {
          height: 95%;
        }
      }

      // .follower_btn {
      //   bottom: 5px !important;
      // }
    }
  }

  .ant-input {
    border-radius: 15px;
    border-radius: 1px solid #467ada;
  }

  .ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 !important;
    border-top-right-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
    border-radius: 1px solid #467ada;
    background: #467ada;
  }

  .ant-input-group-wrapper {
    margin-bottom: 20px;
  }

  .ant-input-group {
    width: 90%;
    width: 100%;
    // margin: 0 auto;
  }

  .ant-input-search {
    border-radius: 9px !important;
    // position: relative;
    // right: 15px;
    // z-index: 1;
  }

  .ant-input-search-button {
    // border-radius: 55% !important;
    // border-top-right-radius: 9px !important;
    // border-bottom-right-radius: 9px !important;
  }
`;

const ProfileDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 30px;

  // border-radius: 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;

  .ant-avatar {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    border: solid 4px #467ada;
  }

  .user_name {
    margin: 0;
    margin-top: 20px;
    font-weight: bold;
    text-align: center;
  }
`;

const ProfileText = styled.div`
  display: inline-block;
  width: 100%;
  height: 150px !important;
  position: relative;
  margin-top: 10px;
  padding: 24px;
  text-align: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    height: 95%;
    transform: translate(-50%, -50%);
    transition: all 0.8s;
  }

  &::before {
    border-top: 5px solid #467ada;
    border-bottom: 5px solid #467ada;

    width: 0;
  }

  &::after {
    border-left: 5px solid #467ada;
    border-right: 5px solid #467ada;

    height: 0;
  }

  .follow {
    display: flex;
    justify-content: center;

    .follower {
      margin-right: 20px;
    }
  }
`;

const ProfileCard = styled(Card)`
  // max-width: 300px;
  height: 450px;
  border-radius: 30px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  position: relative;

  .ant-card-body {
    padding: 0;
  }
`;

const TitleCard = styled(Card)`
  width: 100% !important;
  height: 20px;
  background: #467ada;
  border-top-left-radius: 40px !important;
  border-top-right-radius: 40px !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
`;
