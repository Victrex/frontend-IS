import { useContext } from "react";
import  { Context } from "./Products";
import ProductRegister from "./ProductRegister";
import ProductsByUser from "./ProductsByUser";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProductsSection = () => {
  const location = useLocation();
  const {activeSection, editProductActive} = useContext(Context);
  console.log(location.pathname, "navigate");
  
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
            <ProductRegister idProduct={0} data={{}}/>
          </div>
        )
      }
    </section>

  );
};

export default ProductsSection;
