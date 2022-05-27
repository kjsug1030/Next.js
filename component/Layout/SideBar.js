import { Layout, Progress, Card, Avatar, Button } from "antd";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import UserForm from "./UserForm";
import MenuMenu from "./Menu";

import { signOut, useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";
import axios from "axios";

const { Sider } = Layout;
const { Meta } = Card;
const push = () => {};

const SideBar = ({ isSide, showSide }) => {
  const { data: session } = useSession(); // 소셜로그인
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const logout = () => {
    // localStorage.originalCount=0
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };

  return (
    <SiderWrapper
      width={220}
      collapsible
      collapsed={isSide}
      onCollapse={showSide}
      onMouseEnter={showSide}
      onMouseLeave={showSide}
    >
      <Global />
      <LogoWrapper>
        <div>
          <Logo>
            {!isSide && (
              <Link href="/" style={{ display: "none" }}>
                <a>{/* <p>ペースメーカー</p> */}</a>
              </Link>
            )}
          </Logo>
        </div>
      </LogoWrapper>

      {/* 코드추가 할것 */}
      {isSide ? (
        session ? (
          <SpaceDiv>
            <Avatar size={44} src={session.user.image} />
          </SpaceDiv>
        ) : (
          <SpaceDiv>
            {/* <Avatar size={44} src="kurumi.jpg" /> */}
            {me ? (
              <Avatar size={44} src={me.profile} />
            ) : (
              <Avatar
                size={44}
                // src={me.profile}
                style={{ background: "#fff", opacity: "0.0" }}
                active={false}
                shape="circle"
              />
            )}
          </SpaceDiv>
        )
      ) : (
        <UserForm />
      )}
      <MenuMenu />

      {!isSide ? (
        <LogoutBtn>
          {session ? (
            <button onClick={() => logout()}>
              <img src="/logout.png" /> 로그아웃
            </button>
          ) : (
            <button onClick={() => logout()}>
              <img src="/logout.png" /> 로그아웃
            </button>
          )}
        </LogoutBtn>
      ) : null}
    </SiderWrapper>
  );
};

export default SideBar;

const LogoutBtn = styled.div`
  position: absolute;
  left: 25%;
  bottom: 7%;
  color: red;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;

  button {
    background: #467ada;
    border: none;
    cursor: pointer;
    font-weight: bold;
    text-overflow: ellipsis;
  }

  img {
    width: 32px;
    height: 32px;
  }
`;

const LogoWrapper = styled.div`
  // display: inline-block;
  height: 50px;
  line-height: 50px;
  // background: linear-gradient(to right, #66b5ff, #3fa3ff, #1890ff);
  background: #467ada;
`;

const SpaceDiv = styled.div`
  // 빈공간
  height: 240px;

  .ant-avatar {
    display: block;
    position: relative;
    top: 20% !important;
    margin: 0 auto;
    text-align: center;
    background: #fff;
  }

  .ant-skeleton .ant-skeleton-avatar {
    display: block !important;
    position: relative;
    top: 40% !important;
    // margin: 0 auto;
    margin-top: 50px;
  }
`;

const SiderWrapper = styled(Sider)`
  // 사이드바
  // width: 100px !important;
  transition: all 0.5s !important;
  overflow: auto;
  position: sticky;
  top: 0;
  height: 100vh;
  background: #467ada;
  // background: linear-gradient(to right, #66b5ff, #3fa3ff, #1890ff);
  // color: #fff;
  padding-bottom: 0 !important;

  a {
    color: #fff;
  }

  .ant-card-meta-title {
    font-weight: bold;
    margin-top: 5px;
  }

  .ant-layout-sider:hover {
    // transition: all 0.5s !important;
  }

  .ant-layout-sider-trigger {
    background: #467ada;
    // border-bottom-left-radius: 20px;
    // border-bottom-right-radius: 20px;
    transition: all 0.5s !important;
  }

  .ant-layout-sider-children {
    // border-radius: 20px;
    background: #467ada !important;
  }

  // .ant-layout-sider-has-trigger {
  //   padding-bottom: 0 !important;
  // }

  .ant-menu-light .ant-menu-item:hover,
  .ant-menu-light {
    color: #fff !important;
    background: #5c92eb !important;
  }

  .ant-menu:not(.ant-menu-horizontal) {
    // background: #5c92eb !important;
    background: #467ada !important;
  }

  .ant-menu-item-selected {
    background: #5c92eb !important;
  }

  .ant-menu-item-selected a {
    color: #fff !important;
  }

  a:hover {
    color: #fff !important;
    // background: #467ada !important;
  }

  .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed {
    width: 100% !important;
  }
`;

const Global = createGlobalStyle` // 전역 css
    .ant-layout-sider {
      // background-color: rgba( 255, 255, 255, 0.8);
      background: #fff;
      // border-right: 1px solid #dadde1;
      // border-radius: 20px;
    }

    .slick-slide {
      display:inline-block;
    }
    .ant-card-cover {
      transform: none !important;
    }

    .ant-card-meta {
      text-align:center;
    }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding-left: 4px;
    margin-left: 4px;
    margin-bottom: 0;
    text-overflow: hidden;
  }
`;

const SideLogo = styled.div`
  // 로고
  display: inline-block;
  text-align: center;

  & img {
    width: 35px;
    heigh: 35px;
    overflow: hidden;
    white-space: nowrap;
  }
`;
