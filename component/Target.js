import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
import MissionCard from "./MissionCard";
import { useSelector } from "react-redux";
import moment from "moment";

const Target = () => {
  const { weathers } = useSelector((state) => state.user);
  const weatherIcon = `http://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`;

  const [isDate1, setIsDate1] = useState(false);
  const [isDate2, setIsDate2] = useState(false);

  const onChangeIsDate1 = () => {
    setIsDate1(true);
    setIsDate2(false);
  };

  const onChangeIsDate2 = () => {
    setIsDate2(true);
    setIsDate1(false);
  };

  // const now = moment().format("DD"); // 현재날짜
  const now = moment(); // 현재 전체 날짜
  const nowDay = now.day();
  const day = now.format("DD"); // 현재 몇일인지
  const nextDay = now.add(1, "d").format("DD"); // 내일 날짜

  const getToday = (now) => {
    // 요일구별기
    // let now = moment().day();
    let week = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    const todayLabel = week[now];

    return todayLabel;
  };

  return (
    <Container>
      <Card hoverable>
        <div className="date">
          <DateCard className="date1" title={getToday(nowDay)}>
            {day}
          </DateCard>
          {weathers.name === "Daegu" ? <h1>대구의 현재날씨</h1> : null}
        </div>

        {/* <TitleCard className="titleCard">
          <p>Weather</p>
        </TitleCard> */}

        <WeatherWrapper>
          <img src={weatherIcon} alt="" width="50%" height="130px" />
          {/* <p>{weathers.weather[0].description}</p> */}

          <div style={{ paddingLeft: 5 }}>
            <p>현재기온 : {(weathers.main.temp - 273.15).toFixed(1)}</p>

            <p>최저기온 : {(weathers.main.temp_min - 273.15).toFixed(1)}</p>
            <p>최고기온 : {(weathers.main.temp_max - 273.15).toFixed(1)}</p>
            <p>풍속 : {weathers.wind.speed}</p>

            <p className="des">{weathers.weather[0].description}</p>
          </div>
        </WeatherWrapper>
      </Card>
    </Container>
  );
};

export default Target;

const WeatherWrapper = styled.div`
  display: flex;
  position: relative;
  bottom: 5px;

  p {
    font-size: 16px;
    margin-bottom: 3px;
    font-weight: bold;
  }

  .des {
    position: relative;
    right: 95%;
    bottom: 17%;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }

  // img {
  //   position: relative;
  //   bottom: 20%;
  // }

  div {
    margin-top: 20px;
  }
`;

const Container = styled.div`
  display: inline-block;
  width: 30%;
  max-width: 340px;
  // overflow: auto;
  text-overflow: clip;
  white-space: nowrap;
  margin-top: 39px;

  .ant-card {
    width: 100%;
    height: 290px;
    border-radius: 30px;
    padding: 0;
    margin: 0;
    transition: all 0.6s;
  }

  .ant-card-hoverable:hover {
    transform: translateY(-15px);
  }

  .ant-card-body {
    width: 100%;
    // padding: 24px 12px;
    padding: 0;
    // padding-bottom: 6px;
  }

  .date {
    display: flex;
    margin-bottom: 10px;

    h1 {
      font-size: 18px;
      font-weight: bold;
      margin-top: 45px;
    }

    p {
      font-weight: bold;
    }
  }

  .date > .date1 {
    background: #467ada !important;
    color: #fff;
    margin-right: 10px !important;
    margin-left: 10px !important;

    .ant-card-head {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
  }

  .ant-card-hoverable:hover {
    .titleCard {
      transform: translateY(220px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 30px;
    }
  }
`;

const TitleCard = styled.div`
  display: inline-block;
  width: 50px;
  height: 130px;
  border: 1px solid grey;
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: 30px;
  writing-mode: tb-rl; // 글자 세로로
  // writing-mode: vertical-rl;
  // text-orientation: upright;

  font-size: 22px;
  font-weight: bold;
  color: #fff;
  background: #467ada;
  letter-spacing: 3px;
  padding: 10px 0;
  transition: all 1.2s;

  p {
    margin: 0;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DateCard = styled(Card)`
  width: 100px !important;
  height: 100px !important;

  border-radius: 17px !important;

  font-size: 35px;
  font-weight: bold;
  text-align: left;
  position: relative;
  bottom: 5px;

  color: #c4c7cf;

  //   box-shadow: none;

  .ant-card-head {
    min-height: 35px;
    padding: 0;
    text-align: left;
    font-size: 14px;
    // color: #c4c7cf !important;
    border-bottom: 1px solid #c4c7cf;
  }

  //   #ebedf3

  .ant-card-head-title {
    padding: 8px 0;
    position: relative;
    left: 12px;
  }

  .ant-card-body {
    padding: 0;
    padding-left: 12px !important;
  }
`;