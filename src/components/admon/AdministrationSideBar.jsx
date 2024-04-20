import { useState } from "react";
import { Link } from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddchartIcon from '@mui/icons-material/Addchart';
const AdministrationSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={!isSidebarOpen ? "sidebar" : "sidebarCollapse"}>
      <div className="logo">
        <img src="src\assets\images\Logo_black.svg" alt="" />
      </div>
      <div className="logoCollapse" onClick={toggleSidebar}>
        <img src="src\assets\images\Logo_black.svg" alt="" />
      </div>
      <br />
      <br />
      <div className="elementsSideBar">
        <div className="element">
            <Link to={''}>
                <AddchartIcon />
                <span>DashBoard</span>
            </Link>
        </div>
        <div className="element">
            <Link to={'complaints'}>
                <ReceiptLongIcon />
                <span>Denuncias</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdministrationSideBar;
