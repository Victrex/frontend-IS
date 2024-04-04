import { useContext, useState } from "react";
import { ProductContext } from "./ProductById";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/css/modals.css";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "../generalComponents/Button";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useAuthStore } from "../store/auth";
import { getIdRatingVendor, rateVendor } from "../../fetch/products";
import { useQueryClient } from "@tanstack/react-query";

const ProductRatingModal = () => {
  const { setActiveRateModal } = useContext(ProductContext);
  const [rating, setRating] = useState(0); // Nuevo estado para la calificación
  const [hover, setHover] = useState(0); // Nuevo estado para la calificación al pasar el cursor
  const { typeRating } = useContext(ProductContext);
  const { idRated } = useContext(ProductContext);
  const idUser = useAuthStore((state) => state.idUser);
  const queryClient = useQueryClient();
  const closeModal = () => {
    setActiveRateModal(false);
  };
  // const ratingTypes = { 0: "Vendors", 1: "Products", 2: "Services" };
  const sendRating = async () => {
    // Aquí se enviaría la calificación a la API

    let payload;
    switch (typeRating) {
       case  0:
        await getIdRatingVendor(idUser, idRated)
          .then((res) => {
            // console.log(res.idRating);
            payload = {
              idRating: res.idRating,
              idVendor: idRated,
              idUser: idUser,
              rate: rating,
            };
            rateVendor(payload);

          })

        break;
      case 1:
        // code for rating a product
        break;
      case 2:
        // code for rating a service
        break;
      default:
        break;
    }
    // console.log(payload);
    closeModal();
    queryClient.invalidateQueries("productById");
    queryClient.refetchQueries("productById");
  };

  return (
    <div className="modalContainer">
      <div className="screenModalBack" onClick={closeModal}></div>
      <section className="modalRateContent">
        <span onClick={closeModal} className="exitBtn">
          <CloseIcon />
        </span>

        <h4>
          Califica el{" "}
          {typeRating === 0 ? "Vendedor" : typeRating === 1 ? "Producto" : ""}
        </h4>
        <div className="starsContent">
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
        <div className="actions">
          <Button
            innerText="Enviar"
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

export default ProductRatingModal;
