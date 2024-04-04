import PropTypes from "prop-types";
import ProductRating from "./ProductRating";
import { Button } from "../generalComponents/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import VendorData from "./VendorData";
import { useState } from "react";

const ProductByIdShowInfo = ({ productData }) => {
  const [rating, setRating] = useState(4.6);
  console.log(productData);

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
      <Button
        innerText="Hacer Una Oferta"
        backgroundColor="#0c5d97"
        color="#fff"
        fontSize="0.9rem"
        icon={<ReplyIcon />}
        iconPosition="left"
      />
      <br />
      <h4>Detalles</h4>
      <p className="detailsItem">
        <b>Estado</b> {productData?.idCondition?.conditionName}
      </p>
      <p className="detailsItem">
        <b>Ubicación</b> {productData?.idDepartment?.departmentName}
      </p>
      <div className="rateBtn">
        <span className="">Calificar Producto</span>
      </div>
      <br />
      <VendorData vendorData={productData?.idUser} />
    </div>
  );
};

ProductByIdShowInfo.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default ProductByIdShowInfo;
