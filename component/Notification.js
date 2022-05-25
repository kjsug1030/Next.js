import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Badge,
  Menu,
  Card,
  List,
  Avatar,
  Skeleton,
  Button,
  Modal,
} from "antd";
import { BellOutlined } from "@ant-design/icons/lib/icons";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
// import { useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";

import {
  LOAD_MY_INFO_REQUEST,
  USER_RATE_REQUEST,
  WEEKRECORD_REQUEST,
  WEEKRECORD_BIKE_REQUEST,
  WEATHER_REQUEST,
  PROGRESS_REQUEST,
  NOFICATION_SUCCESS,
  NOFICATION_REQUEST,
  FOLLOWING_REQUEST,
  NOFICATION_DELETE_REQUEST,
  CHECK_NOFICATION_REQUEST,
  READ_NOFICATION_REQUEST,
  READ_NOTIFICATION_REQUEST,
  NOTIFICATION_DELETE_REQUEST,
} from "../reducers/user";

const Notification = () => {
  const followAcceptSuccess = () => {
    Modal.success({
      content: "팔로우수락을 했습니다!",
    });
  };
  // const { notification } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("MM월DD일");
  };

  ////
  const { me, notification, notificationCheckCount } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log("asdasdasdasd", notification);
    console.log("adeqwewqew", notificationCheckCount);
  }, []);

  const dispatch = useDispatch();

  const followAccept = (id, noficationId) => {
    followAcceptSuccess();

    console.log("qwresadasd", id);
    dispatch({
      type: FOLLOWING_REQUEST,
      data: id,
    });
    dispatch({
      type: READ_NOTIFICATION_REQUEST,
      data: noficationId,
    });
  };

  const noficationDelete = (id) => {
    dispatch({
      type: NOTIFICATION_DELETE_REQUEST,
      data: id,
    });
  };

  const noficationRead = (id) => {
    dispatch({
      type: READ_NOTIFICATION_REQUEST,
      data: id,
    });
  };

  ///

  return (
    <Container>
      <Dropdown
        overlay={
          <CardWrapper>
            <ListWrapper
              className="list"
              dataSource={notification}
              renderItem={(v) => (
                <>
                  {v.read === 0 ? (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={v.profile} />}
                        description={
                          <div style={{ color: "black" }}>
                            <p>{v.not_message}.</p>{" "}
                            {moment(v.created_at).fromNow()}{" "}
                            {v.not_type === "followRequest" ? (
                              <Button
                                type="primary"
                                size="small"
                                primary
                                onClick={() =>
                                  followAccept(v.target_mem_id, v.not_id)
                                }
                              >
                                요청수락
                              </Button>
                            ) : null}
                            <Button
                              size="small"
                              danger
                              onClick={() => noficationDelete(v.not_id)}
                              style={{ marginLeft: 3 }}
                            >
                              삭제
                            </Button>
                            <Button
                              size="small"
                              onClick={() => noficationRead(v.not_id)}
                              style={{ marginLeft: 3 }}
                            >
                              확인하기
                            </Button>
                          </div>
                        }
                      />
                    </List.Item>
                  ) : (
                    <List.Item
                      style={{ background: "#f2f7fe" }} // 읽음처리
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={v.profile} />}
                        description={
                          <div>
                            <p>{v.not_message}.</p>{" "}
                            {moment(v.created_at).fromNow()}{" "}
                            {v.not_type === "followRequest" ? (
                              <Button
                                type="primary"
                                size="small"
                                primary
                                onClick={() =>
                                  followAccept(v.target_mem_id, v.not_id)
                                }
                              >
                                요청수락
                              </Button>
                            ) : null}
                            <Button
                              size="small"
                              danger
                              onClick={() => noficationDelete(v.not_id)}
                              style={{ marginLeft: 3 }}
                            >
                              삭제
                            </Button>
                            <Button
                              size="small"
                              onClick={() => noficationRead(v.not_id)}
                              style={{ marginLeft: 3 }}
                            >
                              확인하기
                            </Button>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                </>
              )}
            />
          </CardWrapper>
        }
      >
        <Badge count={notificationCheckCount} className="noti" size="small">
          <a>
            <BellOutlined className="icon" />
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
  overflow: auto;

  .ant-list-item:hover {
    background: #f0f0f0;
  }

  .ant-list-item {
    height: 70px;
    padding: 0 8px;

    .ant-avatar {
      margin-top: 3px;
      margin-left: 5px;
      width: 40px;
      height: 40px;
    }
  }

  p {
    margin: 0 !important;
  }
`;
