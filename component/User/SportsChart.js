import React, { useRef, useEffect } from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Card, Badge } from "antd";

const SportsChart = ({ runWeekRecord, bikeWeekRecord }) => {
  const options = {
    plugins: {
      title: {
        display: false,
        text: "최근 일주일 운동통계",
      },
      legend: {
        position: "top",
        align: "end",
      },
    },
    // indexAxis: "y",
    responsive: true, // 반응형 설정
    borderRadius: Number.MAX_VALUE,
    borderSkipped: false,
    maintainAspectRatio: false, // 반응형 자동 높이설정 off
  };

  const labels = [
    "6일 전",
    "5일 전",
    "4일 전",
    "3일 전",
    "2일 전",
    "1일 전",
    "오늘",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "라이딩",
        data: [
          bikeWeekRecord.sixDayAgo,
          bikeWeekRecord.fiveDayAgo,
          bikeWeekRecord.fourDayAgo,
          bikeWeekRecord.threeDayAgo,
          bikeWeekRecord.twoDayAgo,
          bikeWeekRecord.oneDayAgo,
          bikeWeekRecord.today,
        ],
        backgroundColor: "rgb(53, 162, 235,0.8)",
      },
      {
        label: "러닝",
        data: [
          runWeekRecord.sixDayAgo,
          runWeekRecord.fiveDayAgo,
          runWeekRecord.fourDayAgo,
          runWeekRecord.threeDayAgo,
          runWeekRecord.twoDayAgo,
          runWeekRecord.oneDayAgo,
          runWeekRecord.today,
        ],
        backgroundColor: "rgb(75, 192, 192,0.8)",
      },
    ],
  };

  return (
    <Container>
      <TitleCard />
      <Card hoverable>
        <Bar data={data} options={options} height={140} />
      </Card>
    </Container>
  );
};

export default SportsChart;

const Container = styled.div`
  width: 500px;
  height: 250px;
  // position: absolute;
  // right: 0;
  margin-right: 30px;

  .ant-card {
    border-radius: 12px;
    padding: 0 !important;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 12px;
  }
`;

const TitleCard = styled(Card)`
  width: 100% !important;
  height: 10px;
  background: #467ada;
  border-top-left-radius: 9px !important;
  border-top-right-radius: 9px !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
`;
