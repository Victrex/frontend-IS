import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import { useContext, useEffect, useState } from "react";
import { Context } from "./Products";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useNavigate } from "react-router-dom";
const Aside = () => {
  const [selectedSection, setSelectedSection] = useState("products");
  const { setActiveSection, setEditProductActive } = useContext(Context);
  const {setPhotos} = useContext(Context)
  const navigate = useNavigate();
  /* SELECT AN ITEM */
  const handleAside = (e) => {
    const asideItems = document.querySelectorAll(".prdAsideItem");
    asideItems.forEach((item) => {
      item.classList.remove("active");
    });
    asideItems[e.target.id].classList.add("active");
    switch (e.target.id) {
      case "0":
        setSelectedSection("products");
        setEditProductActive(false);
        navigate("/prd");
        break;
        case "1":
          setSelectedSection("sell");
          setPhotos([])
          navigate("/prd");
        break;
      default:
        break;
    }
    const aside = document.querySelector(".prdAside");
    aside.classList.remove("show");
  };

  /* SHOW ASIDE */
  const handleShowAside = () => {
    const aside = document.querySelector(".prdAside");
    aside.classList.toggle("show");
  };

  useEffect(() => {
    setActiveSection(selectedSection);
  }, [selectedSection, setActiveSection]);
  return (
    <section className="prdAside">
      <div className="contentAside">

      <span className="burgerAside" onClick={handleShowAside}>
        {" "}
        <MenuRoundedIcon />
      </span>

      <div className="prdAsideItem active">
        <div className="bg" onClick={handleAside} id="0"></div>
        <span>
          {" "}
          <InventoryIcon /> <span className="titleItem">Mis Productos</span>
        </span>
      </div>
      <div className="prdAsideItem">
        <div className="bg" onClick={handleAside} id="1"></div>
        <span>
          {" "}
          <SellIcon /> <span className="titleItem">Registrar Producto</span>
        </span>
      </div>
      </div>
    </section>
  );
};

export default Aside;
