import React, { useState, useEffect } from "react";
import { Dropdown, Badge, Menu, Card, List, Avatar, Skeleton } from "antd";
import { BellOutlined } from "@ant-design/icons/lib/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, NOTIFICATION_REQUEST } from "../reducers/user";
import { useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

const Notification = () => {
  const { notification } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("MM월DD일");
  };

  return (
    <>
      <Dropdown
        overlay={
          <CardWrapper>
            <ListWrapper
              className="list"
              dataSource={notification.data}
              renderItem={(v) => (
                <>
                  {v.read === 0 ? (
                    <List.Item>
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
                  ) : (
                    <List.Item
                      style={{ background: "#f0f0f0" }} // 읽음처리
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
            <ListWrapper>
              <List.Item className="delete_list">
                <List.Item.Meta
                  onClick={deleteNotification}
                  description="전부읽고 삭제하기"
                />
              </List.Item>
            </ListWrapper>
          </CardWrapper>
        }
      >
        <Badge count={notification.data.length} className="noti" size="small">
          <a>
            <BellOutlined />
          </a>
        </Badge>
      </Dropdown>
    </>
  );
};

export default Notification;

const Container = styled.div`
  display: inline-block;

  .ant-list-item:hover {
    background: black;
  }

  .ant-card {
    background: black;
  }

  transition: all 0.8s !important;
`;

const CardWrapper = styled(Card)`
  border-radius: 12px;
`;

const ListWrapper = styled(List)`
  width: 400px;
  padding: 0 6px;

  .ant-list-item:hover {
    background: #f0f0f0;
  }

  .ant-list-item {
    // background-color: ${(props) => (props.read === 1 ? "none" : "#f0f0f0")};
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
