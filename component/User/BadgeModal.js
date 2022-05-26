import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Col, Button, Tabs } from "antd";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_BADGE_REQUEST } from "../../reducers/user";

const badgeModal = ({ isModal, openModal, otherProfile }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const updateBadge = (e) => {
    e.preventDefault;

    dispatch({
      type: PROFILE_BADGE_REQUEST,
      data: e.target.value,
    });

    window.location.reload();
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

  const reload = () => {
    window.location.reload();
  };

  return (
    <ModalWrapper visible={isModal} onCancel={openModal} footer={null}>
      <TitleDiv>
        <div>뱃지</div>
      </TitleDiv>
      <div className="grid">
        {otherProfile && (
          <Row gutter={[16, 16]}>
            {/* 첫번째 줄 */}
            <Col span={8} />
            <Col span={8}>
              {otherProfile.badges.first_exercise == 0 ? (
                <div className="badge">
                  <img src={start[0]} />

                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">첫운동 실시</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={start[1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">첫운동 실시</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("first_exercise")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8} />

            {/* 두번째 줄 */}
            <Col span={8}>
              {otherProfile.badges.altitude == 0 ? (
                <div className="badge">
                  <img src={altitude[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">고도 10000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">고도 10000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.altitude2 == 0 ? (
                <div className="badge">
                  <img src={altitude[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">고도 20000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">고도 20000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude2")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.altitude3 == 0 ? (
                <div className="badge">
                  <img src={altitude[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">고도 30000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={altitude[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">고도 30000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("altitude3")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 세번째 줄 */}
            <Col span={8}>
              {otherProfile.badges.bike_distance == 0 ? (
                <div className="badge">
                  <img src={bike[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">라이딩 1000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">라이딩 1000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.bike_distance2 == 0 ? (
                <div className="badge">
                  <img src={bike[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">라이딩 5000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">라이딩 5000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance2")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.bike_distance3 == 0 ? (
                <div className="badge">
                  <img src={bike[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">라이딩 10000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={bike[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">라이딩 10000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("bike_distance3")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 네번째 줄 */}
            <Col span={8}>
              {otherProfile.badges.run_distance == 0 ? (
                <div className="badge">
                  <img src={running[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">달리기 100km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">달리기 100km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.run_distance2 == 0 ? (
                <div className="badge">
                  <img src={running[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">달리기 500km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">달리기 500km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance2")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.run_distance3 == 0 ? (
                <div className="badge">
                  <img src={running[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">달리기 1000km</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={running[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">달리기 1000km</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("run_distance3")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>

            {/* 다섯번째 줄 */}
            <Col span={8}>
              {otherProfile.badges.make_track == 0 ? (
                <div className="badge">
                  <img src={track[0][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">코스생성 3개</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[0][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">코스생성 3개</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.make_track2 == 0 ? (
                <div className="badge">
                  <img src={track[1][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">코스생성 20개</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[1][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">코스생성 20개</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track2")}
                    >
                      대표뱃지설정
                    </span>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {otherProfile.badges.make_track3 == 0 ? (
                <div className="badge">
                  <img src={track[2][0]} />
                  <div className="mission">
                    <span>
                      <h3>달성조건</h3>
                    </span>
                    <span className="text">코스생성 50개</span>
                  </div>
                </div>
              ) : (
                <div className="badge">
                  <img src={track[2][1]} />
                  <img src="/check.png" className="check" />
                  <div className="mission">
                    <span>
                      <h3>목표달성</h3>
                    </span>
                    <span className="text">코스생성 50개</span>
                    <span
                      className="profile_badge"
                      onClick={() => profileBadge("make_track3")}
                    >
                      대표뱃지설정
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
