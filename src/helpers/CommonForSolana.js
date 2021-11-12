import { Connection, programs, Account } from "@metaplex/js";
import { Keypair, PublicKey } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const metaplexConnection = new Connection("devnet");
const mintTokenAddress = "9ALXCEgcDs9CgAokZEgdxCaQSxf6Jb3j3LPu9xzV81fA";
const connection = new web3.Connection(
  "https://explorer-api.devnet.solana.com"
);

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
    const getProgramAccounts = await connection.getTokenAccountBalance(pub2, {
      mint: publicKey,
    });
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
    "CShvXEMjAu2RgfdXXeA8NgDeFxTwgdqqvgnAhhJ1oK52"
  );
  const mintToken = new Token(
    connection,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const destination = new PublicKey(
    "9CMS1DaUDvXAuuJqFJGRe5zTmTmaUVfG1Uid4Yrvo3ro"
  );

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

  // let associatedDestinationTokenAddr;
  // //  Create associate Token Account
  // try {
  //   associatedDestinationTokenAddr = Token.getAssociatedTokenAddress(
  //     mintToken.associatedProgramId,
  //     mintToken.programId,
  //     mintPublicKey,
  //     testTo
  //   )
  //     .then(() => {
  //       console.log("ababa");
  //     })
  //     .catch(() => {
  //       console.log("bbbb");
  //     });
  // } catch (error) {
  //   associatedDestinationTokenAddr = undefined;
  // }

  // console.log(associatedDestinationTokenAddr);
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
  // var transaction = new web3.Transaction().add(
  //   Token.createTransferInstruction(
  //     TOKEN_PROGRAM_ID,
  //     fromTokenAccount.address,
  //     fromTokentestTo.address,
  //     publicKey,
  //     [],
  //     1
  //   )
  // );
  // // Setting the variables for the transaction
  // transaction.feePayer = await provider.publicKey;
  // let blockhashObj = await con.getRecentBlockhash();
  // transaction.recentBlockhash = await blockhashObj.blockhash;

  // // Transaction constructor initialized successfully
  // if (transaction) {
  //   console.log("Txn created successfully");
  // }

  // // Request creator to sign the transaction (allow the transaction)
  // let signed = await provider.signTransaction(transaction);
  // // The signature is generated
  // let signature = await con.sendRawTransaction(signed.serialize());
  // // Confirm whether the transaction went through or not
  // await con.confirmTransaction(signature);

  // //Signature chhap diya idhar
  // console.log("Signature: ", signature);
};

export const buyNFT = async (
  nftMintAddress,
  fromSeller // Địa chỉ ví thằng bán NFT và nhận tiền
) => {
  const provider = await getProvider();
  const publicKey = await provider.publicKey;
  const mintPublicKey = new PublicKey(mintTokenAddress);
  const mintToken = new Token(
    connection,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const destination = new PublicKey(
    fromSeller // Ví thằng bán NFT và nhận tiền
  );

  let fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    publicKey
  );

  let toTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    destination
  );

  const instructions = [];
  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAccount.address, // Từ mình
      toTokenAccount.address, // đến thằng kia
      publicKey,
      [],
      77777
    )
  );

  var transaction = new web3.Transaction().add(...instructions);

  await signedByFeePayer(transaction, provider);

  await transferNftFromExchangeToBuyer(nftMintAddress, destination); // Nhận NFT từ sàn
};

const transferNftFromExchangeToBuyer = async (
  nftMintAddress,
  fromSeller // đến người cần được chuyển quyền
) => {
  const provider = await getProvider();
  const publicKey = await provider.publicKey;
  const nftPublicKey = new PublicKey(nftMintAddress);
  const fromExchangeWallet = new PublicKey(
    "FRsSE4uMSeTM8SA3iejeWWriYsdc2QnMEGuNT7ewAeQ4" // Ví sàn
  );
  const mintNft = new Token(
    connection,
    nftPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  let toAssociateTokeSellerAccount =
    await mintNft.getOrCreateAssociatedAccountInfo(
      fromSeller // lấy address có token
    );

  let toAssociateTokenBuyerAccount =
    await mintNft.getOrCreateAssociatedAccountInfo(publicKey);

  const instructions = [];
  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      toAssociateTokeSellerAccount.address, // Từ thằng bấm "Sell"
      toAssociateTokenBuyerAccount.address, // về mình
      fromExchangeWallet,
      [],
      1
    )
  );

  var transaction = new web3.Transaction().add(...instructions);

  await signedAndConfirmBySeed(transaction);

  await setAuthorizedAccountToken(
    fromExchangeWallet,
    fromSeller,
    fromSeller,
    nftMintAddress,
    "getBack"
  );
};

export const setAuthorizedAccountToken = async (
  fromCurrentAuthor, // địa chỉ ví quyền hiện tại
  toNewAuthor, // đến người cần được chuyển quyền
  associateAddressRoot, // địa chỉ ví người người bán NFT
  nftMintAddress,
  type // if 'getBack': sàn kí và confirm. else thì bình thường.
) => {
  const provider = await getProvider();
  const nftPublicKey = new PublicKey(nftMintAddress);
  const mintNft = new Token(
    connection,
    nftPublicKey,
    TOKEN_PROGRAM_ID,
    null // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );
  const fromCurrentAuthorPublicKey = new PublicKey(fromCurrentAuthor);
  const toNewAuthorPublicKey = new PublicKey(toNewAuthor);
  const associateAddressRootPublicKey = new PublicKey(associateAddressRoot);

  // get associate address root
  let fromTokenAcountNFT = await mintNft.getOrCreateAssociatedAccountInfo(
    associateAddressRootPublicKey
  );

  ///////////////////////////////////////// test

  // let fromTestAddressPublicKey = new PublicKey('BLtsE9tgdJC6Z9tw9C8A1HirF8CuNasUHtcjDcnezCvf');
  // let fromTestAuthor = await mintNft.getOrCreateAssociatedAccountInfo(
  //   toNewAuthorPublicKey
  // ); // test sàn

  /////////////////////////////////////////
  console.log("fromTokenAccountNft : ", fromTokenAcountNFT.address.toBase58());

  let transaction = new web3.Transaction().add(
    Token.createSetAuthorityInstruction(
      TOKEN_PROGRAM_ID,
      fromTokenAcountNFT.address, // Associate address
      toNewAuthorPublicKey, // wallet publicKey
      "AccountOwner",
      fromCurrentAuthorPublicKey, // wallet publicKey
      []
    )
  );

  if (type === "getBack") {
    // return NFT to NFT's owner
    signedAndConfirmBySeed(transaction);
  } else {
    // send NFT to Sell
    signedByFeePayer(transaction, provider);
  }

  localStorage.setItem("seller", associateAddressRoot);
};

const getFromSeed = () => {
  let seed = new Uint8Array([
    132, 174, 250, 253, 107, 233, 133, 200, 165, 202, 23, 80, 37, 183, 105, 237,
    167, 23, 144, 134, 114, 154, 125, 85, 13, 155, 187, 56, 212, 32, 3, 140,
    214, 98, 149, 85, 52, 123, 218, 78, 37, 132, 91, 178, 2, 86, 255, 194, 72,
    20, 87, 114, 226, 146, 37, 144, 160, 244, 120, 119, 111, 17, 111, 213,
  ]);
  let accountFromSeed = Keypair.fromSecretKey(seed);
  return accountFromSeed;
};

const signedByFeePayer = async (transaction, provider) => {
  // Setting the variables for the transaction
  transaction.feePayer = await provider.publicKey;
  let blockhashObj = await connection.getRecentBlockhash();
  transaction.recentBlockhash = await blockhashObj.blockhash;

  // Transaction constructor initialized successfully
  if (transaction) {
    console.log("Txn created successfully");
  }

  // Request creator to sign the transaction (allow the transaction)
  let signed = await provider.signTransaction(transaction);
  // The signature is generated
  let signature = await connection.sendRawTransaction(signed.serialize());
  // Confirm whether the transaction went through or not
  await connection.confirmTransaction(signature);
};

const signedAndConfirmBySeed = async (transaction) => {
  const wallet = getFromSeed();
  await web3.sendAndConfirmTransaction(connection, transaction, [wallet], {
    commitment: "confirmed",
  });
};
