import React from "react";
import {
  CHeader,
  CHeaderNav,
  CLink,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNav,
  CRow,
  CCol,
} from "@coreui/react";

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
              <span className="special-card-txt">Connected wallet: MetaMask</span>
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
                <CNavLink className="start-btn" href="#">
                  Start
                </CNavLink>
              </CNavItem>
            </CNav>
          </CHeaderNav>
        </CCol>
      </CRow>
    </CHeader>
  );
};

export default React.memo(TheHeader);