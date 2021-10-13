import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getNetWorkId } from "../../helpers/CommonHelper";

const Home = () => {
  const history = useHistory();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isInitialized, setInitialized] = useState(false);
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("accessToken", "123");
      history.push("/dashboard");
    }
  }, [isInitialized]);

  // const web3 = new Web3();
  async function connect() {
    try {
      await activate(injected);
      setInitialized(true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="home-page ">
      {/* <Container className=""> */}
      <div className="colection">
        <span onClick={connect}>Connect</span>
        {/* {active ? 'a' : 'b '} */}
      </div>

      {/* </Container> */}
    </div>
  );
};
export default Home;
