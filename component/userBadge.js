

import React ,{useState}from 'react'
import { Card,Avatar,Image } from 'antd';
import RunningChart from './RunningChart';
import BikeChart from './BikeChart'
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import { FaRunning } from 'react-icons/fa';
import { MdDirectionsBike } from 'react-icons/md';
import { Affix, Button } from 'antd';




  function userBadge() {
   

  return (
    <div >
        <div style={{position:'fixed',marginTop:670,marginLeft:55}}>뱃지정보</div>
         <Card 
         
    hoverable
    style={{ width: 240 ,marginLeft:50 ,marginTop:700,borderRadius:30,position:'fixed'}}
    
    bordered={false}
   
  >
     <Avatar size={80} src={<Image src="https://mblogthumb-phinf.pstatic.net/20130829_283/yoonssu517_1377739886551JEgeW_PNG/badge.png?type=w2"/>} shape="square"  />
     {/* <Avatar size={80} src={<Image src="     https://png.pngtree.com/element_origin_min_pic/16/07/18/20578cd1668e98d.jpg
"/>} shape="square"  />
     */}
    

   
  </Card>
  
  
    </div>
  )
}


export default userBadge