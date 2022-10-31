import React, { useState } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const { t } = useTranslation();

  const [isSide, setIsSide] = useState(false);

  const showSide = () => {
    setIsSide((prev) => !prev);
  };
  return (
    <div>
      <Layout>
        <SideBar isSide={!isSide} showSide={showSide} t={t} />
        <Layout
          style={{
            backgroundColor: "#467ada",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "#467ada",
              position: "fixed",
              top: 0,
              zIndex: 2,
            }}
          >
            <Header t={t} />
          </div>
          <Content
            style={{
              paddingTop: "2%",
              background: "#fff",
            }}
          >
            {children}
          </Content>
          <div
            style={{
              width: 50,
              height: 70,
              backgroundColor: "#467ada",
              position: "fixed",
              bottom: 0,
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: 50,
                height: 70,
                background: "#fff",
                borderBottomLeftRadius: 55,
              }}
            />
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "login",
      "layout",
      "badge",
      "notification",
    ])),
  },
});

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     return {
//       props: {
//         ...(await serverSideTranslations(context.locale, ["login", "layout"])),
//       },
//     };
//   }
// );
