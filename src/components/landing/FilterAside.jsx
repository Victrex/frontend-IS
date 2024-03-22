import { useContext, useEffect, useState } from "react";
import { Button } from "../generalComponents/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { asideContext } from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../fetch/products";
import { getAllDepartments } from "../../fetch/addresses";
import SearchIcon from "@mui/icons-material/Search";
import { ProductContext } from "./Landing";

const FilterAside = () => {
  const { setFilterAsideActive } = useContext(asideContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [price, setPrice] = useState("0.00" || 0);
  const {setActiveFilterMenu} = useContext(ProductContext);
  const {setFilterType} = useContext(ProductContext);
  const {setIdFilter} = useContext(ProductContext);
  const {idFilter} = useContext(ProductContext);
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
    if (regex.test(e.target.value)) {
      return null;
    } else {
      setPrice(e.target.value);
    }
  };

  const handleFilterSelected = (e) => {
    if (e.target.classList[1] === "pr") {
      console.log(e.target?.classList[1], price);
      setIdFilter(e.target.id);
      setFilterType("price");
      return;
    }
    switch (e.target.classList[1]) {
      case "cat":
        console.log(e.target.value, e.target.classList[1]);
        setIdFilter(e.target.value);
        setFilterType("category");
        break;
        case "dep":
          console.log(e.target.value, e.target.classList[1]);
          setIdFilter(e.target.value);
        setFilterType("department");
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
    <div className="filterAside">
      <div className="filterAsideContent">
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
            {/* {categoriesList.map((category, index) => {
              return (
                <div
                  key={index}
                  id={category?.idCategory}
                  className="filterAsideElement cat"
                  onClick={handleFilterSelected}
                >
                  <span
                    id={category?.idCategory}
                    className="spanElementFilter cat"
                    onClick={handleFilterSelected}
                  >
                    {category.categoryName}
                  </span>
                </div>
              );
            })} */}
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
              <span className="forPrice">L.</span>
              <input
                onChange={handlePriceChange}
                className="inputPriceFilter"
                type="number"
                name="expirationDate"
                required
                style={{ paddingLeft: "30px" }}
              ></input>
              <label htmlFor="search" className="searchIcon pr">
                <span
                  className="bg pr"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={handleFilterSelected}
                ></span>
                <SearchIcon />
              </label>
            </div>
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
