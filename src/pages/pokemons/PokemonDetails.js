import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  getBalanceOf,
  getOwnerOf,
  getTKD,
  getTokenURI,
} from "../../helpers/CommonHelper";

import { CButton } from "@coreui/react";
const PokemonDetails = () => {
  const history = useHistory();
  const params = useParams();
  const [ownerOf, setOwnerOf] = useState("");
  useEffect(() => {
    getOwnerOf("1")
      .then((res) => {
        setOwnerOf(res);
        getBalanceOf(res)
          .then((balance) => {
            console.log(balance);
          })
          .catch((err) => {
            console.log(err);
          });
        // getTKD(res)
        //   .then((ccc) => {
        //     console.log(ccc);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        getTokenURI(res)
          .then((ccc1) => {
            console.log(ccc1);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <strong>Pokemon details</strong>
      <div className="pokemon-details">
        <img
          src="https://ipfs.io/ipfs/QmZtQ1s39JL69K6CtS1Du8ys5HPShqCfAUXyeKC3x3Ythj"
          title="pokemon image"
          alt="no comment"
          className="pokemon-img-details"
        />
      </div>
      <h6 className="mt-3">Owner of: {ownerOf}</h6>
      <CButton
        className="mt-2 bg-info"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </CButton>
    </div>
  );
};

export default PokemonDetails;
