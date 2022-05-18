import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_CREATEMAP_REQUEST } from "../reducers/map";
import Link from "next/link";
import {
  LOAD_MY_INFO_REQUEST,
  TOTAL_CALORIE_REQUEST,
  TOTAL_RUN_TIME_REQUEST,
  TOTAL_TIME_REQUEST,
} from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { Card, Button, Table, Select, Modal, Row, Col } from "antd";
import styled from "styled-components";
const { Column } = Table;
import moment from "moment";
import {
  DELETE_MYPOST_REQUEST,
  LOAD_LOGIN_REQUEST,
  TOTAL_BIKE_TIME_REQUEST,
} from "../reducers/user";
const { Option } = Select;
import { NotificationOutlined } from "@ant-design/icons";

function myRecord() {
  const { totalCalorie, totalTime, totalRunTime, totalBikeTime } = useSelector(
    (state) => state.user
  );
  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("YYYY년 MM월 DD일");
  };
  const [gpsId, setGpsId] = useState();
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

  useEffect(() => {
    Modal.destroyAll();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [propsId, setPropsId] = useState();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const createLink = (data) => {
    // console.log(data)
    setPropsId(data.gps_id);
  };

  // useEffect(()=>{
  //   window.location.reload
  // },[me.posts])

  useEffect(() => {
    if (propsId) {
      // dispatch({
      //   type: LOAD_LOGIN_REQUEST,
      // });
      dispatch({
        type: LOAD_CREATEMAP_REQUEST,
        data: propsId,
      });
      // window.location.href="/Create/"+propsId
      Router.push({
        pathname: "/Create/[id]",
        query: { id: propsId },
      });
    }
  }, [propsId]);

  const deleteModal = (data) => {
    // setGpsId(data)
    var deleteform = confirm("진짜삭제하겠습니까?");
    if (deleteform) {
      recordDelete(data);
    } else {
      console.log("다음에취소");
    }

    // setIsModalVisible(true)
  };
  const recordDelete = (gpsId) => {
    dispatch({
      type: DELETE_MYPOST_REQUEST,
      data: gpsId,
    });
  };

  // const deleteModal = (data) => {
  //   setGpsId(data)
  //   setIsModalVisible(true);
  // };

  const cancel = () => {
    setIsModalVisible(false);
  };

  const cardScore = [
    // 차트그래프 옆 카드 더미데이터
    {
      title: "총 운동 시간",
      distance: timeChange(totalTime),
    },
    {
      title: "총 소모 칼로리",
      distance: totalCalorie + "Kcal",
    },
    {
      title: "총 라이딩 거리",
      distance: totalBikeTime.distance
        ? totalBikeTime.distance + "km"
        : 0 + "km",
    },
    {
      title: "총 러닝 거리",
      distance: totalRunTime.distance
        ? totalRunTime.distance.toFixed(2) + "km"
        : 0 + "km",
    },
  ];

  return (
    <Container>
      <h1>내 종합 운동기록</h1>
      <CardDiv>
        <Card>
          <ScoreDiv>
            <Row gutter={[16, 16]}>
              {cardScore.map((card, index) => (
                <Col xs={24} md={12} xl={6}>
                  <Card key={index} hoverable>
                    <DivLine />
                    <h3>{card.title}</h3>
                    <p>{card.distance}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </ScoreDiv>
          <div style={{ marginTop: 20, fontSize: 25 }}>
            <NotificationOutlined style={{ color: "#467ada" }} /> 자유운동만
            코스만들기가능
          </div>
          <Table
            style={{
              marginTop: "30px",
            }}
            dataSource={me.posts}
          >
            <Column
              title="유형"
              dataIndex="kind"
              key="kind"
              render={(e) => {
                if (e === "자유") {
                  return <p>자유운동</p>;
                } else if (e === "싱글") {
                  return <p>코스운동(싱글)</p>;
                } else if (e === "친선") {
                  return <p>코스운동(친선)</p>;
                } else if (e === "랭크") {
                  return <p>코스운동(랭크)</p>;
                }
              }}
              filters={[
                {
                  text: "자유운동",
                  value: "자유",
                },
                {
                  text: "코스운동(싱글)",
                  value: "싱글",
                },
                {
                  text: "코스운동(친선)",
                  value: "친선",
                },
                {
                  text: "코스운동(랭크)",
                  value: "랭크",
                },
              ]}
              onFilter={(value, record) => record.kind.indexOf(value) === 0}
            />
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
              onFilter={(value, record) => record.event.indexOf(value) === 0}
            />
            <Column
              title="이름"
              dataIndex="title"
              key="title"
              render={(title) => <a style={{ color: "#1890ff" }}>{title}</a>}
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
              sorter={(a, b) => moment(b.created_at) - moment(a.created_at)}
              render={(v) => dateFormat(v)}
              sortOrder="ascend"
            />
            <Column
              title={<p onClick={onChangeDelete}>수정</p>}
              width="200px"
              align="right"
              dataIndex={["id", "kind"]}
              key={["id", "kind"]}
              render={(v, record) => (
                <>
                  {record.kind === "자유" ? (
                    <Button
                      type="success"
                      // style={{
                      //   backgroundColor: "#467ada",
                      //   color: "white",
                      //   right: 30,
                      // }}
                      onClick={() => createLink(record)}
                    >
                      코스만들기
                    </Button>
                  ) : null}

                  <Button
                    type="danger"
                    onClick={() => deleteModal(record.id)}
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
            onOk={recordDelete}
            onCancel={cancel}
          ></Modal>
        </Card>
      </CardDiv>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: TOTAL_CALORIE_REQUEST,
    });
    context.store.dispatch({
      type: TOTAL_TIME_REQUEST,
    });
    context.store.dispatch({
      type: TOTAL_RUN_TIME_REQUEST,
    });
    context.store.dispatch({
      type: TOTAL_BIKE_TIME_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default myRecord;
const Container = styled.div`
  padding: 3% 5% 0 5%;

  h1 {
    font-size: 32px;
    font-weight: bold;
  }

  .ant-card {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
    margin: 0;
    border: 1px solid #ebedf3;
  }
`;

const ScoreDiv = styled.div`
  // width: 80% !important;
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
    border-radius: 12px;
    transition: all 0.8s;
    box-shadow: none !important;
    border: 1px solid #e9e9e9;
  }

  .ant-card-hoverable:hover {
    transform: translateY(-20px);
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
      0 5px 12px 4px rgb(0 0 0 / 9%) !important;
  }

  .ant-card-body {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 30px;
    text-align: center;
    position: relative;
    z-index: 3;
  }
`;

const CardDiv = styled.div`
  position: relative;

  p {
    margin: 0;
  }

  .ant-card {
    // background: #ebedf3 !important;
  }

  .ant-pagination {
    width: 100%;
    display: inline-block;
    text-align: center;
    // position: absolute;
    // top: 340%;
  }

  .ant-pagination-options {
    display: none !important;
  }

  .ant-table-thead {
    background: #fafafa;
  }

  .ant-table-thead th.ant-table-column-sort {
    background: none !important;
  }

  .ant-table-column-sorter-up.active {
    color: #bfbfbf !important;
  }

  .ant-table-column-sorters:hover > .ant-tooltip {
    display: none !important;
  }

  .ant-table-row {
    height: 80px;
  }

  td.ant-table-column-sort {
    background: none !important;
  }

  td.ant-table-column-sort:nth-child(2n + 1) {
    background: #fafafa;
  }

  .ant-table-row:nth-child(2n) {
    background: #fafafa;
  }

  .ant-table-row:hover td {
    background: #f5f5f5 !important;
  }
`;

const TopDiv = styled.div`
  border: 1px solid #1890ff;
`;

const DivLine = styled.div`
  display: inline-block;
  // width: 30px;
  // height: 30px;
  // background: #467ada;

  // float: left;
  border-top: 110px solid #467ada;
  border-right: 110px solid #fff;
  border-top-left-radius: 12px;
  position: absolute;
  bottom: 30%;
  left: 0;
  top: 0;
  z-index: 1;
`;
