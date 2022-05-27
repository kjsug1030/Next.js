import React, { useState, useCallback } from "react";
import {
  Card,
  Button,
  Avatar,
  Descriptions,
  List,
  Comment,
  Row,
  Col,
  Badge,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  COMMENT_DELETE_REQUEST,
  LOAD_COMMENT_REQUEST,
  LIKE_REQUEST,
  UNLIKE_REQUEST,
} from "../../reducers/post";

import {
  HeartTwoTone,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import CommentForm from "../CommentForm";
import moment from "moment";
import ImageCarousel from "../../component/ImageCarousel";
import "moment/locale/ko";

const FollowerPost = ({ post, user }) => {
  const { me } = useSelector((state) => state.user);
  const { comment, likeRequest } = useSelector((state) => state.post);
  // const { like, setLike } = useState(post.likes.length);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();
  const commentDelete = (id) => {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      data: id,
    });
  };

  const onToggleLike = (post) => {
    setLiked((prev) => !prev);
    console.log("likeCheck", post.likeCheck);
    dispatch({
      type: LIKE_REQUEST,
      data: post.id,
    });
  };

  const onToggleComment = (id) => {
    setCommentFormOpened((prev) => !prev);
    if (commentFormOpened === false) {
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: id,
      });
    }
  };

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("MM월DD일");
  };

  return (
    <Container>
      <Badge.Ribbon text={moment(post.created_at).fromNow()} color="#467ada">
        <Card
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 20,
            marginBottom: "20px !important",
          }}
          hoverable
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ImageCarousel post={post} />
            </Col>

            <Col span={12}>
              <RightCol>
                <Card.Meta
                  style={{ position: "relative" }}
                  avatar={
                    <Avatar className="card1" size={40} src={user.profile}>
                      {user.name}
                    </Avatar>
                  }
                />

                <TitleDiv>
                  <a style={{ bottom: 30, fontSize: 20, position: "relative" }}>
                    {user.name}
                  </a>
                  <br />
                </TitleDiv>
                <SpaceDiv
                  style={{
                    border: "1px solid #e9e9e9",
                  }}
                  className="space"
                >
                  <p>제목 : {post.title}</p>
                  <p>평균속도 : {post.average_speed.toFixed(2)} km/h</p>
                  <p>운동거리 : {post.distance} km</p>
                  <p>소모 칼로리 : {post.calorie} cal</p>
                </SpaceDiv>
                <HashTag>
                  {post.event === "R" ? <a>#Running</a> : <a>#Ridding</a>}
                  <br />
                </HashTag>
                <DescriptionWrapper>
                  <Descriptions.Item>{post.content}</Descriptions.Item>
                </DescriptionWrapper>
                <SecondBtnDiv>
                  <Button
                    style={{
                      width: 160,
                      marginLeft: 10,
                      borderRadius: 15,
                    }}
                    onClick={() => onToggleLike(post)}
                  >
                    {post.likeCheck ? (
                      <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
                    ) : (
                      <HeartOutlined
                        key="heart"
                        onClick={() => onToggleComment(post.id)}
                      />
                    )}
                    Like {post.likes.length}
                  </Button>
                  <Button
                    style={{ width: 160, marginLeft: 10, borderRadius: 15 }}
                    onClick={() => onToggleComment(post.id)}
                  >
                    <CommentOutlined />
                    comment
                  </Button>
                </SecondBtnDiv>
              </RightCol>
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
      {commentFormOpened && (
        <>
          <CommentForm comment={comment} postId={post.id} />
          <List
            header={`${comment.length} 댓글`}
            itemLayout="horizontal"
            dataSource={comment}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.user.name}
                  avatar={
                    <a>
                      <Avatar>{item.user.name[0]}</Avatar>
                    </a>
                  }
                  content={item.content}
                />
                {me.id === item.user_id ? (
                  <Button type="danger" onClick={() => commentDelete(item.id)}>
                    삭제
                  </Button>
                ) : null}
              </li>
            )}
          />
        </>
      )}
    </Container>
  );
};

export default FollowerPost;

const SpaceDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 16vh;
  // height: 20vh;
  // margin-top: 20px;
`;

const Container = styled.div`
  max-width: 800px;
  // height: 450px;

  text-align: center;
  margin-bottom: 50px;

  .ant-card {
    width: 100%;
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 10%) !important;
    border-top-left-radius: 0 !important;
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
    cursor: default !important;
  }

  .ant-card-body {
    padding: 0;
  }

  .ant-card-meta {
    padding: 12px 12px 0 12px;
  }

  .ant-card-meta-description {
    position: absolute;
    top: 20px;
    right: 16px;
  }

  .ant-ribbon {
    top: 33px;
  }

  .ant-btn {
    // border: 1px solid #467ada !important;
  }

  img {
    border-radius: 16px;
  }

  .imgimg {
    width: 100%;
  }

  .ant-btn:hover,
  .ant-btn:focus {
    color: #467ada;
  }
`;

const TitleDiv = styled.div`
  display: flex;
`;

const SecondBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const DescriptionWrapper = styled(Descriptions)`
  padding-left: 12px;
  .ant-descriptions-header {
    margin: 0;
  }

  .ant-descriptions-item {
    padding-bottom: 0;
  }
`;

const HashTag = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 12px;
  // margin-top: 5px;
  margin-top: 10px;
  a {
    margin-right: 5px;
    color: #1890ff;
  }
`;

const RightCol = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;

  position: relative;

  .card1 {
    position: relative;
    top: 4px;
  }

  .ant-btn {
    width: 100% !important;
  }

  .space {
    p {
      text-align: left;
      font-size: 14px;
      // margin-top: 1px;
      padding-left: 20px;
    }
  }
`;

const ImageCarouselWrapper = styled(ImageCarousel)`
  img {
    height: 400px;
  }
`;
