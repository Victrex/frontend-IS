import { useContext, useEffect } from "react";
import { Context } from "./Products";
import ProductRegister from "./ProductRegister";
import ProductsByUser from "./ProductsByUser";
import { Outlet, useLocation } from "react-router-dom";
import UploadProductsByCSV from "./UploadProductsByCSV";
import { useCsvStore } from "../store/csv";
import UploadSrcToProductsByCSV from "./UploadSrcToProductsByCSV";


const ProductsSection = () => {
  const location = useLocation();
  const { activeSection } = useContext(Context);
  const isUpt = useCsvStore((state) => state.isUpt);

  useEffect(() => {
    if (isUpt === true) {
      console.log("isUpt", isUpt);
    }
  }, [isUpt]);
  return (
    <section className="bodyPrd">
      {activeSection === "products" ? (
        <div>
          {location.pathname === "/prd" ? <ProductsByUser /> : <Outlet />}
        </div>
      ) : activeSection === "sell" ? (
        <div>
          <ProductRegister idProduct={0} data={{}} photosData={[]} />
        </div>
      ) : activeSection === "csv" && isUpt === false ? (
        <UploadProductsByCSV />
      ) : activeSection === "csv" && isUpt === true ? (
        <UploadSrcToProductsByCSV />
      ) : null}
    </section>
  );
};

export default ProductsSection;
