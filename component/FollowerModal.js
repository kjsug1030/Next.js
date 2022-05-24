import React from "react";
import styled from "styled-components";
import { Modal, List, Avatar, Button } from "antd";
import { useSelector } from "react-redux";

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

                  <a href={"User/" + v.id}>
                    {/* user profile 페이지에서만 User/user/1처럼 경로가 겹처서 적용안됨 */}
                    <Button className="profile_btn">프로필</Button>
                  </a>
                </>
              }
            />
          </List.Item>
        )}
      />
    </ModalWrapper>
  );
};

export default FollowerModal;

const ModalWrapper = styled(Modal)`
  position: relative;

  .ant-modal-content {
    width: 400px;
    height: 450px;
    margin: 0 auto;
    border-radius: 15px;
    position: relative;
    top: 100px;
  }
  .ant-modal-header {
    border-radius: 15px;
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-btn {
    width: 80px;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }

  .profile_btn {
    // background: #467ada;
    // border: 1px solid #467ada;
    // color: #fff;
  }
`;

const ListWrapper = styled(List)`
  width: 400px;
  max-height: 450px;
  overflow: auto;

  .ant-list-item:hover {
    background: #f0f0f0;
  }

  .ant-list-item {
    height: 70px;
    padding: 0 10px;
    position: relative;

    p {
      margin: 0;
    }

    .ant-avatar {
      width: 45px;
      height: 45px;
    }
  }

  .ant-list-item:last-child {
    border-bottom: 1px solid #f0f0f0 !important;
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
`;
