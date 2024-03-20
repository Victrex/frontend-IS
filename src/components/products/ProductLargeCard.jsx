/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProductPhoto } from "../../fetch/products";

const ProductLargeCard = ({ product }) => {
  const [productPhoto, setProductPhoto] = useState(
    "https://via.placeholder.com/150"
  );
  const { data: photo } = useQuery({
    queryKey: ["photo", product.idProduct],
    queryFn: () => getProductPhoto(product?.photo1.idPhoto),
  });

  useEffect(() => {
    if (photo) {
      setProductPhoto(photo);
    }
  }, [photo]);

  return (
    <div className="largeCard">
      <div className="largeCardImage">
        <img src={productPhoto} alt="product" />
      </div>
      <div className="largeCardText">
        <h3>{product?.productName}</h3>
        <p style={{fontWeight: '600'}}>L. {product?.value.toLocaleString("en-US")}</p>
        <p>{product?.productDescription}</p>
        <p>{product?.idCondition.conditionName}</p>
      </div>
      <span className="largeCardStatus">{product?.idStatus.statusName}</span>
    </div>
  );
};

export default ProductLargeCard;
