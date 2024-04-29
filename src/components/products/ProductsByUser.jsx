import { useQuery } from "@tanstack/react-query";
import ProductLargeCard from "./ProductLargeCard";
import { getProductsByUserStatus } from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { createContext, useContext, useEffect, useState } from "react";
import NewDateProductModal from "./NewDateProductModal";
import { Context } from "./Products";
import ProductsByUserSectionButtons from "./ProductsByUserSectionButtons";
import { Card, CardHeader, Skeleton } from "@mui/material";

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
          {productsList?.length >= 1 ? (
            productsList?.map((product) => (
              <ProductLargeCard key={product.idProduct} product={product} />
            ))
          ) : (
            <>
              {[...Array(3)].map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: "100%",
                    m: 1,
                    width: "90%",
                    boxShadow:
                      "0px 2px 1px -1px rgba(0, 0, 0, 0.116),0px 1px 1px 0px rgba(0, 0, 0, 0.075),0px 1px 3px 0px rgba(0, 0, 0, 0.068)",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Skeleton
                        animation="wave"
                        width={210}
                        height={100}
                        variant="rectangular"
                      />
                    }
                    title={
                      <Skeleton animation="wave" height={10} width="80%" />
                    }
                    subheader={
                      <Skeleton animation="wave" height={10} width="40%" />
                    }
                  />
                </Card>
              ))}
            </>
          )}
        </section>
        {newDateProductModal && <NewDateProductModal />}
      </div>
    </ProductsByUserContext.Provider>
  );
};

export default ProductsByUser;
