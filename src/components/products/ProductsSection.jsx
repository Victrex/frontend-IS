import { useContext } from "react";
import { Context } from "./Products";
import ProductRegister from "./ProductRegister";

const ProductsSection = () => {

  const {activeSection} = useContext(Context);

  return (
    <section className="bodyPrd">

      {
        activeSection === "products" ? (
          <div>
            <p>Productos</p>
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
