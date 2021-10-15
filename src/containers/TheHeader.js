import React from "react";
import {
  CHeader,
  CContainer,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  // CHeaderToggler,
  CCollapse,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
  CButton,
  CToggler,
  CImg,
  CNav,
  CRow,
  CCol,
  CFormGroup,
} from "@coreui/react";
import HeaderDropdown from "./HeaderDropdown";
// routes config
import routes from "../routes";

const TheHeader = () => {
  return (
    <CHeader withSubheader className="app-header">
      <CRow>
        <CCol md="6" className="mt-1">
          <div className="d-flex justify-between">
            <div className="">
              <CLink className="header-name" to={"/"}>
                Pokemon Z
              </CLink>
            </div>
            <div className="connect-btn"></div>
            <div className="ml-3">
              <span>Connected wallet: MetaMask</span>
            </div>
          </div>
        </CCol>
        <CCol md="6">
          <CHeaderNav className="px-3">
            <CNav className="d-flex justify-content-end">
              <CNavItem>
                <CDropdown>
                  <CDropdownToggle>Pokemons</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Water</CDropdownItem>
                    <CDropdownItem href="#">Fire</CDropdownItem>
                    <CDropdownItem href="#">Ground</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavItem>
              <CNavItem>
                <CNavLink className="start-btn" href="#">Start</CNavLink>
              </CNavItem>
            </CNav>
          </CHeaderNav>
        </CCol>
      </CRow>
    </CHeader>
  );
};

export default TheHeader;
