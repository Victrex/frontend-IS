import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from '@mui/icons-material/Edit';

import ProductRating from "./ProductRating";
import ProductComment from "./ProductComment";
import "../../assets/css/commentSection.css"
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "./ProductById";
import { useAuthStore } from "../store/auth";
import { getProfilePhoto } from "../../fetch/userAPI";

const CommentSection = () => {
    const { setActiveRateModal } = useContext(ProductContext);
    const { setTypeRating } = useContext(ProductContext);
    const { setIdRated } = useContext(ProductContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const idUser = useAuthStore((state) => state.idUser);
    const isAuth = useAuthStore((state) => state.isAuth);

    const [editing, setEditing] = useState(false);

    const [rating, setRating] = useState(0); // Nuevo estado para la calificación
    const [hover, setHover] = useState(0); // Nuevo estado para la calificación al pasar el cursor
    
  return (
    <>
    <h4>Calificar producto</h4><h4></h4>
    <p>Comparte tu opinión con otros usuarios</p>

    <div className="commentsStarsContent">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: "none" }}
            />
            <StarIcon
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              style={{
                color:
                  ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
            />   
          </label>
        );
      })}
    </div>

    <div className="commentsRateBtn">
      <EditIcon />&nbsp; <span>Escribe una reseña</span>
    </div>
    
    {editing && 
    <div className="inputGroup">
      <textarea name="description" id="description" className="inputForm pr" ></textarea>
    </div>}
        
    <ProductComment />
    
    </>
  )
}

export default CommentSection
