import { useContext, useEffect } from "react";
import { AdminSettingsContext } from "./AdministrationSettingsIcon";
import ProductsPeriod from "./ProductsPeriod";

const AdministrationSettingsMenuPanel = () => {
  const panelActive = useContext(AdminSettingsContext);
  const {setPanelActive} = useContext(AdminSettingsContext);

  const handleActivePanel = () => {
    setPanelActive(false);
  }

  useEffect(() => {
    console.log(panelActive.panelActive);
  }, [panelActive]);
  return (
    <div className={panelActive.panelActive === true ? "settingsPanelContainer active" : "settingsPanelContainer" }>
      <div className="settingsPanelBack" onClick={handleActivePanel}></div>
      <div className="settingsPanelContent">
        {/* {panelActive.panelActive === true ? "Activo" : "No Esta Activo"} */}
        
        <ProductsPeriod />
      </div>
    </div>
  );
};

export default AdministrationSettingsMenuPanel;
