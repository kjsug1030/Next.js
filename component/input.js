import React from 'react'
import GoogleMap from './GoogleMap'
import { Input } from 'antd';

const handleButton = async() => {
    const currentAddr = document.getElementById('address').value
    if (currentAddr){
      const {lat, lng} =  await GoogleMap(currentAddr)
        console.log('ddd',lat,lng)
    }
  }

function input() {
  return (
    <div><Input placeholder="주소를 입력하세요" id='address'/>
        <button onClick={handleButton}>클릭</button>
    </div>
  )
}

export default input