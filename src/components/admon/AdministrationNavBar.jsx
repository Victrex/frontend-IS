import ProfileIcon from "../generalComponents/ProfileIcon";
import AdministrationSettingsIcon from "./AdministrationSettingsIcon";

const AdministrationNavBar = () => {
  return (
    <nav className=" navbar">
      <div className="navBarLogo"></div>

      <div className="navBarLinks">
        <AdministrationSettingsIcon />
        <ProfileIcon />
      </div>
    </nav>
  );
};

export default AdministrationNavBar;
