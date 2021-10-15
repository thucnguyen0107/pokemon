import React, { useEffect, useState } from "react";
import { mintToken } from "../../helpers/CommonHelper";

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
    <div>
      {/* {!minted ? (
        <button className="ml-2"
          onClick={() => {
            mint();
          }}
        >
          Create new Pokemon
        </button>
      ) : (
        <span>Created</span>
      )} */}
      
    </div>
  );
};
export default Dashboard;
