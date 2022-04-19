import React ,{useState}from 'react'
import { Card } from 'antd';
import RunningChart from './RunningChart';
import BikeChart from './BikeChart'
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { FaRunning } from 'react-icons/fa';
import { MdDirectionsBike } from 'react-icons/md';
import { Affix, Button } from 'antd';


const { TabPane } = Tabs;

import LoginForm from './LoginForm';
import dynamic from "next/dynamic";

const { Meta } = Card;
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });





function myPurpose() {
    let today = new Date();  
    const pie = {
        // 파이 차트 더미데이터
        series: [10,1],
        chartOptions: {
          
          textAnchor: "middle",
          legend: {
            show: false,
            position: "bottom",
            horizontalAlign: "center",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "40%",
              },
            },
          },
          colors: ['#F44336','#ffffff'],
          // "#1890ff"
        },
      };
 

  return (
      <div style={{display:'flex'}}>
          <Card style={{height:100,marginTop:10,fontSize:30,borderRadius:30}}>
          {today.getDate()}
          </Card>
          <div style={{height:100,color:'white',width:100,left:500,marginTop:10,fontSize:20,borderRadius:30}}>
          달성한것
          </div>
          <div style={{height:100,color:'white',width:100,marginTop:10,left:350,fontSize:20,borderRadius:30}}>
          목표한것
          </div>

          
             

            <div style={{marginLeft:100}}>
        {/* <div style={{position:'fixed',marginTop:30,marginLeft:55}}>일주일통계</div> */}
        
        <Chart
              type="donut"
              options={pie.chartOptions}
              series={pie.series}
              width={250}
              height={160}
              
            />
 
    </div>

      </div>
  
  )
}




export default myPurpose