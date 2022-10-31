import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";
import MissionCard from "./MissionCard";
import { useSelector } from "react-redux";
import moment from "moment";

const Target = ({ t }) => {
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
      t("index:sunday"),
      t("index:monday"),
      t("index:tuesday"),
      t("index:wednesday"),
      t("index:thursday"),
      t("index:friday"),
      t("index:saturday"),
      // "일요일",
      // "월요일",
      // "화요일",
      // "수요일",
      // "목요일",
      // "금요일",
      // "토요일",
    ];

    const todayLabel = week[now];

    return todayLabel;
  };

  return (
    <Container>
      <Card hoverable>
        <DateCard className="date1" title={getToday(nowDay)}>
          {day}
        </DateCard>
        {weathers.weather[0].id === 800 &&
        weathers.weather[0].icon === "01d" ? (
          // <img className="img_icon" src="/sunny.png" />
          <img className="img_icon" src="/sunrise.png" />
        ) : weathers.weather[0].icon === "01n" ? (
          <img className="img_icon" src="/moon.png" />
        ) : weathers.weather[0].icon === "04d" || "04d" ? (
          <img className="img_icon" src="/clouds.png" />
        ) : (
          <img src={weatherIcon} className="icon" />
        )}
        <p className="wind_speed">
          {t("index:speed")} : {weathers.wind.speed}m/s
          {/* 풍속 */}
        </p>

        <WeatherWrapper>
          <p className="main_temp">
            {(weathers.main.temp - 273.15).toFixed(0)}
          </p>
          <img
            className="temp_img"
            // src="https://cdn-icons-png.flaticon.com/512/808/808569.png"
            src="/circle.png"
          />
          <div className="right_div">
            <p className="des">{weathers.weather[0].description}</p>
            {weathers.name === "Daegu" ? <p>{t("index:area")}</p> : null}
            {/* 경상북도 칠곡군 */}
            {/* {weathers.name} */}
          </div>

          {/* <div style={{ paddingLeft: 5 }}>

            <p>최저기온 : {(weathers.main.temp_min - 273.15).toFixed(1)}</p>
            <p>최고기온 : {(weathers.main.temp_max - 273.15).toFixed(1)}</p>
            

            
          </div> */}
        </WeatherWrapper>
      </Card>
    </Container>
  );
};

export default Target;

const WeatherWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  // background: skyblue;
  border-top: 1px solid #467ada;
  border-bottom: 1px solid #467ada;
  // border-bottom: 2px solid #f2f7fe;
  margin-top: 100px;
  // position: relative;
  // bottom: 5px;

  position: absolute;
  bottom: 18px;

  padding: 0 20px;

  .main_temp {
    font-size: 40px;
    line-height: 55px;
  }

  p {
    font-size: 16px;
    margin-bottom: 3px;
    // font-weight: bold;
  }

  .temp_img {
    width: 10px;
    height: 10px;
    position: relative;
    // left: 2%;
    top: 5px;
  }

  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;

  .right_div {
    display: block;
    margin-left: 10px;
    // margin: 0 10px;
  }
`;

const Container = styled.div`
  display: inline-block;
  width: 28%;
  // max-width: 340px;
  // overflow: auto;
  text-overflow: clip;
  white-space: nowrap;
  margin-top: 40px;
  margin-bottom: 10px;

  .icon {
    width: 190px;
    height: 190px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20%;
  }

  .img_icon {
    width: 130px;
    height: 130px;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translateX(-50%);
  }

  .ant-card {
    width: 100%;
    height: 300px;
    // height: 340px;
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

  .date1 {
    background: #467ada !important;
    color: #fff;
    // margin-right: 10px !important;
    // margin-left: 10px !important;

    .ant-card-head {
      color: #fff;
      border-bottom: 1px solid #fff;
    }

    z-index: 3;
  }

  .ant-card-hoverable:hover {
    .titleCard {
      transform: translateY(220px);
      border-top-right-radius: 0;
      border-bottom-right-radius: 30px;
    }
  }

  .wind_speed {
    position: absolute;
    right: 17px;
    top: 5px;
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
  position: absolute;
  top: -15px;
  left: 10px;

  color: #c4c7cf;

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
