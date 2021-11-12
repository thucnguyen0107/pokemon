import React from "react";
import CIcon from "@coreui/icons-react";
import { cilZoom, cilCaretBottom } from "@coreui/icons";
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
} from "@coreui/react";

import solCurrency from "../../../assets/crypto-icon/sol.svg";

let coins = [
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
    {ico: solCurrency, symbol: 'SOL', name: "Solana"},
]

function CryptoSelectionList(props) {
    const { setIsShowable, isShowable, setSelectedCoint } = props;

    const handleOnCloseSelectionList = () => {
        setIsShowable(false);
    };

    const handleSetSelectedCoin = coin => {
        setIsShowable(false);
        setSelectedCoint(coin);
    }

    return (
        <>
            <CModal show={isShowable} onClose={handleOnCloseSelectionList}>
                <CModalHeader closeButton={true}>
                    <CModalTitle className="custom">
                        Select a current deposit
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="deposit">
                        <div type="text" className="find">
                            <CIcon className="find_icon-exit" icon={cilZoom} />
                            <input
                                placeholder="Find a coin"
                                className="find_input"
                            />
                        </div>
                        <div className="list-coin">
                           {coins.map((coin, idx) => {
                               return <div key={idx} className="list-coin_item" onClick={
                                   () => { handleSetSelectedCoin(coin.symbol )}
                               }>
                               <div className="coin-item">
                                   <div className="coin-item_icon">
                                       <img src={coin.ico} alt="Image is not available" />
                                   </div>
                                   <div className="coin-item_des">
                                       <div className="coin-item_symbol">{coin.symbol}</div>
                                       <div className="coin-item_name">{coin.name}</div>
                                   </div>
                               </div>   
                           </div>  
                           })}
                        </div>
                    </div>
                </CModalBody>
            </CModal>
        </>
    );
}

export default React.memo(CryptoSelectionList);
