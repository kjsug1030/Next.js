import React, { useState, useRef, useCallback } from "react";
import { Avatar, Card, Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";

const profileEdit = () => {
  const { me } = useSelector((state) => state.user);

  const [form] = Form.useForm();

  return (
    <Container>
      <Card>
        <ImageDiv>
          <Avatar size={40} icon={<UserOutlined />} />
          <div>
            <p>{me.name}</p>
            <a>프로필 사진 바꾸기</a>
          </div>
        </ImageDiv>
        <Form>
          <FormDiv>
            <TextDiv>이름</TextDiv>
            <Input value={me.name} />
          </FormDiv>
          <FormDiv>
            <TextDiv>이메일</TextDiv>
            <Input value={me.email} />
          </FormDiv>
          <FormDiv>
            <TextDiv>소개</TextDiv>
            <Input value={me.introduce} />
          </FormDiv>
          <FormDiv>
            <TextDiv>지역</TextDiv>
            <Input value={me.location} />
          </FormDiv>
          <FormDiv>
            <TextDiv>생일</TextDiv>
            <Input value={me.birth} />
          </FormDiv>

          <FormDiv>
            <TextDiv>성별</TextDiv>
            <Input value={me.sex} />
          </FormDiv>
          <FormDiv>
            <TextDiv>몸무게</TextDiv>
            <Input value={me.weight} />
          </FormDiv>

          <Button type="primary" htmlType="submit">
            제출
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default profileEdit;



const Container = styled.div`
  width: 600px;
  margin: 30px auto;

  .ant-card {
    width: 100%;
  }

  .ant-form {
    padding: 32px;
    margin: 0 auto;
  }
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .ant-avatar {
    margin-left: 32px;
    margin-right: 15px;
  }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  a {
    color: #0095f6;
  }
`;

const TextDiv = styled.p`
  display: inline-block;
  width: 15%;
  height: 32px;
  line-height: 32px;
  margin: 0;
  margin-right: 20px;
  text-align: right;
  // border: 1px solid grey;
  font-size: 16px;
  font-weight: 700px;
`;

const FormDiv = styled.div`
  display: flex;
  margin-bottom: 20px;

  .ant-input {
    // padding: 0;
    width: 300px;
    height: 32px;
  }
`;