import React, { useEffect, useState } from "react";
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import classes from './accountInfo.module.scss'


const AccountInfo = () => {

  const [transactionInfo, setTransactionInfo] = useState()
  const [payerPubkey, setPayerPubkey] = useState()
  const [walletInfo, setWalletInfo] = useState()
  const [isComplete, setIsComplete] = useState(false)


  console.log('walletInfo', walletInfo);

  let connection = new web3.Connection("https://explorer-api.devnet.solana.com");


  const getAccountInfo = async () => {
    // let pubKey = account.publicKey.toBase58()
    // console.log(account.publicKey.toBase58());
    // let base58publicKey = new web3.PublicKey("5BcLgu41EHsKPsAePUL74isHoHTpvujJukhWNfaJ3s3T");
    var provider = await getProvider();

    if (provider?.isPhantom) {
      let walletInfoTemp = await connection.getAccountInfo(provider.publicKey || "")
      setWalletInfo(walletInfoTemp)
    }
  }

  const onChangeInput = (e) => {
    setTransactionInfo({ ...transactionInfo, [e.target.name]: e.target.value })
  }

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

  async function transferSOL() {

    // Detecing and storing the phantom wallet of the user (creator in this case)
    var provider = await getProvider();
    console.log('provider', provider);
    // console.log("Public key of the emitter: ",provider?.publicKey.toString());

    // Establishing connection
    var connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
    );

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey(transactionInfo?.toWallet || "");
    console.log("recieverWallet : ", recieverWallet);
    //   {
    //     "_bn": "6b4a4342f6b534d47131e3bbb42b342549b6a67e5ce0e0439c8fb9a9aa359d44"
    // }


    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
    var airdropSignature = await connection.requestAirdrop(
      provider.publicKey,
      web3.LAMPORTS_PER_SOL,
    );

    console.log("airdropSignature : ", airdropSignature);
    // 5LFYwYbWWZc9Wm4qWDoTTd9B7f2uH2sVKa2XgpPEfwLJgMFys99QvDfDBq3uAJ1S9caiiPwgzaens2kw7AfcpMCt
    // Confirming that the airdrop went through
    const Airdropped =  await connection.confirmTransaction(airdropSignature);
    console.log("Airdropped", Airdropped);
  //   {
  //     "context": {
  //         "slot": 94131912
  //     },
  //     "value": {
  //         "err": null
  //     }
  // }
      // khúc này nó khong hỏi 
    var transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recieverWallet,
        lamports: (transactionInfo?.quantity) * web3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      }),
    );

    console.log("transaction", transaction);
  //   {
  //     "signatures": [
  //         {
  //             "signature": {
  //                 "type": "Buffer",
  //                 "data": [
  //                     23,
  //                     133,
  //                     151,
  //                     69,
  //                     135,
  //                     179,
  //                     88,
  //                     110,
  //                     170,
  //                     87,
  //                     185,
  //                     165,
  //                     134,
  //                     164,
  //                     8,
  //                     71,
  //                     4,
  //                     18,
  //                     96,
  //                     243,
  //                     131,
  //                     64,
  //                     221,
  //                     58,
  //                     188,
  //                     195,
  //                     239,
  //                     107,
  //                     34,
  //                     33,
  //                     211,
  //                     224,
  //                     170,
  //                     243,
  //                     99,
  //                     66,
  //                     169,
  //                     250,
  //                     168,
  //                     43,
  //                     40,
  //                     60,
  //                     216,
  //                     220,
  //                     33,
  //                     4,
  //                     219,
  //                     167,
  //                     98,
  //                     80,
  //                     203,
  //                     249,
  //                     195,
  //                     195,
  //                     235,
  //                     135,
  //                     151,
  //                     239,
  //                     111,
  //                     62,
  //                     100,
  //                     138,
  //                     118,
  //                     8
  //                 ]
  //             },
  //             "publicKey": {
  //                 "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //             }
  //         }
  //     ],
  //     "feePayer": {
  //         "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //     },
  //     "instructions": [
  //         {
  //             "keys": [
  //                 {
  //                     "pubkey": {
  //                         "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //                     },
  //                     "isSigner": true,
  //                     "isWritable": true
  //                 },
  //                 {
  //                     "pubkey": {
  //                         "_bn": "6b4a4342f6b534d47131e3bbb42b342549b6a67e5ce0e0439c8fb9a9aa359d44"
  //                     },
  //                     "isSigner": false,
  //                     "isWritable": true
  //                 }
  //             ],
  //             "programId": {
  //                 "_bn": "00"
  //             },
  //             "data": {
  //                 "type": "Buffer",
  //                 "data": [
  //                     2,
  //                     0,
  //                     0,
  //                     0,
  //                     0,
  //                     225,
  //                     245,
  //                     5,
  //                     0,
  //                     0,
  //                     0,
  //                     0
  //                 ]
  //             }
  //         }
  //     ],
  //     "recentBlockhash": "BXCeGFpP1dxZJaZxFXbL6d1koJynMMtn56HfY1JWXCcW"
  // }

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
    // khúc này nó mới yều cầu confirm 
    console.log("signed", signed);
  //   {
  //     "signatures": [
  //         {
  //             "signature": {
  //                 "type": "Buffer",
  //                 "data": [
  //                     23,
  //                     133,
  //                     151,
  //                     69,
  //                     135,
  //                     179,
  //                     88,
  //                     110,
  //                     170,
  //                     87,
  //                     185,
  //                     165,
  //                     134,
  //                     164,
  //                     8,
  //                     71,
  //                     4,
  //                     18,
  //                     96,
  //                     243,
  //                     131,
  //                     64,
  //                     221,
  //                     58,
  //                     188,
  //                     195,
  //                     239,
  //                     107,
  //                     34,
  //                     33,
  //                     211,
  //                     224,
  //                     170,
  //                     243,
  //                     99,
  //                     66,
  //                     169,
  //                     250,
  //                     168,
  //                     43,
  //                     40,
  //                     60,
  //                     216,
  //                     220,
  //                     33,
  //                     4,
  //                     219,
  //                     167,
  //                     98,
  //                     80,
  //                     203,
  //                     249,
  //                     195,
  //                     195,
  //                     235,
  //                     135,
  //                     151,
  //                     239,
  //                     111,
  //                     62,
  //                     100,
  //                     138,
  //                     118,
  //                     8
  //                 ]
  //             },
  //             "publicKey": {
  //                 "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //             }
  //         }
  //     ],
  //     "feePayer": {
  //         "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //     },
  //     "instructions": [
  //         {
  //             "keys": [
  //                 {
  //                     "pubkey": {
  //                         "_bn": "f14407b04d14ccd5b37687fc036a2efb0c0350e6972b070d3e4529a79885a69f"
  //                     },
  //                     "isSigner": true,
  //                     "isWritable": true
  //                 },
  //                 {
  //                     "pubkey": {
  //                         "_bn": "6b4a4342f6b534d47131e3bbb42b342549b6a67e5ce0e0439c8fb9a9aa359d44"
  //                     },
  //                     "isSigner": false,
  //                     "isWritable": true
  //                 }
  //             ],
  //             "programId": {
  //                 "_bn": "00"
  //             },
  //             "data": {
  //                 "type": "Buffer",
  //                 "data": [
  //                     2,
  //                     0,
  //                     0,
  //                     0,
  //                     0,
  //                     225,
  //                     245,
  //                     5,
  //                     0,
  //                     0,
  //                     0,
  //                     0
  //                 ]
  //             }
  //         }
  //     ],
  //     "recentBlockhash": "BXCeGFpP1dxZJaZxFXbL6d1koJynMMtn56HfY1JWXCcW"
  // }

    // The signature is generated
    let signature = await connection.sendRawTransaction(signed.serialize());
    console.log("signature", signature);
    // 5LFYwYbWWZc9Wm4qWDoTTd9B7f2uH2sVKa2XgpPEfwLJgMFys99QvDfDBq3uAJ1S9caiiPwgzaens2kw7AfcpMCt
    // Confirm whether the transaction went through or not
    const confirmTransac = await connection.confirmTransaction(signature);

    console.log("confirmTransac", confirmTransac);
  //   {
  //     "context": {
  //         "slot": 94131979
  //     },
  //     "value": {
  //         "err": null
  //     }
  // }

    //Signature chhap diya idhar
    console.log("Signature: ", signature);
    // UH1fn2gUcmSmSe3hkRZFtibTRUVth3M6f9ApnVSxvhqomwtfz7L87vT9BRkfRuxDKYxoVEqfdEY9YGY8mUCrpSB
    setIsComplete(true)
  }


  // ------------------

const mintingTest = async () => {
  const phantomProvider = await getProvider();
  const mintRequester = await phantomProvider.publicKey;
  console.log("Public key of the mint Requester: ", mintRequester.toString());

  //To connect to the mainnet, write mainnet-beta instead of devnet
  // const connection = new web3.Connection(
  //   web3.clusterApiUrl('devnet'),
  //   'confirmed',
  // );

  //This fromWallet is your minting wallet, that will actually mint the tokens
  var fromWallet = web3.Keypair.generate();
  console.log("fromWallet : ", fromWallet);
  // Associate the mintRequester with this wallet's publicKey and privateKey
  // This is basically the credentials that the mintRequester (creator) would require whenever they want to mint some more tokens
 // Testing the parameters of the minting wallet

  console.log("Creator's Minting wallet public key: ",fromWallet.publicKey.toString());
  console.log(fromWallet.secretKey.toString());

  // Airdrop 1 SOL to the minting wallet to handle the minting charges
  var fromAirDropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  console.log("fromAirDropSignature : ", fromAirDropSignature);

  const aaa = await connection.confirmTransaction(fromAirDropSignature);
  console.log("Airdropped (transferred) 1 SOL to the fromWallet to carry out minting operations");
  console.log("confirmTransaction : ", aaa);
  // This createMint function returns a Promise <Token>
  let mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    6, // Number of decimal places in your token
    splToken.TOKEN_PROGRAM_ID,
  );

  console.log("mint : ", mint);
  // getting or creating (if doens't exist) the token address in the fromWallet address
  // fromTokenAccount is essentially the account *inside* the fromWallet that will be able to handle the              new token that we just minted
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey,
  );

  
  console.log("fromTokenAccount : ", fromTokenAccount);

  // getting or creating (if doens't exist) the token address in the toWallet address
  // toWallet is the creator: the og mintRequester
  // toTokenAmount is essentially the account *inside* the mintRequester's (creator's) wallet that will be able to handle the new token that we just minted
  let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    mintRequester,
  );

  console.log("toTokenAccount : ", toTokenAccount);

  // // Minting 1 token
  const bbb = await mint.mintTo(
    fromTokenAccount.address,
    fromWallet.publicKey,
    [],
    1000000 // 1 followed by decimals number of 0s // You'll ask the creator ki how many decimals he wants in his token. If he says 4, then 1 token will be represented as 10000
  );

  console.log("mintTo : ", bbb);

  const aabb = await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    fromWallet.publicKey,
    []
  )

  console.log("aabb : ", aabb);

  console.log("Initial mint successful");


  // This transaction is sending of the creator tokens(tokens you just created) from their minting wallet to their Phantom Wallet
  var transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1000000, // This is transferring 1 token, not 1000000 tokens
    ),
  );

  console.log("transaction : ", transaction);

  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    {commitment: 'confirmed'},
  );

  console.log("signature : ", signature);

  const creatorTokenAddress = mint.publicKey;
  const creatorTokenAddressString = mint.publicKey.toString();

  console.log("SIGNATURE: ", signature); //Signature is basically like the paying party signs a transaction with their key.
  console.log("Creator Token Address: ", creatorTokenAddressString);
  console.log("Creator Minting Wallet Address: ", mint.payer.publicKey.toString());

  let creatorTokenBalance = await toTokenAccount.amount;
  console.log("Creator's Token Balance: ", creatorTokenBalance);
};

  useEffect(() => {
    console.log("tran", transactionInfo)
  }, [transactionInfo])

  useEffect(() => {
    if(isComplete){
      setTimeout(()=>setIsComplete(false),2000)
    }
  },[isComplete])

  useEffect(() => {
    getAccountInfo()
  }, [window.solana.isPhantom])

  return (
    <>
    <div className={classes.container}>
      <h3>Account Info</h3>
      <div>Current Coin: {walletInfo ? walletInfo?.lamports / web3.LAMPORTS_PER_SOL : 0} SOL</div>

      <hr></hr>
      <h3>Transfer Coin</h3>
      <div>
        <input
        placeholder={"To address"}
        name="toWallet" onChange={onChangeInput}
        className={classes.inputStyle}
        />
      </div>
      <div>
        <input
        placeholder={"Quantity"}
        name="quantity"
        onChange={onChangeInput}
        className={classes.inputStyle}
        />
      </div>
      {isComplete && <div>Transaction successfully!</div>}
      <button className={classes.btnStyle} onClick={transferSOL}>
        Send
      </button>

      <hr></hr>
      <h3>Mint token</h3>
      <button className={classes.btnStyle} onClick={mintingTest}>
        Mint
      </button>
      </div>
    </>
  )
}

export default AccountInfo