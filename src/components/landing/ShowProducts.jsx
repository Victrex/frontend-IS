import { useEffect, useState } from "react";
import LoadingPrd from "./LoadingPrd";
import ProductList from "./ProductList";
import { useQuery } from "@tanstack/react-query";
import { getAllProductPaginated } from "../../fetch/products";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const { data: productsData } = useQuery({
    queryKey: ["products", page, size],
    queryFn: () => getAllProductPaginated(page, size),
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
      console.log(productsData)
      setLoading(false);
    }
  }, [productsData]);
  return (
    <div className="content" style={{ padding: "10px", zIndex: "-1" }}>
      {loading ? <LoadingPrd /> : <ProductList products={products} />}
    </div>
  );
};

export default ShowProducts;
