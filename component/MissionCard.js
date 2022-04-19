import React, { useState } from "react";
import { Card, Icon } from "antd";
import styled from "styled-components";
import {
  FcIdea,
  FcCheckmark,
  FcApproval,
  FcStatistics,
  FcLike,
  FcPortraitMode,
} from "react-icons/fc";
const MissionCard = () => {
  const mission = [{}];

  const [check, setCheck] = useState(true);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);

  const onCheck = () => {
    setCheck(false);
  };
  const onCheck1 = () => {
    setCheck1(false);
  };
  const onCheck2 = () => {
    setCheck2(false);
  };

  return (
    <ContainerDiv>
      <Container>
        {/* <Card hoverable> */}
        <div>
          <FcStatistics />
          {/* 전구 */}
        </div>
        <LeftDiv>
          <h1>이번주 3km 달리기</h1>
          <a style={{ color: "#1890ff" }}>확인하러 이동해보기</a>
          <img src="https://cdn-icons-png.flaticon.com/512/786/786401.png" />
        </LeftDiv>
        {/* <RightDiv>
            <FcCheckmark onClick={onCheck} />
          </RightDiv> */}
        {/* </Card> */}
      </Container>
      <Container>
        <div>
          <FcIdea />
          {/* 전구 */}
        </div>
        <LeftDiv>
          <h1>거리 500m 달성</h1>
          <a style={{ color: "#1890ff" }}>확인하러 이동해보기</a>
          <img src="https://cdn-icons-png.flaticon.com/512/786/786401.png" />
        </LeftDiv>
      </Container>
      <Container className="two">
        <div>
          <FcIdea />
          {/* 전구 */}
        </div>
        <LeftDiv>
          <h1>거리 500m 달성</h1>
          <a style={{ color: "#1890ff" }}>확인하러 이동해보기</a>
          <img src="https://cdn-icons-png.flaticon.com/512/786/786401.png" />
        </LeftDiv>
      </Container>
    </ContainerDiv>
  );
};

export default MissionCard;

// <FcApproval />

// <FcIdea />
//   {/* 전구 */}

// <FcStatistics />
// {/* 거리달성 */}
// <FcPortraitMode />
// {/* 팔로잉 알림 */}

const ContainerDiv = styled.div`
  .two {
    border: none !important;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 10px;

  border-bottom: 1px solid #c4c7cf;

  div {
    display: inline-block;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
    height: 36px;
    line-height: 36px;
  }

  a {
    // margin-top: 10px;
    font-size: 12px;
  }

  svg {
    width: 36px;
    height: 36px;
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-10%);
  }

  .ant-card {
    width: 100%;
    border-radius: 7px;
  }

  .ant-card-body {
    width: 100%;
    padding: 12px 26px !important;
    // padding: 0;
  }
`;

const LeftDiv = styled.div`
  width: 55%;
  margin-left: 16px;

  img {
    width: 24px;
    height: 24px;
    // float: right;
    position: relative;
    left: 100px;
    bottom: 22px;
  }
`;

const RightDiv = styled.div`
  width: 20%;
  // border-left: 1px solid grey;
  padding-left: 30px;

  svg {
    position: relative;
    // bottom: 8px;
    left: 5px;
  }

  img {
    width: 24px;
    height: 24px;
    float: right;
  }
`;
