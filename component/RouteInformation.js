import React from "react";

import { Card, Avatar, Image } from "antd";
import RunningChart from "./RunningChart";
import BikeChart from "./BikeChart";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import { FaRunning } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Affix, Button } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ja";

function RouteInformation({ t }) {
  const { loadMap } = useSelector((state) => state.map);

  const dateFormat = (d) => {
    let date = moment(d);
    return date.format("date");
  };

  return (
    <Container>
      <Card
        title={t("name1")}
        // title="코스만든사람정보"
        hoverable
        style={{
          width: "100%",
        }}
        bordered
      >
        <DivWrapper>
          <Avatar size={58} src={loadMap.user.profile} />
          <div>
            <p>
              {t("name2")}:{loadMap.user.name}
            </p>
            <p>
              {t("des")} : {loadMap.description}
            </p>
            <p>
              {t("courseDate")} : {dateFormat(loadMap.createdAt)}
            </p>
            {/* <p>코스만든사람이름:{loadMap.user.name}</p>
            <p>코스설명 : {loadMap.description}</p>
            <p>생성날짜 : {dateFormat(loadMap.createdAt)}</p> */}
          </div>
        </DivWrapper>
      </Card>
    </Container>
  );
}

export default RouteInformation;

// const Container = styled.div`
//   width: 100%;

// `;
const Container = styled.div`
  width: 100%;

  .ant-card {
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%);
  }

  .ant-card-head {
    min-height: 45px;
    line-height: 45px;
    background: #467ada;
    font-size: 20px;
    // font-weight: bold;
    color: #fff;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
  }

  .ant-card-body {
    padding: 20px;
    height: 120px;
  }

  .ant-card-head-title,
  .ant-card-extra {
    padding: 0;
  }

  a {
    color: #fff;
  }

  p {
    margin: 0;
  }
`;

const DivWrapper = styled.div`
  display: flex;
  padding-top: 8px;

  .ant-avatar {
    margin-right: 20px;
    // padding-top: 3px;
  }
`;
