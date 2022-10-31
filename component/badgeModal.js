import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Col, Button, Tabs } from "antd";
import useInput from "../hooks/useInputTest";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  GOAL_REQUEST,
  SIGNUP_REQUEST,
  ALL_GOAL_REQUEST,
  PROFILE_BADGE_REQUEST,
} from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";

const badgeModal = ({ isModal, openModal, t }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const profileBadge = (badge) => {
    dispatch({ type: PROFILE_BADGE_REQUEST, data: badge });
    console.log(badge);

    // window.location.href = "/";
  };

  const altitude = [
    ["/badge_g/altitude1_g.png", "/badge/altitude1.png"],
    ["/badge_g/altitude2_g.png", "/badge/altitude2.png"],
    ["/badge_g/altitude3_g.png", "/badge/altitude3.png"],
  ];
  const bike = [
    ["/badge_g/bike1_g.png", "/badge/bike1.png"],
    ["/badge_g/bike2_g.png", "/badge/bike2.png"],
    ["/badge_g/bike3_g.png", "/badge/bike3.png"],
  ];
  const track = [
    ["/badge_g/track1_g.png", "/badge/track1.png"],
    ["/badge_g/track2_g.png", "/badge/track2.png"],
    ["/badge_g/track3_g.png", "/badge/track3.png"],
  ];
  const running = [
    ["/badge_g/running1_g.png", "/badge/running1.png"],
    ["/badge_g/running2_g.png", "/badge/running2.png"],
    ["/badge_g/running3_g.png", "/badge/running3.png"],
  ];
  const start = ["/badge_g/start_g.png", "/badge/first_exercise.png"];

  return (
    <ModalWrapper visible={isModal} onCancel={openModal} footer={null}>
      <TitleDiv>
        <div>{t("badge:title")}</div>
        {/* <div>뱃지</div> */}
      </TitleDiv>
      <div className="grid">
        {me && (
          <Row gutter={[16, 16]}>
            {/* 첫번째 줄 */}
            <Col span={8} />
            <Col span={8}>
              {me.badges.first_exercise == 0 ? (
                <div className="badge">
                  <img src={start[0]} />

                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                      {/* <h3>달성조건</h3> */}
                    </span>
                    <span className="text">{t("badge:first")}</span>
                    {/* <span className="text">첫운동 실시</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={start[1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                      {/* <h3>목표달성</h3> */}
                    </span>
                    <span className="text">{t("badge:misson")}</span>
                    {/* <span className="text">첫운동 실시</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("first_exercise")}
                    >
                      {t("badge:badge")}
                      {/* 대표뱃지설정 */}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8} />

            {/* 두번째 줄 */}
            <Col span={8}>
              {me.badges.altitude == 0 ? (
                <div className="badge">
                  <img src={altitude[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:altitude1")}</span>
                    {/* <span className="text">고도 10000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                      {/* <h3>목표달성</h3> */}
                    </span>
                    <span className="text">{t("badge:altitude1")}</span>
                    {/* <span className="text">고도 10000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude")}
                    >
                      {t("badge:badge")}
                      {/* 대표뱃지설정 */}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.altitude2 == 0 ? (
                <div className="badge">
                  <img src={altitude[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:altitude2")}</span>
                    {/* <span className="text">고도 20000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:altitude2")}</span>
                    {/* <span className="text">고도 20000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude2")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.altitude3 == 0 ? (
                <div className="badge">
                  <img src={altitude[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:altitude3")}</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:altitude3")}</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude3")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 세번째 줄 */}
            <Col span={8}>
              {me.badges.bike_distance == 0 ? (
                <div className="badge">
                  <img src={bike[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling1")}</span>
                    {/* <span className="text">라이딩 1000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling1")}</span>
                    {/* <span className="text">라이딩 1000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.bike_distance2 == 0 ? (
                <div className="badge">
                  <img src={bike[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling2")}</span>
                    {/* <span className="text">라이딩 5000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling2")}</span>
                    {/* <span className="text">라이딩 5000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance2")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.bike_distance3 == 0 ? (
                <div className="badge">
                  <img src={bike[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling3")}</span>
                    {/* <span className="text">라이딩 10000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:cycling3")}</span>
                    {/* <span className="text">라이딩 10000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance3")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 네번째 줄 */}
            <Col span={8}>
              {me.badges.run_distance == 0 ? (
                <div className="badge">
                  <img src={running[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:running1")}</span>
                    <span className="text">달리기 100km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:running1")}</span>
                    <span className="text">달리기 100km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.run_distance2 == 0 ? (
                <div className="badge">
                  <img src={running[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:running2")}</span>
                    {/* <span className="text">달리기 500km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:running2")}</span>
                    {/* <span className="text">달리기 500km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance2")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.run_distance3 == 0 ? (
                <div className="badge">
                  <img src={running[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:running3")}</span>
                    {/* <span className="text">달리기 1000km</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:running3")}</span>
                    {/* <span className="text">달리기 1000km</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance3")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 다섯번째 줄 */}
            <Col span={8}>
              {me.badges.make_track == 0 ? (
                <div className="badge">
                  <img src={track[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:course1")}</span>
                    {/* <span className="text">코스생성 3개</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:course1")}</span>
                    {/* <span className="text">코스생성 3개</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.make_track2 == 0 ? (
                <div className="badge">
                  <img src={track[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:course2")}</span>
                    {/* <span className="text">코스생성 20개</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:course2")}</span>
                    {/* <span className="text">코스생성 20개</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track2")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {me.badges.make_track3 == 0 ? (
                <div className="badge">
                  <img src={track[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:misson")}</h3>
                    </span>
                    <span className="text">{t("badge:course3")}</span>
                    {/* <span className="text">코스생성 50개</span> */}
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>{t("badge:clear")}</h3>
                    </span>
                    <span className="text">{t("badge:course3")}</span>
                    {/* <span className="text">코스생성 50개</span> */}
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track3")}
                    >
                      {t("badge:badge")}
                    </span>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        )}
      </div>
      {/* <Button danger onClick={openModal}>
        닫기
      </Button> */}
    </ModalWrapper>
  );
};

// id: 6;
// user_id: 14;
// first_exercise: 1;
// bike_distance: 0;
// bike_distance2: 0;
// bike_distance3: 0;
// run_distance: 0;
// run_distance2: 0;
// run_distance3: 0;
// make_track: 0;
// created_at: "2022-05-17T02:40:56.000000Z";
// updated_at: "2022-05-17T08:58:24.000000Z";
// make_track2: 0;
// make_track3: 0;
// altitude: 0;
// altitude2: 0;
// altitude3: 0;

export default badgeModal;

const ModalWrapper = styled(Modal)`
  top: 130px;
  position: relative;

  // border: 0 !important;
  .ant-modal-content {
    // width: 432px;
    margin: 0 auto;
    border-radius: 15px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
  .ant-modal-header {
    border-radius: 15px;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-input-affix-wrapper {
    // 추가하기
    border-radius: 5px;
  }

  img {
    // width: 40px;
    width: 100%;
    height: 100%;
    // background: #e9e9e9;
    border-radius: 50%;
  }

  .check {
    width: 65px;
    height: 65px;
    position: absolute;
    top: -22px;
    right: 6px;
    color: red;
  }

  .grid {
    height: 520px;
    padding: 12px;
    text-align: center;
    overflow-y: scroll;
    scrollbar-width: none;
    // border: 3px solid #467ada;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .badge {
    h3 {
      background: #fff;
      // border: 2px solid #467ada;
      border: 1px solid red;
      margin: 0;
      font-weight: bold;
      // border-radius: 12px;
    }
    span {
      display: block;
      font-weight: bold;
    }
    .text {
      width: 120px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .profile_badge {
      width: 120px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 50px;
      cursor: pointer;
    }

    .mission {
      width: 100px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: all 0.5s;
    }

    &:hover {
      .mission {
        opacity: 1;
        bottom: 50%;
        left: 50%;
      }
      img {
        filter: opacity(0.5) drop-shadow(0 0 0 #eff1f2);
      }
    }
  }

  .ant-modal-close-x {
    color: #fff;
  }
`;

const TitleDiv = styled.div`
  display: block;
  // text-align: center;
  border-bottom: solid 1px #dadde1;
  padding: 10px 15px 9px 15px;
  // background: #467ada;
  background: linear-gradient(to right, #1890ff, #1b5cff);
  color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  div {
    margin-bottom: 0;
    font-size: 25px;
    font-weight: 700;
  }

  span {
    font-size: 15px;
    color: #606770;
  }
`;
