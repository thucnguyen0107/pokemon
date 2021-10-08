import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const Home = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  async function connect() {
    try {
      await activate(injected);
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
        <span onClick={connect}>Go to your collection</span>
        {/* {active ? 'a' : 'b '} */}
      </div>

      {/* </Container> */}
    </div>
  );
};
export default Home;
