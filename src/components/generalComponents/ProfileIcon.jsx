import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getProfilePhoto } from "../../fetch/userAPI";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";

import PropTypes from "prop-types";
import { getUser } from "../../fetch/login";

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
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    console.log(user?.profilePhoto?.idPhoto);
    const fetchProfilePhoto = async (id) => {
      const photo = await getProfilePhoto(id)
        .then(async (res) => {

          if (!res) {
            console.log("entro ");
            const user = await getUser({ token: token })
              .then((res) => {
                if (!res) {
                  console.log("res", res);
                  setIsAuth(false);
                }
              })
              .catch((err) => {
                console.error(err);
                setIsAuth(false);
              });
            console.log(user);
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
  return (
    <>
      <Link to={"/login"}>
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
