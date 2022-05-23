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
    <Container>
      <Card hoverable>
        {me && (
          <>
            <h1>MMR : {me.mmr}</h1>

            <br />
            <br />

            <p>메인뱃지</p>
            {/* <div>
            <img src="https://cdn-icons-png.flaticon.com/512/473/473405.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/473/473421.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />
          </div> */}

            {me.badge && (
              <img className="badge" src={`/badge/${me.badge}.png`} />
            )}
          </>
        )}
      </Card>
    </Container>
  );
};

export default MMR;

const Container = styled.div`
  display: inline-block;
  width: 30%;
  max-width: 280px;
  margin-left: 3%;
  // margin-top: 2%;
  padding-left: 20px;

  position: relative;
  top: 12px;

  white-space: nowrap;
  text-overflow: clip;

  .ant-card {
    width: 100%;
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

  .badge {
    width: 100px;
    height: 100px;
  }
`;
