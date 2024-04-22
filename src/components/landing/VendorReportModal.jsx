import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductById";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/css/modals.css";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "../generalComponents/Button";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useAuthStore } from "../store/auth";
import { getComplaintsByUser, getIdRatingVendor, rateVendor, saveComplaint } from "../../fetch/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const complaintTypes = [
  { name: "DEFECTO", desc: "defectos en el producto " },
  { name: "ACOSO", desc: "acoso por parte del vendedor" },
  { name: "ESTAFA", desc: "no se recibio lo ofrecido" },
  { name: "FALSIFICACION", desc: "producto no original o pirata " },
  { name: "POLITICAS", desc: "incumplimiento de las politicas de la plataforma" },
];

const VendorReportModal = () => {
  const { setActiveReportModal } = useContext(ProductContext);
  const idUser = useAuthStore((state) => state.idUser);
  const { data } = useContext(ProductContext);
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [complaint, setComplaint] = useState(null)
  const {data: complaints, isError} = useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaintsByUser(idUser),
  })

  const closeModal = () => {
    setActiveReportModal(false);
  };
  // const ratingTypes = { 0: "Vendors", 1: "Products", 2: "Services" };

  const sendRating = async () => {

    const payload = {
        idUser,
        idVendor: data.idUser.idUser,
        complaintDescription: description,
        complaintType: type,
    }
    const response = await saveComplaint(payload) 
    alert(response.message)

    closeModal();
    queryClient.invalidateQueries("complaints");
    queryClient.refetchQueries("complaints");
  };

  useEffect(() => {
    if (!complaints) return console.log(complaints); 
    console.log("complaints: " + complaints);
    setComplaint( complaints.find( (e) => e.idVendor.idUser == data.idUser.idUser ))
  }, [complaints])

  useEffect(() => {
    console.log("Error");
  }, [isError])
  
  

  return (
    <div className="modalContainer">
      <div className="screenModalBack" onClick={closeModal}></div>
      <section className="modalRateContent" style={{height: 'auto'}}>
        <span onClick={closeModal} className="exitBtn">
          <CloseIcon />
        </span>

        <h4>
          Reportar {` a ${data?.idUser?.firstname} ${data?.idUser?.lastname}`}
        </h4>

        <form className="productRegister">
          <div className="inputGroup">
            <label htmlFor="category">Reportar por </label>
            <select
              name="category"
              id="category"
              className="inputForm pr"
              onChange={(e) => setType(e.target.value)}
              value={type}
              required
            >
              <option value=""></option>
              { complaintTypes.map( e => (
                <option key={e.name} value={e.name}>{e.name + " - " + e.desc}</option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label htmlFor="description">Descripción</label>
            <textarea
              name="description"
              id="description"
              className="inputForm pr"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              style={{
                resize: "none",
                minHeight: "100px !important",
                maxHeight: "100px !important",
                height: "100px !important",
              }}
              required
            ></textarea>
          </div>
        </form>

        <div className="actions">
          <Button
            innerText="Reportar"
            color="#fff"
            backgroundColor="#0F72BA"
            fontSize="0.9rem"
            width="130px"
            height="35px"
            icon={<RateReviewIcon />}
            iconPosition="right"
            onClick={sendRating}
          ></Button>
        </div>
      </section>
    </div>
  );
};

export default VendorReportModal;
