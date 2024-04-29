import PropTypes from "prop-types";
import env from "../../fetch/env";
import ProductRating from "../landing/ProductRating";
import { Switch } from "@mui/material";
import { useState } from "react";
import { disableUser, enableUser } from "../../fetch/products";
import { useAuthStore } from "../store/auth";


const AdministrationUserCard = ({user, setActiveUserModal, setUser}) => {
  const idCurrentUser = useAuthStore((state) => state.idUser);
  const { idUser, firstname, lastname, username, email, phone, totalRatingQuantity, totalRatings, ratingAverage, profilePhoto, enabled, idAddress, authorities,
  } = user
  const [checked, setChecked] = useState(enabled);
  const [disableSwitch, setDisableSwitch] = useState(false)

  const handleChange = async (event) => {
    if (idCurrentUser == idUser) return alert("No puedes deshabilitar tu propio usuario")

    setDisableSwitch(true)

    const targetChecked = event.target.checked
    
    let result
    if (checked) {
      result = await disableUser(idUser)
    } else {
      result = await enableUser(idUser)
    }
    
    console.log(result);
    setDisableSwitch(false)

    setChecked(targetChecked);
  };

  const handleClickCard = () => {
    setUser(user)
    setActiveUserModal(true)
  }

  const baseUrl = env.URL_BACKEND

  const toggleUser = () => {
    
  }
  
  
  return (
    <>
      <div className="largeCardWishList"  
      // onClick={ () => handleClickCard() }
      >
        
        <img style={{width: '6.25rem', height: '6.25rem', objectFit: 'cover' } } src={`${baseUrl}photo/${profilePhoto.idPhoto}`}  />
        <div className="largeCardText">
          <div className="metaProduct">
            <h3>{firstname + " " + lastname}</h3>
            <ProductRating rating={ratingAverage} />
            <p>{"Nombre de usuario: " + username}</p>
            <p>{"Rol: " + authorities.map( item => item.authority + " ") }</p>
            <p>{"Correo: " + email}</p>
            <p>{"Telefono: " + phone } </p>
            <p>{"Calificaciones: " + totalRatingQuantity}</p>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <p style={{ color: `${checked ? 'green' : 'red'}`}}>
            {checked ? "Habilitado" : "Deshabilitado" }</p>
          {
            idCurrentUser != idUser ? <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled', 'disabled': disableSwitch}} 
          /> : ""
          }
          
          </div>
      </div>
    </>
  );
};

AdministrationUserCard.propTypes = {
    user: PropTypes.object.isRequired,
    setActiveUserModal: PropTypes.func,
    setUser: PropTypes.func,
};
export default AdministrationUserCard;
