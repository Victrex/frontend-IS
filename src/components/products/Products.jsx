import React, { useState } from "react";
import NavBar from "../generalComponents/NavBar";
import Aside from "./Aside";
import ProductsSection from "./ProductsSection";

export const Context = React.createContext();

const Products = () => {
  const [activeSection, setActiveSection] = React.useState("products");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [firstPhoto, setFirstPhoto] = useState(null);
  return (
    <Context.Provider
      value={{
        activeSection,
        setActiveSection,
        photos,
        setPhotos,
        video,
        setVideo,
        firstPhoto,
        setFirstPhoto,
      }}
    >
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
