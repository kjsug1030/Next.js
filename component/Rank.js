import React from "react";
import { Card, Avatar, Button, Image, Badge, Form, Row, Col } from "antd";
import { MdCircle } from "react-icons/md";
import axios from "axios";
import styled from "styled-components";
import index from "../pages";

function Rank() {
  const { Meta } = Card;
  const user = [
    {
      userId: 2,
      userName: "재현",
      userImage: "//joeschmoe.io/api/v1/jed",
      mmr: 123,
    },
    {
      userId: 3,
      userName: "현종",
      userImage: "//joeschmoe.io/api/v1/jon",
      mmr: 100,
    },
    {
      userId: 4,
      userName: "새별",
      userImage: "//joeschmoe.io/api/v1/jess",
      mmr: 30,
    },
  ];
  const my = {
    userId: 1,
    userName: "동영",
    userImage: "//joeschmoe.io/api/v1/josh",
    mmr: 20,
  };
  const server = () => {
    axios
      .post(`https://2yubi.shop/api/logout`)
      .then((res) => {
        console.log("donggg", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {/* <Button onClick={server}>로그아웃</Button> */}
      <Row gutter={[16, 16]}>
        {user.map((v, index) => (
          <Col span={6}>
            <a>{index + 1}위</a>
            <Card
              hoverable
              style={{
                width: "100%",
                height: 200,
                borderRadius: 30,
                // marginRight: 30,
              }}
              cover={
                <Image
                  src={v.userImage}
                  style={{
                    width: 110,
                    // margin: "0 auto",
                  }}
                />
              }
            >
              <Meta title={v.userName} description={v.mmr} />
            </Card>
          </Col>
        ))}
        <Col span={6}>
          {/* <p>35위</p> */}
          <h1
            style={{
              position: "absolute",
              top: "-25px",
              left: "42%",
              margin: 0,
              textAlign: "center",
              zIndex: 1,
              fontWeight: "bold",
              // fontSize: 22,
            }}
          >
            Me
          </h1>
          <Card
            hoverable
            style={{
              width: "100%",
              height: 200,
              borderRadius: 30,
              // marginLeft: 20,
              textAlign: "center",
              border: "2px solid  #1890ff",
            }}
            cover={
              <Image
                src={my.userImage}
                style={{
                  width: 120,
                }}
              />
            }
          >
            <Meta title={my.userName} description={my.mmr} />
          </Card>
          {/* <img
            src="cursor.png"
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              right: "3px",
              bottom: "5px",
              zIndex: 1,
            }}
          /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Rank;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  padding-right: 13px;
  // border: 1px solid grey;

  .ant-image {
    text-align: center;
  }

  a {
    padding-left: 7px;
  }
`;
