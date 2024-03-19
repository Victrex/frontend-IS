import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = (products) => {
  const [productList, setProductList] = useState([]);
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
      marginX={0}
      gap={1}
      alignContent={"center"}
      justifyContent={"center"}
      maxWidth={"100%"}

    >
      {productList.length > 0 &&
        productList?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
    </Grid>
  );
};

export default ProductList;
