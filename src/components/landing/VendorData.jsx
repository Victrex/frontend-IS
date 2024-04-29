import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "./ProductRating";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "./ProductById";
import { useAuthStore } from "../store/auth";
import { getProfilePhoto } from "../../fetch/userAPI";

const VendorData = ({ vendorData, ratingAverage }) => {
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState(0.0);
  const { setActiveRateModal } = useContext(ProductContext);
  const { setActiveReportModal } = useContext(ProductContext);
  const { setTypeRating } = useContext(ProductContext);
  const { setIdRated } = useContext(ProductContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const idUser = useAuthStore((state) => state.idUser);
  const isAuth = useAuthStore((state) => state.isAuth);
  const handleActiveRateModal = () => {
    setTypeRating(0);
    setActiveRateModal(true);
    setIdRated(vendorData.idUser);
  };

  useEffect(() => {
    setRating(ratingAverage);
    // console.log(vendorData)
  }, [ratingAverage]);

  useEffect(() => {
    const fetchProfilePhoto = async (id) => {
      const photo = await getProfilePhoto(id)
        .then(async (res) => {
          if (!res) {
            return null;
          } else {
            return res;
          }
        })
        .catch((err) => {
          console.error(err);
        });

      setProfilePhoto(photo);
    };

    fetchProfilePhoto(vendorData?.profilePhoto?.idPhoto);
  }, [vendorData]);

  return (
    <div className="productVendor">
      {profilePhoto && vendorData?.profilePhoto?.idPhoto !== 'nophoto' ? (
        <img src={profilePhoto} alt="profilePhoto" className="profilePhoto" />
      ) : (
        <AccountCircleIcon />
      )}
      <div className="vendorInfo">
        <span>
          {vendorData?.firstname} {vendorData?.lastname}
          <ProductRating rating={rating} />
          <div className="rateBtn">
            {idUser !== vendorData.idUser && isAuth === true ? (
              <>
                <span className="" onClick={handleActiveRateModal}>
                  Calificar Vendedor
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </span>
      </div>
      {idUser !== vendorData.idUser && isAuth === true ? (
        <span onClick={() => setActiveReportModal(true)}>Denunciar</span>
      ) : (
        ""
      )}
    </div>
  );
};

VendorData.propTypes = {
  vendorData: PropTypes.object.isRequired,
  ratingAverage: PropTypes.number.isRequired,
};

export default VendorData;
