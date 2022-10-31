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
import {
  GOAL_REQUEST,
  SIGNUP_REQUEST,
  ALL_GOAL_REQUEST,
} from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { Meta } = Card;
const { Option } = Select;

const Signup = ({ isModal, openModal, setIsModal }) => {
  const { t } = useTranslation("purpose");

  function error() {
    Modal.error({
      title: t("pTitleFaile"),
      content: t("pContentFaile"),
      // title: "목표설정실패",
      // content: "지정된 날짜에 목표가 이미설정되어있습니다.",
    });
  }
  const { locale } = useRouter();
  const now = new Date();
  const nowYear = now.getFullYear();
  let nowMonth = now.getMonth() + 1;

  if ((nowMonth + "").length < 2) {
    nowMonth = "0" + nowMonth;
  }

  const nowDay = now.getDate();
  if ((nowDay + "").length < 2) {
    nowDay = "0" + nowDay;
  }

  let nowEndDay = now.getDate() + 1;
  if ((nowEndDay + "").length < 2) {
    nowEndDay = "0" + nowEndDay;
  }

  // const day = now.format("DD");

  // const nextDay = now.add(1, "d").format("DD");
  // const month = now.format("MM");

  const { goalpurpose } = useSelector((state) => state.user);

  useEffect(() => {
    //     if(goalpurpose?goalpurpose.message:goalpurpose){
    //         error()
    //     }else if(goalpurpose?goalpurpose.goal:goalpurpose){
    // window.location.href='/musclePurpose'

    //     }
    if (locale === "ko") {
      if (goalpurpose ? goalpurpose.goal : goalpurpose) {
        window.location.href = "/musclePurpose";
      }
    } else {
      if (goalpurpose ? goalpurpose.goal : goalpurpose) {
        window.location.href = "/jp/musclePurpose";
      }
    }
  }, [goalpurpose]);
  const [form] = Form.useForm();

  const [btnValue, setBtnValue] = useState(null);

  const btnChange = (e) => {
    setBtnValue(e.target.value);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const years = [];

  for (let i = now.getFullYear(); i < 2030; i++) {
    years.push(i);
  }

  const months = [];

  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      months.push("0" + i.toString());
    } else {
      months.push(i.toString());
    }
  }

  const days = [];

  for (let i = 1; i <= 31; i++) {
    if (i < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      days.push("0" + i.toString());
    } else {
      days.push(i.toString());
    }
  }

  const [title, onChangeTitle] = useInput("");
  const [purpose, onChangePurpose] = useInput("");

  // 추가하기
  const [event, setEvent] = useState("");
  const onChangeEvent = (v) => {
    setEvent(v);
  };

  // const nowYear = moment();

  const [start, setStart] = useState({
    year: nowYear,
    month: nowMonth,
    day: nowDay,
  });

  const onChangeStartYear = (date) => {
    setStart({ ...start, year: date });
  };

  const onChangeStartMonth = (e) => {
    setStart({ ...start, month: e });
  };

  const onChangeStartDay = (e) => {
    setStart({ ...start, day: e });
  };

  const [end, setEnd] = useState({
    year: nowYear,
    month: nowMonth,
    day: nowEndDay,
  });

  const onChangeEndYear = (date) => {
    setEnd({ ...end, year: date });
  };

  const onChangeEndMonth = (e) => {
    setEnd({ ...end, month: e });
  };

  const onChangeEndDay = (e) => {
    setEnd({ ...end, day: e });
  };

  // 여기까지

  const dispatch = useDispatch();

  const onSubmit = () => {
    let body = {
      title,
      event,
      purpose,

      start: start.year + "-" + start.month + "-" + start.day,
      end: end.year + "-" + end.month + "-" + end.day,
    };

    console.log(body);

    dispatch({
      type: GOAL_REQUEST,
      data: body,
    });
  };

  // const disabledYear = (current) => {
  //   const nowYear = moment().subtract(1, "years").format("YYYY");
  //   return current && current < nowYear;
  // };

  // const nowYear = moment().format("YYYY");

  //   useEffect(()=>{
  //       setIsModal(false)

  //   },[goalpurpose])

  return (
    <ModalWrapper visible={isModal} onCancel={openModal} footer={null}>
      <TitleDiv>
        <div>{t("setting")}</div>
        <span>{t("pContent2")}</span>
        {/* <div>운동목표설정</div>
        <span>간단합니다</span> */}
      </TitleDiv>
      <FormWrapper>
        <Form onFinish={onSubmit} layout="horizontal" form={form} size="large">
          <MaleFemale>
            {t("pKind")}
            {/* 종목 */}
            <Select placeholder={t("pKind")} onChange={onChangeEvent}>
              <Option value="B">{t("cycling")}</Option>
              <Option value="R">{t("running")}</Option>
              {/* <Option value="B">자전거</Option>
              <Option value="R">러닝</Option> */}
            </Select>
          </MaleFemale>
          {/* 여기까지 */}
          <SmallTitle>{t("pTitle3")}</SmallTitle>
          {/* <SmallTitle>제목</SmallTitle> */}
          <Form.Item rules={[{ required: true }]}>
            <Input
              value={title}
              onChange={onChangeTitle}
              placeholder={t("pTitle3")}
            />
          </Form.Item>
          <SmallTitle>{t("pPurpose2")}</SmallTitle>
          {/* <SmallTitle>운동목표</SmallTitle> */}
          <Form.Item rules={[{ required: true }]}>
            <Input
              value={purpose}
              onChange={onChangePurpose}
              placeholder={t("pPurposeKm")}
            />
          </Form.Item>

          <SmallTitle>{t("pStart2")}</SmallTitle>
          {/* <SmallTitle>시작날짜</SmallTitle> */}
          <SpaceWrapper>
            <Select
              name="year"
              placeholder={t("year")}
              // placeholder="년도"
              value={start.year}
              onChange={onChangeStartYear}
            >
              {years.map((years) => (
                <Option key={years}>{years}</Option>
              ))}
            </Select>
            <Select
              name="month"
              value={start.month}
              placeholder={t("month")}
              // placeholder="월"
              onChange={onChangeStartMonth}
            >
              {months.map((month, index) => (
                <Option key={`${index + 1}`}>{month}</Option>
              ))}
            </Select>
            <Select
              name="day"
              value={start.day}
              placeholder={t("day")}
              // placeholder="일"
              onChange={onChangeStartDay}
            >
              {days.map((day, index) => (
                <Option key={`${index + 1}`}>{day}</Option>
              ))}
            </Select>
          </SpaceWrapper>
          <SmallTitle>{t("pEnd2")}</SmallTitle>
          {/* <SmallTitle>끝나는날짜</SmallTitle> */}
          <SpaceWrapper>
            <Select
              name="year"
              placeholder={t("year")}
              // placeholder="년도"
              value={end.year}
              onChange={onChangeEndYear}
            >
              {years.map((years) => (
                <Option key={years}>{years}</Option>
              ))}
            </Select>

            <Select
              name="month"
              value={end.month}
              placeholder={t("month")}
              // placeholder="월"
              onChange={onChangeEndMonth}
            >
              {months.map((month, index) => (
                <Option key={`${index + 1}`}>{month}</Option>
              ))}
            </Select>
            <Select
              name="day"
              value={end.day}
              placeholder={t("day")}
              // placeholder="일"
              onChange={onChangeEndDay}
            >
              {days.map((day, index) => (
                <Option key={`${index + 1}`}>{day}</Option>
              ))}
            </Select>
          </SpaceWrapper>

          <Form.Item>
            <Button type="default" htmlType="submit">
              {t("setting2")}
              {/* 설정 */}
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </ModalWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["purpose"])),
  },
});

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
    width: 128px;
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
    width: 92px;
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
