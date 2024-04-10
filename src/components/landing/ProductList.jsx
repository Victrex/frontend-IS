import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = (products) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList(products?.products ?? []);
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
      zIndex={-1}
    >
      {productList.length > 0 &&
        productList?.map((product, index) => (
          <ProductCard
            key={index}
            auth={"sd"}
            product={product}
          />
        ))}
    </Grid>
  );
};

export default ProductList;
