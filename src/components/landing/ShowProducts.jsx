import { useState } from "react";
import LoadingPrd from "./LoadingPrd";
import ProductList from "./ProductList";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="content" style={{padding: '10px', zIndex: '-1'}}>{loading ? <LoadingPrd /> : <ProductList products={products}/>}</div>
  );
};

export default ShowProducts;
