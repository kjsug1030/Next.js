import React, { useRef, useEffect } from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";

const WeekChart = ({ weekRecord, weekBikeRecord }) => {
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
        data: [weekBikeRecord.sixDayAgo, weekBikeRecord.fiveDayAgo, weekBikeRecord.fourDayAgo, weekBikeRecord.threeDayAgo,weekBikeRecord.twoDayAgo,weekBikeRecord.oneDayAgo, weekBikeRecord.today],        backgroundColor: "rgb(53, 162, 235,0.8)",
      },
      {
        label: "러닝",
        data: [weekRecord.sixDayAgo, weekRecord.fiveDayAgo, weekRecord.fourDayAgo, weekRecord.threeDayAgo,weekRecord.twoDayAgo,weekRecord.oneDayAgo, weekRecord.today],
        backgroundColor: "rgb(75, 192, 192,0.8)",
      },
    ],
  };

  return (
    <Container>
      <Card>
        <Bar data={data} options={options} height={300} />
      </Card>
    </Container>
  );
};

export default WeekChart;

const Container = styled.div`
  width: 70%;
  height: 300px;

  .ant-card {
    border-radius: 12px;
    padding: 0 !important;
  }

  .ant-card-body {
    width: 100%;
    padding: 12px;
  }
`;