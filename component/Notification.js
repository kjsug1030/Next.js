import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Badge,
  Menu,
  Card,
  List,
  Avatar,
  Skeleton,
  Steps,
} from "antd";
import { BellOutlined } from "@ant-design/icons/lib/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, NOTIFICATION_REQUEST } from "../reducers/user";
import { useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
const { Step } = Steps;

const Notification = () => {
  const { notification } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("MM월DD일");
  };

  const [noti, setNoti] = useState([
    {
      not_id: 1,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "follow",
      not_message: "ヨン君님이 회원님을 팔로우 하기 시작했습니다",
      read: 1,
      created_at: "2022-05-02T04:31:09.000000Z",
      updated_at: "2022-05-02T04:31:09.000000Z",
    },
    {
      not_id: 2,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "like",
      not_message: "ヨン君님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 0,
      created_at: "2022-05-02T04:32:03.000000Z",
      updated_at: "2022-05-02T04:32:03.000000Z",
    },
    {
      not_id: 3,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "comment",
      not_message: "서민성님이 댓글을 남겼습니다: 민성이 댓글입니다",
      read: 0,
      created_at: "2022-05-02T04:36:35.000000Z",
      updated_at: "2022-05-02T04:36:35.000000Z",
    },
    {
      not_id: 4,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "like",
      not_message: "서민성님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 1,
      created_at: "2022-05-02T04:39:22.000000Z",
      updated_at: "2022-05-02T04:39:22.000000Z",
    },
    {
      not_id: 1,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "follow",
      not_message: "ヨン君님이 회원님을 팔로우 하기 시작했습니다",
      read: 1,
      created_at: "2022-05-02T04:31:09.000000Z",
      updated_at: "2022-05-02T04:31:09.000000Z",
    },
    {
      not_id: 2,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "like",
      not_message: "ヨン君님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 0,
      created_at: "2022-05-02T04:32:03.000000Z",
      updated_at: "2022-05-02T04:32:03.000000Z",
    },
    {
      not_id: 3,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "comment",
      not_message: "서민성님이 댓글을 남겼습니다: 민성이 댓글입니다",
      read: 0,
      created_at: "2022-05-02T04:36:35.000000Z",
      updated_at: "2022-05-02T04:36:35.000000Z",
    },
    {
      not_id: 4,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "like",
      not_message: "서민성님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 1,
      created_at: "2022-05-02T04:39:22.000000Z",
      updated_at: "2022-05-02T04:39:22.000000Z",
    },
    {
      not_id: 1,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "follow",
      not_message: "ヨン君님이 회원님을 팔로우 하기 시작했습니다",
      read: 1,
      created_at: "2022-05-02T04:31:09.000000Z",
      updated_at: "2022-05-02T04:31:09.000000Z",
    },
    {
      not_id: 2,
      mem_id: 2,
      target_mem_id: 3,
      not_type: "like",
      not_message: "ヨン君님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 0,
      created_at: "2022-05-02T04:32:03.000000Z",
      updated_at: "2022-05-02T04:32:03.000000Z",
    },
    {
      not_id: 3,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "comment",
      not_message: "서민성님이 댓글을 남겼습니다: 민성이 댓글입니다",
      read: 0,
      created_at: "2022-05-02T04:36:35.000000Z",
      updated_at: "2022-05-02T04:36:35.000000Z",
    },
    {
      not_id: 4,
      mem_id: 2,
      target_mem_id: 1,
      not_type: "like",
      not_message: "서민성님이 회원님의폼데이터테스트 게시물을 좋아합니다",
      read: 1,
      created_at: "2022-05-02T04:39:22.000000Z",
      updated_at: "2022-05-02T04:39:22.000000Z",
    },
  ]);

  return (
    <Container>
      <Dropdown
        overlay={
          <CardWrapper>
            <ListWrapper
              className="list"
              dataSource={noti}
              renderItem={(v) => (
                <>
                  {v.read === 0 ? (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        description={
                          <div style={{ color: "black" }}>
                            {v.not_message}. {moment(v.created_at).fromNow()}
                          </div>
                        }
                      />
                    </List.Item>
                  ) : (
                    <List.Item
                      style={{ background: "#f2f7fe" }} // 읽음처리
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        description={
                          <>
                            {v.not_message}. {moment(v.created_at).fromNow()}
                          </>
                        }
                      />
                    </List.Item>
                  )}
                </>
              )}
            />
            {/* <ListWrapper>
              <List.Item className="delete_list">
                <List.Item.Meta
                  onClick={deleteNotification}
                  description="전부읽고 삭제하기"
                />
              </List.Item>
            </ListWrapper> */}
          </CardWrapper>
        }
      >
        <Badge count={noti.length} className="noti" size="small">
          <a>
            <BellOutlined className="icon" />
            {/* <img
              // src="https://cdn-icons-png.flaticon.com/512/2571/2571000.png"
              // src="https://cdn-icons-png.flaticon.com/512/2569/2569963.png"
              src="https://cdn-icons-png.flaticon.com/512/6816/6816519.png"
              style={{ width: 35, height: 35 }}
            /> */}
          </a>
        </Badge>
      </Dropdown>
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  display: inline-block;

  // .ant-list-item:hover {
  //   background: black;
  // }

  // .ant-card {
  //   background: black;
  // }

  transition: all 0.8s !important;

  .icon {
    &:hover {
      // background: red;
    }
  }
`;

const CardWrapper = styled(Card)`
  border-radius: 12px;
`;

const ListWrapper = styled(List)`
  width: 400px;
  // padding: 0 6px;
  max-height: 600px;
  // overflow-y: scroll;
  overflow: auto;

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
