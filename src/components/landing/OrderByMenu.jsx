import { useContext } from "react";
import { ProductContext } from "./Landing";
import { Button } from "../generalComponents/Button";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const OrderByMenu = () => {
  const { sort } = useContext(ProductContext);
  const { setSort } = useContext(ProductContext);

  const { filter } = useContext(ProductContext);
  const { setFilter } = useContext(ProductContext);
  return (
    <div className="orderByMenuContainer">
      <h4>Ordenar por:</h4>
      <div className="orderByMenu">
        <select
          style={{ height: "30px" }}
          name="filter"
          id="filter"
          className="selectDepartmentFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="0">Por fecha</option>
          <option value="1">Por Precio</option>
        </select>
        <select
          style={{ height: "30px" }}
          name="sort"
          id="sort"
          className="selectDepartmentFilter"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="0">Ascendente</option>
          <option value="1">Descendente</option>
        </select>
        <Button
          innerText="Quitar Filtros"
          width="120px"
          height="30px"
          fontSize="0.8rem"
          backgroundColor="#0f72ba"
          color="#fff"
          icon={<FilterAltOffIcon />}
          iconPosition="left"
          onClick={() => {
            location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default OrderByMenu;
