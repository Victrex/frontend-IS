import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getProfilePhoto } from "../../fetch/userAPI";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";

import PropTypes from "prop-types";

const ProfilePhoto = ({ profilePhoto }) => {
  return (
    <div className="profilePhoto">
      <img src={profilePhoto} alt="profilePhoto" />
    </div>
  );
};

ProfilePhoto.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
};

const ProfileIcon = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const user = useAuthStore((state) => state.user);

  const fetchProfilePhoto = async (id) => {
    const photo = await getProfilePhoto(id);
    setProfilePhoto(photo);
  };

  useEffect(() => {
    fetchProfilePhoto(user?.profilePhoto?.idPhoto)
  }, [user]);
  return (
    <>
      <Link>
        {profilePhoto ? (
          <ProfilePhoto profilePhoto={profilePhoto} />
        ) : (
          <AccountCircleIcon />
          
        )}
      </Link>
    </>
  );
};

export default ProfileIcon;
