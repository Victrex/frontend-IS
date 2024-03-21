import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getProductBySearch } from "../../fetch/filter";
import { ProductContext } from "./Landing";

const Search = () => {
  const [filtro, setFiltro] = useState("");
  const {page: pageFilter} = useContext(ProductContext);
  const {size: sizeFilter} = useContext(ProductContext);
  const {filterType} = useContext(ProductContext);
  const {sort} = useContext(ProductContext);
  const {filter} = useContext(ProductContext);
  const {setProducts} = useContext(ProductContext);

  const filtrar = (e) => {
    setFiltro(e.target.value);
  };

  useEffect(() => {
    if (filtro.length > 2) {
      getProductBySearch(filtro, pageFilter, sizeFilter, sort, filter).then((data) => {
        setProducts(data);
      });
    }
  }, [filtro, filterType, filter, sort, pageFilter, sizeFilter, setProducts])

  return (
    <div className="searchHeader">
      <label htmlFor="search">
        <SearchIcon />
      </label>
      <input
        type="text"
        name="search"
        className="search"
        placeholder="¿Qué buscas?"
        onChange={filtrar}
      />
    </div>
  );
};

export default Search;
