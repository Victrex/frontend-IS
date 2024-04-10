import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "./ProductRating";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "./ProductById";
import { useAuthStore } from "../store/auth";
import { getProfilePhoto } from "../../fetch/userAPI";

const ProductComment = () => {

    const [rating, setRating] = useState(0.0);
    const { setActiveRateModal } = useContext(ProductContext);
    const { setTypeRating } = useContext(ProductContext);
    const { setIdRated } = useContext(ProductContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const idUser = useAuthStore((state) => state.idUser);
    const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div className="productVendor">
      {
        profilePhoto ? (
          <img
            src={profilePhoto}
            alt="profilePhoto"
            className="profilePhoto"
          />
        )
          : (
            <AccountCircleIcon />
          )
      }
      <div className="vendorInfo">
        <span>
          {/* {vendorData?.firstname} {vendorData?.lastname} */}
          Federico Peluche
          <ProductRating rating={rating} />
          
        </span>
      </div>
    </div>
  )
}

export default ProductComment
