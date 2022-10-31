import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Button,
  Avatar,
  Descriptions,
  List,
  Comment,
  Row,
  Col,
  Empty,
  Carousel,
  Badge,
} from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  COMMENT_DELETE_REQUEST,
  LOAD_COMMENT_REQUEST,
  LIKE_REQUEST,
  UNLIKE_REQUEST,
} from "../reducers/post";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  CommentOutlined,
  StepForwardOutlined,
  TrophyTwoTone, // 추가한것
  TrophyOutlined, // 추가한것
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import CommentForm from "./CommentForm";
// import PostCardContent from './PostCardContent';
// import PostImages from './PostImages';
import FollowButton from "./FollowButton";
import postcss from "postcss";

import moment from "moment";

import ImageCarousel from "../component/ImageCarousel";
import "moment/locale/ko";
// import "moment/locale/jp";

const PostCard = ({ post, t }) => {
  const { me } = useSelector((state) => state.user);
  const { comment, likeRequest } = useSelector((state) => state.post);

  const { like, setLike } = useState(post.likes.length);

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
    return date.format(t("notification:date"));
    // return date.format("MM월DD일");
  };

  return (
    <Container>
      {/* <span className="title">Post</span> */}
      <Badge.Ribbon text={moment(post.created_at).fromNow()} color="#467ada">
        <Card
          // cover={post.Images[0] && <PostImages images={post.Images} />}
          style={{
            width: "100%",
            // height: "29vw",
            padding: "12px",
            borderRadius: 20,
            marginBottom: "20px !important",
            // marginLeft: 100,
          }}
          hoverable
        >
          <Row gutter={[16, 16]}>
            {/* {post.image && (
            <Col span={12}>
              <ImageCarousel post={post} />
            </Col>
          )} */}
            <Col span={12}>
              <ImageCarousel post={post} />
            </Col>

            <Col span={12}>
              <RightCol>
                <Card.Meta
                  style={{ position: "relative" }}
                  avatar={
                    <Avatar className="card1" size={40} src={post.user.profile}>
                      {post.user.name}
                    </Avatar>
                  }
                  // description={<div>{moment(post.created_at).fromNow()}</div>}
                />

                <TitleDiv>
                  <a style={{ bottom: 30, fontSize: 20, position: "relative" }}>
                    {post.user.name}
                  </a>
                  <br />
                </TitleDiv>
                <SpaceDiv
                  style={{
                    // height: 150,
                    border: "1px solid #e9e9e9",
                  }}
                  className="space"
                >
                  <p>
                    {t("notification:title")} : {post.title}
                  </p>
                  {/* <p>제목 : {post.title}</p> */}
                  {/* <p>내용 : {post.content}</p> */}

                  {/* 함께 달린 유저ID가 넘어오면 함께달린 유저도 표시 */}
                  {/* <p>내가 함께달린 유저ID : {post.opponent_id}</p> */}
                  <p>
                    {t("notification:speed")} : {post.average_speed} km/h
                  </p>
                  <p>
                    {t("notification:distance")} : {post.distance} km
                  </p>
                  <p>
                    {t("notification:calorie")} : {post.calorie} cal
                  </p>
                  {/* <p>평균속도 : {post.average_speed} km/h</p>
                  <p>운동거리 : {post.distance} km</p>
                  <p>소비 칼로리 : {post.calorie} cal</p> */}
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
                      <HeartOutlined key="heart" />
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
            // style={{ width: 500, marginLeft: 100 }}
            header={`${comment.length} comment`}
            // header={`${comment.length} 댓글`}
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
                    {t("notification:delete")}
                    {/* 삭제 */}
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

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
      })
    ),
    createdAt: PropTypes.object,
  }),
};

export default PostCard;

const SpaceDiv = styled.div`
  display: inline-block;
  width: 100%;
  height: 16vh;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 40px;

  .ant-card {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 10%) !important;
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
    cursor: default !important;
  }

  .ant-card-body {
    width: 100%;
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

  img {
    border-radius: 16px;
  }

  .imgimg {
    // object-fit: cover;
    width: 100%;
    // height: 100%;
  }
`;

const TitleDiv = styled.div`
  display: flex;
`;

const SecondBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  // margin-top: 10px;
  // margin-bottom: 10px !important;
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
  margin-top: 5px;
  a {
    margin-right: 5px;
    color: #1890ff;
  }
`;

const RightCol = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  // border: 1px solid grey;
  // padding-top: 20px;

  position: relative;

  .card1 {
    position: relative;
    top: 4px;
  }

  // .ant-card-description {
  //   top: 10px;
  // }

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

const DateDiv = styled.div`
  .ant-card {
    display: inline-block;
    width: 60px !important;
    height: 68px;
    background: #467ada;
    color: #fff;
    border-radius: 7px;
    float: left;

    box-shadow: none;
  }

  p {
    margin: 0;
  }

  .p1 {
    font-size: 20px;
  }

  .p2 {
    font-size: 26px;
    font-weight: bold;
    position: relative;
    bottom: 8px;
  }
`;
