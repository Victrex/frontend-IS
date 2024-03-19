import { Box, Skeleton } from "@mui/material";
import { getProductPhoto } from "../../fetch/products";
import { useEffect, useState } from "react";

const ProductCard = (product, key) => {
  const [productPhoto, setProductPhoto] = useState(null);

  useEffect(() => {
    if (product.product.photo1) {
      getProductPhoto(product.product.photo1.idPhoto).then((photo) => {
        setProductPhoto(photo);
      });
    }
  }, [product.product.photo1]);

  return (
    <>
      {productPhoto ? (
        <Box key={key} sx={{ width: 180, marginRight: 0.5, my: 5 }} >
          <div key={key} className="productCard">
            <img src={productPhoto} alt="Product" />
            <h4 style={{ fontSize: "0.9rem" }}> L. {product.product.value}</h4>
            <p style={{color: "#535353"}}>{product.product.productName}</p>
            <p style={{ fontSize: "0.7rem", color: "#838383" }}>{product.product.idDepartment.departmentName}</p>
          </div>
        </Box>
      ) : (
        <Box key={key} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={188} />
          <Box sx={{ pt: 0.8 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductCard;
