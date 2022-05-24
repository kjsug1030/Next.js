import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Card, List, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const FollowingModal = ({ followingModal, showFollowingModal }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <ModalWrapper
      visible={followingModal}
      onCancel={showFollowingModal}
      footer={null}
    >
      <CardWrapper>
        <ListWrapper
          className="list"
          dataSource={me.followings}
          renderItem={(v) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={v.profile} />}
                description={
                  <>
                    <div style={{ color: "black" }}>{v.name}</div>
                    <p>{v.location}</p>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </CardWrapper>
    </ModalWrapper>
  );
};

export default FollowingModal;

const ModalWrapper = styled(Modal)`
  top: 130px;
  position: relative;
`;

const CardWrapper = styled(Card)`
  border-radius: 12px;
`;

const ListWrapper = styled(List)`
  width: 400px;
  // padding: 0 6px;
  max-height: 600px;
  overflow-y: scroll;

  .ant-list-item:hover {
    background: #f0f0f0;
  }

  .ant-list-item {
    height: 70px;
    padding: 0 8px;
  }

  .delete_list {
    border-top: 1px solid #e9e9e9;
    cursor: pointer;
    background: #fff;

    .ant-list-item-meta-description {
      text-align: center;
      color: black;
      //   font-size: 16px;
      font-weight: bold;
    }
  }

  .delete_list:hover {
    .ant-list-item-meta-description {
      //   color: #fff;
    }
  }
`;
