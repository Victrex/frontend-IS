import SortIcon from "@mui/icons-material/Sort";
import { useContext, useState } from "react";
import { createContext } from "react";
import { Button } from "../generalComponents/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAside from "./FilterAside";
export const asideContext = createContext();
const Filter = () => {
  const [filterAsideActive, setFilterAsideActive] = useState(false);

  const handleFilterAsideActive = () => {
    setFilterAsideActive(!filterAsideActive);
  };

  return (
    <asideContext.Provider value={{ filterAsideActive, setFilterAsideActive }}>
      <div className="filterBy">
        <div className="filterByIconSmall" onClick={handleFilterAsideActive}>
          <SortIcon />
        </div>
        <div className="filterByIconLarge" onClick={handleFilterAsideActive}>
          <h3>Filtrar</h3>
          <SortIcon />
        </div>
      </div>
      {filterAsideActive ? <FilterAside /> : null}
      <div>

      </div>
    </asideContext.Provider>
  );
};


export default Filter;
