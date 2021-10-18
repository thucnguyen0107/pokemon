import React, { useEffect, useState } from "react";
import { mintToken } from "../../helpers/CommonHelper";
import Pokemons from "../pokemons/Pokemons";
const Dashboard = () => {
  const [minted, setMinted] = useState(false);

  const mint = () => {
    mintToken()
      .then((tx) => {
        console.log(tx);
        setMinted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-app">
      {/* {!minted ? (
        <button
          className="ml-2"
          onClick={() => {
            mint();
          }}
        >
          Create new Pokemon
        </button>
      ) : (
        <span>Created</span>
      )} */}
      {/* Content here */}
      <Pokemons />
    </div>
  );
};
export default Dashboard;
