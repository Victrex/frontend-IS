import { useEffect, useState } from "react";
import {
  getWishListProductByUser,
  updateProductToWishList,
  getWishListIdByUser,
} from "../../fetch/products";
import { useAuthStore } from "../store/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WishListProductCard from "./WishListProductCard";

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
          {wishList &&
            wishList?.map((product) => (
              <WishListProductCard
                key={product.idProduct.idProduct}
                product={product}
                onDelete={handleDeleteWishListProduct}
              />
            ))}
        </section>
      </div>
    </>
  );
};

export default WishList;
