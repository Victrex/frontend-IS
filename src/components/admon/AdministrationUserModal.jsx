import { useContext, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/css/modals.css";
import { Button } from "../generalComponents/Button";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useAuthStore } from "../store/auth";
import { getComplaintsByUser, getIdRatingVendor, rateVendor, saveComplaint, updateComplaintStatus } from "../../fetch/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdministrationUserModal = ({user, setActiveUserModal}) => {
  const queryClient = useQueryClient();
  const { idUser, userStatus } = user  
  const [ status, setStatus ] = useState(userStatus)
  const closeModal = () => {
    setActiveUserModal(false);
  };

  const sendRating = async () => {
    if (!status) return alert("Seleccione un estado")
    const response = await updateUserStatus(idUser, status) 
    alert(response.message)

    queryClient.invalidateQueries("users");
    queryClient.refetchQueries("users");
    closeModal();
  };

  useEffect(() => {
    console.log("idUser: ",  idUser);
  }, [])
  

  return (
    <div className="modalContainer" style={{position: 'absolute', top: 0, left: 0}}>
      <div className="screenModalBack" onClick={closeModal}></div>
      <section className="modalRateContent" style={{height: 'auto'}}>
        <span onClick={closeModal} className="exitBtn">
          <CloseIcon />
        </span>
        <p>{ idUser }</p>

        {/* <h4>
          Denuncia a {`${idVendor?.firstname} ${idVendor?.lastname} - ${idVendor?.username}`}
        </h4>

        <form className="productRegister">
        <div className="inputGroup">
            <label htmlFor="description">Tipo de denuncia: </label>
            <p
              style={{
                resize: "none",
                minHeight: "100px !important",
                maxHeight: "100px !important",
                height: "100px !important",
              }}
            >{`${complaintType}`}
           </p>
          </div>


          <div className="inputGroup">
            <label htmlFor="category">Estado: </label>
            <select
              name="category"
              id="category"
              className="inputForm pr"
              onChange={(e) => setStatus(e.target.value)}
              value={ status }
              required
            >
              <option value="">Seleccione un estado</option>
              { complaintStates.map( e => (
                <option key={e.name} value={e.name}>{e.name + " - " + e.desc}</option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label htmlFor="description">Descripción: </label>
            <p
              style={{
                resize: "none",
                minHeight: "100px !important",
                maxHeight: "100px !important",
                height: "100px !important",
              }}
            >{complaintDescription} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid doloremque ab, neque fugit consectetur unde soluta, sint nobis hic excepturi earum veniam perferendis saepe! Dolores labore illo earum iure laboriosam!
           </p>
          </div>
          
          <div className="inputGroup">
            <label htmlFor="description">Denunciado por: </label>
            <p
              style={{
                resize: "none",
                minHeight: "100px !important",
                maxHeight: "100px !important",
                height: "100px !important",
              }}
            >{`Nombre: ${idUser.firstname} ${idUser.lastname}`}
            <br />
            {`Usuario: ${idUser.username}`} 
           </p>
          </div>
        </form>

        <div className="actions" style={{gap: '5px'}}>
          <Button
            innerText="Actualizar"
            color="#fff"
            backgroundColor="#0F72BA"
            fontSize="0.9rem"
            width="130px"
            height="35px"
            icon={<RateReviewIcon />}
            iconPosition="right"
            onClick={sendRating}
          ></Button>

        </div> */}
      </section>
    </div>
  );
};

export default AdministrationUserModal;
