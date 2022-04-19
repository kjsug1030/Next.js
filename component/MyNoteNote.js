import React, { useState,useEffect } from "react";
import { Card } from "antd";
import RunningChart from "./RunningChart";
import BikeChart from "./BikeChart";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { FaRunning } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Affix, Button } from "antd";

const { TabPane } = Tabs;

import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";

const { Meta } = Card;


function MyNote() {

  const {weathers}=useSelector((state)=>state.user)
  var weatherIcon=`http://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`

 


  return (
    <div
      style={
        {
          // marginTop: 20,
          // marginBottom: 20,
          // position: "sticky",
          // top: "4%",
        }
      }
    >
      <Card
        // hoverable
        style={{
          width: 260,
          height: 350,
          borderRadius: 30,
        }}
        bordered={false}
      
      >
     
       <div> {weathers.name}의현재날씨</div>
        <img src={weatherIcon} alt="" width="50%" height="50%" />
       
        {
          weathers.weather[0].description
        }
      </Card>
    </div>
  );
}

export default MyNote;
