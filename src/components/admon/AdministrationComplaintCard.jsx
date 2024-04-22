import PropTypes from "prop-types";
import VendorData from "../landing/VendorData";

const AdministrationComplaintCard = ({complaint, setActiveComplaintModal, setComplaint}) => {
  const { idComplaint, idUser, idVendor, complaintDescription, complaintType, complaintStatus,} = complaint
  const handleClickCard = () => {
    setComplaint(complaint)
    setActiveComplaintModal(true)
  }
  
  return (
    <>
      <div className="largeCardWishList" style={{cursor:'pointer'}} onClick={ () => handleClickCard() }>
        <span style={{width: '35px'}}>{"#" + idComplaint}</span>
        <div className="largeCardText">
          <div className="metaProduct">
            <h3>{"Vendedor: " + idVendor.firstname + " " + idVendor.lastname}</h3>
            <p>{"Nombre de usuario: " + idVendor.username}</p>
            <hr />
            <p>{"Comprador: " + idUser.firstname + " " + idUser.lastname}</p>
            <p>{"Tipo: " + complaintType}</p>
            <p> {"Descripción: " + complaintDescription} </p>
          </div>
        </div>
        <p>{complaintStatus}</p>
      </div>
    </>
  );
};

AdministrationComplaintCard.propTypes = {
    complaint: PropTypes.object.isRequired,
};
export default AdministrationComplaintCard;
