import React, { useEffect, useState } from "react";
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';


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

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
    var airdropSignature = await connection.requestAirdrop(
      provider.publicKey,
      web3.LAMPORTS_PER_SOL,
    );

    // Confirming that the airdrop went through
    await connection.confirmTransaction(airdropSignature);
    console.log("Airdropped");

    var transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: recieverWallet,
        lamports: (transactionInfo?.quantity) * web3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
      }),
    );

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

    //Signature chhap diya idhar
    console.log("Signature: ", signature);
    setIsComplete(true)
  }


  // ------------------
//   const minOneToken = async()=>{

//     //create new token mint
//     let mint = await splToken.Token.createMint(
//       connection,
//       fromWallet,
//       fromWallet.publicKey,
//       null,
//       9,
//       splToken.TOKEN_PROGRAM_ID,
//     );

//       //get the token account of the fromWallet Solana address, if it does not exist, create it
//   let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
//     fromWallet.publicKey,
//   );


// }

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

  await connection.confirmTransaction(fromAirDropSignature);
  console.log("Airdropped (transferred) 1 SOL to the fromWallet to carry out minting operations");

  // This createMint function returns a Promise <Token>
  let mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    6, // Number of decimal places in your token
    splToken.TOKEN_PROGRAM_ID,
  );

  // getting or creating (if doens't exist) the token address in the fromWallet address
  // fromTokenAccount is essentially the account *inside* the fromWallet that will be able to handle the              new token that we just minted
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey,
  );

  // getting or creating (if doens't exist) the token address in the toWallet address
  // toWallet is the creator: the og mintRequester
  // toTokenAmount is essentially the account *inside* the mintRequester's (creator's) wallet that will be able to handle the new token that we just minted
  let toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    mintRequester,
  );

  // // Minting 1 token
  await mint.mintTo(
    fromTokenAccount.address,
    fromWallet.publicKey,
    [],
    1000000 // 1 followed by decimals number of 0s // You'll ask the creator ki how many decimals he wants in his token. If he says 4, then 1 token will be represented as 10000
  );

  await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    fromWallet.publicKey,
    []
  )

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

  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    {commitment: 'confirmed'},
  );

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
      <div>Account Info</div>
      <div>Current Coint: {walletInfo?.lamports / web3.LAMPORTS_PER_SOL} SOL</div>

      <div>
        <input placeholder={"To address"} name="toWallet" onChange={onChangeInput} />
      </div>
      <div>
        <input placeholder={"Quantity"} name="quantity" onChange={onChangeInput} />
      </div>
      {isComplete && <div>Transaction successfully!</div>}
      <button style={{ width: 50, height: 25, color: 'black' }} onClick={transferSOL}>
        Gửi
      </button>

      <div>Min token</div>
      <button style={{ width: 50, height: 25, color: 'black' }} onClick={mintingTest}>
        Gửi
      </button>

    </>
  )
}

export default AccountInfo