import React, { useCallback, useState, useEffect } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FOLLOWING_REQUEST, UNFOLLOWING_REQUEST } from "../reducers/user";
import styled from "styled-components";
import Link from "next/link";
import userProfile from "../pages/User/[id]";

function FollowButton({ post, t }) {
  const dispatch = useDispatch();
  const { me, follower } = useSelector((state) => state.user);

  const isFollowing = me.followings.find((v) => v.id === post.id);

  const follow = () => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOWING_REQUEST,
        data: post.id,
      });
    } else {
      dispatch({
        type: FOLLOWING_REQUEST,
        data: { id: post.id, name: post.name },
      });
    }
  };

  return (
    <Container>
      {isFollowing ? (
        <Button className="follow_btn">{t("profile:followingOK")}</Button>
      ) : (
        // <Button className="follow_btn">팔로잉O</Button>
        <Button className="follow_btn">{t("profile:followingX")}</Button>
        // <Button className="follow_btn">팔로잉X</Button>
      )}
      <a href={"User/" + post.id}>
        <Button>{t("profile:profile2")}</Button>
        {/* <Button>프로필</Button> */}
      </a>
    </Container>
  );
}

export default FollowButton;

const Container = styled.div`
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;

  .ant-btn {
    width: 90px;
    height: 35px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
  }

  .follow_btn {
    background: #467ada;
    border: 1px solid #467ada;
    color: #fff;
    margin-right: 10px;
  }
`;
