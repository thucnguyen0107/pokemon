import {
  Connection,
  programs,
  Account,
} from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";

let metaplexConnection = new Connection("devnet");

const tokenPublicKey = "EzZ2d6be6oriRVsbRfdizMDtRzZtF5VBHrndxAL2LSGM";

let con = new web3.Connection("https://explorer-api.devnet.solana.com");

const getProvider = async () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      console.log("Is Phantom installed?  ", provider.isPhantom);
      return provider;
    }
  } else {
    window.open("https://www.phantom.app/", "_blank");
  }
};

export const run = async () => {
  try {
    const provider = await getProvider();
    const publicKey = provider.publicKey;
    // const tokenAccount = new Account(publicKey);

    // const asscociatedTokenAccountProgramId = publicKey;
    // const rentExemption = await con.getMinimumBalanceForRentExemption(82);

    //getTokenAccountsByOwner
    const pub = new PublicKey("CShvXEMjAu2RgfdXXeA8NgDeFxTwgdqqvgnAhhJ1oK52");
    const pub2 = new PublicKey("9ALXCEgcDs9CgAokZEgdxCaQSxf6Jb3j3LPu9xzV81fA");
    const getProgramAccounts = await con.getTokenLargestAccounts(pub);
    console.log(getProgramAccounts);

    // let acb = await new splToken.Token(
    //   con,
    //   publicKey,
    //   "HBCTt8JLqaNLpVccZDse531BD7Nn3SwnKUahhLRFhPS7",
    //   undefined
    // ).createAssociatedTokenAccount(publicKey);
    // const ppp = await acb.getMintInfo();
    // console.log(ppp);

    // const storeId = await actions.({ metaplexConnection, provider });
    // const creators = await Store.getWhitelistedCreators(metaplexConnection);
    // console.log("storeId: ", storeId);
    const account = new Account(publicKey);
    const ownedMetadata = await programs.metadata.Metadata.findByOwnerV2(
      metaplexConnection,
      publicKey
    );
    console.log(ownedMetadata);
    const store = await programs.metaplex.Store.load(
      metaplexConnection,
      publicKey
    );
    // Get all whitelisted creators
    const creators = await store.getWhitelistedCreators(metaplexConnection);
    console.log("creators: ", creators);
  } catch {
    console.log("Failed to fetch metadata");
  }
};

export const getCandyMachineState = async (
  anchorWallet,
  candyMachineId,
  connection
) => {
  const provider = await getProvider();

  const idl = await anchor.Program.fetchIdl(
    new anchor.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ"),
    provider
  );

  const program = new anchor.Program(
    idl,
    new anchor.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ"),
    provider
  );
  const candyMachine = {
    id: candyMachineId,
    connection,
    program,
  };

  const state = await program.account.candyMachine.fetch(candyMachineId);

  const itemsAvailable = state.data.itemsAvailable.toNumber();
  const itemsRedeemed = state.itemsRedeemed.toNumber();
  const itemsRemaining = itemsAvailable - itemsRedeemed;

  let goLiveDate = state.data.goLiveDate.toNumber();
  goLiveDate = new Date(goLiveDate * 1000);

  console.log({
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    goLiveDate,
  });

  return {
    candyMachine,
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    goLiveDate,
  };
};

export const getNftsFromWallet = async (mint) => {
  const provider = await getProvider();
  const publicKey = provider.publicKey;
  const ownedMetadata = await programs.metadata.Metadata.findByOwnerV2(
    metaplexConnection,
    publicKey
  );
  return ownedMetadata;
};
