import { Link } from "react-router-dom";
import "../../assets/css/navBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SellIcon from "@mui/icons-material/Sell";

const NavBar = () => {
  return (
    <nav className="navBarContainer">
      <div className="navBarLogo">
        <h1>Logo</h1>
      </div>

      <div className="navBarLinks">

        <Link to="./register">
          <span className="sellTarget">
            Vender
            <SellIcon />
          </span>
        </Link>

        <Link>
          <AccountCircleIcon />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
