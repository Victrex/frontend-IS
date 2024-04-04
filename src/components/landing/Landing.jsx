import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../generalComponents/NavBar";
import OrderByMenu from "./OrderByMenu";
import ProductHeader from "./ProductHeader";
import ShowProducts from "./ShowProducts";
import { createContext, useState } from "react";

export const ProductContext = createContext();

const Landing = () => {
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true); // para saber si la peticion esta cargando o no
  const [products, setProducts] = useState([]); // seran todos los productos que se muestren al cliente
  const [productsBackUp, setProductsBackUp] = useState([]); // seran todos los productos que se muestren al cliente de forma respaldada
  const [sort, setSort] = useState(0); // para saber si ascendente o descendente
  const [activeFilterMenu, setActiveFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState(""); // Para saber si es categorias, si es departamentos, si es precio, etc
  const [page, setPage] = useState(0); // en que pagina me encuentro
  const [size, setSize] = useState(15); // cuantos productos me traera la paginacion
  const [idFilter, setIdFilter] = useState(""); // Para saber si es categorias, si es departamentos, si es precio, etc
  const [id, setId] = useState(""); // Para saber si es categorias, si es departamentos, si es precio, etc
  const [maxPrice, setMaxPrice] = useState(0); // Maximo de precio en filtrar
  const [minPrice, setMinPrice] = useState(0); // Minimo de precio en filtrar

  const location = useLocation();

  return (
    <ProductContext.Provider
      value={{
        filter,
        setFilter,
        id,
        setId,
        idFilter,
        setIdFilter,
        page,
        setPage,
        size,
        setSize,
        filterType,
        setFilterType,
        loading,
        setLoading,
        sort,
        setSort,
        activeFilterMenu,
        setActiveFilterMenu,
        products,
        setProducts,
        productsBackUp,
        setProductsBackUp,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
      }}
    >
      <main className="container" style={{zIndex: "-3"}}>
        <NavBar />
        {location.pathname !== "/" ? "" : <ProductHeader />}
        {location.pathname === "/" ? (
          <div className="contentList" style={{zIndex: "-2"}}>
            {activeFilterMenu ? <OrderByMenu /> : null}
            <ShowProducts />
          </div>
        ) : (
          <div className="contentList" style={{marginTop: '70px'}}>
            <Outlet />
          </div>
        )}
      </main>
    </ProductContext.Provider>
  );
};

export default Landing;
