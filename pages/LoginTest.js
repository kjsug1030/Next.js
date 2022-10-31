import React, { useState, useCallback, useEffect } from "react";
import { Layout, Card, Form, Input, Button, Modal } from "antd";
import Signup from "./SignUpTest";
import styled from "styled-components";
import Link from "next/link";
import useInput from "../hooks/useInput";
import axios from "axios";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../reducers/user";

import { signIn, signOut, useSession } from "next-auth/react"; // 소셜로그인
import GoogleButton from "react-google-button"; // google 버튼
import { LOADS_POSTS_REQUEST } from "../reducers/post";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const { Header, Footer, Content } = Layout;
const { Meta } = Card;

const signin = () => {
  const dispatch = useDispatch();

  const { locale } = useRouter();

  const { t } = useTranslation("login");

  const { me } = useSelector((state) => state.user);

  const loginError = () => {
    Modal.warning({
      title: t("faile"),
    });
  };

  const loginSuccess = () => {
    Modal.success({
      content: t("success"),
    });
  };
  useEffect(() => {
    if (me != null) {
      if (me.message === "Invalid credentials!") {
        loginError();
        return t("faile");
      }
      loginSuccess();
      // dispatch({
      //   type:LOADS_POSTS_REQUEST
      // })
      // Router.push(
      //   '/'
      // )
      if (locale === "ko") {
        window.location.href = "/ko";
      } else {
        window.location.href = "/jp";
      }
    }
  }, [me]);

  const { data: session } = useSession(); // 소셜 로그인

  const [form] = Form.useForm();

  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(true);
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
    console.log(isModal);
  };

  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit = async () => {
    let body = {
      email: id,
      password: password,
    };

    console.log(body);

    const result = await dispatch({
      type: LOGIN_REQUEST,
      data: body,
    });
  };

  return (
    <Layout>
      <HeaderWrapper>PACE MAKER</HeaderWrapper>
      <ContentWrapper>
        <CardStyle>
          <MetaDiv>
            {/* <Meta title="페이스메이커 로그인" /> */}
            <Meta title={t("title")} />
          </MetaDiv>
          <FormDiv>
            <FormWrapper onFinish={onSubmit} form={form} size="large">
              <Form.Item>
                <Input
                  value={id}
                  onChange={onChangeId}
                  placeholder={t("id")}
                  required
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  value={password}
                  onChange={onChangePassword}
                  placeholder={t("password")}
                  required
                />
              </Form.Item>
              {/* 코드추가 */}
              <BtnDiv>
                <LineDiv>
                  <button
                    type="button"
                    className="line_btn"
                    onClick={() => {
                      signIn("line");
                    }}
                  >
                    <img src="btn_base.png" />
                    {t("line")}
                  </button>
                </LineDiv>
                <GoogleDiv style={{ borderRadius: "7px" }}>
                  <GooBtn
                    type="light"
                    label={t("google")}
                    onClick={() => {
                      signIn("google");
                    }}
                  />
                </GoogleDiv>
                <Button type="default" htmlType="submit">
                  {t("login")}
                </Button>
              </BtnDiv>
              {/*  */}
            </FormWrapper>
          </FormDiv>
          <QuestionDiv>
            <div>
              <Link href="/findId">
                <a>{t("find")}</a>
              </Link>
            </div>
            <Meta description={t("description")} />
          </QuestionDiv>
          <SignupBtn>
            <Button type="primary" onClick={showModal} ghost>
              {t("signup")}
            </Button>
            <Signup isModal={isModal} openModal={openModal} />
          </SignupBtn>
        </CardStyle>
      </ContentWrapper>
      <Footer style={{ height: "20vh", background: "#fff" }}></Footer>
    </Layout>
  );
};

signin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }

//   // context.store.dispatch({
//   //     type:LOAD_POSTS_REQUEST
//   // })

//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
// })

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["login", "signup"])),
  },
});

export default signin;

// FormDiv 밑에 추가코드있음

const SignupBtn = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 10px;

  & Button {
    height: 40px;
    border-radius: 7px;
  }
`;

const QuestionDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 40px;
  text-align: center;
  margin-top: 10px;

  & div {
  }

  & a {
    font-size: 16px;
  }

  /* .ant-card-meta-description::before {
    context:'';
    background:color: rgba(0, 0, 0, 0.45);
  } */
`;

const MetaDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 40px;
  text-align: center;

  .ant-card-meta-title {
    font-size: 18px;
  }
`;

const FormWrapper = styled(Form)`
  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-input {
    height: 54px;
    border-radius: 7px;
  }

  .ant-input-affix-wrapper {
    height: 54px;
    border-radius: 7px;
  }

  .ant-input-affix-wrapper > .ant-input {
    height: 41px;
  }

  .ant-card-meta {
    display: inline-block;
    width: 100%;
    height: 40px;
    text-align: center;
  }
`;

const FormDiv = styled.div`
  Button {
    width: 100%;
    background: #32a89b;
    background: #1890ff;
    color: #fff;
    height: 48px;
    margin-top: 5px;
    font-weight: bold;
    border-radius: 7px;
  }

  Button:hover {
    background: #1683e8;
    border-color: #1683e8;
    color: #fff;
  }

  Button:focus {
    background: #1683e8;
    color: #fff;
  }
`;

// 코드추가
const BtnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LineDiv = styled.div`
  // 라인 로그인
  // align-items: center;
  position: relative;

  img {
    position: absolute;
    left: 5px;
    color: #fff;
  }

  .line_btn {
    width: 100%;
    height: 50px;
    line-height: 40px;
    background: #06c755;
    color: #fff;
    border: 1px solid #e5e5e5;
    margin: 0;
    cursor: pointer;
  }

  .line_btn:hover {
    // background: #000 (opacity: 30%);
    background: #06c755;
    // opacity: 0.2;
    // color: #fff;
    border: 1px solid #e5e5e5;
  }

  .line_btn:focus {
    background: #06c755;
    // opacity: 0.3;
    color: #fff;
    border: 1px solid #e5e5e5;
  }
`;

const GooBtn = styled(GoogleButton)`
  width: 347px !important;
  border-radius: 7px !important;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%) !important;
  font-family: "Nunito Sans", sans-serif !important;
  margin: 0 !important;
  text-align: center !important;
  font-size: 15px !important;
  line-height: 51px !important;

  span {
    padding-right: 40px !important;
  }
`;

const GoogleDiv = styled.div`
  // 구글 로그인
  position: relative;
  display: inline-block;
  width: 350px;
  // border-radius: 7px !important;
  margin-top: 5px;
`;
// 여기까지

const CardStyle = styled(Card)`
  width: 400px;
  margin: 0 auto;
  border-radius: 15px;
  box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  // 0 5px 12px 4px rgb(0 0 0 / 9%);
`;

const HeaderWrapper = styled(Header)`
  display: inline-block;
  width: 100%;
  height: 100px;
  background: #f0f2f5;
  //   opacity: 0.5;
  font-size: 51px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
  color: #1890ff;
  margin-top: 30px;
`;

const ContentWrapper = styled(Content)`
  height: 60vh;
  background: #f0f2f5;
`;
