import Web3 from "web3";
import pokemonApi from "../contracts/pokemonAbi.json";
let selectedAccount;

const providerUrl = Web3.givenProvider;

const web3 = new Web3(providerUrl);

let nftContract = false;

let isInitialized;

export const init = async () => {
  let provider = window.ethereum;
  // const networkId = await web3.eth.net.getId();
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(selectedAccount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  window.ethereum.on("accountsChanged", (accounts) => {
    selectedAccount = accounts[0];
    console.log(`selected account changed to ${selectedAccount}`);
  });

  nftContract = new web3.eth.Contract(
    pokemonApi,
    "0xC0f930eeF370AbACfaD4eA510f40566F9E9B9145"
  );

  isInitialized = true;
};

export const mintToken = async () => {
  if (!isInitialized) {
    await init();
  }

  return nftContract.methods
    .createPokemon(selectedAccount, 4)
    .send({ from: selectedAccount });
};

export const getNetWorkId = web3.eth.getBalance(
  "0x9E8a6Da8f1740d18a3eAf2DDCe1f58d29f7c43C8"
);
