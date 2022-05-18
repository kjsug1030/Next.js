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
} from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";

const badgeModal = ({ isModal, openModal }) => {
  const { me } = useSelector((state) => state.user);

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
  const start = ["/badge_g/start_g.png", "/badge/start_exer.png"];

  return (
    <ModalWrapper visible={isModal} onCancel={openModal} footer={null}>
      <TitleDiv>
        <div>뱃지</div>
      </TitleDiv>
      <div className="grid">
        {me.badges && 
        <Row gutter={[16, 16]}>
          {/* 첫번째 줄 */}
          <Col span={8} />
          <Col span={8}>
            {me.badges.first_exercise == 0 ? (
              <img src={start[0]} />
            ) : (
              <img src={start[1]} />
            )}
          </Col>
          <Col span={8} />

          {/* 두번째 줄 */}
          <Col span={8}>
            {me.badges.altitude == 0 ? (
              <img src={altitude[0][0]} />
            ) : (
              <img src={altitude[0][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.altitude2 == 0 ? (
              <img src={altitude[1][0]} />
            ) : (
              <img src={altitude[1][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.altitude3 == 0 ? (
              <img src={altitude[2][0]} />
            ) : (
              <img src={altitude[2][1]} />
            )}
          </Col>

          {/* 세번째 줄 */}
          <Col span={8}>
            {me.badges.bike_distance == 0 ? (
              <img src={bike[0][0]} />
            ) : (
              <img src={bike[0][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.bike_distance2 == 0 ? (
              <img src={bike[1][0]} />
            ) : (
              <img src={bike[1][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.bike_distance3 == 0 ? (
              <img src={bike[2][0]} />
            ) : (
              <img src={bike[2][1]} />
            )}
          </Col>

          {/* 네번째 줄 */}
          <Col span={8}>
            {me.badges.run_distance == 0 ? (
              <img src={running[0][0]} />
            ) : (
              <img src={running[0][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.run_distance2 == 0 ? (
              <img src={running[1][0]} />
            ) : (
              <img src={running[1][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.run_distance3 == 0 ? (
              <img src={running[2][0]} />
            ) : (
              <img src={running[2][1]} />
            )}
          </Col>

          {/* 다섯번째 줄 */}
          <Col span={8}>
            {me.badges.make_track == 0 ? (
              <img src={track[0][0]} />
            ) : (
              <img src={track[0][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.make_track2 == 0 ? (
              <img src={track[1][0]} />
            ) : (
              <img src={track[1][1]} />
            )}
          </Col>
          <Col span={8}>
            {me.badges.make_track3 == 0 ? (
              <img src={track[2][0]} />
            ) : (
              <img src={track[2][1]} />
            )}
          </Col>
        </Row>
        }
      </div>
      <Button danger onClick={openModal}>
        닫기
      </Button>
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

  img:hover {
    filter: opacity(0.5) drop-shadow(0 0 0 #eff1f2);
  }

  .grid {
    height: 520px;
    padding: 12px;
    text-align: center;
    overflow-y: scroll;
    scrollbar-width: none;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TitleDiv = styled.div`
  display: block;
  // text-align: center;
  border-bottom: solid 1px #dadde1;
  padding: 10px 15px 9px 15px;

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
