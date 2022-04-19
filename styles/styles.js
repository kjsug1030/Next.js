import styled, { createGlobalStyle } from "styled-components";
import { DingtalkOutlined } from "@ant-design/icons";
import { Layout, Avatar } from "antd";
const { Header, Sider } = Layout;

export const Global = createGlobalStyle`
* {
  box-sizing: border-box;
  
}
html,
body {
  padding: 0;
  margin: 0;
  // font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  //   Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  font-family: 'Noto Sans','Noto Sans Japanese', sans-serif !important;
}
// 노토 산스 구글 폰트

a {
  color: inherit;
  text-decoration: none;
}
.ant-layout {
  margin:0;
  padding:0;
}
.ant-card {
  box-shadow: 0 5px 15px 0 rgb(0 0 0 / 10%) !important;
}

.ant-card-hoverable:hover {
  box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%) !important;
  cursor: default !important;
}
`;
