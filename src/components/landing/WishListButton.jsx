import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthStore } from "../store/auth";
import { getWishListIdByUser, addProductToWishList, getWishListProductByUser } from "../../fetch/products";


const WishListButton = ({productId}) => {
  
  const idUser = useAuthStore((state) => state.idUser);
  
  const handleWishList = async () => {
    
    const  wishlist = await getWishListIdByUser(idUser);
    const { idWishlist } = wishlist

    const data = {
      idWishList: idWishlist,
      idProducts: [productId],
    }

    const res = await addProductToWishList(data)
    const res2 = await getWishListProductByUser(idUser)

    
    
    // console.log('wishlist');
    // console.log(wishlistId);
    console.log(res);
    console.log(res2);

    // console.log(wishlist);
    // console.log(data);
  }


  return (
    <div className="wishSelect" onClick={handleWishList}>
      <span>
        <FavoriteBorderIcon sx={{ cursor: 'pointer' }}/>
        <FavoriteIcon sx={{ cursor: 'pointer' }}/>
      </span>
    </div>
  );
};

export default WishListButton;
