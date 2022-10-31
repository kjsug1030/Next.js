import React, { useState } from "react";
import { Card, Avatar, Descriptions } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { SettingOutlined } from "@ant-design/icons";
import ProfileEdit from "../ProfileEdit";
import FollowingModal from "../FollowingModal";
import FollowerModal from "../FollowerModal";

const UserForm = ({ t }) => {
  const { me } = useSelector((state) => state.user);

  const [editProfile, setEditProfile] = useState(false);

  const showEditProfile = () => {
    setEditProfile((prev) => !prev);
    console.log(editProfile);
  };

  const openDrawer = () => {
    setEditProfile(true);
    console.log(editProfile);
  };

  const [followingModal, setFollowingModal] = useState(false);

  const showFollowingModal = () => {
    setFollowingModal((prev) => !prev);
    console.log(followingModal);
  };

  const openFollowingModal = () => {
    setFollowingModal(true);
    console.log(followingModal);
  };

  const [followerModal, setFollowerModal] = useState(false);

  const showFollowerModal = () => {
    setFollowerModal((prev) => !prev);
    console.log(followingModal);
  };

  const openFollowerModal = () => {
    setFollowerModal(true);
    console.log(followingModal);
  };

  return (
    <Container>
      {me ? (
        <CardWrapper
          bordered={true}
          actions={[
            <div key="followings" onClick={openFollowingModal}>
              {t("layout:following")}
              {/* 팔로잉 */}
              <br />
              {me.followings.length}
            </div>,
            <div key="followings" onClick={openFollowerModal}>
              {t("layout:follower")}
              {/* 팔로워 */}
              <br />
              {me.followers.length}
            </div>,
            <div key="twit">
              {t("layout:post")}
              {/* 게시물 */}
              <br />
              {me.posts.length}
            </div>,
          ]}
        >
          <FollowingModal
            followingModal={followingModal}
            showFollowingModal={showFollowingModal}
          />
          <FollowerModal
            followerModal={followerModal}
            showFollowerModal={showFollowerModal}
          />
          <CardMetaWrapper
            avatar={
              <Avatar
                // src="kurumi.jpg"
                src={me.profile}
                size={48}
                style={{ background: "#fff" }}
              />
            }
          />
          <SettingOutlined className="icon" onClick={openDrawer} />
          <DescriptionWrapper title={me.name} />
        </CardWrapper>
      ) : null}
      {me ? (
        <>
          <ProfileEdit
            visible={editProfile}
            showEditProfile={showEditProfile}
            t={t}
          />
        </>
      ) : null}
    </Container>
  );
};

export default UserForm;

const Container = styled.div`
  height: 220px;
  position: relative;
  top: 20px;

  .ant-card {
    margin: 0 15px;
    margin-top: 20px;
  }

  .ant-card-body {
    padding-bottom: 17px;
  }

  .icon {
    position: absolute;
    top: 5%;
    right: 7%;
    font-size: 17px;
  }

  .icon:hover {
    cursor: pointer;
  }
`;

const CardMetaWrapper = styled(Card.Meta)`
  height: 60px;
  .ant-card-meta-avatar {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 0;
  }
`;

const DescriptionWrapper = styled(Descriptions)`
  .ant-descriptions-header {
    text-align: center;
    margin: 0;
    padding-top: 20px;
  }
`;

const CardWrapper = styled(Card)`
  border-radius: 12px;

  box-shadow: 0px 8px 24px rgb(13 13 18 / 4%);
  .ant-card-actions li {
  }

  .ant-card-actions {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
  }

  div {
    text-align: center;
  }
`;
