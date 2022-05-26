import React from "react";
import { Card, Avatar, Image, Badge, List } from "antd";
import { MdCircle } from "react-icons/md";
import styled from "styled-components";

function Guild({ follower }) {
  return (
    <CardWrapper>
      {/* <span className="title">Follower</span> */}
      <div className="container">
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={follower}
          renderItem={(v) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  // <Badge dot color={"green"}>
                  <Avatar
                    className="avatar1"
                    src={v.profile}

                    // style={{ width: 50 }}
                  />
                  // </Badge>
                }
                title={<a>{v.name}</a>}
                description={v.location}
              />
            </List.Item>
          )}
        />
      </div>
    </CardWrapper>
  );
}

export default Guild;

const CardWrapper = styled(Card)`
  position: relative;
  width: 260px;
  height: 534px;
  border-radius: 30px;
  border-top-left-radius: 0;
  // border-top-right-radius: 0px;
  overflow-y: scroll;
  scrollbar-width: none;

  .ant-card-body {
    padding: 0;
  }

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    // padding: 0 6px;
  }

  .ant-list-item-meta {
    position: relative;

    .ant-list-item-meta-avatar {
      position: relative;
      top: 1px;
    }
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
