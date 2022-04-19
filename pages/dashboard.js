import React, { useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import dynamic from "next/dynamic";
import styled from "styled-components";
import {
  Layout,
  Card,
  Space,
  Avatar,
  Button,
  List,
  Calendar,
  Row,
  Col,
  Table,
  Tag,
  Modal,
} from "antd";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Link from "next/link";
import moment from "moment";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_CREATEMAP_REQUEST } from "../reducers/map";
import { DELETE_MYPOST_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const { Meta } = Card;
const { Column } = Table;

// useEffect(() => {
//   const fetchEvents = async () => {
//     const res = await axios.get(
//       "/api/"
//     );
//     makeData(res.data);
//   };
// }, [])

const dashboard = () => {
  const { weekRecord, userRate } = useSelector((state) => state.user);

  useEffect(() => {
    Modal.destroyAll();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [propsId, setPropsId] = useState();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const createLink = (data) => {
    setPropsId(data.gps_id);
  };

  useEffect(() => {
    if (propsId) {
      dispatch({
        type: LOAD_CREATEMAP_REQUEST,
        data: propsId,
      });

      Router.push({
        pathname: "/Create/[id]",
        query: { id: propsId },
      });
    }
  }, [propsId]);

  const recordDelete = (id) => {
    dispatch({
      type: DELETE_MYPOST_REQUEST,
      data: id,
    });
  };

  const deleteModal = () => {
    setIsModalVisible(true);
  };

  const cancel = () => {
    setIsModalVisible(false);
  };

  // const bar = {
  //   // 바 그래프 더미데이터
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: ["월", "화", "수", "목", "금", "토", "일"],
  //     },
  //     grid: { show: false },
  //   },
  //   series: [
  //     {
  //       name: "라이딩 km",
  //       data: [weekRecord.Mon, weekRecord.Tue, weekRecord.Wed, weekRecord.Tur, weekRecord.Fri,weekRecord.Sat,weekRecord.Sun],

  //     },
  //   ],
  // };

  // const pie = {
  //   // 파이 차트 더미데이터
  //   series: [userRate.R,userRate.B],
  //   chartOptions: {
  //     labels: ["러닝", "라이딩"],
  //     textAnchor: "middle",
  //     legend: {
  //       show: true,
  //       position: "bottom",
  //       horizontalAlign: "center",
  //     },
  //     plotOptions: {
  //       pie: {
  //         donut: {
  //           size: "40%",
  //         },
  //       },
  //     },
  //     colors: ["#0288D1", "#BBDEFB"],
  //     // "#1890ff"
  //   },
  // };

  const cardScore = [
    // 차트그래프 옆 카드 더미데이터
    {
      title: "총 운동 시간",
      distance: "9시간",
    },
    {
      title: "총 소모 칼로리",
      distance: "75",
    },
    {
      title: "최장 라이딩 거리",
      distance: "320km",
    },
    {
      title: "총 운동 거리",
      distance: "4500km",
    },
  ];

  const data = [
    {
      key: "1",
      kind: "라이딩",
      name: "6번 옥천교차로-> 오빈리",
      distance: 32,
      altitude: 4,
      time: "1:56",
      date: "2022-03-02",
    },
    {
      key: "2",
      kind: "라이딩",
      name: "두물머리",
      distance: 6.2,
      altitude: 12,
      time: "7:12",
      date: "2022-03-04",
    },
    {
      key: "3",
      kind: "라이딩",
      name: "구한시-수석교",
      distance: 2.07,
      altitude: 11,
      time: "2:35",
      date: "2022-03-05",
    },
  ];

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("YYYY년 MM월 DD일");
  };

  // const MapStyle = {
  //   width: "40vw",
  //   height: "60vh",
  //   borderRadius: "9px",
  // };

  const sortData = ["ascend", "descend", "ascend"];

  const [deleteBtn, setDeleteBtn] = useState(false);

  const onChangeDelete = () => {
    setDeleteBtn((prev) => !prev);
  };
  function timeChange(seconds) {
    //3항 연산자를 이용하여 10보다 작을 경우 0을 붙이도록 처리 하였다.
    var hour =
      parseInt(seconds / 3600) < 10
        ? // ? "0" + parseInt(seconds / 3600)
          parseInt(seconds / 3600)
        : null;
    var min =
      parseInt((seconds % 3600) / 60) < 10
        ? "0" + parseInt((seconds % 3600) / 60)
        : parseInt((seconds % 3600) / 60);
    var sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;
    //연산한 값을 화면에 뿌려주는 코드
    const value = hour === 0 ? min + ":" + sec : hour + ":" + min + ":" + sec;
    return value;
  }

  const center = {
    lat: 35.94619656686232,
    lng: 128.46093411604423,
  };

  const MapStyle = {
    display: "inline-block",
    width: "105%",
    height: "32vh",
    borderRadius: "12px",
    top: "11px",
    left: "-13px",
  };

  return (
    <Container>
      <ScoreDiv>
        <Row gutter={[16, 16]}>
          {cardScore.map((card, index) => (
            <Col xs={24} md={12} xl={6}>
              <Card key={index}>
                <h3>{card.title}</h3>
                <p>{card.distance}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </ScoreDiv>
      <ChartDiv>
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={8}>
            <LeftDiv>
              <Card>
                <LoadScript googleMapsApiKey="AIzaSyAONuIuF8EgvSHN6r53EJmqXI7iMDhvSvo">
                  <GoogleMap
                    mapContainerStyle={MapStyle}
                    center={center}
                    zoom={16}
                  />
                </LoadScript>
                <div>
                  <h1>코스 이름</h1>
                  <span>측정날짜</span>
                </div>
                <div>
                  <Button style={{ float: "right" }} type="primary">
                    코스제작
                  </Button>
                </div>
              </Card>
            </LeftDiv>
          </Col>
          <Col xs={24} xl={16}>
            <RightDiv>
              <Card>
                {/* <TopDiv>
                  <Card>빈공간</Card>
                </TopDiv> */}
                <Table
                  style={{ marginTop: "30px" }}
                  dataSource={me.posts}
                  pagination={{
                    defaultPageSize: 10,
                    // showSizeChanger: true,
                    // pageSizeOptions: ["10", "20", "30"],
                    HideOnSinglePage: false,
                  }}
                >
                  <Column
                    title="종목"
                    dataIndex="event"
                    key="event"
                    render={(e) => {
                      if (e === "B") {
                        return <p>라이딩</p>;
                      }
                      return <p>달리기</p>;
                    }}
                    filters={[
                      {
                        text: "라이딩",
                        value: "B",
                      },
                      {
                        text: "달리기",
                        value: "R",
                      },
                    ]}
                    onFilter={(value, record) =>
                      record.event.indexOf(value) === 0
                    }
                  />
                  <Column
                    title="이름"
                    dataIndex="title"
                    key="title"
                    render={(title) => (
                      <a style={{ color: "#1890ff" }}>{title}</a>
                    )}
                  />
                  <Column
                    title="거리"
                    dataIndex="distance"
                    key="distance"
                    render={(v) => <p>{parseFloat(v).toFixed(2)}km</p>}
                  />
                  <Column
                    title="고도"
                    dataIndex="altitude"
                    key="altitude"
                    sortDirections={sortData}
                    sorter={(a, b) => a.altitude - b.altitude}
                    render={(v) => <p>{v}m</p>}
                  />
                  <Column
                    title="시간"
                    dataIndex="time"
                    key="time"
                    render={(v) => timeChange(v)}
                  />
                  <Column
                    title="날짜"
                    dataIndex="created_at"
                    key="created_at"
                    sortDirections={["ascend", "descend"]}
                    sorter={(a, b) =>
                      moment(b.created_at) - moment(a.created_at)
                    }
                    render={(v) => dateFormat(v)}
                    sortOrder="ascend"
                  />
                  <Column
                    title={
                      <p onClick={onChangeDelete}>수정</p>
                      // <Select defaultValue="종목 선택">
                      //   <Option>달리기</Option>
                      //   <Option>라이딩</Option>
                      // </Select>
                    }
                    width="200px"
                    align="right"
                    dataIndex={["id", "kind"]}
                    key={["id", "kind"]}
                    render={(v, k, record) => (
                      <>
                        {k.kind === "자유" && (
                          <Button
                            type="success"
                            onClick={() => createLink(record)}
                          >
                            경로만들기
                          </Button>
                        )}
                        {/* {deleteBtn ? (
                    <Button type="danger" style={{ translate: "all 0.2" }}>
                      삭제
                    </Button>
                  ) : null} */}
                        <Button
                          type="danger"
                          onClick={deleteModal}
                          style={{ translate: "all 0.2" }}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                  />
                </Table>
                <Modal
                  title="진짜삭제할거야?"
                  visible={isModalVisible}
                  onOk={() => recordDelete(record.id)}
                  onCancel={cancel}
                ></Modal>
              </Card>
            </RightDiv>
          </Col>
        </Row>
      </ChartDiv>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("ssssrssssssssss");

    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    // context.store.dispatch({
    //   type: WEEKRECORD_REQUEST,
    // });
    // context.store.dispatch({
    //   type: USER_RATE_REQUEST,
    // });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default dashboard;
/*
Container
ChartWrapper
ProfileDiv
ProfileWrapper
PieDiv  // CSS 반응형 추가
 */
const Container = styled.div`
  display: inline-block
  width: 100%;
  height: 100%;

  padding: 4% 5%;


  .ant-card {
    width: 100%;
    border-radius: 9px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  // @media Screen and (max-width: 1280px) {
  //   flex-direction: column;
  // }

  // h1 {
  //   font-size: 32px;
  //   font-weight: bold;
  // }

  .ant-table-row {
    height: 80px;
  }

  .ant-table-row:nth-child(2n) {
    background: #fafafa;
  }

  .ant-table-row:hover td {
    background: #e5e5e5 !important;
  }
`;

const ScoreDiv = styled.div`
  height: 15%;

  p {
    margin: 7px;
  }

  h3 {
    margin: 0;
    font-weight: bold;
  }

  .ant-card {
    height: 120px;
    border-radius: 9px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  .ant-card-body {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 30px;
    text-align: center;
  }
`;

const LeftDiv = styled.div`
  width: 100%;

  .ant-card {
    border-radius: 0 !important;
  }
`;

const RightDiv = styled.div`
  width: 100%;
  padding-left: 3%;

  a {
    color: #1890ff;
  }
`;

const ChartWrapper = styled.div`
  // display: block;
  // display: flex;
  width: 100%;
  height: 100%;

  // @media Screen and (max-width: 1280px) {
  //   order: 2;
  // }
`;

const ChartDiv = styled.div`
  display: inline-block;
  width: 100%;
  // height: 85%;
  height: 40%;
  // margin-top: 24px;
  padding-top: 36px;

  .apexcharts-canvas {
    text-align: center;
    margin: 0 auto;
  }

  .ant-card-head-title {
    padding: 10px 0;
  }

  .ant-card-body {
    // min-height: 322px;
    // padding: 12px;
    min-height: 322px;
    padding: 0 24px;
  }

  p {
    margin: 0;
  }

  td.ant-table-column-sort {
    background: none !important;
  }

  .ant-pagination {
    width: 100%;
    display: inline-block;
    text-align: center;
  }

  .ant-pagination-options {
    display: none !important;
  }
`;

const TopDiv = styled.div`
  border: 1px solid #1890ff;

  .ant-card {
    // background: #1890ff;
    border-radius: 0 !important;
    box-shadow: none !important;
    // color: #fff;
  }
`;

// const BottomDiv = styled(ChartDiv)`
//   .ant-card {
//     width: 300px;
//     height: 300px;
//     border-radius: 9px;
//   }
// `;

// const ProfileDiv = styled.div`
//   display: inline-block;
//   width: 20%;
//   height: 100%;
//   // border: 1px solid grey;
//   margin-left: 16px;

//   .ant-btn {
//     display: inline-block;
//     width: 110px;
//     height: 35px;
//     text-align: center;
//     border-radius: 7px;
//     background: #1890ff;
//     color: #fff;
//   }

//   @media Screen and (max-width: 1280px) {
//     order: 1;
//     display: flex;
//     width: 100%;
//     margin: 0;
//   }

//   @media Screen and (max-width: 767px) {
//     flex-direction: column;
//   }
// `;

// const ProfileWrapper = styled.div`
//   display: inline-block;
//   width: 100%;
//   height: 59%;
//   text-align: center;

//   h1 {
//     text-align: left;
//   }

//   .ant-card {
//     height: 97%;
//   }

//   @media Screen and (max-width: 1280px) {
//     width: 50%;
//     height: 100%;
//   }

//   @media Screen and (max-width: 767px) {
//     width: 100%;
//     height: 100%;
//   }
// `;

// const PieDiv = styled.div`
//   display: inline-block;
//   width: 100%;
//   height: 40%;

//   .ant-card {
//     width: 100%;
//   }

//   @media Screen and (max-width: 1280px) {
//     width: 50%;
//     height: 100%;
//   }

//   @media Screen and (max-width: 767px) {
//     width: 100%;
//     height: 100%;
//   }
// `;
