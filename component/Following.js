import React,{useCallback,useEffect,useState} from 'react'
import { Modal, Button } from 'antd';


function Following({visible,data,setIsModalVisible}) {

    useEffect(()=>{
        console.log('ass',data)
        data.map(f=>{
          console.log(f)
        })
    },[])
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
  return (
//     <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
//     <p>sad</p>
// </Modal>
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

export default Following