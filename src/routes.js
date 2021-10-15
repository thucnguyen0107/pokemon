import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Pokemon" },
  { path: "/dashboard", name: "Trang chủ", component: Dashboard },
];

export default routes;
