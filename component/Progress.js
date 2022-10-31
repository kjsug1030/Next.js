import React, { useState } from "react";
import {
  Card,
  Tabs,
  Progress,
  Affix,
  Button,
  Tag,
  Empty,
  Radio,
  Menu,
  Space,
  Badge,
  Dropdown,
} from "antd";
import RunningChart from "./RunningChart";
import BikeChart from "./BikeChart";
import {
  AppleOutlined,
  AndroidOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FaRunning } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";

import { useSelector } from "react-redux";
import { PROGRESS_REQUEST } from "../reducers/user";
import styled from "styled-components";

const { TabPane } = Tabs;

import LoginForm from "./LoginForm";

const { Meta } = Card;

function MyNote({ t }) {
  const [value, setValue] = useState(0);
  const [runValue, setRunValue] = useState(0);
  const { purposeProgress } = useSelector((state) => state.user);

  const run = purposeProgress.run;
  const bike = purposeProgress.bike;

  ////running
  const [percent, setPercent] = useState(run[0] ? run[0].progress : 0);
  const [goalDistance, setGoalDistance] = useState(
    run[0] ? run[0].goalDistance : 0
  );
  const [firstDate, setFirstDate] = useState(run[0] ? run[0].firstDate : 0);
  const [lastDate, setLastDate] = useState(run[0] ? run[0].lastDate : 0);
  ///

  ///ridding
  const [bikepercent, setBikePercent] = useState(
    bike[value] ? bike[value].progress : 0
  );
  const [bikegoalDistance, setBikeGoalDistance] = useState(
    bike[value] ? bike[value].goalDistance : 0
  );
  const [bikefirstDate, setBikeFirstDate] = useState(
    bike[value] ? bike[value].firstDate : 0
  );
  const [bikelastDate, setBikeLastDate] = useState(
    bike[value] ? bike[value].lastDate : 0
  );
  ///

  const runChange = (e) => {
    const value = e.target.value;
    console.log("run checked", e.target.value);
    setPercent(run[runValue].progress);
    setGoalDistance(run[runValue].goalDistance);
    setFirstDate(run[runValue].firstDate);
    setLastDate(run[runValue].lastDate);
  };

  const bikeChange = (e) => {
    const value = e.target.value;
    console.log("bike checked", value);
    setBikePercent(bike[value].progress);
    setBikeGoalDistance(bike[value].goalDistance);
    setBikeFirstDate(bike[value].firstDate);
    setBikeLastDate(bike[value].lastDate);
  };

  const [top, setTop] = useState(100);

  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const tabList = [
    {
      key: "tab1",
      tab: (
        <MdDirectionsBike
          size={32}
          style={{
            // marginLeft: 30,
            // marginRight: 15,
            marginTop: 5,
            width: 65,
          }}
        />
      ),
    },
    {
      key: "tab2",
      tab: (
        <FaRunning
          size={32}
          style={{
            // marginLeft: 15,
            // marginRight: 30
            marginTop: 5,
            width: 65,
          }}
        />
      ),
    },
  ];

  const contentList = {
    tab1: (
      <div style={{ textAlign: "center" }}>
        <h2>{t("index:target1")}</h2>
        {/* <h2>라이딩목표율</h2> */}

        {/* <Radio.Group onChange={bikeChange} defaultValue={0}>
          {purposeProgress.bike.map((v, i) => (
            <Radio value={i}>{v.title}</Radio>
          ))}
        </Radio.Group> */}

        <Dropdown
          overlay={
            <Menu mode="horizontal">
              {purposeProgress.bike.map((v, i) => (
                <Menu.Item value={i} onClick={() => setValue(i)}>
                  {v.title}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button className="btn">
            <DownOutlined />
          </Button>
        </Dropdown>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {purposeProgress.bike[value] && <Badge status="processing" />}
          <p className="title">
            {/* {purposeProgress.bike[value]
              ? purposeProgress.bike[value].title
              : null} */}
            {purposeProgress.bike[value] && purposeProgress.bike[value].title}
          </p>
        </div>

        {purposeProgress.bike[value] ? (
          <div>
            <Progress
              type="circle"
              // percent={bikepercent}
              percent={bike[value].progress}
              style={{ paddingBottom: "10px", paddingTop: "5px" }}
              width={120}
            />
            <div>
              <h4>
                <Tag
                  color="blue"
                  style={{
                    width: "50px",
                    height: "25px",
                    fontSize: "15px",
                    lineHeight: "23px",
                  }}
                >
                  {t("index:target1")}
                  {/* 목표 */}
                </Tag>
                {bike[value].goalDistance}km
              </h4>
              <h4>
                {t("index:start")} : {bike[value].firstDate}
              </h4>
              {/* 시작일 */}
              <h4>
                {t("index:end")} : {bike[value].lastDate}
              </h4>
              {/* 종료일 */}
            </div>
          </div>
        ) : (
          <div>
            <Progress
              className="pro"
              type="circle"
              percent={0}
              width={120}
              // status="exception"
              format={() => "0%"}
              style={{ marginBottom: "25px", paddingTop: "5px" }}
            />
            <h4>{t("index:targetContent1")}</h4>
            <h4>{t("index:targetContent2")}</h4>
            {/* <h4>등록된 목표가 없습니다</h4>
            <h4>목표를 등록해주세요!</h4> */}
          </div>
        )}
      </div>
    ),
    tab2: (
      <div>
        <h2>{t("index:target2")}</h2>

        <Dropdown
          overlay={
            <Menu mode="horizontal">
              {purposeProgress.run.map((v, i) => (
                <Menu.Item value={i} onClick={() => setRunValue(i)}>
                  {v.title}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button className="btn">
            <DownOutlined />
          </Button>
        </Dropdown>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {purposeProgress.run[runValue] && <Badge status="processing" />}
          <p className="title">
            {/* {purposeProgress.run[runValue]
              ? purposeProgress.run[runValue].title
              : null} */}
            {purposeProgress.run[runValue] &&
              purposeProgress.run[runValue].title}
          </p>
        </div>

        {purposeProgress.run[runValue] ? (
          <div>
            <Progress
              type="circle"
              percent={run[runValue].progress}
              style={{ paddingBottom: "10px", paddingTop: "5px" }}
              width={120}
            />
            <div>
              <h4>
                <Tag
                  color="blue"
                  style={{
                    width: "50px",
                    height: "25px",
                    fontSize: "15px",
                    lineHeight: "23px",
                  }}
                >
                  {t("index:target1")}
                  {/* 목표 */}
                </Tag>
                {run[runValue].goalDistance}km
              </h4>
              <h4>
                {t("index:start")} : {run[runValue].firstDate}
              </h4>
              {/* <h4>시작일 : {run[runValue].firstDate}</h4> */}
              <h4>
                {t("index:end")}: {run[runValue].lastDate}
              </h4>
              <h4>종료일 : {run[runValue].lastDate}</h4>
            </div>
          </div>
        ) : (
          <div>
            <Progress
              className="pro"
              type="circle"
              percent={0}
              width={120}
              // status="exception"
              format={() => "0%"}
              style={{ marginBottom: "25px", paddingTop: "5px" }}
            />
            <h4>{t("index:targetContent1")}</h4>
            <h4>{t("index:targetContent2")}</h4>
            {/* <h4>등록된 목표가 없습니다</h4>
            <h4>목표를 등록해주세요!</h4> */}
          </div>
        )}
      </div>
    ),
  };

  return (
    <Container
      style={{
        // width: "33.3%",
        width: "30%",
        marginBottom: 20,
        position: "sticky",
        top: "4%",
        marginRight: "3.3%",
        textAlign: "center",
      }}
    >
      <Card
        hoverable
        style={{
          width: "100%",
          height: 350,
          borderRadius: 30,
        }}
        bordered={false}
        tabList={tabList}
        // title="내 운동목표"
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {/* <Tabs tabPosition="left">
          <TabPane tab={tabList[0].tab} key={tabList[0].key}>
            {contentList.tab1}
          </TabPane>
          <TabPane tab={tabList[1].tab} key={tabList[1].key}>
            {contentList.tab2}
          </TabPane>
        </Tabs> */}
        {contentList[activeTabKey1]}
      </Card>
    </Container>
  );
}

export default MyNote;

const Container = styled.div`
  // .ant-card-head {
  // background: #467ada;
  // color: #fff;

  // border-top-left-radius: 30px;
  // border-top-right-radius: 30px;
  //   // width: 300px;
  //   // height: 50px;
  //   // line-height: 12px;
  //   // clip-path: polygon(75% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);

  //   font-size: 22px;
  //   font-weight: bold;
  // }

  .ant-card-title {
    padding: 14px 0;
  }

  .ant-card {
    transition: all 0.6s;
  }

  .ant-card-body {
    // padding-left: 0;
    padding-top: 12px;
  }

  // .ant-card-hoverable:hover {
  //   transform: translateY(-15px);
  //   // border-color: transparent;
  // }

  .ant-tabs-tab {
    padding: 8px 12px !important;

    // background: #ebeef3 !important;
  }

  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-more {
    display: none;
  }

  h2,
  h3,
  h4 {
    font-weight: bold;
  }

  h4 {
    margin-bottom: 0.1em;
  }

  .pro {
    .ant-progress-text {
      // color: #1890ff !important;
    }
  }

  .ant-empty-description {
    display: none;
  }

  // .ant-card-head {
  //   // background: #467ada;
  //   // border-top-left-radius: 30px;
  //   // border-top-right-radius: 30px;
  //   border-bottom: 1px solid #467ada;
  // }

  // .ant-tabs-tab {
  //   // color: #fff;
  //   border-bottom: 1px solid #467ada;
  // }

  // .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  // .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
  //   border-bottom: 1px solid #467ada;
  // }

  // .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  //   color: #fff;
  // }

  .title {
    // color: red;
    margin: 0;
    margin-bottom: 4px;
    font-size: 14px;
  }

  .btn {
    position: absolute;
    top: 70px;
    // right: 26px;
    right: 6%;
    border-radius: 24px;
    // border-radius: 50%;
  }
`;
