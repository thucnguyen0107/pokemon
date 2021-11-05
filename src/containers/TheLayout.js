import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TheContent, TheFooter, TheHeader } from "./index";
import LoadingOverlay from "react-loading-overlay";

const TheLayout = () => {
  const history = useHistory();
  //   const statusLoading = useSelector(state => state.globalLoading.status);
  let token = localStorage.getItem("accessToken");

  async function getProvider() {
    if ("solana" in window) {
      await window.solana.connect(); // opens wallet to connect to
      if (!window.solana.isConnected) {
        localStorage.removeItem("accessToken");
      }
    }
  }

  useEffect(() => {
    getProvider()
      .then(() => {
        console.log("connected");
      })
      .catch((err) => console.log(err));
  }, []);

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
          <div className="c-body content-body">
            <TheContent />
          </div>
          <div className="break-line"></div>
          <TheFooter />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default TheLayout;
