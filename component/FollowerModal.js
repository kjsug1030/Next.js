import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Card, List, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const FollowerModal = ({ followerModal, showFollowerModal }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <ModalWrapper
      visible={followerModal}
      onCancel={showFollowerModal}
      footer={null}
    >
      <TitleDiv>
        <div>팔로워</div>
      </TitleDiv>
      {/* <CardWrapper> */}
      <ListWrapper
        className="list"
        dataSource={me.followers}
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
      {/* </CardWrapper> */}
    </ModalWrapper>
  );
};

export default FollowerModal;

const ModalWrapper = styled(Modal)`
  //   display: inline-block;

  //   top: 50%;
  //   transform: translateY(-50%);
  position: relative;
  //   border-radius: 12px;

  .ant-modal-content {
    width: 400px;
    height: 600px;
    margin: 0 auto;
    border-radius: 15px;
  }
  .ant-modal-header {
    border-radius: 15px;
    // margin-bottom: 30px;
  }

  .ant-modal-body {
    padding: 0;
    // margin-top: 30px;
  }

  .ant-input-affix-wrapper {
    // 추가하기
    border-radius: 5px;
  }
`;

const CardWrapper = styled(Card)`
  border-radius: 12px;
`;

const ListWrapper = styled(List)`
  width: 400px;
  // padding: 0 6px;
  max-height: 600px;
  overflow: auto;

  .ant-list-item:hover {
    background: #f0f0f0;
  }

  .ant-list-item {
    height: 70px;
    padding: 0 10px;

    p {
      margin: 0;
    }

    .ant-avatar {
      width: 45px;
      height: 45px;
      //   position: relative;
      //   top: 1px;
    }
  }

  .ant-list-split .ant-list-item:last-child {
    border-bottom: 1px solid #f0f0f0 !important;
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

const TitleDiv = styled.div`
  display: block;
  text-align: left;
  border-bottom: solid 1px #dadde1;
  padding: 10px 15px 9px 15px;

  div {
    margin-bottom: 0;
    font-size: 22px;
  }

  span {
    font-size: 15px;
    color: #606770;
  }
`;
