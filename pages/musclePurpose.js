import React, { useEffect, useState } from "react";
import { Calendar, Card, Alert, Button, Modal } from "antd";
import { moment } from "moment";
import styled from "styled-components";
import axios from "axios";
import {
  ALL_GOAL_REQUEST,
  LOAD_MY_INFO_REQUEST,
  NOTIFICATION_REQUEST,
} from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import Purpose from "./purposeModal";
import { useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import Information from "./purposeInformation";

function onPanelChange(value, mode) {
  console.log(value.format("YYYY-MM-DD"), mode);
}

const musclePurpose = () => {
  const { goalpurpose, allPurpose } = useSelector((state) => state.user);

  const calendarRef = useRef(null);

  // const [calendarEvent,setCalendarEvent]=useState([])
  const calendarEvent = [];
  if (allPurpose) {
    for (var i = 0; i < allPurpose.length; i++) {
      if (allPurpose[i].event == "B") {
        var tdate = new Date(allPurpose[i].lastDate);
        calendarEvent.push({
          id: allPurpose[i].id,
          title: allPurpose[i].title,
          start: allPurpose[i].firstDate,
          end: tdate,
          color: "#0000FF",
          textColor: allPurpose[i].goalDistance,
        });
      } else {
        console.log("qqqqq", allPurpose[i].lastDate);
        var tdate = new Date(allPurpose[i].lastDate);
        console.log("dddddd", tdate);
        calendarEvent.push({
          id: allPurpose[i].id,
          title: allPurpose[i].title,
          start: allPurpose[i].firstDate,
          end: tdate,
          color: "#008000",
          textColor: allPurpose[i].goalDistance,
        });
        // calendarEvent.push({id:allPurpose[i].id,title:allPurpose[i].title,start:allPurpose[i].firstDate,end:allPurpose[i].lastDate,color:'#008000',textColor:allPurpose[i].goalDistance})
      }
    }
  }

  //   useEffect(()=>{
  //     console.log('asdasdsa')
  // Modal.destroyAll();
  //   },[goalpurpose])

  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(true);
  };

  const openModal = () => {
    setIsModal((prev) => !prev);
    console.log(isModal);
  };

  const [information, setInformation] = useState({});
  const [informationModal, setInformationModal] = useState(false);

  const showInformationModal = () => {
    setInformationModal(true);
  };

  const openInformationModal = () => {
    setInformationModal((prev) => !prev);
  };
  const asd = (a) => {
    showInformationModal();
    setInformation(a.event);
    console.log(a);
  };

  return (
    <Container>
      <Purpose
        isModal={isModal}
        openModal={openModal}
        setIsModal={setIsModal}
      />
      <Title>운동목표</Title>
      <Card>
        {/* <Calendar onPanelChange={onPanelChange} /> */}
        <div>
          러닝
          <a
            style={{
              width: 300,
              marginLeft: 23,
              backgroundColor: "#008000",
              color: "#008000",
            }}
          >
            ㅇㅇㅇㅇ
          </a>
        </div>
        <div>
          자전거
          <a
            style={{
              width: 300,
              marginLeft: 10,
              backgroundColor: "#0000FF",
              color: "#0000FF",
            }}
          >
            ㅇㅇㅇㅇ
          </a>
        </div>
        <span>
          <Button type="primary" onClick={showModal} ghost>
            운동목표설정
          </Button>
        </span>
        <FullCalendar
          displayEventTime={false}
          eventClick={asd}
          events={calendarEvent}
          innerRef={calendarRef}
          plugins={[dayGridPlugin]}
          editable
          selectable
          // width="100%"
          height={680}
          style={{ maxWidth: "1000px" }}
        />

        <Information
          informationModal={informationModal}
          openInformationModal={openInformationModal}
          setInformationModal={setInformationModal}
          information={information}
        />
      </Card>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: ALL_GOAL_REQUEST,
    });
    context.store.dispatch({
      type: NOTIFICATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default musclePurpose;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 7px;
`;

const Container = styled.div`
  padding: 0 5%;
  padding-top: 55px;
  // position: relative;
  .ant-btn {
    // float: right;
    // position: relative;
    // right: 10%;
    // left: 82%;
    // top: 70%;
  }

  .ant-card {
    width: 100%;
    border-radius: 9px;
  }

  .ant-card-body {
    // padding: 28px 28px 0 28px;
  }

  fc-scrollgrid-sync-table {
    height: 40px !important;
  }

  .fc .fc-scrollgrid-liquid {
    // height: 55%;
    // max-height: 500px;
  }

  fc-view-harness fc-view-harness-active {
    // height: none;
  }

  fc-scroller fc-scroller-liquid-absolute {
    overflow-x: visible !important;
    overflow-y: visible !important;
  }

  .fc .fc-daygrid-day-frame {
    min-height: 0;
  }

  fc-scrollgrid fc-scrollgrid-liquid {
    width: 100% !important;
  }

  .fc .fc-scrollgrid {
    max-width: 100% !important;
  }

  .fc {
    max-width: 100% !important;
  }

  .ant-btn-background-ghost.ant-btn-primary {
    background: #467ada;
    border: 1px solid #467ada;
    color: #fff;
    height: 34px;
    // line-height: 34px;
    position: absolute;

    right: 182px;
    top: 70px;
    border-radius: 4px !important;
  }
`;
