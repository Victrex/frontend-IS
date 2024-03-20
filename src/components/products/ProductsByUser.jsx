import { useQuery } from "@tanstack/react-query";
import ProductLargeCard from "./ProductLargeCard";
import { getProductsByUser } from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";

const ProductsByUser = () => {
  /* DATA */
  const [productsList, setProductsList] = useState([]);

  const idUser = useAuthStore((state) => state.user.idUser);
  const { data: products } = useQuery({
    queryKey: ["products", idUser],
    queryFn: () => getProductsByUser(idUser),
  });

  useEffect(() => {
    if (products) {
      setProductsList(products);
    }
  }, [products]);


  return (
    <div className="content">
      <section className="productsByUserCardsContainer">
        <h3>Mis Productos</h3>
        {productsList.map((product) => (
          <ProductLargeCard key={product.idProduct} product={product} />
        ))}
      </section>
    </div>
  );
};

export default ProductsByUser;
