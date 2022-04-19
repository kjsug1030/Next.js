import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import MissionCard from "./MissionCard";

const Target = () => {
  return (
    <Container>
      <Card>
        <div className="date">
          <DateCard className="date1" title="월요일">
            11
          </DateCard>
          <DateCard title="화요일">12</DateCard>
          {/* <DateCard className="date2" title="수요일">
            14
          </DateCard> */}
        </div>
        <MissionCard />
      </Card>
    </Container>
  );
};

export default Target;

const Container = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 340px;

  .ant-card {
    width: 100%;
    height: 350px;
    border-radius: 30px;
    padding: 0;
    margin: 0;
  }

  .ant-card-body {
    width: 100%;
    padding: 24px 12px;
    padding-bottom: 6px;
  }

  .date {
    display: flex;
    margin-bottom: 10px;
  }

  .date > .date1 {
    background: #1b5cff !important;
    color: #fff;
    margin-right: 10px !important;

    .ant-card-head {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
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
