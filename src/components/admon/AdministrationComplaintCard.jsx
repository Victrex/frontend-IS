import PropTypes from "prop-types";

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
            <p>{"Tipo: " + complaintType}</p>
            <p> {"Description: " + complaintDescription} </p>
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
