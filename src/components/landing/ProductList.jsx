import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAuthStore } from "../store/auth";

const ProductList = (products) => {
  const [productList, setProductList] = useState([]);
  const isAuth = useAuthStore((state) => state.isAuth);
  useEffect(() => {
    setProductList(products?.products ?? []);
    console.log(products.products);
  }, [products]);

  
  return (
    <Grid
    container
    wrap="wrap"
    item
    spacing={2}
    xs={8}
    xl={5}
    md={10}
    sm={8}
    marginX={0}
    gap={1}
    alignContent={"center"}
    justifyContent={"center"}
    maxWidth={"100%"}

    >
      {productList.length > 0 &&
        productList?.map((product, index) => (
          <ProductCard key={index} auth={'sd'} product={product}  />
        ))}
    </Grid>
  );
};

export default ProductList;
