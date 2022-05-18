import "../styles/styles.js";
import Head from "next/head";
import { Global } from "../styles/styles.js";
import "antd/dist/antd.css";
import AppLayout from "../component/Layout/AppLayout.js";
import Link from "next/link";
import wrapper from "../store/configureStore";
import { CookiesProvider } from "react-cookie";
import { SessionProvider } from "next-auth/react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <SessionProvider session={session}>
        <CookiesProvider>
          <AppLayout>
            <Global />
            <Head>
              <meta charset="UTF-8" />
              <title>ペースメーカー</title>
              <link rel="icon" href="/riderFavicon.png" />
            </Head>
            {page}
          </AppLayout>
        </CookiesProvider>
      </SessionProvider>
    ));

  return getLayout(
    <SessionProvider session={session}>
      <CookiesProvider>
        <Global />
        <Head>
          <meta charset="UTF-8" />
          <title>ペースメーカー</title>
          <link rel="icon" href="/riderFavicon.png" />
        </Head>

        <Component {...pageProps} />
      </CookiesProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
