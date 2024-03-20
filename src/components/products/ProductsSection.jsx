import { useContext } from "react";
import  { Context } from "./Products";
import ProductRegister from "./ProductRegister";
import ProductsByUser from "./ProductsByUser";

const ProductsSection = () => {

  const {activeSection} = useContext(Context);

  return (
    <section className="bodyPrd">

      {
        activeSection === "products" ? (
          <div>
            <ProductsByUser />
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
