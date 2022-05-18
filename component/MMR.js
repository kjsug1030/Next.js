import React, { useState } from "react";
import styled from "styled-components";
import { Card, PageHeader, Tag } from "antd";
import MissionCard from "./MissionCard";
import { useSelector } from "react-redux";
import Intro from "./Intro";
import BadgeBook from "./BadgeBook";
import BadgeModal from "./badgeModal";

const MMR = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div
      style={{
        width: "30%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
      }}
    >
      {/* <Intro className="intro" /> */}
      <Container>
        <Card hoverable>
          <h1>score : {me.mmr}</h1>

          <br />
          <br />
          <br />
          <p>보유 뱃지</p>
          {/* <div>
            <img src="https://cdn-icons-png.flaticon.com/512/473/473405.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/473/473421.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />
          </div> */}
          <BadgeBook />
        </Card>
      </Container>
    </div>
  );
};

export default MMR;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 280px;
  margin-left: 3%;
  // margin-top: 2%;

  position: relative;
  top: 24px;

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
    transition: all 0.6s;
  }
  .ant-card-hoverable:hover {
    // transform: translateY(-15px);
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

  // img {
  //   width: 50px;
  //   height: 50px;
  // }
`;
