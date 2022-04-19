import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import MissionCard from "./MissionCard";
import { useSelector } from "react-redux";

const MMR = () => {
  const {me}=useSelector((state)=>state.user)
  return (
    <Container>
      <Card>
        <h1>score : {me.mmr}</h1>
        {/* <p>어제로부터 스코어 변화</p>
        <div>
          <span style={{ color: "#fff" }}>+</span>
          <span>378</span>
          <img
            className="img1"
            src="https://cdn-icons.flaticon.com/png/512/45/premium/45958.png?token=exp=1649617196~hmac=25852d553014e72e5ccfad33767dc23c"
          />
        </div> */}
        <p>보유 뱃지</p>
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/473/473405.png" />
          <img src="https://cdn-icons-png.flaticon.com/512/473/473421.png" />
          <img src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />
        </div>
      </Card>
    </Container>
  );
};

export default MMR;

const Container = styled.div`
  display: inline-block;
  width: 30%;
  margin-left: 3%;
  margin-top: 1.5%;

  // overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;

  .ant-card {
    width: 100%;
    // max-width: 300px;
    border-radius: 32px;
    padding: 0;
    margin: 0;
    background: #1b5cff;
    background: linear-gradient(to right, #1890ff, #1b5cff);
    color: #fff;
  }

  .ant-card-body {
    width: 100%;
    padding: 24px;
    padding-bottom: 6px;
    // min-width: 200px;
    min-height: 300px;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }

  p {
    font-size: 16px;
  }

  span {
    font-size: 22px;
    font-weight: bold;
    color: red;
  }

  .img1 {
    width: 40px;
    height: 40px;
    position: relative;
    left: 10px;
    bottom: 5px;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;