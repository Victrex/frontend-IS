import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ProductContext } from "./Landing";

import { useAuthStore } from "../store/auth";
import { getWishListIdByUser, addProductToWishList, getWishListProductByUser, updateProductToWishList } from "../../fetch/products";


const WishListButton = ({productId}) => {
  const queryClient = useQueryClient()
  
  const { products, wishList, setWishList } = useContext(ProductContext);
  const [inWishlist, setInWishlist] = useState(false);
  
  const idUser = useAuthStore((state) => state.idUser);
  const isAuth = useAuthStore((state) => state.isAuth);
  
  const handleWishList = async () => {
    
    const  wishlist = await getWishListIdByUser(idUser);
    const { idWishlist } = wishlist

    const data = {
      idWishList: idWishlist,
      idProducts: [productId],
    }

    if (inWishlist) {
      await handleDeleteWishListProduct(productId)
      setInWishlist(false)
      alert("Producto retirado de la wishlist")
      
    } else {
      const res = await addProductToWishList(data)
      const res2 = await getWishListProductByUser(idUser)
      
      console.log(res);
      console.log(res2);
      
      // console.log(wishlist);
      // console.log(data);
      setInWishlist(true)
      alert("Producto agregado a la wishlist")
    }
  }

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

  useEffect(() => {
    if ( wishList ) {
      setInWishlist( !!wishList.find( item => item.idProduct.idProduct == productId ) )
      console.log(inWishlist);
    }
  }, [])


  return (
    <div className={inWishlist ? "wishSelected" : "wishSelect"} onClick={handleWishList}>
      <span>
        <FavoriteBorderIcon sx={{ cursor: 'pointer' }}/>
        <FavoriteIcon sx={{ cursor: 'pointer' }}/>
      </span>
    </div>
  );
};

export default WishListButton;
