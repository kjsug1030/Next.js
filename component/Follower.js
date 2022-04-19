import React,{useCallback,useEffect,useState} from 'react'
import { Modal, Button } from 'antd';


function Follower({visible,data,setIsModalVisible}) {

    useEffect(()=>{
        console.log(data)
    },[])
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
  return (
    <div>
          <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
           
      {data.map((f,index)=>{
        return(
          <div>
            <p>{f.nickname}</p><br/>
          </div>

            )
          })}
      </Modal>

        </div>
   
  )
}

export default Follower