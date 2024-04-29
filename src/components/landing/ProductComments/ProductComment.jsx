import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductRating from "../ProductRating";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../assets/css/commentSection.css";

import { getProfilePhoto } from "../../../fetch/userAPI";
import { getProductPhoto } from "../../../fetch/products";

const ProductComment = ({comment}) => {

    // const { setActiveRateModal } = useContext(ProductContext);
    // const { setTypeRating } = useContext(ProductContext);
    // const { setIdRated } = useContext(ProductContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photos, setPhotos] = useState(null);
    // const idUser = useAuthStore((state) => state.idUser);
    // const isAuth = useAuthStore((state) => state.isAuth);

    // console.log(comment?.idUser?.profilePhoto?.idPhoto, 'idPhoto')



    useEffect(() => {
      const fetchPhotos = async () => {
        const photoIds = [
          comment?.photo1,
          comment?.photo2,
          comment?.photo3
        ]
          .filter((photo) => photo !== null)
          .map((photo) => photo?.idPhoto);
          const photoPromises = photoIds?.map((id) => getProductPhoto(id));
          const photos = await Promise.all(photoPromises);
          setPhotos(photos);
      }
      const fetchProfilePhoto = async () => {
        const photo = await getProfilePhoto(comment?.idUser?.profilePhoto?.idPhoto)
          .then(async (res) => {
            if (!res) {
              return null;
            } else {
              // console.log(res)
              return res;
            }
          })
          .catch((err) => {
            console.error(err);
          });
        setProfilePhoto(photo);
      };
      fetchProfilePhoto();
      fetchPhotos();
    }, [comment]);	


    
  return (
    <div className="productComment">
      {
        profilePhoto && comment?.idUser?.profilePhoto?.idPhoto !== 'nophoto' ? (
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
      {

      <div className="vendorInfo">
        <span>
          {comment?.idUser.firstname} {comment?.idUser.lastname}
          <ProductRating rating={comment?.rate} />
          
        </span>
          <p className="commentParagraph">
            {comment?.comment}
          </p>
          <div className="commentPhotosContainer">

          {
            photos && photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`photo${index}`}
                className="commentPhoto"
              />
            ))
          }
          </div>
      </div>
      }
    </div>
  )
}

ProductComment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default ProductComment
