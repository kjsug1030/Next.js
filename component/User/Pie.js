import React from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Card, Empty } from "antd";
import { Doughnut } from "react-chartjs-2";

const FollowerPie = ({ bikePercentage, runPercentage, t }) => {
  const userRateRidding = bikePercentage ? bikePercentage : 0;
  const userRateRunning = runPercentage ? runPercentage : 0;

  const options = {
    plugins: {
      // title: {
      //   display: true,
      //   text: "운동비율",
      // },
      legend: {
        position: "bottom",
        // display: false
      },
    },

    responsive: true,
    maintainAspectRatio: true, // 반응형 자동 높이설정 off
  };

  const labels = [t("index:cycling"), t("index:running")];
  const data = {
    labels,
    datasets: [
      {
        label: [t("index:cycling"), t("index:running")],
        data: [userRateRidding, userRateRunning],
        backgroundColor: ["#0288D1", "#BBDEFB"],
      },
    ],
  };

  return (
    <PieDiv hoverable>
      <TitleCard />
      <CardWrapper hoverable>
        <h3>{t("index:title1")}</h3>
        {bikePercentage || runPercentage ? (
          <Doughnut
            data={data}
            options={options}
            // width={150} height={150}
            // width={130}
            // height={130}
          />
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={t("index:description1")}
            style={{
              marginTop: 80,
            }}
          />
        )}
      </CardWrapper>
    </PieDiv>
  );
};

export default React.memo(FollowerPie);

const PieDiv = styled.div`
  display: inline-block;
  // width: 240px;
  // height: 140px; 스몰버젼
  // width: 255px;
  width: 200px;
  height: 200px;

  .ant-card {
    width: 100%;
    border-radius: 24px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 0 !important;
  }

  .ant-empty-description {
    padding-bottom: 15px;
  }
`;

const CardWrapper = styled(Card)`
  width: 100%;
  text-align: center;
  // margin-top: 5px;
  // margin-right: 20px !important;
  // z-index: 1;

  h3 {
    font-weight: bold;
    font-size: 20px;
    position: relative;
    top: 10px;
    margin-bottom: 10px;
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
