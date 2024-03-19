import NavBar from "../generalComponents/NavBar";
import ProductHeader from "./ProductHeader";
import ShowProducts from "./ShowProducts";
import { createContext, useState } from "react";

export const ProductContext = createContext();

const Landing = () => {
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  return (
    <ProductContext.Provider value={{ filter, setFilter, loading, setLoading }}>
      <main className="container">
        <NavBar />
        <ProductHeader />
        <div className="content">
          <ShowProducts />
        </div>
      </main>
    </ProductContext.Provider>
  );
};

export default Landing;
