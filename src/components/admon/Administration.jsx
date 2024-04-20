
import { Outlet } from "react-router-dom";
import "../../assets/css/administration.css";
import AdministrationNavBar from "./AdministrationNavBar";
import AdministrationSideBar from "./AdministrationSideBar";


const Administration = () => {


  return (
    <div className="adminPanel">
      {/* {isSidebarOpen === true ? <div className="sidebar res">Sidebar</div> : <div className="sidebar">Sidebar</div>} */}
        <AdministrationSideBar />
      
      <div className="mainContent">
        {/* <div className="navbar">Navbar</div> */}
        <AdministrationNavBar />
        <div className="content">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Administration;
