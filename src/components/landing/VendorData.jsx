import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "./ProductRating";
import { useState } from "react";
import PropTypes from "prop-types";
const VendorData = ({ vendorData }) => {
  const [rating, setRating] = useState(3.8);

  return (
    <div className="productVendor">
      <AccountCircleIcon />
      <div className="vendorInfo">
        <span>
          {vendorData?.firstname} {vendorData?.lastname}
          <ProductRating rating={rating} />
          <div className="rateBtn">
            <span className="">Calificar Vendedor</span>
          </div>
        </span>
      </div>
    </div>
  );
};

VendorData.propTypes = {
  vendorData: PropTypes.object.isRequired,
};

export default VendorData;
