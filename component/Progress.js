import React, { useState } from "react";
import { Card, Tabs, Progress, Affix, Button, Tag, Empty,Radio } from "antd";
import RunningChart from "./RunningChart";
import BikeChart from "./BikeChart";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { FaRunning } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";

import { useSelector } from "react-redux";
import { PROGRESS_REQUEST } from "../reducers/user";
import styled from "styled-components";

const { TabPane } = Tabs;

import LoginForm from "./LoginForm";

const { Meta } = Card;

function MyNote() {
  const [value, setValue] = useState(1);
  const { purposeProgress } = useSelector((state) => state.user);

  ////running
  const [percent,setPercent]=useState(purposeProgress.run[0]?purposeProgress.run[0].progress:0)
  const[goalDistance,setGoalDistance]=useState(purposeProgress.run[0]?purposeProgress.run[0].goalDistance:0)
  const [firstDate,setFirstDate]=useState(purposeProgress.run[0]?purposeProgress.run[0].firstDate:0)
  const [lastDate,setLastDate]=useState(purposeProgress.run[0]?purposeProgress.run[0].lastDate:0)
  ///

///ridding
const [bikepercent,setBikePercent]=useState(purposeProgress.bike[0]?purposeProgress.bike[0].progress:0)
  const[bikegoalDistance,setBikeGoalDistance]=useState(purposeProgress.bike[0]?purposeProgress.bike[0].goalDistance:0)
  const [bikefirstDate,setBikeFirstDate]=useState(purposeProgress.bike[0]?purposeProgress.bike[0].firstDate:0)
  const [bikelastDate,setBikeLastDate]=useState(purposeProgress.bike[0]?purposeProgress.bike[0].lastDate:0)
///



  const runChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setPercent(purposeProgress.run[e.target.value].progress)
    setGoalDistance(purposeProgress.run[e.target.value].goalDistance)
    setFirstDate(purposeProgress.run[e.target.value].firstDate)
    setLastDate(purposeProgress.run[e.target.value].lastDate)
  };

  const bikeChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setBikePercent(purposeProgress.bike[e.target.value].progress)
    setBikeGoalDistance(purposeProgress.bike[e.target.value].goalDistance)
    setBikeFirstDate(purposeProgress.bike[e.target.value].firstDate)
    setBikeLastDate(purposeProgress.bike[e.target.value].lastDate)
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
        <h2>라이딩목표율</h2>
        <Radio.Group onChange={bikeChange}  defaultValue={0}>
        {
          purposeProgress.bike.map((v,i)=>(
           <Radio value={i}>{v.title}</Radio>
          ))
        }
        </Radio.Group>

        {purposeProgress.bike[0] ? (
          <div>
            <Progress
              type="circle"
              percent={bikepercent}
              style={{ paddingBottom: "10px", paddingTop: "5px" }}
              width={120}
            />
            <div style={{ textAlign: "left", paddingLeft: 40 }}>
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
                  목표
                </Tag>
                {bikegoalDistance}km
              </h4>
              <h4>시작일 : {bikefirstDate}</h4>
              <h4>종료일 : {bikelastDate}</h4>
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
              // style={{
              //   paddingTop: 10,
              //   marginBottom: 30,
              //   color: "#1890ff",
              // }}
              style={{ marginBottom: "25px", paddingTop: "5px" }}
            />
            <h4>등록된 목표가 없습니다</h4>
            <h4>목표를 등록해주세요!</h4>
          </div>
        )}
      </div>
    ),
    tab2: (
      <div>
        <h2>러닝목표율</h2>
        <Radio.Group onChange={runChange}  defaultValue={0}>
        {
          purposeProgress.run.map((v,i)=>(
           <Radio value={i}>{v.title}</Radio>
          ))
        }
        </Radio.Group>

    
        {purposeProgress.run[0] ? (
          <div>
            <Progress
              type="circle"
              // percent={purposeProgress.run[0].progress}
              percent={percent}
              style={{ paddingBottom: "10px", paddingTop: "5px" }}
              width={120}
            ></Progress>
            <div
            // style={{ textAlign: "center", paddingLeft: 40 }}
            >
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
                  목표
                </Tag>
                {goalDistance}km
              </h4>
              <h4>시작일 : {firstDate}</h4>
              <h4>종료일 : {lastDate}</h4>
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
            <h4>등록된 목표가 없습니다</h4>
            <h4>목표를 등록해주세요!</h4>
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
`;