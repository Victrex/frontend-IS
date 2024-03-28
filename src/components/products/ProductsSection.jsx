import { useContext } from "react";
import  { Context } from "./Products";
import ProductRegister from "./ProductRegister";
import ProductsByUser from "./ProductsByUser";
import { Outlet, useLocation } from "react-router-dom";

const ProductsSection = () => {
  const location = useLocation();
  const {activeSection} = useContext(Context);
  
  return (
    <section className="bodyPrd">

      {
        activeSection === "products" ? (
          <div>
            {
              location.pathname === '/prd' ? 
              <ProductsByUser /> :
              <Outlet />
            }
          </div>
        ) : (
          <div>
            <ProductRegister idProduct={0} data={{}} photosData={[]}/>
          </div>
        )
      }
    </section>

  );
};

export default ProductsSection;
