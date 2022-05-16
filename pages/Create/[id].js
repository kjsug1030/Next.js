import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  Polyline,
  Marker,
  StreetViewPanorama,
  MarkerClusterer,
} from "@react-google-maps/api";
import {
  Form,
  Card,
  Table,
  Button,
  Slider,
  Switch,
  Row,
  Col,
  Input,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import { ADD_TRACK_REQUEST, LOAD_CREATEMAP_REQUEST } from "../../reducers/map";
import axios from "axios";
import useInput from "../../hooks/useInput";

import { LOAD_LOGIN_REQUEST, LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import styled from "styled-components"; // 추가

function createPath() {
  function error() {
    Modal.error({
      title: "운동코스제작실패",
      content: "비슷한 트랙이있습니다.",
    });
  }

  const { createMap, addMap } = useSelector((state) => state.map);

  const [createDistance, setCreateDistance] = useState(
    createMap.gpsData.distance[createMap.gpsData.distance.length - 1]
  );

  const [trackName, onChangeTrackName] = useInput("");
  const [trackDescription, onChangeTrackDescription] = useInput("");

  const [number, setNumber] = useState([
    0,
    createMap.gpsData.gps.coordinates.length - 1,
  ]);
  const [twoPolyline, setTwoPolyline] = useState([
    createMap.gpsData.gps.coordinates,
  ]);

  const [leftPath, setLeftPath] = useState({
    lat: createMap.gpsData.gps.coordinates[0][1],
    lng: createMap.gpsData.gps.coordinates[0][0],
  });
  const [rightPath, setRightPath] = useState({
    lat: createMap.gpsData.gps.coordinates[
      createMap.gpsData.gps.coordinates.length - 1
    ][1],
    lng: createMap.gpsData.gps.coordinates[
      createMap.gpsData.gps.coordinates.length - 1
    ][0],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_LOGIN_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (addMap ? addMap.message : addMap) {
      error();
    } else if (addMap ? addMap.trackId : addMap) {
      createSuccess();
      window.location.href = "/myRecord";
    }
  }, [addMap]);

  useEffect(() => {
    setLeftPath({
      lat: createMap.gpsData.gps.coordinates[number[0]][1],
      lng: createMap.gpsData.gps.coordinates[number[0]][0],
    });
    setTwoPolyline([
      createMap.gpsData.gps.coordinates.slice(number[0], number[1]),
    ]);
    setCreateDistance(
      createMap.gpsData.distance[number[1]] -
        createMap.gpsData.distance[number[0]]
    );
    console.log("two", twoPolyline);
    console.log(number[0]);
  }, [number[0]]);
  useEffect(() => {
    setRightPath({
      lat: createMap.gpsData.gps.coordinates[number[1]][1],
      lng: createMap.gpsData.gps.coordinates[number[1]][0],
    });
    setCreateDistance(
      createMap.gpsData.distance[number[1]] -
        createMap.gpsData.distance[number[0]]
    );
    setTwoPolyline([
      createMap.gpsData.gps.coordinates.slice(number[0], number[1]),
    ]);
    console.log("three", twoPolyline);
    console.log(number[1]);
  }, [number[1]]);

  const options = {
    strokeColor: "#467ada",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "#467ada",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      [
        { lat: 35.969997373905, lng: 128.45170755523503 },
        { lat: 35.985501427015464, lng: 128.40407191943035 },
        { lat: 35.89580489690752, lng: 128.62238368221892 },
      ],
    ],
    zIndex: 1,
  };

  const options111 = {
    strokeColor: "#fc0328",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "red",
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

  const change = (value) => {
    console.log("value", value);
    setNumber(value);
  };

  const createSuccess = () => {
    Modal.success({
      title: "경로만들기 성공",
    });
  };

  const storePath = [];
  const altitudes = [];

  var totalDistance = 0;

  const pathStore = () => {
    for (var i = number[0]; i < number[1] + 1; i++) {
      storePath.push(createMap.gpsData.gps.coordinates[i]);
      altitudes.push(createMap.gpsData.altitude[i].y);
    }
    totalDistance =
      createMap.gpsData.distance[number[1]] -
      createMap.gpsData.distance[number[0]];
    console.log(totalDistance, "al", altitudes);

    dispatch({
      type: ADD_TRACK_REQUEST,
      data: {
        trackName,
        totalDistance,
        // userId:createMap.track.user.userId,//나중에포스트 sns되면
        // name:createMap.track.user.name,//나중에 포스트Sns되면
        // desription:createMap.track.description,//나중에포스트sns되면
        // checkPoint:createMap.track.checkPoint//나중에포스트sns되면
        //더미
        userId: createMap.gpsData.user.userId,
        name: createMap.gpsData.user.name,
        description: trackDescription,
        checkPoint: [[1, 2]],
        //더미
        event: createMap.gpsData.event,

        gps: storePath,
        altitude: altitudes,
      },
    });

    // createSuccess();
    // window.location.href = "/myRecord";
  };

  return (
    <Container>
      <div style={{ position: "relative" }}></div>
      <LoadScript googleMapsApiKey="AIzaSyCyttJXmotwzGJhLd0hnVDQ0TxOG-Uonwg">
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={{
            lat: createMap.gpsData.gps.coordinates[
              createMap.gpsData.gps.coordinates.length % 2
            ][1],
            lng: createMap.gpsData.gps.coordinates[
              createMap.gpsData.gps.coordinates.length % 2
            ][0],
          }}
        >
          <Marker
            position={leftPath}
            icon={{
              url: " http://maps.google.com/mapfiles/ms/icons/blue.png",
            }}
          ></Marker>
          <Marker
            icon={{
              url: " http://maps.google.com/mapfiles/ms/icons/blue.png",
            }}
            position={rightPath}
          ></Marker>

          <Polyline
            options={options}
            path={createMap.gpsData.gps.coordinates.map((m) => ({
              lat: m[1],
              lng: m[0],
            }))}
          ></Polyline>
          <Polyline
            options={options111}
            path={twoPolyline[0].map((m) => ({
              lat: m[1],
              lng: m[0],
            }))}
          ></Polyline>
          {createMap.track
            ? createMap.track.map((m, index) => (
                <Polyline
                  options={{
                    strokeWeight: 5,
                    clickable: true,
                    visible: true,
                    strokeColor: "#03fc6f",
                    fillColor: "#03fc6f",
                  }}
                  path={m.gps.coordinates.map((p) => ({
                    lat: p[1],
                    lng: p[0],
                  }))}
                ></Polyline>
              ))
            : null}
        </GoogleMap>
      </LoadScript>

      <RightDiv>
        <div>
          <TitleCard />
          <Card
            style={{
              borderTopLeftRadius: 0,
            }}
            hoverable
          >
            <FormWrapper>
              <div>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  현재 측정중인 코스거리 : {createDistance.toFixed(2)}km
                  {/* {Calculation(createDistance).toFixed(2)} km */}
                </span>
                <span
                  style={{
                    marginLeft: 100,
                    display: "float",
                    fontWeight: "bold",
                  }}
                >
                  만드는 코스:{" "}
                  <a
                    style={{
                      backgroundColor: "red",
                      color: "red",
                      width: 30,
                      height: 5,
                      marginLeft: 20,
                    }}
                  >
                    sssssssss
                  </a>
                </span>
              </div>
              <Form.Item>
                <Input
                  style={{ marginTop: 10, marginBottom: 20 }}
                  placeholder="경로이름을 입력해주세요"
                  value={trackName}
                  onChange={onChangeTrackName}
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  style={{ marginBottom: 20 }}
                  placeholder="경로내용을 입력해주세요"
                  value={trackDescription}
                  onChange={onChangeTrackDescription}
                />
              </Form.Item>

              <Button type="primary" onClick={pathStore}>
                경로만들기
              </Button>
            </FormWrapper>
            <SliderDiv>
              <Slider
                range
                defaultValue={number}
                max={createMap.gpsData.gps.coordinates.length - 1}
                onChange={change}
                style={{ marginTop: 40 }}
                tipFormatter={null}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>출발</p>
                <p>도착</p>
              </div>
            </SliderDiv>
          </Card>
        </div>
      </RightDiv>
    </Container>
  );
}

export async function getStaticPaths() {
  const posts = await axios.get("http://13.124.24.179/api/gpsdata");

  var paths1 = posts.data.map((id) => ({
    params: { id: id._id },
  }));

  return {
    paths: paths1,
    // paths:[  { params: { id: '62256147dc2958292cb17110' } },],
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch({
    type: LOAD_CREATEMAP_REQUEST,
    data: context.params.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default createPath;

const mapContainerStyle = {
  height: "700px",
  width: "100%",
  // marginTop: 30,
  borderRadius: 20,
  position: "relative",
};

const Container = styled.div`
  padding: 3% 5% 0 5%;
  width: 100%;
  // position: relative;
`;

const FormWrapper = styled(Form)`
  .ant-form-item {
    margin-bottom: 0 !important;
  }
`;

const SliderDiv = styled.div`
  width: 50%;

  .ant-slider-rail {
    background: #e1e1e1;
  }

  .ant-slider-track {
    background: #467ada;
  }
`;

const TitleCard = styled(Card)`
  width: 100% !important;
  height: 10px;
  background: #467ada;
  border-top-right-radius: 9px !important;
  border-top-right-radius: 9px !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;

  // box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%) !important;
`;

const RightDiv = styled.div`
  width: 30%;
  position: fixed;
  right: 5%;
  top: 16%;
  // margin-left: 90px;
  .ant-card {
    width: 100%;
    border-radius: 7px;
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
    cursor: default !important;
  }

  img {
    width: 32px;
    height: 32px;
  }

  .ant-btn {
    background: #467ada;
    border: 1px solid #467ada;
  }
`;
