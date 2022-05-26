import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Polyline,
  Marker,
  StreetViewPanorama,
  MarkerClusterer,
} from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import Router from "next/router";
import {
  LOAD_MAP_REQUEST,
  LOAD_TRACK_MYRANK_REQUEST,
  LOAD_TRACK_RANK_REQUEST,
} from "../../reducers/map";
import {
  MOVING_MAP_REQUEST,
  BIKE_MAP_REQUEST,
  RUNNING_MAP_REQUEST,
  SEARCH_MAP_REQUEST,
  LOAD_MY_LOCATION_REQUEST,
} from "../../reducers/map";
import { Input, Button, Row, Col, Card, Pagination, Modal } from "antd";
import GeomHandle from "../GoogleMap";
import SearchList from "../SearchList";
import Link from "next/link";
import styled from "styled-components";
import wrapper from "../../store/configureStore";
import { SearchOutlined } from "@ant-design/icons";

var lat = 1;
var lng = 2;

function selectMap({}) {
  function success() {
    Modal.success({
      content: "현재위치검색중...",
      centered: true,
      icon: <LoadingOutlined />,
    });
  }

  const { myLocation } = useSelector((state) => state.map);

  const { me } = useSelector((state) => state.user);
  const [geom, setGeom] = useState();
  const { Search } = Input;

  const [loadMap, setLoadMap] = useState(false);
  useEffect(() => {
    success();
  }, []);

  useEffect(() => {
    if (loadMap === true) {
      Modal.destroyAll();
    }
  }, [loadMap]);

  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setGeom({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoadMap(true);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }

  const [isState, setIsState] = useState(false);
  const [mapState, setMapState] = useState("R");

  const dispatch = useDispatch();

  const mapContainerStyle = {
    // Google Map 스타일
    width: "88%",
    height: "85vh",
    borderRadius: "15px",
    position: "relative",
    left: "8%",
  };

  const { searchMap } = useSelector((state) => state.map);

  // const [geom ,setGeom]=useState({lat:35.969997373905, lng: 128.45170755523503})
  const [mapref, setMapRef] = useState(null);

  useEffect(() => {
    getLocation();
    console.log("loqwwqwqwqsaxcxc");
    if (mapref) {
      dispatch({
        type: LOAD_MY_LOCATION_REQUEST,
        data: {
          north: {
            lat: mapref.getBounds().getNorthEast().lat(),
            lng: mapref.getBounds().getNorthEast().lng(),
          },
          south: {
            lat: mapref.getBounds().getSouthWest().lat(),
            lng: mapref.getBounds().getSouthWest().lng(),
          },
          event: mapState,
        },
      });
    }

    // setTimeout(() => {
    //   runningSelectMap();
    // }, 1000);
  }, [loadMap]);

  const handleOnLoad = (map) => {
    setMapRef(map);
    console.log("load됨");
  };

  const handleCenterChanged = () => {
    dispatch({
      type: MOVING_MAP_REQUEST,
      data: {
        north: {
          lat: mapref.getBounds().getNorthEast().lat(),
          lng: mapref.getBounds().getNorthEast().lng(),
        },
        south: {
          lat: mapref.getBounds().getSouthWest().lat(),
          lng: mapref.getBounds().getSouthWest().lng(),
        },
        event: mapState,
      },
    });
  };

  //////markercluseter

  const optionss = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  //////markercluseter

  ///주소검색

  const { searchmapLoading } = useSelector((state) => state.map);

  const handleButton = async () => {
    const currentAddr = document.getElementById("address").value;
    if (currentAddr) {
      const { lat, lng } = await GeomHandle(currentAddr);
      setGeom({ lat: lat, lng: lng });

      dispatch({
        type: SEARCH_MAP_REQUEST,
        data: {
          north: {
            lat: mapref.getBounds().getNorthEast().lat(),
            lng: mapref.getBounds().getNorthEast().lng(),
          },
          south: {
            lat: mapref.getBounds().getSouthWest().lat(),
            lng: mapref.getBounds().getSouthWest().lng(),
          },
          event: mapState,
        },
      });
      console.log("aaa", searchMap);
    }
  };

  //주소검색

  //polyline

  //   const [propsPosition,setPropsPosition]=useState()

  const [propsId, setPropsId] = useState();

  const [infoPosition, setInfoPosition] = useState({
    lat: "",
    lng: "",
  });

  const [target, setTarget] = useState(false);
  const [trackName, setTrackName] = useState("");

  const [strokeWeight, setStrokeWeight] = useState(
    Array.from({ length: searchMap.length }, () => 3)
  );
  const strokeWeights = Array.from({ length: searchMap.length }, () => 3);

  const polylineClick = (positionData) => {
    setInfoPosition({
      lat: positionData.gps.coordinates[3][1],
      lng: positionData.gps.coordinates[3][0],
    });
    console.log("qqq", positionData);
    setPropsId(positionData._id);
    setTrackName(positionData.trackName);
    // setPropsPosition(positionData)
    setTarget(true);
  };

  function mouseOver(index) {
    strokeWeights[index] = 10;
    setStrokeWeight(strokeWeights);
  }

  function mouseOut(index) {
    strokeWeights[index] = 3;
    setStrokeWeight(strokeWeights);
  }

  //polyline

  //infoWindow
  const closeClick = () => {
    setTarget(false);
  };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  //infoWindow

  //   const [mapState,setMapState]=useState()
  // const {mapState}=useSelector((state)=>state.map)
  const bikeSelectMap = () => {
    setMapState("B");
    setIsState(true);
  };

  const runningSelectMap = () => {
    setMapState("R");
    setIsState(true);
  };

  useEffect(() => {
    if (mapState === "B" && isState === true) {
      dispatch({
        type: BIKE_MAP_REQUEST,
        data: {
          event: mapState,
          north: {
            lat: mapref.getBounds().getNorthEast().lat(),
            lng: mapref.getBounds().getNorthEast().lng(),
          },
          south: {
            lat: mapref.getBounds().getSouthWest().lat(),
            lng: mapref.getBounds().getSouthWest().lng(),
          },
        },
      });
      setIsState(false);
    } else if (mapState === "R" && isState === true) {
      dispatch({
        type: RUNNING_MAP_REQUEST,
        data: {
          event: mapState,
          north: {
            lat: mapref.getBounds().getNorthEast().lat(),
            lng: mapref.getBounds().getNorthEast().lng(),
          },
          south: {
            lat: mapref.getBounds().getSouthWest().lat(),
            lng: mapref.getBounds().getSouthWest().lng(),
          },
        },
      });
      setIsState(false);
    }
  }, [mapState, isState]);

  const [btn, setBtn] = useState(false);

  return (
    <Container>
      <CardDiv>
        <Row>
          <Col span={12}>
            <LeftDiv>
              <Title>코스찾기</Title>
              <div>
                <Search
                  loading={searchmapLoading}
                  onPressEnter={handleButton}
                  placeholder="코스를 입력해주세요"
                  enterButton
                  // allowClear
                  icon={<SearchOutlined />}
                  id="address"
                  size="large"
                />
                <Buttons>
                  {mapState === "B" ? (
                    <>
                      <Button className="btn1" onClick={runningSelectMap}>
                        달리기
                      </Button>
                      <Button
                        className="btn2"
                        onClick={bikeSelectMap}
                        style={{ background: "#467ada", color: "#fff" }}
                      >
                        자전거
                      </Button>
                    </>
                  ) : mapState === "R" ? (
                    <>
                      <Button
                        className="btn1"
                        onClick={runningSelectMap}
                        style={{ background: "#467ada", color: "#fff" }}
                      >
                        달리기
                      </Button>
                      <Button className="btn2" onClick={bikeSelectMap}>
                        자전거
                      </Button>
                    </>
                  ) : null}
                </Buttons>
              </div>
              {/* <RowDiv gutter={[0, 16]}> */}
              <div
                className="scroll"
                style={{
                  // overflowY: "scroll",
                  // overflow: "hidden",
                  height: 600,
                  overflowY: "scroll",
                  // msOverflowStyle: "none",
                }}
              >
                {searchMap.map((p, index) => (
                  <SearchList
                    setTrackName={setTrackName}
                    setInfoPosition={setInfoPosition}
                    setPropsId={setPropsId}
                    setTarget={setTarget}
                    index={index}
                    setStrokeWeight={setStrokeWeight}
                    list={p}
                    key={p.id}
                  />
                ))}
              </div>
            </LeftDiv>
          </Col>

          <Col span={12}>
            <LoadScript googleMapsApiKey="AIzaSyCyttJXmotwzGJhLd0hnVDQ0TxOG-Uonwg">
              <GoogleMap
                id="marker-example"
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={geom}
                onLoad={handleOnLoad}
                onDragEnd={handleCenterChanged}
                // onZoomChanged={handleCenterChanged}
              >
                <MarkerClusterer options={optionss}>
                  {(clusterer) =>
                    searchMap.map((p) => (
                      <Marker
                        key={createKey(p)}
                        position={{
                          // lat: p.start_latlng[1],
                          // lng: p.start_latlng[0],
                          lat: p.gps.coordinates[0][1],
                          lng: p.gps.coordinates[0][0],
                        }}
                        clusterer={clusterer}
                        icon={{
                          scaledSize: new google.maps.Size(30, 30),
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>

                {searchMap.map((m, index) => (
                  <Polyline
                    onRightClick={() => polylineClick(m)}
                    onMouseOver={() => mouseOver(index)}
                    onMouseOut={() => mouseOut(index)}
                    options={{
                      strokeWeight: strokeWeight[index],
                      clickable: true,
                      visible: true,
                      strokeColor: "#FF0000",
                      fillColor: "#FF0000",
                    }}
                    path={m.gps.coordinates.map((p) => ({
                      lat: p[1],
                      lng: p[0],
                    }))}
                  ></Polyline>
                ))}

                {target && (
                  <InfoWindow position={infoPosition} onCloseClick={closeClick}>
                    <div style={divStyle}>
                      <h1>{trackName}</h1>

                      <button>
                        <a href={"Route/" + propsId}>상세보기</a>
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </Col>
        </Row>
      </CardDiv>
    </Container>
  );
}

export default selectMap;

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  // context.store.dispatch({
  //   type: LOAD_MY_LOCATION_REQUEST,
  //   data: {
  //     north: {
  //       lat: mapref.getBounds().getNorthEast().lat(),
  //       lng: mapref.getBounds().getNorthEast().lng(),
  //     },
  //     south: {
  //       lat: mapref.getBounds().getSouthWest().lat(),
  //       lng: mapref.getBounds().getSouthWest().lng(),
  //     },
  //     event: mapState,
  //   },
  // });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
const Container = styled.div`
  // 전체 div
  width: 100%;
  height: 100%;
  // padding-top: 1%;
  ant-btn {
    background: #467ada;
    border-color: #467ada;
    color: #fff;
  }

  .ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 !important;
    border-top-right-radius: 15px !important;
    border-bottom-right-radius: 15px !important;
    border-radius: 1px solid #467ada;
    background: #467ada;
  }

  .ant-input {
    border-radius: 15px;
    border-radius: 1px solid #467ada;
  }

  .ant-input-group-wrapper {
    margin-bottom: 20px;
  }

  .ant-input-group {
    width: 90%;
    width: 100%;
    // margin: 0 auto;
  }

  .ant-input-search {
    border-radius: 9px !important;
    // position: relative;
    // right: 15px;
    // z-index: 1;
  }

  .ant-input-search-button {
    // border-radius: 55% !important;
    // border-top-right-radius: 9px !important;
    // border-bottom-right-radius: 9px !important;
  }

  .ant-card {
    width: 100%;
    border-radius: 9px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
    margin: 0;
  }

  .ant-card-hoverable:hover {
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
    cursor: default !important;
  }
`;

const mapContainerStyle = {
  // Google Map 스타일
  width: "100%",
  height: "80vh",
  borderRadius: "15px",
  padding: "0 30px",
};

export const CardDiv = styled(Card)`
  width: 100%;

  border-radius: 15px;
  box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);

  .ant-card-body {
    padding: 10px;
  }
`;

// const RightDiv = styled.div``;

const LeftDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 5%;
  // overflow-y: scroll;

  .scroll {
    -ms-overflow-style: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .ant-btn-primary {
    border-color: #467ada;
    background: #467ada;
  }
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin: 20px auto;
  margin-top: 0;
`;

const Page = styled(Pagination)`
  position: absolute;
  left: 34%;
  bottom: 1%;
  margin-top: 32px;
  text-align: center;
`;

const Buttons = styled.div`
  display: inline-block;
  width: 90%;
  width: 100%;
  margin-bottom: 20px;

  Button {
    height: 33px;
    border-radius: 15px;
    margin-right: 10px;
  }

  Button:hover {
    background: #467ada;
    border-color: #467ada;
    color: #fff;
  }

  // Button:focus {
  //   background: #467ada;
  //   color: #fff;
  // }
`;

const RowDiv = styled(Row)`
  display: inline-block;
  width: 100%;
  height: 75%;
  // border: 1px solid grey;
  padding-bottom: 30px;
`;
