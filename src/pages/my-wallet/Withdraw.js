import React, { useEffect, useState } from "react";
import {useForm} from 'react-hook-form'
import { useHistory } from "react-router";
import { getNftsFromWallet } from "../../helpers/CommonForSolana";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CRow,
  CInputGroupText,
  CInputGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {freeSet} from '@coreui/icons';

const Withdraw = () => {
  const history = useHistory();
  const {setError, formState: {errors}} = useForm({});

  const [currencyTypeOptions, setCurrencyTypeOptions] = useState([]);
  const [withdrawData, setWithdrawData] = useState({});

  useEffect(() => {
    // todo get currency type 
    console.log("zo withdraw");
  }, []);




  const onChangeInput = (event) => {
    let target = event.target;
    setWithdrawData({
      ...withdrawData, [target.name]: target.value
    });
  };

  const listCategory = currencyTypeOptions.map((cat, index) =>
  (cat.subCategories.length > 0 ? (<optgroup key={index} label={cat.name}>
    {cat.subCategories.length > 0 ? (cat.subCategories.map((subcat, i) =>
        (<option key={i}
                 value={cat.id + '_' + cat.name + '-' + subcat.id + '_' + subcat.name}>{subcat.name}</option>)
    )) : ''}
  </optgroup>) : '')
  );
  const validateSpecialFields = () => {
    let isValid = true;
    if (withdrawData.current_type === '' || withdrawData.current_type === undefined) {
      setError("current_type", {
        type: "manual",
        message: "Please select Currency Type"
      });
      isValid = false;
    } else {      
      setError("current_type", {});
    }
   
    if (withdrawData.address === '' || withdrawData.address === undefined) {
      setError("address", {
        type: "manual",
        message: "Please enter Wallet Address"
      });
      isValid = false;
    } else {
      setError("address", {});
    }

    if (withdrawData.amount === '' || withdrawData.amount === undefined) {
      setError("amount", {
        type: "manual",
        message: "Please enter Amount"
      });
      isValid = false;
    } else {
      setError("amount", {});
    }
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let valid = validateSpecialFields();

    if (valid) {
      // todo submit
      console.log("withdrawData", withdrawData);
    }

  };

  return (
    <div class="wrapper d-flex flex-column min-vh-100 dark:bg-transparent">
      <div class="body flex-grow-1 px-3">
        <div class="container-lg">
        <CCard style={{width: '80%', margin: 'auto'}}> 
            <CCardHeader>
              <h4>Withdraw</h4>
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal" noValidate={true}>
                <CFormGroup row md="12">
                  <CCol md="12">
                    <CFormGroup row className="required">
                      <CCol xs="12" md="12">
                        <CLabel className="control-label"><b>Currency Type</b></CLabel>
                        <CInputGroup className="mb-3">
                          <select className="form-control" name="current_type"
                                  value={withdrawData.current_type ? withdrawData.current_type : ''}
                                  onChange={onChangeInput}>
                            <option value="">Please select currency type</option>
                            <option value="BTC">BTC</option>
                            <option value="SOL">SOL</option>
                          </select>
                        </CInputGroup>
                      </CCol>
                    </CFormGroup>
                    {errors.current_type &&
                    <p style={{color: 'red', marginTop: '-10px'}}>{errors.current_type.message}</p>}
                    <CFormGroup row className="required">
                      <CCol xs="12" md="12">
                        <CLabel className="control-label"><b>Wallet Address</b></CLabel>
                        <CInputGroup className="mb-3">
                          <input className="form-control" type="text" name="address"
                               placeholder=""
                               value={withdrawData.address ? onChangeInput.address : ''}
                               onChange={onChangeInput}/>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilWallet}/>
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                    </CFormGroup>
                    {errors.address &&
                    <p style={{color: 'red', marginTop: '-10px'}}>{errors.address.message}</p>}

                    <CFormGroup row className="required">
                      <CCol xs="12" md="12">
                        <CLabel className="control-label"><b>Amount</b></CLabel>
                        <CInputGroup className="mb-3">
                          <input className="form-control" type="number" name="amount"
                               placeholder=""
                               value={withdrawData.amount ? onChangeInput.amount : ''}
                               onChange={onChangeInput}/>
                          <CInputGroupText>
                            <CIcon content={freeSet.cilDollar}/>
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                    </CFormGroup>
                    {errors.amount &&
                    <p style={{color: 'red', marginTop: '-10px'}}>{errors.amount.message}</p>}
                    <CFormGroup row className="required">
                      <CCol xs="12" md="12">
                        <CLabel className="control-label">Details:</CLabel>
                        <br/>
                        <span>- Transaction Fee: </span>
                        <br/>
                        <span>- Total ETH get: </span>
                        <br/>
                        <span>- Process Time: </span>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <footer class="card-footer" style={{ textAlign:"center" }}>
              <CButton  class="btn btn-danger" 
                style={{ marginRight: '8px' }}
                onClick={() =>  history.goBack()}
                >Cancel</CButton>
              <CButton class="btn btn-primary" 
                 onClick={onSubmit}
                  >Submit</CButton>
            </footer>
          </CCard>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
