import { useQuery } from "@tanstack/react-query";
import ProductLargeCard from "./ProductLargeCard";
import { getProductsByUser } from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useContext, useEffect, useState } from "react";
import NewDateProductModal from "./NewDateProductModal";
import { Context } from "./Products";

const ProductsByUser = () => {
  /* DATA */
  const [productsList, setProductsList] = useState([]);
  const { newDateProductModal } = useContext(Context);
  const idUser = useAuthStore((state) => state.user.idUser);
  const { data: products } = useQuery({
    queryKey: ["productsByUser", idUser],
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
          {
            newDateProductModal && <NewDateProductModal />
          }
    </div>
  );
};

export default ProductsByUser;
