import React from "react";
import ChartChart from "chart.js/auto";
import styled from "styled-components";
import { Card, Empty } from "antd";
import { Doughnut } from "react-chartjs-2";

const Pie = ({ userRate }) => {
  const userRateRidding = userRate.B ? userRate.B : 0;
  const userRateRunning = userRate.R ? userRate.R : 0;

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: true, // 반응형 자동 높이설정 off
  };

  const labels = ["라이딩", "러닝"];
  const data = {
    labels,
    datasets: [
      {
        label: ["라이딩", "러닝"],
        data: [userRateRidding, userRateRunning],
        backgroundColor: ["#0288D1", "#BBDEFB"],
      },
    ],
  };

  return (
    <PieDiv>
      {/* <TopCard> */}
      {/* <span className="title">나의 운동비율</span> */}
      {/* </TopCard> */}

      <CardWrapper>
        <h3>나의 운동비율</h3>
        {userRate ? (
          <Doughnut data={data} options={options} width={250} height={290} />
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="운동Data가 없습니다"
            style={{
              marginTop: 80,
            }}
          />
        )}
      </CardWrapper>
    </PieDiv>
  );
};

export default React.memo(Pie);

const PieDiv = styled.div`
  display: inline-block;
  width: 30%;
  margin-right: 3.3%;

  .ant-card {
    width: 100%;
    border-radius: 30px;
    margin: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 0 !important;
  }
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
