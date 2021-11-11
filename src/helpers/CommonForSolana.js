import { Connection, programs, Account } from "@metaplex/js";
import { PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

let metaplexConnection = new Connection("devnet");

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
    const pub2 = new PublicKey("5f2wbYSKT1RbywPHQ9yzqDmbw6sjARyCkSdP9uMmuwF2");
    const getProgramAccounts = await con.getTokenAccountBalance(pub2);
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

// export const getCandyMachineState = async (
//   anchorWallet,
//   candyMachineId,
//   connection
// ) => {
//   const provider = await getProvider();

//   const idl = await anchor.Program.fetchIdl(
//     new anchor.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ"),
//     provider
//   );

//   const program = new anchor.Program(
//     idl,
//     new anchor.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ"),
//     provider
//   );
//   const candyMachine = {
//     id: candyMachineId,
//     connection,
//     program,
//   };

//   const state = await program.account.candyMachine.fetch(candyMachineId);

//   const itemsAvailable = state.data.itemsAvailable.toNumber();
//   const itemsRedeemed = state.itemsRedeemed.toNumber();
//   const itemsRemaining = itemsAvailable - itemsRedeemed;

//   let goLiveDate = state.data.goLiveDate.toNumber();
//   goLiveDate = new Date(goLiveDate * 1000);

//   console.log({
//     itemsAvailable,
//     itemsRedeemed,
//     itemsRemaining,
//     goLiveDate,
//   });

//   return {
//     candyMachine,
//     itemsAvailable,
//     itemsRedeemed,
//     itemsRemaining,
//     goLiveDate,
//   };
// };

export const getNftsFromWallet = async (mint) => {
  const provider = await getProvider();
  const publicKey = provider.publicKey;
  const ownedMetadata = await programs.metadata.Metadata.findByOwnerV2(
    metaplexConnection,
    publicKey
  );
  return ownedMetadata;
};

export const getAllNFTs = async () => {
  const provider = await getProvider();
  const publicKey = provider.publicKey;
  const creators = {
    creators: [publicKey],
  };
  const ownedMetadata = await programs.metadata.Metadata.findMany(
    metaplexConnection,
    creators
  );
  return ownedMetadata;
};

export const transferCoin = async () => {
  const provider = await getProvider();
  const publicKey = await provider.publicKey;
  const mintPublicKey = new PublicKey(
    "DkzNA5JgFKiPpD6HS8FkDZ8BAhN3N8uU13TbWyxJp4wd"
  );
  const mintToken = new Token(
    con,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const destination = new PublicKey(
    "9CMS1DaUDvXAuuJqFJGRe5zTmTmaUVfG1Uid4Yrvo3ro"
  );

  // const source = new PublicKey("3iTkX1oVLx2HqaNnLJdtX1v83Z1qauMVxFPfa2QCd2z7");
  // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee

  let fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    publicKey
  );

  let ToTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    destination
  );

  // getting or creating (if doens't exist) the token address in the toWallet address
  // toWallet is the creator: the og mintRequester
  // toTokenAmount is essentially the account *inside* the mintRequester's (creator's) wallet that will be able to handle the new token that we just minted

  const testTo = new PublicKey("J2wDfz5fHbie2SJc8oDaWEmgkxRLMwAsg7Jra5gNHXuz");
  // let toTokenAccount = await mintToken.createAssociatedTokenAccount(testTo);
  let fromTokentestTo = await mintToken.getOrCreateAssociatedAccountInfo(
    testTo
  );



  //  Create associate Token Account
  // const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
  //   mintToken.associatedProgramId,
  //   mintToken.programId,
  //   mintPublicKey,
  //   testTo
  // );

  // var transactionCreateAssociate = new web3.Transaction().add(
  //   Token.createAssociatedTokenAccountInstruction(
  //     mintToken.associatedProgramId,
  //     mintToken.programId,
  //     mintPublicKey,
  //     associatedDestinationTokenAddr,
  //     testTo,
  //     publicKey
  //   )
  // );

  // transactionCreateAssociate.feePayer = await provider.publicKey;
  // let blockhashObjCreateAssociate = await con.getRecentBlockhash();
  // transactionCreateAssociate.recentBlockhash =
  //   await blockhashObjCreateAssociate.blockhash;

  // // transactionCreateAssociate constructor initialized successfully
  // if (transactionCreateAssociate) {
  //   console.log("Txn created successfully");
  // }

  // // Request creator to sign the transactionCreateAssociate (allow the transactionCreateAssociate)
  // let signedCreateAssociate = await provider.signTransaction(
  //   transactionCreateAssociate
  // );
  // // The signature is generated
  // let signatureCreateAssociate = await con.sendRawTransaction(
  //   signedCreateAssociate.serialize()
  // );
  // // Confirm whether the transaction went through or not
  // await con.confirmTransaction(signatureCreateAssociate);

  // //Signature chhap diya idhar
  // console.log("Signature: ", signatureCreateAssociate);
  // console.log(fromTokenAccount.address.toBase58());



  // Transfer own token to another Wallet
  // console.log(toTokenAccount.address.toBase58());
  // const transaction = await mintToken.transfer(
  //   fromTokenAccount.address,
  //   destination,
  //   publicKey,
  //   [],
  //   1000000
  // );



  // Transfer NFT to another Wallet
  var transaction = new web3.Transaction().add(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      fromTokentestTo.address,
      publicKey,
      [],
      1
    )
  );
  // Setting the variables for the transaction
  transaction.feePayer = await provider.publicKey;
  let blockhashObj = await con.getRecentBlockhash();
  transaction.recentBlockhash = await blockhashObj.blockhash;

  // Transaction constructor initialized successfully
  if (transaction) {
    console.log("Txn created successfully");
  }

  // Request creator to sign the transaction (allow the transaction)
  let signed = await provider.signTransaction(transaction);
  // The signature is generated
  let signature = await con.sendRawTransaction(signed.serialize());
  // Confirm whether the transaction went through or not
  await con.confirmTransaction(signature);

  //Signature chhap diya idhar
  console.log("Signature: ", signature);
};

export const transferCoin2 = async () => {
  const provider = await getProvider();
  const publicKey = await provider.publicKey;
  const mintPublicKey = new PublicKey(
    "9ALXCEgcDs9CgAokZEgdxCaQSxf6Jb3j3LPu9xzV81fA"
  );
  const mintToken = new Token(
    con,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const nftPublicKey = new PublicKey(
    "DkzNA5JgFKiPpD6HS8FkDZ8BAhN3N8uU13TbWyxJp4wd"
  );

  const mintNft = new Token(
    con,
    nftPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const destination = new PublicKey(
    "FRsSE4uMSeTM8SA3iejeWWriYsdc2QnMEGuNT7ewAeQ4"
  );

  // const source = new PublicKey("3iTkX1oVLx2HqaNnLJdtX1v83Z1qauMVxFPfa2QCd2z7");
  // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee

  let fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    publicKey
  );

  // getting or creating (if doens't exist) the token address in the toWallet address
  // toWallet is the creator: the og mintRequester
  // toTokenAmount is essentially the account *inside* the mintRequester's (creator's) wallet that will be able to handle the new token that we just minted
  let toTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    destination
  );

  let fromTokenAccountNft = await mintNft.getOrCreateAssociatedAccountInfo(
    publicKey
  );

  // getting or creating (if doens't exist) the token address in the toWallet address
  // toWallet is the creator: the og mintRequester
  // toTokenAmount is essentially the account *inside* the mintRequester's (creator's) wallet that will be able to handle the new token that we just minted
  let toTokenAccountNft = await mintNft.getOrCreateAssociatedAccountInfo(
    destination
  );

  // let toAuthor = new PublicKey('3iTkX1oVLx2HqaNnLJdtX1v83Z1qauMVxFPfa2QCd2z7');
  // console.log(fromTokenAccount);
  // console.log(toTokenAccount);

  // var transaction2 = new web3.Transaction().add(
  //   Token.createSetAuthorityInstruction(
  //     TOKEN_PROGRAM_ID,
  //     fromTokenAccountNft.address,
  //     toAuthor,
  //     "AccountOwner",
  //     destination,
  //     []
  //   )
  // );
  // // Setting the variables for the transaction
  // transaction2.feePayer = await provider.publicKey;
  // let blockhashObj2 = await con.getRecentBlockhash();
  // transaction2.recentBlockhash = await blockhashObj2.blockhash;

  // // Transaction constructor initialized successfully
  // if (transaction2) {
  //   console.log("Txn created successfully");
  // }

  // // Request creator to sign the transaction (allow the transaction)
  // let signed2 = await provider.signTransaction(transaction2);
  // // The signature is generated
  // let signature2 = await con.sendRawTransaction(signed2.serialize());
  // // Confirm whether the transaction went through or not
  // await con.confirmTransaction(signature2);

  const instructions = [];

  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      publicKey,
      [],
      77777
    )
  );
  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      toTokenAccountNft.address,
      fromTokenAccountNft.address,
      publicKey,
      [],
      1
    )
  );
  var transaction = new web3.Transaction().add(...instructions);
  // Setting the variables for the transaction
  // Setting the variables for the transaction
  transaction.feePayer = await provider.publicKey;
  let blockhashObj = await con.getRecentBlockhash();
  transaction.recentBlockhash = await blockhashObj.blockhash;

  // Transaction constructor initialized successfully
  if (transaction) {
    console.log("Txn created successfully");
  }

  // Request creator to sign the transaction (allow the transaction)
  let signed = await provider.signTransaction(transaction);
  // The signature is generated
  let signature = await con.sendRawTransaction(signed.serialize());
  // Confirm whether the transaction went through or not
  await con.confirmTransaction(signature);

  //Signature chhap diya idhar
  console.log("Signature: ", signature);
};
