import React from "react";
import wrapper from "../store/configureStore";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { END } from "redux-saga";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USER_SEARCH_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { Card, Input, Avatar } from "antd";
import FollowButton from "../component/FollowButton";

function userSearch() {
  const { Search } = Input;

  const dispatch = useDispatch();
  const { searchUsers } = useSelector((state) => state.user);
  const handleButton = () => {
    const searchName = document.getElementById("searchName").value;
    dispatch({
      type: USER_SEARCH_REQUEST,
      data: searchName,
    });
  };

  return (
    <div style={{ marginTop: 70, padding: "2% 5% 0 5%" }}>
      <Search
        //   loading={searchmapLoading}
        onPressEnter={handleButton}
        placeholder="유저를 입력해주세요"
        enterButton
        // allowClear
        icon={<SearchOutlined />}
        id="searchName"
        size="large"
      />
      {searchUsers.map((m) => (
        <>
          <Card>
            <div>
              <Avatar size={58}>{m.profile}</Avatar>
            </div>

            {m.name}
            <br></br>
            {m.sex}
            <br></br>
            {m.mmr}
          </Card>
          <FollowButton post={m}></FollowButton>
        </>
      ))}
    </div>
  );
}

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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default userSearch;
