import React from "react";
import { Card, Avatar, Image, Badge, Form } from "antd";
import { MdCircle } from "react-icons/md";
import MyPurpose from "./myPurpose";
import styled from "styled-components";

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

  return (
    <Container>
      <Card
        hoverable
        style={{
          backgroundColor: "#6fa0ed",
          width: "97%",
          height: 170,
          borderRadius: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
        }}
        // cover={<Image src={v.userImage} style={{ width: 110, marginLeft:45 }} />}
      >
        <MyPurpose></MyPurpose>
        {/* <Meta title={v.userName} description={v.mmr} /> */}
      </Card>

      <Card
        hoverable
        style={{
          backgroundColor: "#1890ff",
          width: "97%",
          height: 170,
          borderRadius: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
        }}
        // cover={<Image src={v.userImage} style={{ width: 110, marginLeft:45 }} />}
      >
        {/* <Meta title={v.userName} description={v.mmr} /> */}
        <MyPurpose></MyPurpose>
      </Card>

      <Card
        hoverable
        style={{
          backgroundColor: "#1062e6",
          width: "97%",
          height: 170,
          borderRadius: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 10,
        }}
        // cover={<Image src={v.userImage} style={{ width: 110, marginLeft:45 }} />}
      >
        {/* <Meta title={v.userName} description={v.mmr} /> */}
        <MyPurpose></MyPurpose>
      </Card>
    </Container>
  );
}

export default Rank;

const Container = styled.div`
  width: 100%;
`;