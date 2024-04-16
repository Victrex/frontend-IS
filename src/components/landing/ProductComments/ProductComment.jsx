import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "../ProductRating";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../ProductById";
import { useAuthStore } from "../../store/auth";
import "../../../assets/css/commentSection.css";

import { getProfilePhoto } from "../../../fetch/userAPI";

const ProductComment = ({comment}) => {

    const [rating, setRating] = useState(0.0);
    // const { setActiveRateModal } = useContext(ProductContext);
    // const { setTypeRating } = useContext(ProductContext);
    // const { setIdRated } = useContext(ProductContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    // const idUser = useAuthStore((state) => state.idUser);
    // const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div className="productComment">
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
          {comment?.idUser.firstname} {comment?.idUser.lastname}
          <ProductRating rating={comment?.rate} />
          
        </span>
          <p className="commentParagraph">
            {comment?.comment}
          </p>
      </div>
    </div>
  )
}

ProductComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default ProductComment
