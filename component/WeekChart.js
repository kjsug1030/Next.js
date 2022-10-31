import React, { useRef, useEffect } from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";

const WeekChart = ({ weekRecord, weekBikeRecord, t }) => {
  // const { t } = useTranslation("week");

  const options = {
    plugins: {
      title: {
        display: false,
        text: t("week:title"),
        // text: "최근 일주일 운동통계",
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
    t("week:6day"),
    t("week:5day"),
    t("week:4day"),
    t("week:3day"),
    t("week:2day"),
    t("week:1day"),
    t("week:today"),
    // "6일 전",
    // "5일 전",
    // "4일 전",
    // "3일 전",
    // "2일 전",
    // "1일 전",
    // "오늘",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: t("week:cycling"),
        // label: "라이딩",
        data: [
          weekBikeRecord.sixDayAgo,
          weekBikeRecord.fiveDayAgo,
          weekBikeRecord.fourDayAgo,
          weekBikeRecord.threeDayAgo,
          weekBikeRecord.twoDayAgo,
          weekBikeRecord.oneDayAgo,
          weekBikeRecord.today,
        ],
        backgroundColor: "rgb(53, 162, 235,0.8)",
      },
      {
        label: t("week:running"),
        // label: "러닝",
        data: [
          weekRecord.sixDayAgo,
          weekRecord.fiveDayAgo,
          weekRecord.fourDayAgo,
          weekRecord.threeDayAgo,
          weekRecord.twoDayAgo,
          weekRecord.oneDayAgo,
          weekRecord.today,
        ],
        backgroundColor: "rgb(75, 192, 192,0.8)",
      },
    ],
  };

  return (
    <Container>
      <TitleCard />
      <Card hoverable>
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

    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 12px;
  }

  .title {
    display: inline-block;
    width: 100%;
    max-width: 250px;
    height: 35px;
    line-height: 30px;
    text-align: left;
    background: #467ada;
    color: #fff;
    padding-left: 15px;
    font-size: 22px;
    font-weight: bold;
    clip-path: polygon(65% 0%, 100% 100%, 100% 100%, 0 100%, 0 0);
    // position: relative;
    position: absolute;
    // left: 1px;
    top: -3%;
    top: 14px;
    z-index: 1;
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

  // box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%) !important;
`;
