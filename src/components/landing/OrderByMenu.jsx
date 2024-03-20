import { useContext } from "react";
import { ProductContext } from "./Landing";

const OrderByMenu = () => {
    const {sort} = useContext(ProductContext);
    const {setSort} = useContext(ProductContext);
    

    const {filter} = useContext(ProductContext);
    const {setFilter} = useContext(ProductContext);
  return (
    <div className="orderByMenuContainer">
      <h4>Ordenar por:</h4>
      <div className="orderByMenu">
        <select style={{height: '30px'}} name="filter" id="filter" className="selectDepartmentFilter" value={filter}  onChange={(e)=> setFilter(e.target.value)}>
          <option value="0">Por fecha</option>
          <option value="1">Por Precio</option>
        </select>
        <select style={{height: '30px'}} name="sort" id="sort" className="selectDepartmentFilter" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="0">Ascendente</option>
          <option value="1">Descendente</option>
        </select>
      </div>
    </div>
  );
};

export default OrderByMenu;
