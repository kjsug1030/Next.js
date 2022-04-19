import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  Modal,
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Space,
  Radio,
} from "antd";
import useInput from "../hooks/useInputTest";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_GOAL_REQUEST, GOAL_REQUEST, SIGNUP_REQUEST } from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Option } = Select;


const Signup = ({ informationModal, openInformationModal,setInformationModal,information }) => {
    const dispatch=useDispatch();

const deletePurpose=(datas)=>{
    dispatch({
        type:DELETE_GOAL_REQUEST,
        data:datas
    })
    // location.reload();

window.location.href='/musclePurpose'
}


  return (
    <ModalWrapper visible={informationModal} onCancel={openInformationModal} footer={null}>
      <TitleDiv>
        {/* <div>운동목표설정</div>
        <span>간단합니다</span> */}
      </TitleDiv>
      <FormWrapper>
        
       
          <MaleFemale>
          <h2>{information.title}</h2>
          <div>{information.textColor+'km'}</div>
          <div>{information.startStr}</div>
          <div>{information.endStr}</div>

          
          </MaleFemale>
        <Button type="primary" onClick={()=>deletePurpose(information.id)} danger>목표삭제</Button>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default Signup;

// const BtnWrapper = styled.div` 제거하기
//   // display: flex;
//   // justify-content: start;
//   // margin-top: 10px;

//   .ant-radio-wrapper {
//     height: 38px;
//     line-height: 38px;
//     padding: 0 5px;
//     border: 1px solid #ccd0d5;
//     border-radius: 5px;
//   }
// `;

const SmallTitle = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 3px;
`;

// const SmallSecondTitle = styled(SmallTitle)` 제거
//   margin-top: 10px;
// `;

// 추가하기
const SpaceWrapper = styled(Space)`
  .ant-picker {
    width: 132px;
    border-radius: 5px !important;
  }

  .ant-select-single {
    width: 125px;
    border-radius: 5px;
    // color: rgba(0, 0, 0, 0.4);
  }

  .ant-select-selector {
    border-radius: 5px !important;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 470px;
  // vertical-align:middle;
  text-align: center;
  // max-width: 500px;
  padding: 16px;

  // & Button { 제거
  //   width: 100%;
  //   background: #1890ff;
  //   color: #fff;
  //   height: 40px;
  //   margin-top: 5px;
  // }

  Button {
    width: 100%;
    background: #1890ff;
    color: #fff;
    height: 48px;
    margin-top: 5px;
    font-weight: bold;
    border-radius: 7px;
    margin-top: 20px;
  }

  Button:hover {
    background: #1683e8;
    border-color: #1683e8;
    color: #fff;
  }

  Button:focus {
    background: #1890ff;
    color: #fff;
  }

  .ant-input,
  .ant-input-lg {
    border: 1px solid #ccd0d5;
    border-radius: 5px;
  }

  .ant-form-item {
    margin-bottom: 10px;
  }

  .ant-form {
    width: 400px;
  }

  .ant-form-item-control-input-content {
    display: inline-block;
    width: 100%;
    height: 40.14px;
  }
`;

const FirstName = styled(Form.Item)`
  display: inline-block;
  width: 154px;
`;

const SecondName = styled(FirstName)`
  margin-left: 8px;
`;

const MaleFemale = styled(SecondName)`
  width: 74px;

  .ant-select-single {
    width: 75px;
    border-radius: 5px;
    // color: rgba(0, 0, 0, 0.4);
  }

  .ant-select-selector {
    border-radius: 5px !important;
  }
`;

const TitleDiv = styled.div`
  display: block;
  text-align: center;
  border-bottom: solid 1px #dadde1;
  padding: 10px 15px 9px 15px;

  div {
    margin-bottom: 0;
    font-size: 25px;
    font-weight: 700;
  }

  span {
    font-size: 15px;
    color: #606770;
  }
`;

const ModalWrapper = styled(Modal)`
  top: 130px;

  .ant-modal-content {
    width: 432px;
    margin: 0 auto;
    border-radius: 15px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
  .ant-modal-header {
    border-radius: 15px;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-input-affix-wrapper {
    // 추가하기
    border-radius: 5px;
  }
`;