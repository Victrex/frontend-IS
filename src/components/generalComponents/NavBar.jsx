import {  NavLink } from "react-router-dom";
import "../../assets/css/navBar.css";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ProfileIcon from "./ProfileIcon";

const NavBar = () => {
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

      <ProfileIcon />
        
      </div>
    </nav>
  );
};

export default NavBar;
