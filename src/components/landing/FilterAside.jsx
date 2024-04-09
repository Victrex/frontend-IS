import { useContext, useEffect, useState } from "react";
import { Button } from "../generalComponents/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { asideContext } from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../fetch/products";
import { getAllDepartments } from "../../fetch/addresses";
import { ProductContext } from "./Landing";

/**
 * Component for the filter sidebar in the landing page.
 *
 * @component
 * @example
 * return (
 *   <FilterAside />
 * )
 */
const FilterAside = () => {
  /* Context */
  const { setMaxPrice: setMaxPriceContext } = useContext(ProductContext);
  const { setMinPrice: setMinPriceContext } = useContext(ProductContext);
  const { idFilter } = useContext(ProductContext); // para saber que categoria o departamento se selecciono
  const { setFilterAsideActive } = useContext(asideContext); // para saber si el aside esta activo o no
  const { setActiveFilterMenu } = useContext(ProductContext);
  const { setFilterType } = useContext(ProductContext); // para saber si es categorias, si es departamentos, si es precio, etc
  const { setIdFilter } = useContext(ProductContext); // para saber que categoria o departamento se selecciono
  const {setCurrentCategory} = useContext(ProductContext); // para saber que categoria se selecciono

  /* States Data */
  const [categoriesList, setCategoriesList] = useState([]); // lista de categorias
  const [departmentsList, setDepartmentsList] = useState([]); // lista de departamentos
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { data: productCategories } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getAllProductCategories,
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartments,
  });

  const handleAsideClose = () => {
    setFilterAsideActive(false);
  };
  const handlePriceChange = (e) => {
    const regex = /[^0-9.,]/g;
    const currentPrice =
      e.target.value.length >= 1
        ? parseFloat(e.target.value.replace(/,/g, ""))
        : "0";
    if (regex.test(e.target.value)) {
      return null;
    } else {
      if (e.target.id === "0") {
        setMinPrice(currentPrice);
      } else if (e.target.id === "1") {
        setMaxPrice(currentPrice);
      }
    }
  };

  const handlePriceFilter = () => {
    setFilterType("price");
    setMaxPriceContext(maxPrice);
    setMinPriceContext(minPrice);
    handleAsideClose();
    setActiveFilterMenu(true);
    setCurrentCategory('')
  };

  const handleFilterSelected = (e) => {
    switch (e.target.classList[1]) {
      case "cat":
        console.log(e.target.value, e.target.classList[1]);
        setIdFilter(e.target.value);
        setFilterType("category");
        setCurrentCategory(e.target[e.target.selectedIndex].text)
        break;
      case "dep":
        console.log(e.target.value, e.target.classList[1]);
        setIdFilter(e.target.value);
        setFilterType("department");
        setCurrentCategory('')
        break;
      default:
        break;
    }
    handleAsideClose();
    setActiveFilterMenu(true);
  };

  /* HANDLERS */

  useEffect(() => {
    if (departmentsData) {
      setDepartmentsList(departmentsData);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (productCategories) {
      setCategoriesList(productCategories);
    }
  }, [productCategories]);

  return (
    <div className="filterAside" >
      <div className="filterAsideContent" style={{zIndex: 999}}>
        <Button
          icon={<ArrowBackIcon />}
          innerText="Regresar"
          width="95%"
          height="40px"
          fontSize="0.9rem"
          fontWeight="500"
          backgroundColor="#ECECEC"
          color="#46689C"
          onClick={handleAsideClose}
          iconPosition="left"
        />
        <section className="content asideFilter" style={{ gap: "10px" }}>
          <div className="asideSection">
            <h3>Categorías</h3>
            <select
              name=""
              id=""
              className="selectDepartmentFilter cat"
              onChange={handleFilterSelected}
              value={idFilter}
            >
              <option value="0">Seleccione una categoria</option>

              {categoriesList.map((category, index) => {
                return (
                  <option
                    key={index}
                    id={category?.idCategory}
                    value={category?.idCategory}
                    className="filterAsideElement cat"
                  >
                    {category.categoryName}
                  </option>
                );
              })}
            </select>

          </div>
          {/* -------------------- */}
          <div className="asideSection">
            <h3>Por Departamento</h3>
            <select
              name=""
              id=""
              className="selectDepartmentFilter dep"
              onChange={handleFilterSelected}
            >
              <option value="0">Seleccione un Departamento</option>
              {departmentsList.map((department, index) => {
                return (
                  <option
                    key={index}
                    id={department.idDepartment}
                    value={department.idDepartment}
                    className=""
                  >
                    {department.departmentName}
                  </option>
                );
              })}
            </select>
          </div>
          {/* -------------------- */}
          <div className="asideSection">
            <h3>Por Precio</h3>
            <div className="filterAsideElement pr ">
              <div className="priceInputGroup">
                <span className="forPrice">L.</span>
                <input
                  onChange={handlePriceChange}
                  id="0"
                  className="inputPriceFilter"
                  type="text"
                  name="expirationDate"
                  required
                  value={minPrice.toLocaleString("en-US")}
                  style={{ paddingLeft: "30px" }}
                ></input>
              </div>
              <span>a</span>
              <div className="priceInputGroup">
                <span className="forPrice">L.</span>
                <input
                  onChange={handlePriceChange}
                  id="1"
                  className="inputPriceFilter"
                  type="text"
                  name="expirationDate"
                  required
                  value={maxPrice.toLocaleString("en-US")}
                  style={{ paddingLeft: "30px" }}
                ></input>
              </div>
            </div>
            <Button
              innerText="Filtrar por Precio"
              onClick={handlePriceFilter}
              color="#fff"
              backgroundColor="#46689C"
              fontSize="0.9rem"
            />
          </div>
          {/* -------------------- */}
          <br />
          <br />
          <br />
          <br />
        </section>
      </div>

      <div
        className="backNewInstitution"
        onClick={() => handleAsideClose()}
      ></div>
    </div>
  );
};

export default FilterAside;
