import React from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Card } from "antd";
import { Doughnut } from "react-chartjs-2";

const Pie = ({ userRate }) => {

  const userRateRidding=userRate.R?userRate.R:0
  const userRateRunning=userRate.B?userRate.B:0

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: false,
    maintainAspectRatio: true, // 반응형 자동 높이설정 off
  };

  const labels = ["러닝", "달리기"];
  const data = {
    labels,
    datasets: [
      {
        label: ["러닝", "달리기"],
        data: [userRateRidding, userRateRunning],
        backgroundColor: ["#0288D1", "#BBDEFB"],
      },
    ],
  };

  return (
    <PieDiv>
      <CardWrapper>
        <h3>나의 운동비율</h3>
        <Doughnut data={data} options={options} width={290} height={280} />
      </CardWrapper>
    </PieDiv>
  );
};

export default React.memo(Pie);

const PieDiv = styled.div`
  display: inline-block;
  // width: 30%;
  // margin-right: 3.3%;
  // max-width: 230px;

  // min-height: 450px;
  // height: 400px;

  .ant-card {
    width: 100%;
    border-radius: 30px;
    margin: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 0 !important;
  }

  //   @media Screen and (max-width: 1280px) {
  //     width: 50%;
  //     height: 100%;
  //   }

  //   @media Screen and (max-width: 767px) {
  //     width: 100%;
  //     height: 100%;
  //   }
`;

const CardWrapper = styled(Card)`
  width: 100%;
  height: 350px;
  text-align: center;
  margin-top: 5px;
  margin-right: 20px !important;
  z-index: 1;

  h3 {
    // padding: 15px;
    font-weight: bold;
    font-size: 22px;
    position: relative;
    top: 10px;
    margin-bottom: 30px;
  }
`;