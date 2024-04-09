import { useContext } from "react";
import { ProductContext } from "./Landing";
import { Button } from "../generalComponents/Button";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const OrderByMenu = () => {
  const { sort } = useContext(ProductContext);
  const { setSort } = useContext(ProductContext);
  const { currentCategory } = useContext(ProductContext);

  const { filter } = useContext(ProductContext);
  const { setFilter } = useContext(ProductContext);
  return (
    <div className="orderByMenuContainer">
      <div className="orderByMenu">
        <h4 style={{ color: "#000", textAlign: 'center' }}>Ordenar por:</h4>
        <div>
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
        </div>
        <div>
          <Button
            innerText="Quitar Filtros"
            width="140px"
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
          {currentCategory === "" ? (
            ""
          ) : (
            <Button
              innerText={`Suscribirme`}
              width="130px"
              height="30px"
              fontSize="0.8rem"
              backgroundColor="#000000"
              color="#fff"
              iconPosition="left"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderByMenu;
