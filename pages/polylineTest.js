import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  Polyline,
  Marker,
  StreetViewPanorama,
  MarkerClusterer,
} from "@react-google-maps/api";

import {
  BIKE_MAP_REQUEST,
  LOAD_MY_LOCATION_REQUEST,
  LOAD_MY_LOCATION_SUCCESS,
  SEARCH_MAP_REQUEST,
} from "../reducers/map";
import { LOAD_MAP_REQUEST } from "../reducers/map";
import GeomHandle from "../component/GoogleMap";
import { Input, Col, Row, Button } from "antd";
import SideBar from "../component/Layout/SideBar";
import { InfoWindow } from "@react-google-maps/api";
import Router from "next/router";
// import {useHistory} from
import Link from "next/link";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST, NOTIFICATION_REQUEST } from "../reducers/user";
import axios from "axios";
import SelectMap from "../component/map/selectMap";
import wrapper from "../store/configureStore";
// import InfoWindow from '../component/InfoWindow';
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function polylineTest() {
  const { t } = useTranslation();

  return (
    <Container>
      <SelectMap t={t} />
    </Container>
  );
}

//
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
      type: NOTIFICATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "layout",
          "login",
          "badge",
          "profile",
        ])),
      },
    };
  }
);

export default React.memo(polylineTest);

const Container = styled.div`
  padding: 0 3%;
  padding-top: 60px;
`;
