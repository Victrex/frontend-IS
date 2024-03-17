import React, { useContext, useEffect, useState } from "react";
import { Button } from "../generalComponents/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { asideContext } from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { getAllProductCategories } from "../../fetch/products";
import { getAllDepartments } from "../../fetch/addresses";

const FilterAside = () => {
  const { setFilterAsideActive } = useContext(asideContext);
  const [categoriesList, setCategoriesList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);

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
      console.log(e.target.value);
      return null;
    } else {
      // setPrice(e.target.value);
      console.log(e.target.value);
    }
  };

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
            {categoriesList.map((category, index) => {
              return (
                <div key={index} className="filterAsideElement">
                  <span>{category.categoryName}</span>
                </div>
              );
            })}

            <div className="filterAsideElement">
              <span>Inmuebles</span>
            </div>
          </div>
          {/* -------------------- */}
          <div className="asideSection">
            <h3>Por Departamento</h3>
            <select name="" id="" className="selectDepartmentFilter">
              <option value="0">Seleccione un Departamento</option>
              {departmentsList.map((department, index) => {
                return (
                  <option
                    key={index}
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
              <label htmlFor="expirationDate">Precio</label>
              <span className="forPrice">L.</span>
              <input
                onChange={handlePriceChange}
                className="inputPriceFilter"
                type="text"
                name="expirationDate"
                required
                style={{ paddingLeft: "30px" }}
              ></input>
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
