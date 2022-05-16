import React from "react";
import { Card, Avatar, Image, Badge, List } from "antd";
import { MdCircle } from "react-icons/md";
import styled from "styled-components";

function Guild() {
  const user = [
    {
      userId: 1,
      userName: "동영",
      userImage: "",
      location: "대구",
    },
    {
      userId: 2,
      userName: "재현",
      userImage: "",
      location: "대구",
    },
    {
      userId: 3,
      userName: "현종",
      userImage: "",
      location: "대구",
    },
    {
      userId: 4,
      userName: "새별",
      userImage: "",
      location: "대구",
    },
    {
      userId: 5,
      userName: "세준",
      userImage: "",
      location: "대구",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
      location: "대구",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
      location: "대구",
    },
    {
      userId: 6,
      userName: "대영",
      userImage: "",
      location: "대구",
    },
  ];
  return (
    <CardWrapper>
      {/* <span className="title">Follower</span> */}
      <div className="container">
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={user}
          renderItem={(v) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge dot color={"green"}>
                    <Avatar
                      className="avatar1"
                      src="https://joeschmoe.io/api/v1/random"

                      // style={{ width: 50 }}
                    />
                  </Badge>
                }
                title={<a>{v.userName}</a>}
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
    padding: 0 12px;
  }

  .ant-list-item-meta {
    position: relative;

    .ant-list-item-meta-avatar {
      position: relative;
      top: 7px;
    }
  }
`;
