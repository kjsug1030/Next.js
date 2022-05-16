import React from "react";
import { PageHeader, Tag } from "antd";
import styled from "styled-components";

const Intro = () => {
  return (
    <Container
      style={{
        width: "100%",
        marginLeft: "5px",
      }}
    >
      <PageHeader
        title="좋아하는 종목"
        // className="site-page-header"
        // subTitle="좋아하는 종목"
        tags={<Tag color="blue">Running</Tag>}
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        style={{
          marginRight: 0,
          paddingLeft: "5px",
          padding: 0,
          fontWeight: "bold",
        }}
      />
    </Container>
  );
};

export default Intro;

const Container = styled.div`
  .ant-page-header-heading-title {
    overflow: visible !important;
    text-overflow: string !important;
  }
`;