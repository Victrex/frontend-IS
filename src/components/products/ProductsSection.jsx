import { useContext } from "react";
import  { Context } from "./Products";
import ProductRegister from "./ProductRegister";
import ProductsByUser from "./ProductsByUser";
import ProductEdit from "./ProductEdit";

const ProductsSection = () => {

  const {activeSection, editProductActive} = useContext(Context);

  return (
    <section className="bodyPrd">

      {
        activeSection === "products" ? (
          <div>
            {
              editProductActive === false ? 
              <ProductsByUser /> :
              <ProductEdit />
            }
          </div>
        ) : (
          <div>
            <ProductRegister />
          </div>
        )
      }
    </section>
  );
};

export default ProductsSection;
