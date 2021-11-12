import {
    CContainer,
    CRow,
    CCol,
    CToast,
    CToastBody,
    Cto,
    CModal,
    CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretBottom } from "@coreui/icons";

import "./deposit-fiat.scss";
import solCurrency from "../../assets/crypto-icon/sol.svg";

import { useState, useRef } from "react";

import CryptoSelectionList from "./Crypto/CryptoSelectionList";

function DepositFiat() {
    let [isShowSelectionList, setIsShowSelectionList] = useState(false);
    let [isShowPubKey, setIsShowPubKey] = useState(false);
    let [pubkey, setPubKey] = useState({ address: "" });
    let [isCopySuccess, setIsCopySuccess] = useState(false);
    let [selectedCoin, setSelectedCoin] = useState(null);

    const handleShowPubKey = () => {
        setIsShowPubKey(true);
    };

    const handleOnSelection = () => {
        setIsShowSelectionList(true);
    };

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

    async function len() {
        var provider = await getProvider();
        const varP = provider.publicKey.toString();
        setPubKey({
            address: varP,
        });
        handleShowPubKey();
    }
    const inputRef = useRef(null);
    function copyToClipboard(e) {
        inputRef.current.select();
        document.execCommand("copy");
        e.target.focus();
        setIsCopySuccess(true);
        setTimeout(() => {
            setIsCopySuccess(false);
        }, 3000);
    }

    const generatePubKey = () => {
        return isShowPubKey ? (
            <CRow className="align-items-center justify-content-center">
                <CCol>
                    <div className="pubkey">
                        <input
                            disabled
                            className="pubkey_value"
                            ref={inputRef}
                            value={pubkey.address}
                        />
                        <button
                            onClick={copyToClipboard}
                            className="pubkey_copy-button"
                        >
                            Copy
                        </button>
                    </div>
                </CCol>
            </CRow>
        ) : null;
    };

    return (
        <>
            <CContainer>
                <CRow className="align-items-center justify-content-center">
                    <CCol className="title">
                        <h1 className="title_content">DEPOSIT</h1>
                        <hr />
                    </CCol>
                </CRow>
                <CRow className="align-items-center justify-content-center">
                    <CCol>
                        <div className="crypto-section">
                            <div
                                className="crypto-selection"
                                onClick={handleOnSelection}
                            >
                                <div className="crypto-selection_child">
                                    <div className="crypto-selection_child-left">
                                        <div className="crypto-selection_icon">
                                            <img src={solCurrency} />
                                        </div>
                                        <div className="crypto-selection_symbol-name">
                                            <span className="crypto-selection_symbol">
                                                SOL
                                            </span>
                                            <span className="crypto-selection_name">
                                                Solana
                                            </span>
                                        </div>
                                    </div>
                                    <div className="crypto-selection_child-right">
                                        <div className="crypto-selection_icon">
                                            <CIcon
                                                icon={cilCaretBottom}
                                                width={10}
                                                height={10}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="deposit-generation">
                                <button
                                    className="deposit-generation_button"
                                    type="button"
                                    onClick={len}
                                >
                                    Deposit
                                </button>
                            </div>
                            <div className="deposit-instruction">
                                <h3 className="deposit-instruction_heading">
                                    deposit instruction
                                </h3>
                                <p className="deposit-instruction_step">
                                    <strong>Step 1.</strong> Select a crypto
                                    coin
                                </p>
                                <p className="deposit-instruction_step">
                                    <strong>Step 2.</strong> Click generate to
                                    get your public key
                                </p>
                                <p className="deposit-instruction_step">
                                    <strong>Step 3.</strong> Send the key to the
                                    trusted party who you want to exchange
                                </p>
                            </div>
                        </div>
                    </CCol>
                    <CryptoSelectionList
                        isShowable={isShowSelectionList}
                        setIsShowable={setIsShowSelectionList}
                        setSelectedCoint={setSelectedCoin}
                    />
                </CRow>
                {generatePubKey()}
            </CContainer>
            <CModal show={isCopySuccess}>
                <CModalBody>
                    Copied Successfully
                </CModalBody>
            </CModal>
        </>
    );
}

export default DepositFiat;
