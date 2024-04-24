import SettingsIcon from "@mui/icons-material/Settings";
import AdministrationSettingsMenuPanel from "./AdministrationSettingsMenuPanel";
import { createContext, useState } from "react";

export const AdminSettingsContext = createContext();
const AdministrationSettingsIcon = () => {
  const [panelActive, setPanelActive] = useState(false);
  const handlePanelActive = () => {
    setPanelActive(!panelActive);
    console.log('click', panelActive)
  };

  return (
    <AdminSettingsContext.Provider value={{panelActive, setPanelActive}}>
      <span className="settingsIcon" onClick={handlePanelActive}>
        <SettingsIcon />
      </span>
      <AdministrationSettingsMenuPanel />
    </AdminSettingsContext.Provider>
  );
};

export default AdministrationSettingsIcon;
