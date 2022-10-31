import React, { useState, useCallback } from "react";
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
import { useDispatch } from "react-redux";
import { SIGNUP_REQUEST } from "../reducers/user";
import { CloseOutlined } from "@ant-design/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { Meta } = Card;
const { Option } = Select;

const Signup = ({ isModal, openModal }) => {
  const [form] = Form.useForm();

  const [btnValue, setBtnValue] = useState(null);

  const btnChange = (e) => {
    setBtnValue(e.target.value);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const months = [];

  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  const days = [];

  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  const [firstName, onChangeFirstName] = useInput("");
  const [lastName, onChangeLastName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 추가하기
  const [sex, setSex] = useState("");
  const onChangeSex = (v) => {
    setSex(v);
  };

  const [birth, setBirth] = useState({
    birth: "",
    month: "",
    day: "",
  });

  const onChangeBirth = (date) => {
    const dateString = moment(date).format("YYYY");
    setBirth({ ...birth, birth: dateString });
  };

  const onChangeMonth = (e) => {
    setBirth({ ...birth, month: e });
  };

  const onChangeDay = (e) => {
    setBirth({ ...birth, day: e });
  };
  // 여기까지

  const dispatch = useDispatch();

  const onSubmit = () => {
    let body = {
      name: firstName + lastName,
      email: email,
      password: password,
      sex: sex,
      profile: "",
      introduce: "",
      weight: "",
      location: "",
      birth: birth.birth + "-" + birth.month + "-" + birth.day,
    };

    console.log(body);

    dispatch({
      type: SIGNUP_REQUEST,
      data: body,
    });
    openModal(false);
  };

  const { t } = useTranslation("signup");

  return (
    <ModalWrapper visible={isModal} onCancel={openModal} footer={null}>
      <TitleDiv>
        <div>{t("signup:title1")}</div>
        <span>{t("signup:title2")}</span>
      </TitleDiv>
      <FormWrapper>
        <Form onFinish={onSubmit} layout="horizontal" form={form} size="large">
          <FirstName rules={[{ required: true }]}>
            <Input
              value={firstName}
              onChange={onChangeFirstName}
              placeholder={t("signup:firstName")}
            />
          </FirstName>
          <SecondName rules={[{ required: true }]}>
            <Input
              value={lastName}
              onChange={onChangeLastName}
              placeholder={t("signup:secondName")}
            />
          </SecondName>
          <MaleFemale>
            <Select placeholder={t("signup:sex")} onChange={onChangeSex}>
              <Option value="F">{t("signup:woman")}</Option>
              <Option value="M">{t("signup:man")}</Option>
              <Option value="T">{t("signup:transgender")}</Option>
              <Option value="N">{t("signup:no")}</Option>
            </Select>
          </MaleFemale>
          {/* 여기까지 */}

          <Form.Item rules={[{ required: true }]}>
            <Input
              value={email}
              onChange={onChangeEmail}
              placeholder={t("signup:email")}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Input.Password
              value={password}
              onChange={onChangePassword}
              placeholder={t("signup:password")}
            />
          </Form.Item>
          <SmallTitle>{t("signup:birth")}</SmallTitle>
          <SpaceWrapper>
            <DatePicker
              picker="year"
              onChange={onChangeBirth}
              placeholder={t("signup:year")}
            />

            <Select
              name="month"
              placeholder={t("signup:month")}
              onChange={onChangeMonth}
            >
              {months.map((month, index) => (
                <Option key={`${index + 1}`}>{month}</Option>
              ))}
            </Select>
            <Select
              name="day"
              placeholder={t("signup:day")}
              onChange={onChangeDay}
            >
              {days.map((day, index) => (
                <Option key={`${index + 1}`}>{day}</Option>
              ))}
            </Select>
          </SpaceWrapper>

          <Form.Item>
            <Button type="default" htmlType="submit">
              {t("signup:signup")}
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default Signup;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["signup"])),
  },
});

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
