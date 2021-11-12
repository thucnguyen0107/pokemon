import React, { useEffect, useState } from "react";
import { CCol, CPagination, CRow, CImg, CButton } from "@coreui/react";
import { useHistory } from "react-router";
import { getNftsFromWallet } from "../../helpers/CommonForSolana";
import axios from "axios";

const Pokemons = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const handleRedirectToDetaisl = () => {
    history.push(`/pokemon/${1}`);
  };
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getNftMetaData = async () => {
      const metadata = await getNftsFromWallet();
      const uriList = [];
      const metaDataList = [];
      if (metadata && metadata.length !== 0) {
        metadata.forEach((data) => {
          const uri = data.data.data.uri;
          uriList.push(uri);
        });
        const promises = [];
        uriList.forEach(async (uri) => {
          const config = {
            method: "get",
            url: uri,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            crossDomain: true,
          };

          let res = axios(config);
          promises.push(res);
        });

        Promise.all(promises).then((promise) => {
          let dataList = [];
          promise.forEach((e) => {
            dataList.push(e.data);
          });

          setList(dataList);
        });
      }

      // console.log(uriList);
    };
    getNftMetaData();
  }, []);

  return (
    <div>
      <CRow className="mb-4 mt-3 ">
        <CButton class="btn btn-primary" 
         onClick={() => history.push("/wallet/withdraw")}>Withdraw</CButton>
        {list.map((meta, key) => {
          return (
            <CCol md="4" className="hover-box" key={key}>
              <div className="pokemon-item">
                <div className="d-flex justify-content-between">
                  <strong>{meta.name}</strong>
                  <svg
                    className="IconV2 IconV2--position-default IconV2--display-inlineBlock"
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6,5.75 L10,5.75 C11.1045695,5.75 12,6.6454305 12,7.75 L12,11.75 C12,12.8545695 11.1045695,13.75 10,13.75 L6,13.75 C4.8954305,13.75 4,12.8545695 4,11.75 L4,7.75 C4,6.6454305 4.8954305,5.75 6,5.75 Z"
                      stroke="#49B749"
                      strokeWidth="1.35"
                      fill="none"
                    ></path>
                    <path
                      d="M14.5555556,4.39649357 L14.5555556,3.77777778 C14.5555556,2.3970659 13.4362674,1.27777778 12.0555556,1.27777778 C10.6748437,1.27777778 9.55555556,2.3970659 9.55555556,3.77777778 L9.55555556,4.39649357"
                      stroke="#49B749"
                      strokeWidth="1.5"
                      fill="none"
                    ></path>
                    <circle
                      fill="#49B749"
                      cx="8"
                      cy="8.66666667"
                      r="1.11111111"
                    ></circle>
                    <path
                      d="M8,9.33333333 L8,11.1111111"
                      stroke="#49B749"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="special-card-txt">Fancy</span>
                  <span className="left-item-txt">320 left</span>
                </div>
                <div className="pokemon-img">
                  <img
                    src={meta.image}
                    title="pokemon image"
                    alt="no comment"
                    className="pokemon-img-details"
                  />
                </div>
              </div>
            </CCol>
          );
        })}
      </CRow>
      <CPagination
        activePage={currentPage}
        pages={10}
        onActivePageChange={(i) => console.log(i)}
      ></CPagination>
    </div>
  );
};

export default Pokemons;
