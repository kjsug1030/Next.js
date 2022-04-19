import React ,{useState}from 'react'
import { Card ,Avatar,Image,Space} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import RunningChart from './RunningChart';
import BikeChart from './BikeChart'
import { Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined ,HeartFilled } from '@ant-design/icons';
import { FaRunning } from 'react-icons/fa';
import { MdDirectionsBike } from 'react-icons/md';
import {BsPersonBadge} from 'react-icons/bs'
import { Affix, Button } from 'antd';
import {AiFillHeart} from 'react-icons/ai'


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

const bell=[
    {
        content:'뱃지를 획득 하였습니다',
        icon:<BsPersonBadge style={{color:'gray'}}/>,
        date:'2022-02-18(금)'
    },
    {
        content:'하트를 눌렀습니다',
        icon:<AiFillHeart style={{color:'pink'}} />,
        date:'2022-02-18(금)'
    },
    {
        content:'라이딩이 완료되었습니다',
        icon:< MdDirectionsBike style={{color:'blue'}}/>,
        date:'2022-02-18(금)'
    },
    {
        content:'뱃지를 획득 하였습니다',
        icon:<BsPersonBadge/>,
        date:'2022-02-18(금)'
    },
    {
        content:'뱃지를 획득 하였습니다',
        icon:<BsPersonBadge/>,
        date:'2022-02-18(금)'
    },
    {
        content:'뱃지를 획득 하였습니다',
        icon:<BsPersonBadge/>,
        date:'2022-02-18(금)'
    },
]


function badge() {
    

  return (
    <div >
          <div style={{position:'fixed',marginBottom:10,marginLeft:50}}>라이딩알림</div>
        <div style={{height:280,marginTop:20, marginLeft:50, position:'fixed',width:300,overflow:'auto'}}>
          
        {
            bell.map((b)=>(
                <Card style={{marginTop:10,borderRadius:20}}>
                                     <a>{b.icon}</a>

                    <span>{b.content}</span>
                    <span style={{marginLeft:10,top:10,fontSize:11}}>{b.date}</span>
                </Card>
                
            ))
            }
        </div>

         {/* <Card 
         
         
    hoverable
    style={{ width: 240 ,marginLeft:50 ,marginTop:50,borderRadius:30,position:'fixed'}}
    title="라이딩알림"
    bordered={false}
   
    
  >
     

     
    
  </Card>
   */}
  
    </div>
  )
}

export default badge




