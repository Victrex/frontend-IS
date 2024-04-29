import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddchartIcon from '@mui/icons-material/Addchart';
import PeopleIcon from '@mui/icons-material/People';

import { useActiveSections } from "../store/activeSections";
const AdministrationSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeAdminSection = useActiveSections((state) => state.activeAdminSection);
  const setActiveAdminSection = useActiveSections((state) => state.setActiveAdminSection);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelected = (e) => {
    setActiveAdminSection(e.currentTarget.id);
  };
  useEffect(() => {
    // console.log(activeAdminSection, 'activeAdminSection');
  }, [activeAdminSection]);
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
        <div className={activeAdminSection === '0' ? 'element activeAdminSection' : 'element'} id="0" onClick={handleSelected}>
            <Link to={''}>
                <AddchartIcon />
                <span>DashBoard</span>
            </Link>
        </div>
        <div className={activeAdminSection === '1' ? 'element activeAdminSection' : 'element'} id="1" onClick={handleSelected}>
            <Link to={'complaints'}>
                <ReceiptLongIcon />
                <span>Denuncias</span>
            </Link>
        </div>
        <div className={activeAdminSection === '2' ? 'element activeAdminSection' : 'element'} id="2" onClick={handleSelected}>
            <Link to={'users'}>
                <PeopleIcon />
                <span>Usuarios</span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdministrationSideBar;
