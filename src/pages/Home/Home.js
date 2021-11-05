import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  // const { active, account, library, connector, activate, deactivate } =
  //   useWeb3React();
  // const [isInitialized, setInitialized] = useState(false);
  // const injected = new InjectedConnector({
  //   supportedChainIds: [1, 3, 4, 5, 42],
  // });

  // useEffect(() => {
  //   if (isInitialized) {
  //     localStorage.setItem("accessToken", "123");
  //     history.push("/dashboard");
  //   }
  // }, [isInitialized]);

  // const web3 = new Web3();
  async function getProvider() {
    if ("solana" in window) {
      await window.solana.connect(); // opens wallet to connect to
      if (window.solana.isConnected) {
        localStorage.setItem("accessToken", "123");
        history.push("/dashboard");
      } else {
        localStorage.removeItem("accessToken");
      }
      const provider = window.solana;
      if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
      }
    } else {
      document.write("Install https://www.phantom.app/");
    }
  }

  // window.onload = () => {
  //   getProvider()
  //     .then((provider) => {
  //       console.log("key", provider.publicKey.toString());
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // async function disconnect() {
  //   try {
  //     deactivate();
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

  // async function solanaConnect() {
  //   const solConnection = new anchor.web3.Connection(
  //     //@ts-ignore
  //     customRpcUrl || web3.clusterApiUrl(env),
  //   );
  //   return solConnection
  // }
  return (
    <div className="home-page ">
      {/* <Container className=""> */}
      <div className="colection">
        <span onClick={getProvider}>Connect</span>
        {/* {active ? 'a' : 'b '} */}
      </div>

      {/* </Container> */}
    </div>
  );
};
export default Home;
