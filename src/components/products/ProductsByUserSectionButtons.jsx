import { useContext } from "react";
import { ProductsByUserContext } from "./ProductsByUser";
import { getProductsByUserStatus } from "../../fetch/products";
import { useAuthStore } from "../store/auth";

const ProductsByUserSectionButtons = () => {
  const { setProductsList } = useContext(ProductsByUserContext);
  const $ = (selector) => document.querySelectorAll(selector);
  const idUser = useAuthStore((state) => state.user.idUser);
  const $buttons = $(".productByUserButton");
  const handleActive = async (e) => {
    console.log("Active" + e.target.id);

    $buttons.forEach((button) => {
      button.classList.remove("sectionActive");
    });
    e.target.classList.add("sectionActive");
    const data = await getProductsByUserStatus(e.target.id, idUser);
    setProductsList(data);

  };

  return (
    <div className="productByUserButtonsContainer">
      <div id="2" className="productByUserButton sectionActive" onClick={handleActive}>
        Activo
      </div>
      <div id="1" className="productByUserButton" onClick={handleActive}>
        Pendiente
      </div>
      <div id="3" className="productByUserButton" onClick={handleActive}>
        Vendido/Cancelado
      </div>
    </div>
  );
};

export default ProductsByUserSectionButtons;
