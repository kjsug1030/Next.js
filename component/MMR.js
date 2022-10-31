import React, { useState } from "react";
import styled from "styled-components";
import { Card, PageHeader, Tag } from "antd";
import MissionCard from "./MissionCard";
import { useSelector } from "react-redux";
import Intro from "./Intro";
import BadgeBook from "./BadgeBook";
import BadgeModal from "./badgeModal";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";

const MMR = ({ t }) => {
  const { me } = useSelector((state) => state.user);

  // const { t } = useTranslation("common");

  return (
    <Container>
      <Card hoverable>
        {me && (
          <>
            <h1>
              {t("common:mmr")} : {me.mmr}
            </h1>
            {/* <h1>운동점수 : {me.mmr}</h1> */}

            <br />
            <br />
            <br />
            {/* {me.badge ? <p>메인뱃지</p> : <p>메인뱃지없음</p>} */}
            {/* <div>
            <img src="https://cdn-icons-png.flaticon.com/512/473/473405.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/473/473421.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/179/179251.png" />
          </div> */}

            {me.badge ? (
              <img className="badge" src={`/badge/${me.badge}.png`} />
            ) : me.badge === "" ? (
              <img className="badge" src="/badge_g/start_g.png" />
            ) : (
              <img className="badge" src="/badge_g/start_g.png" />
            )}
          </>
        )}
      </Card>
    </Container>
  );
};

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

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
    font-size: 28px;
    font-weight: bold;
    color: #fff;
  }

  p {
    font-size: 16px;
    position: relative;
    top: 120px;
    left: 15%;
    color: black;
    font-weight: bold;
    z-index: 3;
    // background: #fff;
    // border: 1px solid #467ada;
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
    width: 130px;
    height: 130px;
    position: relative;
    // bottom: 10px;
    left: 10px;
  }
`;
