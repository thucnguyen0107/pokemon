import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const HeaderDropdown = () => {
  const [danger, setDanger] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    history.push(`/login`);
    setDanger(!danger);
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        Xin chào <strong className="m-1"> aaaaa</strong>
        <div className="c-avatar">
          <CImg
            src={
              userData.avatar ? userData.avatar : "avatars/img_avatar_admin.png"
            }
            className="c-avatar-img"
            alt="Dpoint"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem to={"/profile"}>
          <CIcon name="cil-user" className="mfe-2" />
          Hồ sơ
        </CDropdownItem>
        <CDropdownItem to={"/change-password"}>
          <CIcon name="cil-settings" className="mfe-2" />
          Đổi mật khẩu
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => setDanger(!danger)}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
      <CModal
        show={danger}
        onClose={() => setDanger(!danger)}
        color="default"
        size="sm"
        centered={true}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Đăng xuất</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn muốn đăng xuất khỏi hệ thống?</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleLogout}>
            Đồng ý
          </CButton>
          <CButton color="danger" onClick={() => setDanger(!danger)}>
            Từ chối
          </CButton>
        </CModalFooter>
      </CModal>
    </CDropdown>
  );
};

export default HeaderDropdown;
