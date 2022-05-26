import React, { useState, useRef } from "react";
import { Avatar, Card, Form, Input, Button, Drawer, Space, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, PROFILE_EDIT_REQUEST } from "../reducers/user";
import { useRouter } from "next/router";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const profileEdit = ({ visible, showEditProfile }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { me } = useSelector((state) => state.user);

  // const [birthClick, setBirthClick] = useState(false);

  const dispatch = useDispatch();

  const image =
    "https://run-images.s3.ap-northeast-2.amazonaws.com/image/WICAMdVvnDh2zVMEDIeZzxGzHA8oNb2OS0RzM8dO.png";

  const fileInput = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [imgBase64, setImgBase64] = useState("");
  const [profileImage, setProfileImage] = useState({
    file: me.profile,
    imageURL: "",
  });

  const saveProfileImage = (e) => {
    e.preventDefault;

    let reader = new FileReader();

    let file = e.target.files[0];

    reader.onloadend = () => {
      setProfileImage({ file: file, imageURL: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 파일 삭제
  const deleteProfileImage = () => {
    setProfileImage({ file: image, imageURL: "" });

    fileInput.current.value = "";

    console.log(profileImage.file);

    // let reader = new FileReader();

    // let file = "user.png";

    // reader.onloadend = () => {
    //   setProfileImage({ file: file, imageURL: reader.result });
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  const [sex, setSex] = useState(me.sex);

  const onChangeSex = (v) => {
    setSex(v);
  };

  // const year = "" + me.birth.substring(0, 4);
  // const month = "" + me.birth.substring(5, 7);
  // const day = "" + me.birth.substring(8, 10);

  const year = me.birth ? me.birth.substring(0, 4) : "";
  const month = me.birth ? me.birth.substring(5, 7) : "";
  const day = me.birth ? me.birth.substring(8, 10) : "";

  const [birth, setBirth] = useState({
    year: year,
    month: month,
    day: day,
  });

  const now = new Date();

  const years = [];

  for (let i = now.getFullYear(); i > 1900; i--) {
    years.push(i);
  }

  const months = [];

  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      months.push("0" + i.toString());
    } else {
      months.push(i.toString());
    }
  }

  const days = [];

  for (let i = 1; i <= 31; i++) {
    if (i < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      days.push("0" + i.toString());
    } else {
      days.push(i.toString());
    }
  }

  const onChangeYear = (date) => {
    // const dateString = moment(date).format("YYYY");
    setBirth({ ...birth, year: date });

    console.log(birth.year);
  };

  const onChangeMonth = (e) => {
    setBirth({ ...birth, month: e });
    console.log(birth.month);
  };

  const onChangeDay = (e) => {
    setBirth({ ...birth, day: e });
    console.log(birth.day);
  };

  const [profile, setProfile] = useState({
    name: me.name,
    weight: me.weight,
    email: me.email,
    introduce: me.introduce,
    location: me.location,
    birth: birth,
    sex: sex,
  });

  const { name, weight, introduce, location, email } = profile; // 비구조화 할당을 통해 값 추출

  const onChangeProfile = (e) => {
    const { value, name } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const onReset = () => {
    setProfileImage({ file: me.profile, imageURL: "" });
    setProfile({
      name: me.name,
      email: me.email,
      weight: me.weight,
      introduce: me.introduce,
      location: me.location,
      birth: me.birth,
      sex: sex,
    });
  };

  const timer = () => {
    // const timer = setTimeout(() => {
    setIsLoading(false);
    // window.location.reload(); // 현재 페이지 새로고침
    // }, 2000);
    return () => clearTimeout(timer);
  };

  const onSubmit = async (e) => {
    e.preventDefault;

    // const body = {
    //   name: me.name,
    //   email: me.email,
    //   weight: me.weight,
    //   introduce: me.introduce,
    //   location: me.location,
    //   birth: birth.year + "-" + birth.month + "-" + birth.day,
    //   sex: sex,
    // };

    setIsLoading(true);

    const formData = new FormData();
    formData.append("profile", profileImage.file); // 프로필사진
    formData.append("name", name);
    formData.append("email", email);
    formData.append("weight", weight);
    formData.append("introduce", introduce);
    formData.append("location", location);
    formData.append("birth", birth.year + "-" + birth.month + "-" + birth.day);
    formData.append("sex", sex);

    dispatch({
      type: PROFILE_EDIT_REQUEST,
      data: formData,
    });

    window.location.reload();
    // window.location.href = "/";

    // console.log(body);
  };

  return (
    <div>
      <Drawer
        title="내 정보"
        placement="right"
        size="large"
        width={450}
        onClose={showEditProfile}
        visible={visible}
        extra={
          <Space>
            <Button
              onClick={() => {
                showEditProfile(), onReset();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={showEditProfile}>
              OK
            </Button>
          </Space>
        }
      >
        <Container>
          <ColorCard hoverable />
          <Card className="editCard" hoverable>
            {/* <FormWrapper>
              <Form onFinish={onSubmit}> */}
            <AvatarTag
              size={125}
              src={
                profileImage.imageURL
                  ? profileImage.imageURL
                  : profileImage.file
              }
              // src={profileImage.imageURL}
              icon={<UserOutlined />}
              style={{ background: "#fff" }}
            />
            <ImageDiv>
              <input
                name="profile"
                type="file"
                accept="image/*"
                onChange={saveProfileImage}
                ref={fileInput}
              />
              <a className="a2" onClick={() => deleteProfileImage()}>
                삭제
              </a>
            </ImageDiv>
            <FormWrapper>
              <Form
                onFinish={onSubmit}
                form={form}
                encType="multipart/form-data"
              >
                <FormDiv>
                  <TextDiv>이름</TextDiv>
                  <Input
                    name="name"
                    value={name}
                    onChange={onChangeProfile}
                    placeholder="이름을 입력해주세요"
                  />
                </FormDiv>
                <FormDiv>
                  <TextDiv>이메일</TextDiv>
                  <Input
                    name="email"
                    value={email}
                    onChange={onChangeProfile}
                  />
                </FormDiv>
                <FormDiv>
                  <TextDiv>소개</TextDiv>
                  <Input
                    name="introduce"
                    value={introduce}
                    onChange={onChangeProfile}
                    placeholder="자기소개를 입력해주세요"
                  />
                </FormDiv>
                <FormDiv>
                  <TextDiv>지역</TextDiv>
                  <Input
                    name="location"
                    value={location}
                    onChange={onChangeProfile}
                    placeholder="지역을 입력해주세요"
                  />
                </FormDiv>
                <FormDiv>
                  <TextDiv>생일</TextDiv>
                  {/* <Input name="birth" value={birth} onChange={onChangeBirth} /> */}
                  <SpaceWrapper>
                    <Select
                      name="year"
                      placeholder="년도"
                      value={birth.year}
                      onChange={onChangeYear}
                    >
                      {years.map((years) => (
                        <Option key={years}>{years}</Option>
                      ))}
                    </Select>

                    <Select
                      name="month"
                      placeholder="월"
                      value={birth.month}
                      onChange={onChangeMonth}
                    >
                      {months.map((month, index) => (
                        <Option key={`${index + 1}`}>{month}</Option>
                      ))}
                    </Select>
                    <Select
                      name="day"
                      placeholder="일"
                      value={birth.day}
                      onChange={onChangeDay}
                    >
                      {days.map((day, index) => (
                        <Option key={`${index + 1}`}>{day}</Option>
                      ))}
                    </Select>
                  </SpaceWrapper>
                </FormDiv>
                <FormDiv>
                  <TextDiv>성별</TextDiv>
                  {/* <Input name="sex" value={me.sex} /> */}
                  <Select
                    placeholder="성별"
                    value={sex}
                    onChange={onChangeSex}
                    style={{ width: 300 }}
                  >
                    <Option value="F">여성</Option>
                    <Option value="M">남성</Option>
                    <Option value="T">트랜스젠더</Option>
                    <Option value="N">알리고 싶지 않음</Option>
                  </Select>
                </FormDiv>
                <FormDiv>
                  <TextDiv>몸무게</TextDiv>
                  <Input
                    name="weight"
                    value={weight}
                    onChange={onChangeProfile}
                    placeholder="몸무게를 입력해주세요"
                  />
                </FormDiv>
                <Button
                  className="btn1"
                  type="primary"
                  htmlType="submit"
                  onClick={(showEditProfile, timer)}
                  // onClick={showEditProfile}
                  loading={isLoading}
                >
                  제출
                </Button>
              </Form>
            </FormWrapper>
          </Card>
        </Container>
      </Drawer>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const { ctx } = context;
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default profileEdit;

const Container = styled.div`
  // margin-top: 100px;
  display: inline-block;
  width: 100%;
  max-width: 400px;
  height: 480px;
  // border: 1px solid grey;
  // overflow: auto;

  // padding: 2% 18%;
  padding-top: 0;

  .ant-card {
    width: 100%;
    // box-shadow: none !important;
  }

  .editCard {
    // .ant-card {
    // border-radius: 30px;

    border-bottom-left-radius: 30px !important;
    border-bottom-right-radius: 30px !important;
    // }
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
    padding-left: 20px;
    margin: 15px 0;
  }

  .ant-card {
    // max-width: 400px;
    // height: 480px;
  }

  .ant-card-body {
    padding: 0;
  }

  .ant-btn-primary {
    background: #467ada;
    border: 1px solid #467ada;
  }
`;

const ColorCard = styled(Card)`
  display: inline-block;
  background: #467ada;
  height: 90px !important;

  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0 !important;

  .ant-card {
    width: 100%;
  }
`;

const FormWrapper = styled.div`
  height: 90%;
  padding: 2%;
  margin-top: 15px;

  .btn1 {
    float: right;
    margin-right: 6px;
    margin-bottom: 16px;
  }
`;

const AvatarTag = styled(Avatar)`
  position: absolute;
  top: -70px;
  left: 50px;
`;

const ImageDiv = styled.div`
  display: inline-block;
  width: 100%;
  align-items: center;
  padding-left: 200px;
  padding-top: 15px;
  text-align: left;
  margin-bottom: 10px;

  // .ant-avatar {
  //   margin-left: 32px;
  //   margin-right: 15px;
  // }

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  a {
    color: #0095f6;
    position: relative;
    top: 5px;
  }

  .a2 {
    color: black;
  }

  // input {
  //   display: none;
  // }
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

const SpaceWrapper = styled(Space)`
  .ant-picker {
    width: 94.6px;
    border-radius: 5px !important;
  }

  .ant-select-single {
    width: 94.6px;
    border-radius: 5px;
    // color: rgba(0, 0, 0, 0.4);
  }

  .ant-select-selector {
    border-radius: 5px !important;
  }
`;
