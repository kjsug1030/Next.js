/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

const nextConfig = {
  /* config options here */
  // i18n,
  // withTM,
};

module.exports = withTM({
  i18n,
});
