import React, { useState } from "react";
import Link from "next/link";
import { LOGOUT_REQUEST, SIGNUP_REQUEST } from "../../reducers/user";

import { Avatar, Input, Layout, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const { Header, Sider } = Layout;

import styled from "styled-components";
import ProfileEdit from "../ProfileEdit";
import Notification from "../../component/Notification";
import BadgeBook from "../BadgeBook";

const { Search } = Input;

const header = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };

  return (
    <HeaderWrapper>
      <Title>Pace-Maker</Title>

      <IconList>
        {/* 알림 */}
        {/* <Notification /> */}

        <Button type="primary" onClick={() => logout()}>
          LogOut
        </Button>
        <AvatarDiv>
          <a>
            {/* <Avatar onClick={openDrawer} src="kurumi.jpg" size={40}></Avatar> */}
            {me.profile ? (
              <Avatar
                src={me.profile}
                size={40}
                style={{ background: "#fff" }}
              />
            ) : (
              <Avatar
                // src={me.profile}
                size={40}
                style={{ background: "#fff", opacity: "0.0" }}
              />
            )}
          </a>
        </AvatarDiv>
      </IconList>
    </HeaderWrapper>
  );
};

// 자전거 아이콘  제작자: Freepik - Flaticon

export default header;

const Title = styled.div`
  display: inline-block;
  color: #467ada;
  font-size: 38px;
  font-weight: bold;
  line-height: 70px;
`;

const AvatarDiv = styled.div`
  display: inline-block;
  line-height: 70px;
  position: relative;
  bottom: 4px;

  a {
    font-size: 20px;
  }
  .ant-avatar {
    // background: #00a2ae;
  }
`;

// 헤더
export const HeaderWrapper = styled(Header)`
  display: inline-block;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: #fff;
  padding: 0 6%;
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  border-top-left-radius: 55px;
  // position: fixed;
  // top: 0;
  // z-index: 1;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // 
  img {
  //   width: 20px;
  //   height: 20px;
  // }
  
  p {
    color: black;
    font-weight: bold;
    padding-left: 4px;
    margin-left: 4px;
    margin-bottom: 0;
    text-overflow: hidden;
  }
`;

export const SearchWrapper = styled.div`
  display: inline-block;
  width: 500px;
  margin: 0 auto;
  align-items: center;
  span {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .ant-input {
    border-radius: 30px;
  }

  .ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    width: 80px;
    border-radius: 30px;
    position: relative;
    right: 15px;
    z-index: 1;
  }
  .ant-input-group-addon {
    background-color: #fff;
  }
`;

export const IconList = styled.div`
  display: inline-block;
  height: 70px;
  line-height: 70px;
  vertical-align: middle;
  position: fixed;
  right: 2%;

  .noti {
    margin-right: 24px;

    a {
      font-size: 30px;
    }

    a:hover {
      color: #467ada;
    }
  }

  a {
    font-size: 25px;
  }

  .notibox {
    background: blue;
    width: 200px;
    height: 500px;
    position: relative;
    right: 160px;
  }

  .noti:hover {
    .notibox {
      background: red !important;
    }
  }

  .ant-btn {
    border-radius: 9px;
    position: relative;
    bottom: 4px;
    margin-right: 24px;
    font-weight: bold;
    background: #467ada;
    border: 1px solid #467ada;
  }
`;
