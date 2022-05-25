import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_LOGIN_REQUEST } from "../../reducers/user";
import { Polyline, Marker } from "@react-google-maps/api";
import {
  LOAD_MAP_REQUEST,
  LOAD_TRACK_MYRANK_REQUEST,
  LOAD_TRACK_RANK_REQUEST,
  LOAD_TRACK_RANK_SUCCESS,
} from "../../reducers/map";
import {
  LOAD_MY_INFO_REQUEST,
  NOTIFICATION_REQUEST,
} from "../../reducers/user";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { Card, Table, Button, Popover, Avatar } from "antd";
const { Column } = Table;
import styled from "styled-components";
import moment from "moment";
import { Title, CardDiv } from "../../component/map/selectMap";
import { useRouter } from "next/router";
import RouteInformation from "../../component/RouteInformation";
import { useParams } from "react-router-dom";

import {
  VerticalGridLines,
  HorizontalGridLines,
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  Crosshair,
} from "react-vis";
import "react-vis/dist/style.css";

function oneRoute() {
  const { userId } = useParams();
  const router = useRouter();

  const { loadMap, mapRank, myMapRank } = useSelector((state) => state.map);
  const { me } = useSelector((state) => state.user);

  // const [highAltitude, setHighAltitude] = useState("");
  // const [lowAltitude, setLowAltitude] = useState("");

  var highAltitude = loadMap.altitude[0].y;
  var lowAltitude = loadMap.altitude[0].y;

  const [strokeWeight, setStrokeWeight] = useState(5);
  const [elevPath, setElevPath] = useState({
    lat: "",
    lng: "",
  });
  const [state, setState] = useState({
    crosshairValue: [],
  });
  const [index, setIndex] = useState("");

  for (var i = 1; i < loadMap.altitude.length; i++) {
    if (lowAltitude > loadMap.altitude[i].y) {
      lowAltitude = loadMap.altitude[i].y;
    }
    if (highAltitude < loadMap.altitude[i].y) {
      highAltitude = loadMap.altitude[i].y;
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_LOGIN_REQUEST,
    });
  }, []);

  const mouseOut = () => {
    setStrokeWeight(5);
    console.log("aaa");
  };

  const mouseOver = () => {
    setStrokeWeight(10);
    console.log("over");
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: strokeWeight,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    //-27부터 호주 시작해서 점찍고 점찍고 한다
    paths: [
      [
        { lat: 35.969997373905, lng: 128.45170755523503 },
        { lat: 35.985501427015464, lng: 128.40407191943035 },

        { lat: 35.89580489690752, lng: 128.62238368221892 },
      ],
    ],
    zIndex: 1,
  };

  //elevmarker

  const handleMouseOver = () => {
    console.log("qqqq");
    setState({ crosshairValue: [] });
    setIndex(0);
  };

  const qq = (value, { index }) => {
    console.log(value);
    console.log("aa", index);
    setIndex(index);

    setState({ crosshairValue: loadMap.altitude.map((d) => d) });
    setElevPath({
      lat: loadMap.gps.coordinates[index][1],
      lng: loadMap.gps.coordinates[index][0],
    });
    console.log("ha", state);
  };
  //elevmarker

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("YYYY년 MM월 DD일");
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

  return (
    <>
      <Container>
        <OverviewDiv>
          <h1>{loadMap.trackName}</h1>
          <FlexDiv>
            <div>
              <div className="title">거리</div>
              <div className="item">{loadMap.totalDistance.toFixed(2)}km</div>
            </div>
            <div>
              <div className="title">최고 고도</div>
              <div className="item">{parseFloat(highAltitude).toFixed(2)}m</div>
            </div>
            <div>
              <div className="title">최저 고도</div>
              <div className="item">{parseFloat(lowAltitude).toFixed(2)}m</div>
            </div>
            <div>
              <div className="title">평균경사도</div>
              <div className="item">{loadMap.avgSlope}%</div>
            </div>
          </FlexDiv>
        </OverviewDiv>
        <TopDiv>
          <LeftDiv>
            <MapDiv>
              <CardDiv>
                <LoadScript googleMapsApiKey="AIzaSyAYsO2CGL0YCjMoLk29eyitFC2PIJnJbYE">
                  <GoogleMap
                    id="marker-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={{
                      lat: loadMap.gps.coordinates[0][1],
                      lng: loadMap.gps.coordinates[0][0],
                    }}
                  >
                    <Marker
                      position={{
                        // lat: loadMap.start_latlng[1],
                        // lng: loadMap.start_latlng[0],
                        lat: loadMap.gps.coordinates[0][1],
                        lng: loadMap.gps.coordinates[0][0],
                      }}
                    />

                    {elevPath && (
                      <Marker
                        position={elevPath}
                        icon={{
                          url: " http://maps.google.com/mapfiles/ms/icons/blue.png",
                        }}
                      ></Marker>
                    )}

                    <Polyline
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      options={options}
                      path={loadMap.gps.coordinates.map((m) => ({
                        lat: m[1],
                        lng: m[0],
                      }))}
                    ></Polyline>
                  </GoogleMap>
                </LoadScript>
              </CardDiv>
            </MapDiv>
            <MouseDiv>
              <CardDiv hoverable>
                <XYPlot
                  width={975}
                  height={200}
                  onMouseLeave={handleMouseOver}
                  style={{ maxWidth: 975 }}
                >
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />
                  <LineSeries data={loadMap.altitude} onNearestX={qq} />
                </XYPlot>
              </CardDiv>
            </MouseDiv>
          </LeftDiv>
          <RightDiv>
            <RouteInformation />
            <PDiv>나의랭크</PDiv>
            <div
              style={{
                width: "100%",
                overflow: "auto",
              }}
            >
              <CardWrapper>
                <TopCard>
                  <div>
                    <span>순위</span>
                    <span>속도</span>
                    <span>기록</span>
                    <span>날짜</span>
                  </div>
                </TopCard>

                {myMapRank[0] == 0 ? (
                  <div>순위데이터없음</div>
                ) : (
                  <BottomCard hoverable>
                    <div style={{ width: "100%", display: "flex" }}>
                      <span style={{ marginLeft: 15 }} className="span1">
                        {myMapRank[0].rank + "위"}
                      </span>
                      <span style={{ paddingLeft: 0 }} className="span2">
                        {myMapRank[0].post.average_speed + "km"}
                      </span>
                      <span style={{ paddingLeft: 0 }}>
                        {timeChange(myMapRank[0].post.time)}
                      </span>
                      <span style={{ paddingLeft: 0 }}>
                        {dateFormat(myMapRank[0].post.created_at)}
                      </span>
                    </div>
                  </BottomCard>
                )}
              </CardWrapper>
            </div>
          </RightDiv>
        </TopDiv>
        <BottomDiv>
          <div style={{ fontWeight: "bold", fontSize: 30 }}>전체순위</div>
          <BottomTopCard>
            <div>
              <span className="span1">순위</span>
              <span className="span2">이름</span>
              <span>평균속도</span>
              <span>기록(시간)</span>
              <span>날짜</span>
            </div>
          </BottomTopCard>

          {mapRank[0] == 0 ? (
            <BottomCard>
              <div>순위데이터없음</div>
            </BottomCard>
          ) : (
            mapRank[0].map((b, index) => (
              <BottomCard className="table">
                <div
                  style={{
                    display: "flex",
                    overFlow: "auto",
                  }}
                >
                  {index + 1 == 1 ? (
                    <>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png"
                        style={{ position: "relative", left: 15 }}
                      />
                      <div style={{ width: 240 }} />
                    </>
                  ) : index + 1 === 2 ? (
                    <>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png"
                        style={{ position: "relative", left: 15 }}
                      />
                      <div style={{ width: 240 }} />
                    </>
                  ) : index + 1 === 3 ? (
                    <>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png"
                        style={{ position: "relative", left: 15 }}
                      />
                      <div style={{ width: 240 }} />
                    </>
                  ) : (
                    <div
                      className="rank"
                      style={{ width: 270, paddingLeft: 20 }}
                    >
                      {index + 1 + "위"}
                    </div>
                  )}

                  <Popover
                    placement="topLeft"
                    title="Rider"
                    content={
                      <div
                        style={{
                          display: "flex",
                          margin: "0 auto",
                        }}
                      >
                        <Avatar src={b.user.profile} />
                        <p>{b.user.name}</p>
                      </div>
                    }
                    trigger="hover"
                  >
                    <div style={{ width: 260 }}>{b.user.name}</div>
                  </Popover>
                  <div style={{ width: 250 }}>
                    {b.average_speed.toFixed(2)}km/h
                  </div>
                  <div style={{ width: 335 }}>{timeChange(b.time)}</div>
                  <div style={{ width: 300 }}>{dateFormat(b.created_at)}</div>
                </div>
              </BottomCard>
            ))
          )}
        </BottomDiv>
      </Container>
    </>
  );
}

// export async function getStaticPaths() {
//   const posts = await axios.get("http://13.124.24.179/api/tracks");

//   var paths1 = posts.data.map((id) => ({
//     params: { id: id._id },
//   }));

//   return {
//     paths: paths1,
//     fallback: false,
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // const { query } = context;

    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    console.log("sqqssssssssss", context.query);
    context.store.dispatch({
      type: LOAD_MAP_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: LOAD_TRACK_RANK_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: LOAD_TRACK_MYRANK_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: NOTIFICATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default oneRoute;

const mapContainerStyle = {
  //   width: "500px",
  height: "300px",
  width: "100%",
  // height: "30vh",
  borderRadius: "15px",
};

const Container = styled.div`
  width: 100%;
  height: 60%;
  padding: 5% 7%;

  .ant-card {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 10%) !important;
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
    cursor: default !important;
  }
`;

const TopDiv = styled.div`
  display: flex;
  width: 100%;
`;

const BottomDiv = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 30px;

  .table:hover {
    background: #fafafa;
    transition: background 0.3s;
  }

  .ant-card {
    width: 100%;
    border-radius: none !important;
    box-shadow: none !important;
  }
`;

const RankDiv = styled.div`
  margin-top: 50px;
  padding: 2% 7% 4% 7%;

  .ant-card {
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }
`;

const LeftDiv = styled.div`
  width: 65%;
  // border: 1px solid grey;
  padding-right: 20px;
  padding-top: 10px;
  .ant-card {
    width: 100%;
  }
`;

const RightDiv = styled.div`
  width: 35%;
  // border: 1px solid grey;
  padding: 10px;

  .ant-card {
    width: 100%;
    // box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  .ant-timeline {
    position: relative;
    top: 40px;
    padding-left: 12px;
  }
`;

const PDiv = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  margin-top: 20px;
`;

const MapDiv = styled.div`
  height: 55%;

  .ant-card-body {
    padding: 5px;
  }
`;

const MouseDiv = styled.div`
  width: 100%;
  height: 40%;
  margin-top: 20px;

  .rv-xy-plot {
    display: inline-block;
    width: 100% !important;
    top: 7px;
  }

  .rv-xy-plot__inner {
    width: 100%;
    margin: 0;
  }
`;

const TitleText = styled(Title)`
  // height: 5%;
  // font-weight: 32px;
  // line-height: 30px;
  //   margin: 10px auto;
`;

const CardWrapper = styled(CardDiv)`
  .ant-card-body {
    padding: 0;
  }
`;

const TopCard = styled(Card)`
  width: 100%;
  height: 50px;
  line-height: 1px;
  font-weight: 530;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background: #467ada;

  color: #fff;

  .ant-card-body {
    padding: 24px;
  }

  div {
    width: 100%;
    display: flex;
  }

  span:nth-child(-n + 3) {
    display: inline-block;
    width: 16.6%;
    text-align: left;
    padding-left: 10px;
  }

  span:nth-last-child(2) {
    display: inline-block;
    width: 22%;
    text-align: left;
    padding-left: 10px;
  }

  span:nth-last-child(1) {
    display: inline-block;
    width: 28%;
    text-align: left;
    padding-left: 10px;
  }
`;

const BottomTopCard = styled(TopCard)`
  background: #467ada;
  color: #fff;
  font-weight: bold;
  font-size: 14px;

  .span1 {
    position: relative;
    right: 3px;
  }

  // .span2 {
  //   width: 100px;
  // }
`;

const BottomCard = styled(Card)`
  width: 100%;
  // margin-top: 30px;

  // border-bottom-left-radius: 7px;
  // border-bottom-right-radius: 7px;

  .ant-card {
    border-radius: 0 !important;
    // box-shadow: none !important;
    // border-bottom: 1px solid #f0f0f0;
  }

  .ant-card-body {
    padding: 24px 10px;
  }

  .ant-popover-title {
    color: #1890ff;
  }

  div {
    width: 100%;
  }

  a:hover {
    color: black;
  }

  a,
  span:nth-child(-n + 3) {
    display: inline-block;
    width: 16.6%;

    text-align: left;
    padding-left: 10px;
  }

  span:nth-last-child(2) {
    display: inline-block;
    width: 22%;
    text-align: left;
    padding-left: 10px;
  }

  span:nth-last-child(1) {
    display: inline-block;
    width: 28%;
    text-align: left;
    padding-left: 10px;
  }

  // .ant-pagination {
  //   width: 100%;
  //   display: inline-block;
  //   text-align: center;
  // }

  .table:nth-child(1) {
    div {
      width: 260px;
    }
  }

  img {
    width: 32px;
    height: 32px;
    float: left;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;

  // margin-left:150px

  div {
    display: inline-block;
    width: 20%;
  }

  div > div {
    width: 100%;
  }

  div > .title {
    font-size: 20px;
  }

  div > .item {
    font-size: 30px;
    font-weight: bold;
  }
`;

const OverviewDiv = styled.div`
  width: 100%;
  display: inline-block;

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin: 0;
    height: 50px;
    line-height: 15px;
    position: relative;
    // right: 9%;
  }
`;
