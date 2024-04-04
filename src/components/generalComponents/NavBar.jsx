import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/css/navBar.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ProfileIcon from "./ProfileIcon";

const NavBar = () => {
const navigate = useNavigate();


  return (
    <nav className="navBarContainer">
      <div className="navBarLogo">
        <NavLink to="/">
          <h1>Logo</h1>
        </NavLink>
      </div>

      <div className="navBarLinks">
        <NavLink to="/prd">
          <span className="sellTarget">
            Vender
            <StorefrontIcon />
          </span>
        </NavLink>

        <NavLink to="/wishlist">
          <span className="sellTarget">
            Guardados
            <BookmarkIcon />
          </span>
        </NavLink>
          <ProfileIcon />
      </div>
    </nav>
  );
};

export default NavBar;
