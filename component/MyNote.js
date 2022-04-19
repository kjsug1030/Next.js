import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import RunningChart from "./RunningChart";
import RiddingChart from "./RiddingChart";
import BikeChart from "./BikeChart";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { FaRunning } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Affix, Button } from "antd";
import dynamic from "next/dynamic";

const { TabPane } = Tabs;

import LoginForm from "./LoginForm";
import MyPurpose from "./myPurpose";

const { Meta } = Card;
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const bar = {
  // 바 그래프 더미데이터
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["월", "화", "수", "목", "금", "토", "일"],
    },
    grid: { show: false },
  },
  series: [
    {
      name: "라이딩 km",
      data: [30, 40, 45, 50, 49, 60, 90],
    },
  ],
};

const tabList = [
  {
    key: "tab1",
    tab: <MdDirectionsBike size={28} />,
  },
  {
    key: "tab2",
    tab: <FaRunning size={28} />,
  },
];

const contentList = {
  tab1: (
    <p>
      <RiddingChart />
    </p>
  ),
  tab2: (
    <p>
      <RunningChart />
    </p>
  ),
};

function MyNote() {
  const [top, setTop] = useState(100);

  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <div style={{ width: "100%", marginTop: 20 }}>
      {/* ,borderColor:'gray', borderOpa, borderTop:1,borderBottom:1,borderLeft:0,borderRight:0,borderStyle:'solid'} */}

      <RiddingChart />
      <RunningChart />

      {/* <Row>
        <Col span={8}>
       
        </Col>
        <Col span={8}>
        </Col>
        <Col span={8}>
        <MyPurpose/>
        </Col>
      </Row> */}

      {/*     
  <Card style={{width:980,height:330,borderRadius:30,marginTop:30}}
   tabList={tabList}
  activeTabKey={activeTabKey1}
  onTabChange={key => {
    onTab1Change(key);
  }}>
                                   {contentList[activeTabKey1]}

                
                </Card>
  
   */}
    </div>
  );
}

export default MyNote;