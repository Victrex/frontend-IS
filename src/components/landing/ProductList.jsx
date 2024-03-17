import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = (products) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList(products ?? []);
  }, [products]);
  return (
    <Grid container wrap="wrap" item spacing={2} xs={8} gap={2}>

      {
        productList.length > 0 &&
        productList?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      }
    </Grid>
  );
};

export default ProductList;
