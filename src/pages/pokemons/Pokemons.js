import React, { useState } from "react";
import { CCol, CPagination, CRow, CImg } from "@coreui/react";
const Pokemons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div>
      <CRow className="mb-4 mt-3 ">
        <CCol md="4" className="hover-box">
          <div className="pokemon-item">
            <div className="d-flex justify-content-between">
              <strong>Harriet</strong>
              <span className="left-item-txt">unblocked</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="special-card-txt">Fancy</span>
              <span className="left-item-txt">2313 left</span>
            </div>
            <div className="pokemon-img">
              <img
                src="../assets/1.jpeg"
                title="pokemon image"
                alt="no comment"
                className="pokemon-img-details"
              />
            </div>
          </div>
        </CCol>

        <CCol md="4" className="hover-box">
          <div className="pokemon-item">
            <div className="d-flex justify-content-between">
              <strong>Harriet</strong>
              <span className="left-item-txt">unblocked</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="special-card-txt">Ellie</span>
              <span className="left-item-txt">1197 left</span>
            </div>
            <div className="pokemon-img">
              <img
                src="../assets/2.png"
                title="pokemon image"
                alt="no comment"
                className="pokemon-img-details"
              />
            </div>
          </div>
        </CCol>

        <CCol md="4" className="hover-box">
          <div className="pokemon-item">
            <div className="d-flex justify-content-between">
              <strong>Dave</strong>
              <span className="left-item-txt">unblocked</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="special-card-txt">Fancy</span>
              <span className="left-item-txt">320 left</span>
            </div>
            <div className="pokemon-img">
              <img
                src="../assets/3.png"
                title="pokemon image"
                alt="no comment"
                className="pokemon-img-details"
              />
            </div>
          </div>
        </CCol>
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
