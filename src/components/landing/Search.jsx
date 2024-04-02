import { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { getProductBySearch } from "../../fetch/filter";
import { ProductContext } from "./Landing";

const Search = () => {
  const [filtro, setFiltro] = useState("");
  const { page: pageFilter } = useContext(ProductContext);
  const { size: sizeFilter } = useContext(ProductContext);
  const { sort } = useContext(ProductContext);
  const { filter } = useContext(ProductContext);
  const { setProducts } = useContext(ProductContext);
  // const [rollBackProducts, setRollBackProduct ] = useState([])
  const {productsBackUp} = useContext(ProductContext)

  const filtrar = (e) => {
    setFiltro(e.target.value);
    if (filtro.length > 1) {
      getProductBySearch(filtro, pageFilter, sizeFilter, sort, filter).then(
        (data) => {
          setProducts(data);
        }
      );
    } else {
      setProducts(productsBackUp)
    }
  };

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
