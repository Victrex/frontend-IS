import { Box } from "@mui/material";
import React from "react";

const ProductCard = (key, product) => {
  return (
    <Box key={key} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
      <div key={key} className="productCard">
        <img src={product.photo} alt="Product" />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </Box>
  );
};

export default ProductCard;
