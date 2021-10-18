import React from "react";
import { CFooter, CLink } from "@coreui/react";
const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <CLink href="#">Pokemon Z </CLink>
        <span>&copy; 2021 copyright.</span>
      </div>
      <div>
        <span>Powered by </span>
        <CLink href="#">Tho Nguyen</CLink>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter)
