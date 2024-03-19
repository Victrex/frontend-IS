import { Box, Skeleton } from "@mui/material";
import { getProductPhoto } from "../../fetch/products";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";

const ProductCard = (product, key) => {
  const [productPhoto, setProductPhoto] = useState(null);
  const isAuth = useAuthStore((state) => state.isAuth);
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
        <Box key={key} sx={{ width: 180, marginRight: 0.5, my: 5 }}>
          <div key={key} className="productCard">
            <img src={productPhoto} alt="Product" />
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4 style={{ fontSize: "0.85rem", flex: "2" }}>
                {" "}
                L. {product.product.value?.toLocaleString("en-US")}
              </h4>
              <p
                style={{
                  color: "#1a13eb",
                  flex: "1",
                  fontSize: "0.75rem",
                  width: "100%",
                  textAlign: "right",
                }}
              >
                {product?.product?.idCondition?.conditionName}
              </p>
            </div>
            <p
              style={{
                color: "#535353",
                fontSize: "0.80rem",
                textAlign: "justify",
              }}
            >
              {product.product.productName}
            </p>
            {isAuth === true ? (
              <p style={{ fontSize: "0.7rem", color: "#1a13eb" }}>
                <a>{product.product.idUser?.username}</a>
              </p>
            ) : (
              ""
            )}
            <p style={{ fontSize: "0.7rem", color: "#838383" }}>
              {product.product.idDepartment.departmentName}
            </p>
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
