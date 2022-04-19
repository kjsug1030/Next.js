import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import styled from "styled-components";
import { MdDirectionsBike } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import moment from "moment";

function SearchList({
  setTrackName,
  setInfoPosition,
  setPropsId,
  index,
  list,
  setStrokeWeight,
  setTarget,
}) {
  const { searchMap } = useSelector((state) => state.map);

  const strokeWeights = Array.from({ length: searchMap.length }, () => 3);

  function mouseOver(index) {
    strokeWeights[index] = 10;
    setStrokeWeight(strokeWeights);
  }

  function mouseOut(index) {
    strokeWeights[index] = 3;
    setStrokeWeight(strokeWeights);
  }

  const polylineClick = (positionData) => {
    setInfoPosition({
      lat: positionData.gps.coordinates[3][1],
      lng: positionData.gps.coordinates[3][0],
    });
    setPropsId(positionData._id);
    // (positionData)
    setTrackName(positionData.trackName)
    setTarget(true);
  };

  console.log({ list });

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("YYYY년 MM월 DD일");
  };

  return (
    <Container>
      <Card hoverable>
        <DivDiv>
          <LeftDiv>
            <MdDirectionsBike size={90} />
          </LeftDiv>
          <RightDiv>
            <h1
              // type="button"
              onClick={() => polylineClick(list)}
              onMouseOver={() => mouseOver(index)}
              onMouseOut={() => mouseOut(index)}
            >
              {list.trackName}
            </h1>
            <p>Bike</p>
            <p>{list.description}</p>
            <p>{dateFormat(list.createdAt)}</p>
          </RightDiv>
        </DivDiv>

        {/* <Card.Meta
      
      description={list.name}
      >
          
      </Card.Meta> */}
      </Card>
    </Container>
  );
}

export default SearchList;
const Container = styled.div`
  display: inline-block;
  width: 100%;
  height: 170px;
  margin-bottom: 20px;

  .ant-card {
    height: 170px;
    border-radius: 9px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  .ant-card-body {
    padding: 0 !important;
  }
`;

const DivDiv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
`;

const LeftDiv = styled.div`
  display: inline-block;
  width: 30%;
  height: 170px;
  padding: 10px;
  background: #1890ff;
  // background: linear-gradient(to right, #66b5ff, #3fa3ff, #1890ff);
  border-radius: 9px 0 0 9px;
  z-index: 1;

  svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  // height: 170px;
  // border: 1px solid grey;
  // padding: 10px;
  margin: 0;

  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    font-weight: none;
    margin: 6px 0;
  }
`;