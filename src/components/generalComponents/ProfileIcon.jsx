import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getProfilePhoto } from "../../fetch/userAPI";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuthStore } from "../store/auth";

import PropTypes from "prop-types";
import { getUser } from "../../fetch/login";
import ProfileMenu from "./ProfileMenu";

export const ProfileContext = createContext(null);

const ProfilePhoto = ({ profilePhoto, isPhotoExist }) => {
  const { setShowMenu, showMenu } = useContext(ProfileContext);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };



  return (
    <div className="profilePhoto" onClick={handleClick}>
      {
        isPhotoExist === true ? <img src={profilePhoto} alt="profilePhoto" /> : <div className="svgProfileIcon"> <AccountCircleIcon /> </div> 
      }
      {/* <img src={profilePhoto} alt="profilePhoto" /> */}
    </div>
  );
};

ProfilePhoto.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
  isPhotoExist: PropTypes.bool.isRequired,
};

const ProfileIcon = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const user = useAuthStore((state) => state.user);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const token = useAuthStore((state) => state.token);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchProfilePhoto = async (id) => {
      const photo = await getProfilePhoto(id)
        .then(async (res) => {
          if (!res) {
            const user = await getUser({ token: token })
              .then((res) => {
                if (!res) {
                  setIsAuth(false);
                }
              })
              .catch((err) => {
                console.error(err);
                setIsAuth(false);
              });
          } else {
            return res;
          }
        })
        .catch((err) => {
          console.error(err);
        });

      setProfilePhoto(photo);
    };

    fetchProfilePhoto(user?.profilePhoto?.idPhoto);
  }, [user, token, setIsAuth]);

  useEffect(() => {
  }, [showMenu]);
  return (
    <div className="profileIcon">
      <ProfileContext.Provider value={{ showMenu, setShowMenu }}>
        {profilePhoto ?  (
          <ProfilePhoto profilePhoto={profilePhoto} isPhotoExist={user?.profilePhoto?.idPhoto !== 'nophoto'} />
        ) : (
          <div className="svgProfileIcon" >
            <Link to={'/login'}>
            <AccountCircleIcon />
            </Link>
          </div>
        )}

        <ProfileMenu />
      </ProfileContext.Provider>
    </div >
  );
};

export default ProfileIcon;
