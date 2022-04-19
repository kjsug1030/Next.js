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
  Empty,
  Carousel,
} from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

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

import ImageCarousel from "./imageCarousel";

// import ImageCarousel from "./imageCarousel ";
//
const dummyComments = [
  {
    User: {
      nickname: "nero",
    },
    content: "우와 개정판이 나왔군요~",
  },
  {
    User: {
      nickname: "hero",
    },
    content: "얼른 사고싶어요~",
  },
];

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mmr, setMmr] = useState(false);

  const onToggleMmr = () => {
    setMmr((prev) => !prev);
  };

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("MM월DD일");
  };

  
  return (
    <Container>
      <span className="title">Post</span>
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
          {/* <Col span={12}>
            <img
              className="imgimg"
              width={300}
              height={330}
              alt="지도사진"
              src={
                post.map_image[0]
                  ? post.map_image[0].url
                  : // : "https://cdn-icons.flaticon.com/png/512/5540/premium/5540531.png?token=exp=1650162938~hmac=72129843982ff4f18bebfb639ee9623d"
                    "https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
              }
            />
          </Col> */}
          <Col span={12}>
            <RightCol>
              <Card.Meta
                style={{ position: "relative" }}
                avatar={
                  <Avatar className="card1" size={40} src="kurumi.jpg">
                    {post.user.name}
                  </Avatar>
                }
                description={<div>{moment(post.created_at).fromNow()}</div>}
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
                  // border: "1px solid #e9e9e9",
                }}
              >
                <p>제목:{post.title}</p>
                <p>내용:{post.content}</p>
                <p>소모 칼로리 : {post.calorie}</p>
                {/* 함께 달린 유저ID가 넘어오면 함께달린 유저도 표시 */}
                {/* <p>내가 함께달린 유저ID : {post.opponent_id}</p> */}
                <p>평균속도 : {post.average_speed}</p>
                <p>뛴거리 :{post.distance}</p>

              </SpaceDiv>
              <HashTag>
                {/* <a>#라이딩</a>
                <a>#대회</a>
                <a>#골인</a> */}
                <br />
              </HashTag>
              <DescriptionWrapper>
                {/* <Descriptions.Item><h3>{post.content}</h3></Descriptions.Item> */}
              </DescriptionWrapper>
              <SecondBtnDiv>
                {/* <Button
                  style={{ width: 160, marginLeft: 10, borderRadius: 15 }}
                  onClick={onToggleMmr}
                >
                  {mmr ? (
                    <TrophyTwoTone twoToneColor="#eb2f" key="mmr" />
                  ) : (
                    <TrophyOutlined key="mmr" onClick={onToggleMmr} />
                  )}
                  MMR
                </Button> */}
                <Button
                  style={{
                    width: 160,
                    marginLeft: 10,
                    borderRadius: 15,
                  }}
                  onClick={onToggleLike}
                >
                  {liked ? (
                    <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
                  ) : (
                    <HeartOutlined key="heart" onClick={onToggleLike} />
                  )}
                  Like
                </Button>
                <Button
                  style={{ width: 160, marginLeft: 10, borderRadius: 15 }}
                  onClick={onToggleComment}
                >
                  <CommentOutlined />
                  comment
                </Button>
              </SecondBtnDiv>
            </RightCol>
          </Col>
        </Row>

        {/* <div>{post.content}</div> */}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            style={{ width: 500, marginLeft: 100 }}
            header={`${post.comment.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.comment}
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

  img {
    border-radius: 16px;
  }

  .imgimg {
    // object-fit: cover;
    width: 100%;
    // height: 100%;
  }

  .ant-btn {
    width: 100% !important;
  }

  .title {
    display: inline-block;
    width: 100%;
    max-width: 150px;
    height: 35px;
    line-height: 30px;
    text-align: left;
    background: #467ada;
    color: #fff;
    padding-left: 15px;
    font-size: 26px;
    font-weight: bold;
    clip-path: polygon(65% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    position: relative;
    right: 40%;
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

  .card1 {
    position: relative;
    top: 4px;
  }

  // .ant-card-description {
  //   top: 10px;
  // }
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