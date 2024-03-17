import React from "react";
import NavBar from "../generalComponents/NavBar";
import Aside from "./Aside";
import ProductsSection from "./ProductsSection";

export const Context = React.createContext();

const Products = () => {
    const [activeSection, setActiveSection] = React.useState("products");

    return (
    <Context.Provider value={{activeSection, setActiveSection}}>
      <main className="container">
        <NavBar />
        <div className="content prd">
          <Aside />
          <ProductsSection />
        </div>
      </main>
    </Context.Provider>
  );
};

export default Products;
