import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const WishListButton = () => {


  const handleWishList = () => {
    console.log("WishList");
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
