import React from "react";
import { useHistory } from "react-router-dom";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import LoadingOverlay from "react-loading-overlay";
import { Redirect, Route, Switch } from "react-router-dom";
// import { useSelector } from "react-redux";
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));

const TheLayout = () => {
  const history = useHistory();
  //   const statusLoading = useSelector(state => state.globalLoading.status);
  let token = localStorage.getItem("accessToken");
  if (token === null) {
    history.push("/home");
  }

  return (
    <LoadingOverlay
      //   active={statusLoading}
      spinner
    >
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <TheHeader />
          <div className="break-line"></div>
          <div className="c-body">
            <TheContent />
          </div>
          {/* <TheFooter /> */}
        </div>
        {/* </div> */}
      </div>
    </LoadingOverlay>
  );
};

export default TheLayout;
