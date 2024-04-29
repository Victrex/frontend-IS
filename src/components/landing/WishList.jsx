import { useEffect, useState } from "react";
import {
  getWishListProductByUser,
  updateProductToWishList,
  getWishListIdByUser,
} from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WishListProductCard from "./WishListProductCard";
import { Card, CardHeader, Skeleton } from "@mui/material";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const idUser = useAuthStore((state) => state.idUser);
  const queryClient = useQueryClient();

  const handleDeleteWishListProduct = async (productId) => {
    const newFilter = wishList.filter(
      (product) => product.idProduct.idProduct != productId
    );

    console.log(wishList);

    const { idWishlist: idWishList } = await getWishListIdByUser(idUser);
    const payload = {
      idWishList,
      idProducts: [...newFilter.map((value) => value.idProduct.idProduct)],
    };
    setWishList(newFilter);
    try {
      await updateProductToWishList(payload);
    } catch (error) {
      console.error("Error updating product to wish list:", error);
      // Handle the error...
    }

    console.log(payload);
    // console.log(payload);
    console.log(wishList);
    queryClient.invalidateQueries(["wishList", idUser]);
    queryClient.refetchQueries(["wishList", idUser]);
  };

  // console.log(idUser);

  const { data: wishListData, isError } = useQuery({
    queryKey: ["wishList", idUser],
    queryFn: () => getWishListProductByUser(idUser),
  });

  if (isError) {
    console.log("Error");
  }

  useEffect(() => {
    setWishList(!wishListData?.message ? wishListData : []);
    console.log(wishListData);
  }, [wishListData]);

  return (
    <>
      <div className="content">
        <section
          className="productsByUserCardsContainer"
          style={{ justifyContent: "flex-start" }}
        >
          <h1>Lista de Deseos</h1>
          {wishList?.length >= 1 ? (
            wishList?.map((product) => (
              <WishListProductCard
                key={product.idProduct.idProduct}
                product={product}
                onDelete={handleDeleteWishListProduct}
              />
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
      </div>
    </>
  );
};

export default WishList;
