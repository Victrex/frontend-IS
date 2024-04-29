import { useContext, useEffect, useState } from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { ProfileContext } from './ProfileIcon';
import { useAuthStore } from '../store/auth';
import { WidthFull } from '@mui/icons-material';
const ProfileMenu = () => {
    const {showMenu} = useContext(ProfileContext)
    const {setShowMenu} = useContext(ProfileContext)
    const logoutAuth = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    console.log(user)
    const handleClick = () => {
        setShowMenu(!showMenu);
      }

      const logout = () => {
        console.log('logout')
        logoutAuth()
        

      }
  return (
    <div className={`profileMenuContainer ${showMenu ? 'show' : ''}`} onClick={handleClick}>
      {/* <div className="backProfileMenu"></div> */}
      <section className="profileMenuContent">
        <div className="profileMenuElement">
          <Link>
            <AccountCircleIcon style={{fontSize: '2rem'}}/>
            <span>{user?.firstname} {user?.lastname} <br /> <small>@{user?.username}</small></span> 
          </Link>
        </div>
        <div className="profileMenuElement" onClick={logout}>
          <Link to={'/login'}>
            <LogoutIcon />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProfileMenu;
