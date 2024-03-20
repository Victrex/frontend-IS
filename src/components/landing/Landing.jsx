import NavBar from "../generalComponents/NavBar";
import OrderByMenu from "./OrderByMenu";
import ProductHeader from "./ProductHeader";
import ShowProducts from "./ShowProducts";
import { createContext, useState } from "react";

export const ProductContext = createContext();

const Landing = () => {
  const [filter, setFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // seran todos los productos que se muestren al cliente
  const [sort, setSort] = useState(0);
  const [activeFilterMenu, setActiveFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState(''); // Para saber si es categorias, si es departamentos, si es precio, etc
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [idFilter, setIdFilter] = useState(''); // Para saber si es categorias, si es departamentos, si es precio, etc
  const [id, setId] = useState(''); // Para saber si es categorias, si es departamentos, si es precio, etc
  return (
    <ProductContext.Provider
      value={{ filter, setFilter, id, setId, idFilter, setIdFilter, page, setPage, size, setSize, filterType, setFilterType, loading, setLoading, sort, setSort, activeFilterMenu, setActiveFilterMenu, products, setProducts}}
    >
      <main className="container">
        <NavBar />
        <ProductHeader />
        <div className="content">
          {activeFilterMenu ? <OrderByMenu /> : null}
          <ShowProducts />
        </div>
      </main>
    </ProductContext.Provider>
  );
};

export default Landing;
