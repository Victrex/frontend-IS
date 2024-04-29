import PropTypes from "prop-types";
import ProductRating from "./ProductRating";

import VendorData from "./VendorData";
import CommentSection from "./ProductComments/CommentSection";
import { useEffect, useState } from "react";
import ClientOffer from "./ClientOffer";
import { useAuthStore } from "../store/auth";

const ProductByIdShowInfo = ({ productData }) => {
  const [rating, setRating] = useState(0);
  const idUser = useAuthStore((state) => state.idUser);
  const isAuth = useAuthStore((state) => state.isAuth);

  useEffect(() => {
    setRating(productData?.ratingAverage);

  }, [productData]);

  return (
    <div className="productInfoContainer">
      <h3>{productData?.productName}</h3>
      <ProductRating rating={rating} />

      <br />
      <span className="price">
        L. {productData?.value?.toLocaleString("en-US")}
      </span>
      <br />
      <h4>Acerca del Producto</h4>
      <p>{productData?.productDescription}</p>
      <hr />
      <br />
      {isAuth && productData?.idUser?.idUser !== idUser && (
        <ClientOffer productData={productData} />
      )}
      {/* <ClientOffer productData={productData} /> */}
      <br />
      <h4>Detalles</h4>
      <p className="detailsItem">
        <b>Estado</b> {productData?.idCondition?.conditionName}
      </p>
      <p className="detailsItem">
        <b>Ubicación</b> {productData?.idDepartment?.departmentName}
      </p>

      <br />
      <VendorData vendorData={productData?.idUser} ratingAverage={productData?.idUser?.ratingAverage}/>
      <br />
      <CommentSection idProduct={productData.idProduct} />
    </div>
  );
};

ProductByIdShowInfo.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default ProductByIdShowInfo;
