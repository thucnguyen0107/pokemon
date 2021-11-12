import React from "react";
import CIcon from "@coreui/icons-react";
import { cilX } from "@coreui/icons";
import {
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CListGroup,
    CListGroupItem,
} from "@coreui/react";

function CryptoSelectionList(props) {
    const { setIsShowable, isShowable } = props;

    const handleOnCloseSelectionList = () => {
        setIsShowable(false);
    };

    return (
        <>
            <CModal show={isShowable} onClose={handleOnCloseSelectionList}>
                <CModalHeader closeButton={true}>
                    <CModalTitle className="custom">Select a current deposit</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="deposit">
                        <div type="text" className="find">
                            <CIcon icon={cilX} />
                            <input className="find-input" />
                        </div>
                        <div>
                            <CListGroup>
                                <CListGroupItem>Hello</CListGroupItem>
                            </CListGroup>
                        </div>
                    </div>
                </CModalBody>
            </CModal>
        </>
    );
}

export default React.memo(CryptoSelectionList);
