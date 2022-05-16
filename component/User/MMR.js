import React from "react";
import styled from "styled-components";
import { Card, PageHeader, Tag } from "antd";
import { useSelector } from "react-redux";

const FollowerMMR = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <Container>
      <Card hoverable>
        <h1>MMR : {me.mmr}</h1>
        {/* <p>어제로부터 스코어 변화</p>
        <div>
          <span style={{ color: "#fff" }}>+</span>
          <span>378</span>
          <img
            className="img1"
            src="https://cdn-icons.flaticon.com/png/512/45/premium/45958.png?token=exp=1649617196~hmac=25852d553014e72e5ccfad33767dc23c"
          />
        </div> */}
      </Card>
    </Container>
  );
};

export default FollowerMMR;

const Container = styled.div`
  display: inline-block;
  width: 170px;
  width: 100%;
  // overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;

  .ant-card {
    width: 100%;
    // height: 140px;
    height: 50px;
    border-radius: 32px;
    line-height: 47px;
    padding: 0;
    margin: 0;
    background: #1b5cff;
    background: linear-gradient(to right, #1890ff, #1b5cff);
    color: #fff;
    transition: all 0.6s;
  }

  .ant-card-body {
    padding: 0 25px;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    margin: 0;
  }

  p {
    font-size: 16px;
  }

  span {
    font-size: 22px;
    font-weight: bold;
    color: red;
  }
`;
