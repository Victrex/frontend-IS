import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getProductPhoto } from "../../fetch/products";
import { useNavigate } from "react-router-dom";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ProductRating from "./ProductRating";

const WishListProductCard = ({product, onDelete}) => {
    const [photo, setPhoto] = useState(null)
    const navigate = useNavigate();

    const { data: photoData } = useQuery({
        queryKey: ["photo", product.idProduct?.idProduct],
        queryFn: () => getProductPhoto(product.idProduct?.photo1.idPhoto),
      });


    useEffect(() => {
        if (photoData) {
          setPhoto(photoData);
        }
    }, [photoData])

    const handleProductClick = () => {
        navigate(`/show/${product.idProduct?.idProduct}`)
    }

    const handleRemoveWishList = () => {
      onDelete(product.idProduct?.idProduct)
        console.log("Remove from WishList")
    }


  return (
    <div className="largeCardWishList">
      <div className="largeCardImage" onClick={handleProductClick}>
        <img src={photo} alt="product" />
      </div>
      <div className="largeCardText">
        <div className="metaProduct">
          <h3 onClick={handleProductClick}>{product.idProduct?.productName}</h3>
          <ProductRating rating={product.idProduct?.ratingAverage} />
          <p>{product.idProduct?.productDescription}</p>
          <p>L .{product.idProduct?.value.toLocaleString("en-US")}</p>
        </div>
      </div>
      <div className="actionWishListProduct" onClick={handleRemoveWishList}> 
        <BookmarkRemoveIcon />
      </div>
    </div>
  );
};

WishListProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};
export default WishListProductCard;
