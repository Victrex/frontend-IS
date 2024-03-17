import { Link, NavLink } from "react-router-dom";
import "../../assets/css/navBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from '@mui/icons-material/Storefront';

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

        <Link>
          <AccountCircleIcon />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
