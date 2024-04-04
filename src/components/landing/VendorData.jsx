import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "./ProductRating";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "./ProductById";
const VendorData = ({ vendorData }) => {
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState(0.0);
  const { setActiveRateModal } = useContext(ProductContext);
  const {setTypeRating} = useContext(ProductContext);
  const {setIdRated} = useContext(ProductContext);

  const handleActiveRateModal = () => {
    setTypeRating(0);
    setActiveRateModal(true);
    setIdRated(vendorData.idUser);
  }

  useEffect(() => {
    setRating(vendorData.ratingAverage);
  }, [vendorData]);

  return (
    <div className="productVendor">
      <AccountCircleIcon />
      <div className="vendorInfo">
        <span>
          {vendorData?.firstname} {vendorData?.lastname}
          <ProductRating rating={rating} />
          <div className="rateBtn">
            <span className="" onClick={handleActiveRateModal}>Calificar Vendedor</span>
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
