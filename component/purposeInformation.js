import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_GOAL_REQUEST,
  GOAL_REQUEST,
  SIGNUP_REQUEST,
} from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { useRouter } from "next/router";

const { Meta } = Card;
const { Option } = Select;

const Signup = ({
  informationModal,
  openInformationModal,
  setInformationModal,
  information,
  t,
}) => {
  const dispatch = useDispatch();

  const { locale } = useRouter();

  const deletePurpose = (datas) => {
    dispatch({
      type: DELETE_GOAL_REQUEST,
      data: datas,
    });
    // location.reload();

    if (locale === "ko") {
      window.location.href = "/musclePurpose";
    } else {
      window.location.href = "/jp/musclePurpose";
    }
  };

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("YYYY-MM-DD");
  };

  return (
    <Container>
      <ModalWrapper
        visible={informationModal}
        onCancel={openInformationModal}
        footer={null}
      >
        <TitleDiv>
          <h1>{t("nowPurpose")}</h1>
          {/* <h1>현재 진행중인 목표</h1> */}
        </TitleDiv>
        <div>
          <div style={{ textAlign: "center" }}>
            <h2>
              {t("pTitle")} : {information.title}
            </h2>
            <h3>
              {t("pDistance")} : {information.textColor + "km"}
            </h3>
            <h3>
              {t("pStart")} : {dateFormat(information.startStr)}
            </h3>
            <h3>
              {t("pEnd")} : {dateFormat(information.endStr)}
            </h3>
            {/* <h2>타이틀 : {information.title}</h2>
            <h3>목표거리 : {information.textColor + "km"}</h3>
            <h3>도전을 시작한 날 : {dateFormat(information.startStr)}</h3>
            <h3>끝 마치는 날 : {dateFormat(information.endStr)}</h3> */}
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => deletePurpose(information.id)}
          danger
        >
          {t("pDelete")}
          {/* 목표삭제 */}
        </Button>
      </ModalWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  .ant-btn {
    width: 100%;
    border-radius: 30px;
  }
`;

const TitleDiv = styled.div`
  display: block;
  text-align: center;
  border-bottom: solid 1px #dadde1;
  // padding: 10px 15px 9px 15px;

  h1 {
    font-size: 26px;
    font-weight: 600;
    padding: 8px 0;
    margin: 0;
  }
`;

const ModalWrapper = styled(Modal)`
  position: relative;
  top: 35% !important;
  // transform: translateY(-50%);

  .ant-modal-content {
    width: 432px;
    margin: 0 auto;
    border-radius: 15px;
  }
  .ant-modal-header {
    border-radius: 15px;
  }

  .ant-modal-body {
    padding-top: 0;
  }

  .ant-input-affix-wrapper {
    // 추가하기
    border-radius: 5px;
  }

  .ant-btn-dangerous.ant-btn-primary {
    width: 100%;
    height: 40px;
    line-height: 30px;
    border-radius: 7px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
`;
