import { useQuery } from "@tanstack/react-query";
import ProductLargeCard from "./ProductLargeCard";
import { getProductsByUserStatus } from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { createContext, useContext, useEffect, useState } from "react";
import NewDateProductModal from "./NewDateProductModal";
import { Context } from "./Products";
import ProductsByUserSectionButtons from "./ProductsByUserSectionButtons";

export const ProductsByUserContext = createContext();

const ProductsByUser = () => {
  /* DATA */
  const [productsList, setProductsList] = useState([]);
  const { newDateProductModal } = useContext(Context);
  const idUser = useAuthStore((state) => state.user.idUser);
  const { data: products } = useQuery({
    queryKey: ["productsByUser", idUser],
    queryFn: () => getProductsByUserStatus(2, idUser),
  });

  useEffect(() => {
    if (products) {
      setProductsList(products);
    }
  }, [products]);

  return (
    <ProductsByUserContext.Provider value={{ productsList, setProductsList }}>
      <div className="content">
        <section className="productsByUserCardsContainer">
          <h3>Mis Productos</h3>
          <ProductsByUserSectionButtons />
          {productsList.map((product) => (
            <ProductLargeCard key={product.idProduct} product={product} />
          ))}
        </section>
        {newDateProductModal && <NewDateProductModal />}
      </div>
    </ProductsByUserContext.Provider>
  );
};

export default ProductsByUser;
