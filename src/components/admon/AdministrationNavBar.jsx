import ProfileIcon from "../generalComponents/ProfileIcon";

const AdministrationNavBar = () => {
  return (
    <nav className=" navbar">
      <div className="navBarLogo"></div>

      <div className="navBarLinks">
        <ProfileIcon />
      </div>
    </nav>
  );
};

export default AdministrationNavBar;
